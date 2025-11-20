import { SheetRow } from 'types/chartTypes';
import { createLayout, createNonNumericChart } from './chartHelpers';

// Helper function to create heatmap chart
export const createHeatmapChart = (
  headers: string[],
  data: any[],
  numericColumns: string[],
  selectedNumericColumn?: string,
  twoDArray1?: any[][] // Additional parameter for twoDArray1
): { chartData: any[]; layout: any } => {
  // If a 2D array is provided (from range values), use it directly for the heatmap
  if (twoDArray1 && twoDArray1.length > 0) {
    // Convert all values to numbers
    const zValues: number[][] = twoDArray1.map(row => 
      row.map(val => typeof val === 'number' ? val : parseFloat(val) || 0)
    );

    // Create sample x and y labels based on the dimensions of the 2D array
    const xLabels = Array(twoDArray1[0]?.length || 0).fill(0).map((_, i) => `Column ${i + 1}`);
    const yLabels = Array(twoDArray1.length).fill(0).map((_, i) => `Row ${i + 1}`);

    const chartData = [
      {
        z: zValues, // 2D array of values (rows x columns)
        x: xLabels, // Optional: x-axis labels
        y: yLabels, // Optional: y-axis labels
        type: 'heatmap',
        colorscale: 'Viridis', // Optional: Color scheme (e.g., 'Viridis', 'Blues', or custom array)
        showscale: true, // Optional: Show color bar
      },
    ];

    const layout = createLayout(`Heatmap (from range)`, 'X axis', 'Y axis');

    return { chartData, layout };
  }

  // If a specific numeric column is selected, use it; otherwise default to the first available
  const col =
    selectedNumericColumn &&
    (numericColumns.includes(selectedNumericColumn) ||
      headers.includes(selectedNumericColumn))
      ? selectedNumericColumn
      : numericColumns[0];

  if (!col) {
    // No numeric column available, return empty chart
    return { chartData: [], layout: createLayout('Heatmap') };
  }

  // Extract values for the selected column
  const zValues: number[][] = [];

  // For a simple heatmap, we'll create a simple 2D matrix from the data
  // If the data has multiple rows, we can use them as rows in the matrix
  // If we have a single numeric column, we can organize the data into a 2D grid
  if (data.length > 0) {
    const colData = data.map(row => {
      // Access the value using bracket notation with the column name
      const val = row[col];
      return typeof val === 'number' ? val : parseFloat(val) || 0;
    });

    // Create a square matrix from the column data
    const size = Math.ceil(Math.sqrt(colData.length));
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const idx = i * size + j;
        row.push(idx < colData.length ? colData[idx] : 0);
      }
      zValues.push(row);
    }
  }

  // Create sample x and y labels based on the dimensions of the 2D array
  const xLabels = Array(zValues[0]?.length || 0).fill(0).map((_, i) => `Column ${i + 1}`);
  const yLabels = Array(zValues.length).fill(0).map((_, i) => `Row ${i + 1}`);

  const chartData = [
    {
      z: zValues, // 2D array of values (rows x columns)
      x: xLabels, // Optional: x-axis labels
      y: yLabels, // Optional: y-axis labels
      type: 'heatmap',
      colorscale: 'Viridis', // Optional: Color scheme (e.g., 'Viridis', 'Blues', or custom array)
      showscale: true, // Optional: Show color bar
    },
  ];

  const layout = createLayout(`Heatmap`, 'X axis', 'Y axis');

  return { chartData, layout };
};