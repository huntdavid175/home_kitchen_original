import { ChevronRight } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "Are there any commitments?",
      answer:
        "Nope. You can skip your weekly delivery or cancel at any time. Just be sure to do so by 11:59 PM PST, 4 days prior to your scheduled delivery. (Please note: your delivery day may be pushed back over long weekends or on statutory holidays, but your order deadline will remain the same.)",
    },
    {
      question: "Can I select my meals?",
      answer: "Yes! Customers can choose their meals every week.",
    },
    {
      question: "What if I'm not home to accept my delivery?",
      answer:
        "Delivery times are from 8 am to 8 pm on the day you choose. If you're not home, don't worry! You can always add special delivery instructions to your account. You can also change your delivery day online up to: 4 days in advance of your scheduled delivery at 11:59 PM PST. (Please note: your delivery day may be pushed back over long weekends or on statutory holidays, but your order deadline will remain the same.)",
    },
    {
      question: "How will my food stay cool?",
      answer:
        "We carefully hand pack all ingredients with special ice packs and insulation, so your food keeps cool until you get home.",
    },
  ];

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
            <p className="text-muted-foreground ml-8">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
