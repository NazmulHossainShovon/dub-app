interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What happens after I reach the 20 chart limit on the free plan?',
    answer:
      "Once you've generated 20 charts, you'll need to upgrade to the unlimited plan to continue creating new charts. Your existing charts will remain accessible.",
  },
  {
    question: 'Is the $100 payment really a one-time fee?',
    answer:
      'Yes! You pay $100 once and get unlimited chart generation for life. No monthly fees, no hidden costs, no expiration date.',
  },
  {
    question: 'Can I use the charts commercially?',
    answer:
      'Charts created on the free plan are for personal use only. With the unlimited plan, you can use your charts for commercial purposes without any restrictions.',
  },
];

export default function FAQSection() {
  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
