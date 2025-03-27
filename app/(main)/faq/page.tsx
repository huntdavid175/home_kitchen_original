import { additionalFaqs, originalFaqs } from "@/components/HowItWorks/faqData";
import FAQSection from "@/components/HowItWorks/FAQSection";

export default function page() {
  
  const faqs = [...originalFaqs, ...additionalFaqs];
  
  return (
    <div className="container mx-auto px-4 ">
      
      <FAQSection faqs={faqs} />
    </div>
  );
}
