'use client';

import React from 'react';

interface Step {
  step: string;
  title: string;
  description: string;
}

interface HowItWorksStepProps {
  step: Step;
  index: number;
  isLast: boolean;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  step,
  index,
  isLast,
}) => {
  return (
    <div className="text-center group">
      <div className="relative mb-6">
        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
          {step.step}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3">
        {step.title}
      </h3>
      <p className="text-slate-600 leading-relaxed">{step.description}</p>
    </div>
  );
};

export default HowItWorksStep;
