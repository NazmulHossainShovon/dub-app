import Link from 'next/link';
import CheckoutButton from 'components/CheckoutButton';

interface Feature {
  text: string;
  highlighted?: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  priceSubtext: string;
  description: string;
  features: Feature[];
  ctaText: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  isPopular?: boolean;
  isPremium?: boolean;
}

export default function PricingCard({
  title,
  price,
  priceSubtext,
  description,
  features,
  ctaText,
  ctaLink,
  onCtaClick,
  isPopular = false,
  isPremium = false,
}: PricingCardProps) {
  const cardClasses = isPremium
    ? 'bg-gradient-to-br from-blue-600 to-purple-700 text-white border-2 border-blue-500'
    : 'bg-white border-2 border-gray-200';

  const iconColor = isPremium ? 'text-yellow-300' : 'text-green-500';
  const textColor = isPremium ? 'text-white' : 'text-gray-700';

  const CtaButton = () => {
    const buttonClasses = isPremium
      ? 'w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
      : 'w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors';

    if (ctaLink) {
      return (
        <Link href={ctaLink} className={`${buttonClasses} text-center block`}>
          {ctaText}
        </Link>
      );
    }

    return (
      <button onClick={onCtaClick} className={buttonClasses}>
        {ctaText}
      </button>
    );
  };

  return (
    <div
      className={`${cardClasses} rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow relative`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="text-4xl font-bold mb-2">
          {price}
          <span
            className={`text-lg font-normal ${isPremium ? 'opacity-80' : 'text-gray-500'}`}
          >
            {priceSubtext}
          </span>
        </div>
        <p className={isPremium ? 'opacity-80' : 'text-gray-600'}>
          {description}
        </p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              className={`w-5 h-5 ${iconColor} mr-3`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span
              className={`${textColor} ${feature.highlighted ? 'font-semibold' : ''}`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {isPremium ? (
        <CheckoutButton
          priceId="pri_01kaf9be5f7hdmw3ssy34fy1q0"
          appName="chart"
        />
      ) : (
        <CtaButton />
      )}
    </div>
  );
}
