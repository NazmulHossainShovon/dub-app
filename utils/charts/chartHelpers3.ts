import {
  getSheetRangeValues,
  getSheetRangeValues2D,
} from 'lib/actions/getSheetRangeValues';

/**
 * Validates if a column string is in the format of a Google Sheets range (e.g., A1:B5)
 * @param column - The column string to validate
 * @returns boolean indicating if the column is a valid range
 */
export const isValidRange = (column: string): boolean => {
  if (!column) return false;
  const trimmed = column.trim();
  if (!trimmed) return false;
  return /^[A-Z]+\d*:[A-Z]+\d*$/.test(trimmed);
};

/**
 * Extracts the Google Sheet ID from a URL
 * @param sheetUrl - The Google Sheets URL
 * @returns The extracted sheet ID or null if not found
 */
export const extractSheetId = (sheetUrl: string): string | null => {
  const sheetIdMatch = sheetUrl.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return sheetIdMatch ? sheetIdMatch[1] : null;
};

/**
 * Creates a Google Sheets CSV export URL from the sheet ID
 * @param sheetId - The Google Sheet ID
 * @returns The CSV export URL
 */
export const createGoogleSheetsCsvUrl = (sheetId: string): string => {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
};

/**
 * Simple CSV parser that converts CSV text to an array of objects
 * @param csvText - The raw CSV text
 * @returns Array of objects representing the parsed CSV data
 */
export const parseCSV = (csvText: string): any[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0]
    .split(',')
    .map(header => header.trim().replace(/^"|"$/g, ''));
  const result: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    const obj: any = {};

    for (let j = 0; j < headers.length; j++) {
      // Remove quotes from beginning and end if they exist
      const value = currentLine[j]?.trim().replace(/^"|"$/g, '') || '';
      obj[headers[j]] = value;
    }

    result.push(obj);
  }

  return result;
};

/**
 * Fetches data from a Google Sheets URL using getSheetRangeValues for specific ranges
 * @param sheetUrl - The Google Sheets URL
 * @param selectedNumericColumn - The selected numeric column range
 * @returns Promise resolving to the sheet values
 */
export const fetchRangeData = async (
  sheetUrl: string,
  selectedNumericColumn: string
) => {
  return await getSheetRangeValues(sheetUrl, selectedNumericColumn);
};

/**
 * Fetches data from a Google Sheets URL by exporting as CSV
 * @param sheetUrl - The Google Sheets URL
 * @returns Promise resolving to the parsed CSV data
 */
export const fetchCsvData = async (sheetUrl: string) => {
  const sheetId = extractSheetId(sheetUrl);
  if (!sheetId) {
    throw new Error('Invalid Google Sheets URL. Could not extract sheet ID.');
  }

  const csvUrl = createGoogleSheetsCsvUrl(sheetId);
  const response = await fetch(csvUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data: ${response.status} ${response.statusText}`
    );
  }

  const csvText = await response.text();
  return parseCSV(csvText);
};

/**
 * Fetches data for funnel charts by calling getSheetRangeValues twice
 * @param sheetUrl - The Google Sheets URL
 * @param selectedNumericColumn - The selected numeric column range
 * @param selectedNonNumericColumn - The selected non-numeric column range
 * @returns Promise resolving to an object with data and oneDArray1 arrays
 */
export const fetchFunnelData = async (
  sheetUrl: string,
  selectedNumericColumn: string,
  selectedNonNumericColumn: string
) => {
  const [numericValues, nonNumericValues] = await Promise.all([
    fetchRangeData(sheetUrl, selectedNumericColumn),
    fetchRangeData(sheetUrl, selectedNonNumericColumn),
  ]);

  return { data: numericValues, oneDArray1: nonNumericValues };
};

/**
 * Combines two arrays of data for funnel chart display
 * @param data - The first array of data (typically numeric)
 * @param oneDArray1 - The second array of data (typically non-numeric)
 * @param selectedNumericColumn - Name for the numeric column
 * @param selectedNonNumericColumn - Name for the non-numeric column
 * @returns Combined array of objects with both column values
 */
export const combineFunnelData = (
  data: any[],
  oneDArray1: any[],
  selectedNumericColumn: string,
  selectedNonNumericColumn: string
): any[] => {
  const combinedData = [];
  const maxLength = Math.max(data.length, oneDArray1.length);

  for (let i = 0; i < maxLength; i++) {
    const obj: any = {};

    if (data[i] && typeof data[i] === 'object' && data[i][0]) {
      obj[selectedNumericColumn] = data[i][0];
    } else if (data[i] !== undefined) {
      obj[selectedNumericColumn] = data[i];
    }

    if (
      oneDArray1[i] &&
      typeof oneDArray1[i] === 'object' &&
      oneDArray1[i][0]
    ) {
      obj[selectedNonNumericColumn] = oneDArray1[i][0];
    } else if (oneDArray1[i] !== undefined) {
      obj[selectedNonNumericColumn] = oneDArray1[i];
    }

    combinedData.push(obj);
  }

  return combinedData;
};
