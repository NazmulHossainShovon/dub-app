'use client';

import { useContext } from 'react';
import { Store } from '../../../app/lib/store';
import Link from 'next/link';

interface PricingCTAProps {
  onUpgrade?: () => void;
}

export default function PricingCTA({ onUpgrade }: PricingCTAProps) {
  const {
    state: { userInfo },
  } = useContext(Store);

  return (
    <div className="mt-20 text-center bg-gray-900 rounded-2xl p-12">
      <h2 className="text-3xl font-bold text-white mb-4">
        Ready to Create Unlimited Charts?
      </h2>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Join thousands of users who have upgraded to unlimited chart generation.
        Start creating professional visualizations today.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/charts/chart-app"
          className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Try Free First
        </Link>
      </div>
    </div>
  );
}
