import Link from 'next/link';
import { Button } from 'components/ui/button';

export default function CallToActionSection() {
  return (
    <div className="mt-20 text-center bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Ready to Transform Your Videos?
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        Join thousands of creators who trust our AI dubbing technology
      </p>
      <Link href="/dub/dub-app">
        <Button
          size="lg"
          className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
        >
          Start Dubbing Now
        </Button>
      </Link>
    </div>
  );
}
