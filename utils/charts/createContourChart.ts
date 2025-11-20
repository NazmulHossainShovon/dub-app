import { SheetRow } from 'types/chartTypes';
import { createLayout, createNonNumericChart } from './chartHelpers';

// Helper function to create contour chart
export const createContourChart = (
  headers: string[],
  data: any[],
  numericColumns: string[],
  selectedNumericColumn?: string,
  twoDArray1?: any[][] // Additional parameter for twoDArray1
): { chartData: any[]; layout: any } => {
  // If a 2D array is provided (from range values), use it directly for the contour plot
  if (twoDArray1 && twoDArray1.length > 0) {
    // Convert all values to numbers
    const zValues: number[][] = twoDArray1.map(row => 
      row.map(val => typeof val === 'number' ? val : parseFloat(val) || 0)
    );

    const chartData = [
      {
        z: zValues,
        type: 'contour',
        colorscale: 'Viridis', // Optional: Color scheme (e.g., 'Viridis', 'Hot', 'Jet')
        contours: {
          showlabels: true, // Optional: Show contour labels
          labelfont: {
            family: 'Raleway',
            color: 'white', // Optional: Label styling
          },
        },
        hoverlabel: {
          bgcolor: 'white', // Optional: Hover tooltip background
          bordercolor: 'black', // Optional: Hover tooltip border
          font: {
            family: 'Raleway',
            color: 'black', // Optional: Hover text styling
          },
        },
      },
    ];

    const layout = createLayout(`Contour Plot (from range)`, 'X axis', 'Y axis');

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
    return { chartData: [], layout: createLayout('Contour Plot') };
  }

  // Extract values for the selected column
  const zValues: number[][] = [];

  // For a simple contour plot, we'll create a simple 2D matrix from the data
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

  const chartData = [
    {
      z: zValues,
      type: 'contour',
      colorscale: 'Viridis', // Optional: Color scheme (e.g., 'Viridis', 'Hot', 'Jet')
      contours: {
        showlabels: true, // Optional: Show contour labels
        labelfont: {
          family: 'Raleway',
          color: 'white', // Optional: Label styling
        },
      },
      hoverlabel: {
        bgcolor: 'white', // Optional: Hover tooltip background
        bordercolor: 'black', // Optional: Hover tooltip border
        font: {
          family: 'Raleway',
          color: 'black', // Optional: Hover text styling
        },
      },
    },
  ];

  const layout = createLayout(`Contour Plot`, 'X axis', 'Y axis');

  return { chartData, layout };
};