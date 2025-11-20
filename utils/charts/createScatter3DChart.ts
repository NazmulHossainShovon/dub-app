// Helper function to create scatter3d chart
export const createScatter3DChart = (
  data: any[],
  oneDArray1: any[],
  oneDArray2: any[]
): { chartData: any[]; layout: any } => {
  // Process x, y, z data arrays 
  const xValues: number[] = data.map(item => {
    if (typeof item === 'object' && item !== null) {
      const values = Object.values(item);
      return values.length > 0 ? parseFloat(String(values[0]) || '0') : 0;
    }
    return parseFloat(String(item) || '0');
  }).filter(val => !isNaN(val));
  
  const yValues: number[] = oneDArray1.map(item => {
    if (typeof item === 'object' && item !== null) {
      const values = Object.values(item);
      return values.length > 0 ? parseFloat(String(values[0]) || '0') : 0;
    }
    return parseFloat(String(item) || '0');
  }).filter(val => !isNaN(val));
  
  const zValues: number[] = oneDArray2.map(item => {
    if (typeof item === 'object' && item !== null) {
      const values = Object.values(item);
      return values.length > 0 ? parseFloat(String(values[0]) || '0') : 0;
    }
    return parseFloat(String(item) || '0');
  }).filter(val => !isNaN(val));

  // Find the minimum length to ensure all arrays have the same size
  const minLength = Math.min(xValues.length, yValues.length, zValues.length);
  
  // Truncate arrays to the same length
  const truncatedX = xValues.slice(0, minLength);
  const truncatedY = yValues.slice(0, minLength);
  const truncatedZ = zValues.slice(0, minLength);

  const chartData = [
    {
      x: truncatedX,
      y: truncatedY,
      z: truncatedZ,
      type: 'scatter3d',
      mode: 'markers',
      marker: { 
        size: 5,
        color: '#3b82f6',
        opacity: 0.8
      },
    },
  ];

  const layout = {
    title: '3D Scatter Plot',
    scene: {
      xaxis: { title: 'X-axis' },
      yaxis: { title: 'Y-axis' },
      zaxis: { title: 'Z-axis' },
    },
    margin: { l: 60, r: 30, b: 60, t: 70, pad: 4 },
  };

  return { chartData, layout };
};