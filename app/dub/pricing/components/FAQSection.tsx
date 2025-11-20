import FAQItem from './FAQItem';

interface FAQSectionProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <div className="mt-16 text-center max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Frequently Asked Questions
      </h3>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem 
            key={index} 
            question={faq.question} 
            answer={faq.answer} 
          />
        ))}
      </div>
    </div>
  );
}