import CheckoutButton from 'components/CheckoutButton';

interface PlanProps {
  name: string;
  price: string;
  period: string;
  minutes: string;
  description: string;
  features: string[];
  cta: string;
}

export default function PlanCard({ 
  name, 
  price, 
  period, 
  minutes, 
  description, 
  features, 
  cta
}: PlanProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {name}
        </h2>
        <div className="mb-4">
          <span className="text-4xl font-extrabold text-gray-900">
            {price}
          </span>
          <span className="text-gray-600"> {period}</span>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>

        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
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

        <CheckoutButton priceId="pri_01k611462xk2zy6240fghhves7" appName="dub" />
      </div>
    </div>
  );
}