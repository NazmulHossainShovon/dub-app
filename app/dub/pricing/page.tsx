import PlanCard from './components/PlanCard';
import FAQSection from './components/FAQSection';

export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Basic Plan',
      price: '$3',
      period: '',
      minutes: '15 minutes',
      description: 'Perfect for individuals getting started with video dubbing',
      features: [
        '15 minutes of video dubbing',
        'Access to standard voice options',
        'Download option',
      ],
      cta: 'Get Started',
      mostPopular: true,
    },
  ];

  const faqs = [
    {
      question: 'Do new users get a free trial?',
      answer:
        'Yes, every new user receives 20 seconds of free video dubbing time upon signing up. You can use this to try out our service with no cost.',
    },
    {
      question: 'What counts as a minute?',
      answer:
        'One minute refers to one minute of video content that you want dubbed. For example, if you have a 10-minute video, it will count as 10 minutes toward your plan.',
    },
    {
      question: 'Do I need a subscription?',
      answer:
        'No, we offer a simple pay-per-use model. You can purchase 15 minutes of dubbing time for $3 without any recurring subscription.',
    },
    {
      question: 'Do unused minutes expire?',
      answer:
        'No, your 15 minutes of dubbing time never expire. You can use them whenever you need them, with no time limits.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with our simple, straightforward plan. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PlanCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              minutes={plan.minutes}
              description={plan.description}
              features={plan.features}
              cta={plan.cta}
            />
          ))}
        </div>

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
