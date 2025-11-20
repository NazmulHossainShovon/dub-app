import { useState, useEffect } from 'react';
import { SheetRow } from '../../types/chartTypes';

// Simple CSV parser
const parseCSV = (csvText: string): SheetRow[] => {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0]
    .split(',')
    .map(header => header.trim().replace(/^"|"$/g, ''));
  const result: SheetRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    const obj: SheetRow = {};

    for (let j = 0; j < headers.length; j++) {
      // Remove quotes from beginning and end if they exist
      const value = currentLine[j]?.trim().replace(/^"|"$/g, '') || '';
      obj[headers[j]] = value;
    }

    result.push(obj);
  }

  return result;
};

interface UseSheetDataProps {
  sheetUrl: string;
}

const useSheetData = ({ sheetUrl }: UseSheetDataProps) => {
  const [data, setData] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [PlotComponent, setPlotComponent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // For Google Sheets, we can fetch as CSV or JSON
        // Using CSV format here and converting to JSON
        const response = await fetch(sheetUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data: ${response.status} ${response.statusText}`
          );
        }

        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setData(parsedData);
      } catch (err) {
        console.error('Error fetching sheet data:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    // Dynamically import Plot component to avoid SSR issues
    import('react-plotly.js').then(PlotModule => {
      setPlotComponent(() => PlotModule.default);
    });

    fetchData();
  }, [sheetUrl]);

  return { data, loading, error, PlotComponent };
};

export default useSheetData;