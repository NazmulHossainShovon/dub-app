'use client';

import React from 'react';

interface ChartCategory {
  title: string;
  description: string;
  charts: string[];
  icon: string;
  color: string;
}

interface ChartCategoryCardProps {
  category: ChartCategory;
}

const ChartCategoryCard: React.FC<ChartCategoryCardProps> = ({ category }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
      <div className="p-8">
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-3">{category.icon}</span>
          <h3 className="text-2xl font-bold text-slate-900">
            {category.title}
          </h3>
        </div>
        <p className="text-slate-600 mb-6 leading-relaxed">
          {category.description}
        </p>
        <div className="space-y-2">
          {category.charts.map((chart, chartIndex) => (
            <div key={chartIndex} className="flex items-center">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3`}></div>
              <span className="text-slate-700">{chart}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartCategoryCard;