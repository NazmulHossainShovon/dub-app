'use client';

import React from 'react';
import FeatureCard from './FeatureCard';

const features = [
  {
    title: 'Direct Google Sheets Integration',
    description:
      'Simply paste your Google Sheets link and instantly access your data',
    icon: '🔗',
  },
  {
    title: 'Custom Cell Ranges',
    description: 'Select specific data ranges for precise chart generation',
    icon: '📋',
  },
  {
    title: 'Advanced Chart Types',
    description: 'Access 7+ chart types not available in Google Sheets',
    icon: '📈',
  },
  {
    title: 'Full Customization',
    description: 'Customize colors, labels, styling, and interactive features',
    icon: '🎨',
  },
  {
    title: 'High-Performance Rendering',
    description:
      'WebGL-powered charts for smooth performance with large datasets',
    icon: '⚡',
  },
  {
    title: 'Export & Share',
    description: 'Download charts in png format',
    icon: '💾',
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Why Choose Our Chart Platform?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Create professional-grade visualizations with features and chart
            types that traditional spreadsheet applications simply can&apos;t
            provide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
