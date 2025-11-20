import Link from 'next/link';
import { Button } from 'components/ui/button';

export default function HeroSection() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        AI Video Dubbing
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Transform your videos with intelligent AI dubbing. Upload any video and
        get professional-quality voiceovers in multiple languages.
      </p>
      <div className="flex justify-center gap-4 mb-12">
        <Link href="/dub/dub-app">
          <Button
            size="lg"
            className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
