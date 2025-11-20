interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h4 className="font-semibold text-lg text-gray-900 mb-2">
        {question}
      </h4>
      <p className="text-gray-600">
        {answer}
      </p>
    </div>
  );
}