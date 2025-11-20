export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: 'Upload Video',
      description: 'Upload your video file',
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'Our AI analyzes the audio and generates transcriptions',
    },
    {
      number: 3,
      title: 'Voice Generation',
      description: 'Select voice options and generate the dubbed audio',
    },
    {
      number: 4,
      title: 'Email Delivery',
      description: 'Receive the dubbed video download link in your email',
    },
  ];

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        How It Works
      </h2>
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              {step.number}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
