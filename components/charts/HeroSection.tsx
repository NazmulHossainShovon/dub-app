'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../../components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Advanced Charts for{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Google Sheets
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your Google Sheets data into stunning 3D visualizations,
            statistical charts, and scientific plots that go far beyond
            what&apos;s possible in spreadsheets alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/charts/chart-app">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Start Creating Charts
              </Button>
            </Link>
            {/* <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
            >
              View Examples
            </Button> */}
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </div>
  );
};

export default HeroSection;
