import { SheetRow } from 'types/chartTypes';
import { createLayout, createNonNumericChart } from './chartHelpers';

// Helper function to create 3D line chart
export const createLine3DChart = (
  headers: string[],
  data: SheetRow[],
  numericColumns: string[]
): { chartData: any[]; layout: any } => {
  // 3D line chart needs at least 3 numeric columns (x, y, z)
  if (numericColumns.length >= 3) {
    const xCol = numericColumns[0];
    const yCol = numericColumns[1];
    const zCol = numericColumns[2];

    const xValues: number[] = data.map(row => parseFloat(row[xCol]) || 0);
    const yValues: number[] = data.map(row => parseFloat(row[yCol]) || 0);
    const zValues: number[] = data.map(row => parseFloat(row[zCol]) || 0);

    const chartData = [
      {
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'scatter3d',
        mode: 'lines',
        line: { color: '#3b82f6' },
      },
    ];

    const layout = {
      title: `3D Line Chart: ${xCol} vs ${yCol} vs ${zCol}`,
      scene: {
        xaxis: { title: xCol },
        yaxis: { title: yCol },
        zaxis: { title: zCol },
      },
      margin: { l: 60, r: 30, b: 60, t: 70, pad: 4 },
    };

    return { chartData, layout };
  } else if (numericColumns.length >= 2) {
    // Use index as third dimension if we only have 2 numeric columns
    const xCol = numericColumns[0];
    const yCol = numericColumns[1];

    const xValues: number[] = data.map(row => parseFloat(row[xCol]) || 0);
    const yValues: number[] = data.map(row => parseFloat(row[yCol]) || 0);
    const zValues: number[] = data.map((_, i) => i);

    const chartData = [
      {
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'scatter3d',
        mode: 'lines',
        line: { color: '#3b82f6' },
      },
    ];

    const layout = {
      title: `3D Line Chart: ${xCol} vs ${yCol}`,
      scene: {
        xaxis: { title: xCol },
        yaxis: { title: yCol },
        zaxis: { title: 'Index' },
      },
      margin: { l: 60, r: 30, b: 60, t: 70, pad: 4 },
    };

    return { chartData, layout };
  } else if (numericColumns.length === 1) {
    // Use index for y and z if we only have 1 numeric column
    const numericCol = numericColumns[0];

    const xValues: number[] = data.map((_, i) => i);
    const yValues: number[] = data.map(row => parseFloat(row[numericCol]) || 0);
    const zValues: number[] = data.map((_, i) => i * 0.5); // Simple z progression

    const chartData = [
      {
        x: xValues,
        y: yValues,
        z: zValues,
        type: 'scatter3d',
        mode: 'lines',
        line: { color: '#3b82f6' },
      },
    ];

    const layout = {
      title: `3D Line Chart: ${numericCol}`,
      scene: {
        xaxis: { title: 'Index' },
        yaxis: { title: numericCol },
        zaxis: { title: 'Z (Index)' },
      },
      margin: { l: 60, r: 30, b: 60, t: 70, pad: 4 },
    };

    return { chartData, layout };
  } else {
    // No numeric columns - fallback to non-numeric chart
    return createNonNumericChart(data);
  }
};

// Helper function to create generic chart for other chart types
export const createGenericChart = (
  headers: string[],
  data: SheetRow[],
  numericColumns: string[],
  selectedChartType: string,
  selectedXColumn?: string,
  selectedYColumn?: string,
  selectedZColumn?: string
): { chartData: any[]; layout: any } => {

  if (numericColumns.length === 1) {
    const numericCol = numericColumns[0];
    const nonNumericCols = headers.filter(h => !numericColumns.includes(h));
    const xCol = nonNumericCols.length > 0 ? nonNumericCols[0] : headers[0];

    const xValues: (string | number)[] = data.map(row => row[xCol]);
    const yValues: number[] = data.map(row => parseFloat(row[numericCol]) || 0);

    const chartData = [
      {
        x: xValues,
        y: yValues,
        type: selectedChartType as any,
      },
    ];

    const layout = createLayout(
      `${selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1)}: ${numericCol} by ${xCol}`,
      xCol,
      numericCol
    );

    return { chartData, layout };
  } else if (numericColumns.length > 1) {
    // Multiple numeric columns - create a basic chart with first numeric column as y-axis
    const xCol = headers[0]; // Use first column as x-axis
    const xValues: (string | number)[] = data.map(row => row[xCol]);
    const numericCol = numericColumns[0];
    const yValues: number[] = data.map(row => parseFloat(row[numericCol]) || 0);

    const chartData = [
      {
        x: xValues,
        y: yValues,
        type: selectedChartType as any,
      },
    ];

    const layout = createLayout(
      `${selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1)}: ${numericCol}`,
      xCol,
      numericCol
    );

    return { chartData, layout };
  } else {
    // No numeric columns - use only chart types that make sense with non-numeric data
    if (
      [
        'bar',
        'pie',
        'funnel',
        'funnelarea',
        'sunburst',
        'treemap',
        'icicle',
      ].includes(selectedChartType)
    ) {
      const values: number[] = Array(data.length).fill(1); // Equal distribution
      const labels: string[] = data.map((row, i) => `Row ${i + 1}`);

      const chartData = [
        {
          values: values,
          labels: labels,
          type: selectedChartType as any,
        },
      ];

      const layout = createLayout(
        `${selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1)}: Data Distribution`
      );

      return { chartData, layout };
    } else {
      // For chart types that don't work well with non-numeric data, fall back to a basic chart
      return createNonNumericChart(data);
    }
  }
};

// Helper function to create 2D histogram contour chart
export const createHistogram2DContour = (
  headers: string[],
  data: any[],
  numericColumns: string[],
  selectedNumericColumn?: string,
  selectedNonNumericColumn?: string,
  oneDArray1?: any[] // Additional parameter for oneDArray1
): { chartData: any[]; layout: any } => {
  // If specific columns are selected, use them; otherwise default to the first available
  let xCol: string;
  let yCol: string;
  console.log(data, oneDArray1);

  const chartData = [
    {
      x: data,
      y: oneDArray1,
      type: 'histogram2dcontour',
      colorscale: 'Blues', // Optional: Color scheme (e.g., 'Viridis', 'Hot')
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

  const layout = createLayout(`2D Histogram Contour`, 'X axis', 'Y axis');

  return { chartData, layout };
};
