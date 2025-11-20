import { SheetRow } from 'types/chartTypes';
import { createLayout, createNonNumericChart } from './chartHelpers';

// Helper function to create histogram
export const createHistogram = (
  headers: string[],
  data: SheetRow[],
  numericColumns: string[]
): { chartData: any[]; layout: any } => {
  if (numericColumns.length >= 1) {
    const numericCol = numericColumns[0];
    const values: number[] = data.map(row => parseFloat(row[numericCol]) || 0);

    const chartData = [
      {
        x: values,
        type: 'histogram',
      },
    ];

    const layout = createLayout(
      `Histogram: ${numericCol}`,
      numericCol,
      'Count'
    );

    return { chartData, layout };
  } else {
    // No numeric data, use all rows as equal distribution
    return createNonNumericChart(data);
  }
};

// Helper function to create box plot
export const createBoxPlot = (
  headers: string[],
  data: any[],
  numericColumns: string[]
): { chartData: any[]; layout: any } => {
  const chartData = [
    {
      y: data,
      type: 'box',
    },
  ];

  const layout = createLayout(`Box Plot`, 'Value', 'Count');

  return { chartData, layout };
};

// Helper function to create violin plot
export const createViolinPlot = (
  headers: string[],
  data: any[],
  numericColumns: string[],
  xAxisTitle?: string
): { chartData: any[]; layout: any } => {
  if (data.length >= 1) {
    const numericCol = numericColumns[0];

    const chartData = [
      {
        y: data,
        type: 'violin',
        box: {
          visible: true,
        },
        meanline: {
          visible: true,
        },
        fillcolor: 'lightblue',
        line: {
          color: 'blue',
        },
      },
    ];

    const layout = createLayout(
      `Violin Plot: ${numericCol}`,
      xAxisTitle || undefined,
      numericCol
    );

    return { chartData, layout };
  } else {
    // No numeric data fallback
    return createNonNumericChart(data);
  }
};

// Helper function to create funnel or funnel area chart
export const createFunnelChart = (
  headers: string[],
  data: SheetRow[],
  numericColumns: string[],
  chartType: string,
  selectedNumericColumn?: string,
  selectedNonNumericColumn?: string,
  oneDArray1?: any[],
  originalData?: any[] // Additional parameter for the original data state
): { chartData: any[]; layout: any } => {
  if (numericColumns.length >= 1) {
    // Determine which columns to use based on user selection or defaults
    const numericCol =
      selectedNumericColumn && numericColumns.includes(selectedNumericColumn)
        ? selectedNumericColumn
        : numericColumns[0];

    let yValues: any[];
    let xValues: any[];

    if (oneDArray1 && oneDArray1.length > 0) {
      // Use oneDArray1 for y values and corresponding values from data for x values
      // Since data and oneDArray1 are of same length as mentioned
      yValues = oneDArray1;
      xValues = data.map(row => {
        // Use selected numeric column if provided and exists in data
        if (
          selectedNumericColumn &&
          row.hasOwnProperty(selectedNumericColumn)
        ) {
          return row[selectedNumericColumn];
        }
        // Otherwise use the first numeric column
        else if (numericColumns.length > 0) {
          return row[numericColumns[0]];
        }
        // Fallback to a default value
        else {
          return 1;
        }
      });
    } else {
      // Extract labels and values from the data
      yValues = data.map(row => row[selectedNonNumericColumn!]);
      xValues = data.map(row => row[selectedNumericColumn!]);
    }

    const chartData = [
      {
        type: chartType as any,
        y: oneDArray1,
        x: originalData,
        textinfo: 'value+percent previous',
        textposition: 'inside',
        marker: {
          color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
          line: { width: 2, color: '#FFFFFF' },
        },
        connector: {
          line: { color: '#CCCCCC', width: 2, dash: 'dot' },
        },
      },
    ];

    const baseLayout = createLayout(
      `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart: ${numericCol}`,
      numericCol,
      selectedNonNumericColumn,
      { showlegend: false }
    );

    const layout = {
      ...baseLayout,
    };

    return { chartData, layout };
  } else {
    // No numeric columns, fallback to a simple chart
    const yValues: string[] =
      oneDArray1 && oneDArray1.length > 0
        ? oneDArray1
        : data.map((row, i) => `Row ${i + 1}`);
    // Since data and oneDArray1 are of same length according to your requirement
    const xValues: number[] = data.map(() => 1); // Equal distribution

    const chartData = [
      {
        type: chartType as any,
        y: yValues,
        x: xValues,
        textinfo: 'value+percent previous',
        textposition: 'inside',
        marker: {
          color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
          line: { width: 2, color: '#FFFFFF' },
        },
        connector: {
          line: { color: '#CCCCCC', width: 2, dash: 'dot' },
        },
      },
    ];

    const baseLayout = createLayout(
      `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart: Data Distribution`,
      'Values',
      'Stages',
      { showlegend: false }
    );

    const layout = {
      ...baseLayout,
      width: 600,
      height: 500,
    };

    return { chartData, layout };
  }
};
