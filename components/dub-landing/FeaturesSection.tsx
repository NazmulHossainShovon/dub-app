export default function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Voices",
      description: "Advanced AI technology creates natural-sounding voiceovers that match your content perfectly.",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      bgColor: "bg-blue-100"
    },
    {
      title: "Multiple Languages",
      description: "Support for dozens of languages and accents to reach global audiences.",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z" />
        </svg>
      ),
      bgColor: "bg-green-100"
    },
    {
      title: "Fast Processing",
      description: "Quick turnaround times with cloud-based processing for efficient video dubbing.",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}