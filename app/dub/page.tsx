import HeroSection from 'components/dub-landing/HeroSection';
import FeaturesSection from 'components/dub-landing/FeaturesSection';
import HowItWorksSection from 'components/dub-landing/HowItWorksSection';
import CallToActionSection from 'components/dub-landing/CallToActionSection';

export default function DubLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CallToActionSection />
      </div>
    </div>
  );
}
