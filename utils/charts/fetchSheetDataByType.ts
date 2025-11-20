import { getSheetRangeValues2D } from 'lib/actions/getSheetRangeValues';
import {
  fetchCsvData,
  fetchFunnelData,
  fetchRangeData,
  isValidRange,
} from './chartHelpers3';

// Define the result type for sheet data fetching
export type SheetDataResult = {
  data: any[];
  oneDArray1?: any[];
  oneDArray2?: any[];
  twoDArray1?: any[][];
  oneDArray3?: any[];
  oneDArray4?: any[];
  oneDArray5?: any[];
};

/**
 * Fetches sheet data based on the chart type and column selections
 * @param sheetUrl - The URL of the sheet to fetch
 * @param selectedChartType - The type of chart being created
 * @param selectedNumericColumn - The selected numeric column
 * @param selectedNonNumericColumn - The selected non-numeric column
 * @param range3 - Optional third column for 3D charts (like scatter3d, mesh3d)
 * @param range4 - Optional fourth column for mesh3d (i indices)
 * @param range5 - Optional fifth column for mesh3d (j indices)
 * @param range6 - Optional sixth column for mesh3d (k indices)
 * @returns Promise resolving to the appropriate data structure
 */
export const fetchSheetDataByType = async (
  sheetUrl: string,
  selectedChartType: string,
  selectedNumericColumn: string,
  selectedNonNumericColumn: string,
  range3?: string,
  range4?: string,
  range5?: string,
  range6?: string
): Promise<SheetDataResult> => {
  // Special handling for scatter3d chart
  if (selectedChartType === 'scatter3d') {
    // For scatter3d, we need three ranges for x, y, z axes
    if (
      isValidRange(selectedNumericColumn) &&
      isValidRange(selectedNonNumericColumn) &&
      range3 &&
      isValidRange(range3)
    ) {
      // Call fetchRangeData 3 times with the x, y, and z column ranges
      const [xValues, yValues, zValues] = await Promise.all([
        fetchRangeData(sheetUrl, selectedNumericColumn),
        fetchRangeData(sheetUrl, selectedNonNumericColumn),
        fetchRangeData(sheetUrl, range3),
      ]);

      return { data: xValues, oneDArray1: yValues, oneDArray2: zValues };
    } else {
      // If ranges are not valid, fallback to original approach
      const csvData = await fetchCsvData(sheetUrl);
      return { data: csvData, oneDArray1: [], oneDArray2: [] };
    }
  }
  // Special handling for surface chart
  else if (selectedChartType === 'surface') {
    // For surface chart, we need x, y ranges and a 2D range for z (surface heights)
    if (
      isValidRange(selectedNumericColumn) &&
      isValidRange(selectedNonNumericColumn) &&
      range3 &&
      isValidRange(range3)
    ) {
      // Call fetchRangeData for x and y axes, and getSheetRangeValues2D for z (surface)
      const [xValues, yValues, zValues2D] = await Promise.all([
        fetchRangeData(sheetUrl, selectedNumericColumn),
        fetchRangeData(sheetUrl, selectedNonNumericColumn),
        getSheetRangeValues2D(sheetUrl, range3),
      ]);

      return { data: xValues, oneDArray1: yValues, twoDArray1: zValues2D };
    } else {
      // If ranges are not valid, fallback to original approach
      const csvData = await fetchCsvData(sheetUrl);
      return { data: csvData, oneDArray1: [], twoDArray1: [] };
    }
  }
  // Special handling for contour chart
  else if (selectedChartType === 'contour' || selectedChartType === 'heatmap') {
    // Check if the selected column is a valid range
    if (isValidRange(selectedNumericColumn)) {
      // Call getSheetRangeValues2D for contour chart to get 2D data
      const values2D = await getSheetRangeValues2D(
        sheetUrl,
        selectedNumericColumn
      );
      return { data: values2D.flat(), twoDArray1: values2D }; // Flatten data for compatibility, keep 2D array
    } else {
      // If range is not valid, fallback to original approach
      const csvData = await fetchCsvData(sheetUrl);
      return { data: csvData, twoDArray1: [] };
    }
  }
  // Special handling for mesh3d chart
  else if (selectedChartType === 'mesh3d') {
    // For mesh3d, we need six ranges for x, y, z coordinates and i, j, k indices
    if (
      isValidRange(selectedNumericColumn) &&
      isValidRange(selectedNonNumericColumn) &&
      range3 &&
      isValidRange(range3) &&
      range4 &&
      isValidRange(range4) &&
      range5 &&
      isValidRange(range5) &&
      range6 &&
      isValidRange(range6)
    ) {
      // Call fetchRangeData 6 times with the x, y, z coordinates and i, j, k indices
      const [xValues, yValues, zValues, iValues, jValues, kValues] =
        await Promise.all([
          fetchRangeData(sheetUrl, selectedNumericColumn),
          fetchRangeData(sheetUrl, selectedNonNumericColumn),
          fetchRangeData(sheetUrl, range3),
          fetchRangeData(sheetUrl, range4),
          fetchRangeData(sheetUrl, range5),
          fetchRangeData(sheetUrl, range6),
        ]);

      return {
        data: xValues,
        oneDArray1: yValues,
        oneDArray2: zValues,
        oneDArray3: iValues,
        oneDArray4: jValues,
        oneDArray5: kValues,
      };
    } else {
      // If ranges are not valid, fallback to original approach
      const csvData = await fetchCsvData(sheetUrl);
      return { data: csvData, oneDArray1: [], oneDArray2: [], twoDArray1: [] };
    }
  }
  // Special handling for funnel charts
  else if (
    selectedChartType === 'funnel' ||
    selectedChartType === 'histogram2dcontour'
  ) {
    // Check if both selected columns are valid ranges
    if (
      isValidRange(selectedNumericColumn) &&
      isValidRange(selectedNonNumericColumn)
    ) {
      // Call getSheetRangeValues twice for funnel chart
      return await fetchFunnelData(
        sheetUrl,
        selectedNumericColumn,
        selectedNonNumericColumn
      );
    } else {
      // If ranges are not valid, fallback to original approach
      const csvData = await fetchCsvData(sheetUrl);
      return { data: csvData, oneDArray1: [] };
    }
  } else {
    // For other chart types, check if we have a valid range
    if (isValidRange(selectedNumericColumn)) {
      // If a valid range is provided, use getSheetRangeValues server action
      const values = await fetchRangeData(sheetUrl, selectedNumericColumn);
      return { data: values, oneDArray1: [] };
    } else {
      // If no range is specified, proceed with the CSV approach
      const csvData = await fetchCsvData(sheetUrl);
      return { data: csvData, oneDArray1: [] };
    }
  }
};
