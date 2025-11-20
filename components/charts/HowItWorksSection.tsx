'use client';

import React from 'react';
import HowItWorksStep from './HowItWorksStep';

const steps = [
  {
    step: '1',
    title: 'Paste Google Sheet URL',
    description: 'Copy and paste your Google Sheets link into our interface',
  },
  {
    step: '2',
    title: 'Select Chart Type',
    description:
      'Choose from 7+ advanced chart types across multiple categories',
  },
  {
    step: '3',
    title: 'Define Data Ranges',
    description:
      'Specify cell ranges for your data source and customize options',
  },
  {
    step: '4',
    title: 'Generate & Customize',
    description:
      'Create your chart and fine-tune styling and interactive features',
  },
];

const HowItWorksSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get from spreadsheet to stunning visualization in just four simple
            steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <HowItWorksStep
              key={index}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
