'use client';

import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="group p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">
        {feature.title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;