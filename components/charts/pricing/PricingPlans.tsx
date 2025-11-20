'use client';

import { useContext } from 'react';
import { Store } from '../../../app/lib/store';
import PricingCard from './PricingCard';

interface PricingPlansProps {
  onUpgrade?: () => void;
}

export default function PricingPlans({ onUpgrade }: PricingPlansProps) {
  const {
    state: { userInfo },
  } = useContext(Store);

  const freePlanFeatures = [
    { text: 'Generate up to 20 charts' },
    { text: 'All chart types available' },
    { text: 'Google Sheets integration' },
    { text: 'Download charts as images' },
    { text: 'Basic support' },
  ];

  const unlimitedPlanFeatures = [
    { text: 'Unlimited chart generation', highlighted: true },
    { text: 'All chart types & features' },
    { text: 'Priority support' },
    { text: 'Advanced export options' },
    { text: 'Future updates included' },
    { text: 'Commercial use allowed' },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Free Plan */}
      <PricingCard
        title="Free Plan"
        price="$0"
        priceSubtext="/forever"
        description="Perfect to get started"
        features={freePlanFeatures}
        ctaText={!userInfo?.name ? 'Get Started Free' : 'Start Creating Charts'}
        ctaLink="/charts/chart-app"
      />

      {/* Unlimited Plan */}
      <PricingCard
        title="Unlimited Plan"
        price="$100"
        priceSubtext="/lifetime"
        description="One-time payment, unlimited forever"
        features={unlimitedPlanFeatures}
        ctaText={!userInfo?.name ? 'Sign Up & Upgrade' : 'Upgrade to Unlimited'}
        ctaLink={!userInfo?.name ? '/signup' : undefined}
        onCtaClick={userInfo?.name ? onUpgrade : undefined}
        isPopular={true}
        isPremium={true}
      />
    </div>
  );
}
