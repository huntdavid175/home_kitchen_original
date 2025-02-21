import FAQSection from "@/components/HowItWorks/FAQSection";
import HowItWorksSteps from "@/components/HowItWorks/HowItWorksSteps";
import OurValues from "@/components/HowItWorks/OurValues";

export default function page() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl  lg:text-3xl font-medium text-center">
          How House Kitchen Works
        </h1>

        <h2 className="text-lg lg:text-xl text-center text-muted-foreground">
          Food Delivery Subscription with Fresh Meals and Recipes to Your Door
        </h2>

        <div className="relative aspect-video w-full mt-8">
          <iframe
            className="absolute inset-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/1N6hbRbyAeQ"
            title="How House Kitchen Works | Food Delivery Subscription with Fresh Meals & Recipes"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      <HowItWorksSteps />
      <OurValues />
      <FAQSection />
    </div>
  );
}
