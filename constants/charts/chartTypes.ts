export interface ChartTypeOption {
  label: string;
  value: string;
  category: string;
}

// Define available chart types
export const chartTypes: ChartTypeOption[] = [
  { label: 'Box Plot', value: 'box', category: 'Basic' },
  { label: 'Violin Plot', value: 'violin', category: 'Basic' },
  { label: 'Funnel Chart', value: 'funnel', category: 'Basic' },

  // Statistical Charts
  { label: '2D Histogram', value: 'histogram2d', category: 'Statistical' },
  { label: '2D Contour', value: 'histogram2dcontour', category: 'Statistical' },
  { label: 'Contour Plot', value: 'contour', category: 'Statistical' },
  { label: 'Heatmap', value: 'heatmap', category: 'Statistical' },
  // { label: 'Density Heatmap', value: 'densitymapbox', category: 'Statistical' },

  // Geographical Charts
  // { label: 'Scatter Geo', value: 'scattergeo', category: 'Geographical' },
  // { label: 'Choropleth Map', value: 'choropleth', category: 'Geographical' },
  // { label: 'Scatter Mapbox', value: 'scattermapbox', category: 'Geographical' },
  // {
  //   label: 'Choropleth Mapbox',
  //   value: 'choroplethmapbox',
  //   category: 'Geographical',
  // },

  // 3D Charts
  { label: '3D Scatter', value: 'scatter3d', category: '3D' },
  { label: '3D Surface', value: 'surface', category: '3D' },
  // { label: '3D Line', value: 'line3d', category: '3D' },
  { label: '3D Mesh', value: 'mesh3d', category: '3D' },
  // { label: '3D Contour', value: 'contour3d', category: '3D' },
  // { label: '3D Volume', value: 'volume', category: '3D' },
  // { label: '3D Isosurface', value: 'isosurface', category: '3D' },

  // Specialty Charts
  // { label: 'Sunburst', value: 'sunburst', category: 'Specialty' },
  // { label: 'Treemap', value: 'treemap', category: 'Specialty' },
  // { label: 'Icicle', value: 'icicle', category: 'Specialty' },
  // { label: 'Sankey', value: 'sankey', category: 'Specialty' },
  // { label: 'Parallel Coordinates', value: 'parcoords', category: 'Specialty' },
  // { label: 'Parallel Categories', value: 'parcats', category: 'Specialty' },
  // { label: 'Table', value: 'table', category: 'Specialty' },
  // { label: 'Carpet', value: 'carpet', category: 'Specialty' },
  // { label: 'Scatter Carpet', value: 'scattercarpet', category: 'Specialty' },
  // { label: 'Funnel Area', value: 'funnelarea', category: 'Specialty' },
  // { label: 'Image', value: 'image', category: 'Specialty' },

  // WebGL Charts
  // { label: 'Scatter GL', value: 'scattergl', category: 'WebGL' },
  // { label: 'Heatmap GL', value: 'heatmapgl', category: 'WebGL' },
  // { label: 'Contour GL', value: 'contourgl', category: 'WebGL' },
  // { label: 'Point Cloud', value: 'pointcloud', category: 'WebGL' },
];
