'use client';

import React from 'react';
import ChartCategoryCard from './ChartCategoryCard';

const chartCategories = [
  {
    title: '3D Charts',
    description:
      'Stunning three-dimensional visualizations not available in Google Sheets',
    charts: ['3D Scatter', '3D Surface', '3D Mesh'],
    icon: '🎯',
    color: 'from-blue-500 to-purple-600',
  },
  {
    title: 'Statistical Charts',
    description: 'Advanced statistical visualizations for data analysis',
    charts: [
      'Violin Plot',
      'Contour Plot',
      'Heatmap',
      // 'Density Map',
      '2D Histogram',
    ],
    icon: '📊',
    color: 'from-green-500 to-teal-600',
  },
  // {
  //   title: 'Scientific Charts',
  //   description: 'Specialized charts for scientific and research applications',
  //   charts: [
  //     'Surface Plot',
  //     'Isosurface',
  //     'Volume Plot',
  //     'Mesh Plot',
  //     'Point Cloud',
  //   ],
  //   icon: '🔬',
  //   color: 'from-purple-500 to-pink-600',
  // },
  {
    title: 'Financial Charts',
    description: 'Professional charts for financial data analysis',
    charts: ['Funnel'],
    icon: '💹',
    color: 'from-yellow-500 to-orange-600',
  },
  // {
  //   title: 'Geographical Charts',
  //   description: 'Interactive maps and geographical visualizations',
  //   charts: ['Choropleth Map', 'Scatter Geo', 'Mapbox', 'Density Map'],
  //   icon: '🗺️',
  //   color: 'from-cyan-500 to-blue-600'
  // },
  // {
  //   title: 'Specialty Charts',
  //   description: 'Unique and specialized visualization types',
  //   charts: ['Sunburst', 'Treemap', 'Sankey', 'Parallel Coordinates', 'Icicle'],
  //   icon: '✨',
  //   color: 'from-red-500 to-pink-600'
  // }
];

const ChartCategoriesSection = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Chart Types Not Available in Google Sheets
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our extensive collection of advanced chart types, from 3D
            visualizations to specialized statistical and scientific plots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chartCategories.map((category, index) => (
            <ChartCategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartCategoriesSection;
