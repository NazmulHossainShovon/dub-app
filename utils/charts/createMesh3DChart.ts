/**
 * Creates a 3D mesh chart configuration for Plotly
 * @param xData - X coordinates array
 * @param yData - Y coordinates array 
 * @param zData - Z coordinates array
 * @param iIndices - i indices array for mesh triangles
 * @param jIndices - j indices array for mesh triangles
 * @param kIndices - k indices array for mesh triangles
 * @returns Object containing chart data and layout configuration
 */
export const createMesh3DChart = (
  xData: any[],
  yData: any[],
  zData: any[],
  iIndices: any[],
  jIndices: any[],
  kIndices: any[]
) => {
  return {
    chartData: [
      {
        type: 'mesh3d',
        x: xData.map(item => Array.isArray(item) ? item[0] : item),
        y: yData.map(item => Array.isArray(item) ? item[0] : item),
        z: zData.map(item => Array.isArray(item) ? item[0] : item),
        i: iIndices.map(item => Array.isArray(item) ? item[0] : item),
        j: jIndices.map(item => Array.isArray(item) ? item[0] : item),
        k: kIndices.map(item => Array.isArray(item) ? item[0] : item),
        color: 'lightblue',
        opacity: 0.30
      }
    ],
    layout: {
      title: '3D Mesh Plot',
      scene: {
        xaxis: { title: 'X Axis' },
        yaxis: { title: 'Y Axis' },
        zaxis: { title: 'Z Axis' }
      }
    }
  };
};