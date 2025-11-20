'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

const CTASection = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Data?
        </h2>
        <p className="text-xl text-slate-200 mb-8 leading-relaxed">
          Stop limiting yourself to basic charts. Create professional,
          interactive visualizations that tell your data&apos;s story like never
          before.
        </p>
        <Link href="/charts/chart-app">
          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-4 text-xl font-semibold rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Creating Now
          </Button>
        </Link>
      </div>

      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl"></div>
    </div>
  );
};

export default CTASection;
