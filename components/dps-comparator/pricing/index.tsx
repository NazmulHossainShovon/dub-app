'use client';

import { useState } from 'react';
import Link from 'next/link';
import CheckoutButton from '../../../components/CheckoutButton';

export const PricingHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Choose Your Plan
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Unlock the full potential of the DPS Comparator with our premium
        features. Start with a free trial or get lifetime access today.
      </p>
    </div>
  );
};

export const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'annual'
  );

  const plans = [
    {
      name: 'Free Trial',
      price: '$0',
      period: '7 days free trial',
      description: 'Try all premium features with no limitations for 7 days',
      features: [
        'Access to all paid plan features',
        'No feature limitations',
        'Full functionality for 7 days',
      ],
      cta: 'Start Free Trial',
      featured: false,
      buttonStyle:
        'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
    },
    {
      name: 'Lifetime Access',
      price: '$50',
      period: 'one-time payment',
      description: 'Pay once, access forever',
      features: [
        'All premium features',
        'Unlimited build comparisons',
        'Advanced calculations',
        'Priority support',
        'Early access to new features',
        'Real-time updates',
      ],
      cta: 'Get Lifetime Access',
      featured: true,
      buttonStyle: 'bg-blue-600 text-white hover:bg-blue-700',
    },
  ];

  return (
    <div className="mb-20">
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl p-8 shadow-lg ${
              plan.featured
                ? 'ring-2 ring-blue-600 bg-gradient-to-b from-blue-50 to-white transform scale-105'
                : 'bg-white'
            }`}
          >
            {plan.featured && (
              <div className="text-center mb-6">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Most Popular
                </span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {plan.name}
            </h2>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-900">
                {plan.price}
              </span>
              <span className="text-gray-600"> {plan.period}</span>
              <p className="text-gray-600 mt-2">{plan.description}</p>
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            {plan.name === 'Lifetime Access' ? (
              <CheckoutButton
                priceId="pri_01kaf98db9esez9zd60k822pzg"
                appName="dps-comparator"
              />
            ) : (
              <Link
                href="/dps-comparator/app"
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition duration-300 ${plan.buttonStyle}`}
              >
                {plan.cta}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const FAQSection = () => {
  const faqs = [
    {
      question: 'How long is the free trial?',
      answer:
        'The free trial gives you access to all premium features for 7 days at no cost.',
    },
    {
      question: 'What is lifetime access?',
      answer:
        'Lifetime access is a one-time payment that gives you unlimited access to all premium features forever.',
    },
    {
      question: 'Can I upgrade after the free trial?',
      answer:
        'Yes, after your 7-day trial, you can choose to upgrade to the lifetime access plan.',
    },
    {
      question: 'Is there a refund policy?',
      answer:
        'Due to the lifetime nature of the purchase, refunds are not available after the free trial period ends.',
    },
    {
      question: 'Do I need to create an account?',
      answer:
        'Yes, you need an account to access the premium features and to keep track of your builds.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto mb-20">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {faq.question}
            </h3>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PricingCTA = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Ready to Optimize Your DPS?
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Join thousands of players who use our DPS Comparator to enhance their
        Blox Fruits gameplay.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/dps-comparator/app"
          className="inline-block bg-white text-blue-600 border-2 border-blue-600 py-4 px-8 rounded-lg font-bold text-lg hover:bg-blue-50 transition duration-300"
        >
          Start Free Trial
        </Link>
        <CheckoutButton
          priceId="pri_01k9770ec4netjw3pz6m4zey9y"
          appName="dps-comparator"
        />
      </div>
    </div>
  );
};
