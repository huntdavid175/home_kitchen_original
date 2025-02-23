import { ChevronRight } from "lucide-react";

export default function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-3xl text-center mb-16">Frequently Asked Questions</h2>

      <div className="max-w-3xl mx-auto space-y-12">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-start gap-2">
              <ChevronRight className="h-6 w-6 mt-0.5 flex-shrink-0" />
              <h3 className="text-base font-semibold">{faq.question}</h3>
            </div>
            <p className="text-gray-600 ml-8">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
