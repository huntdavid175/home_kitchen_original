import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MealsShippedSection() {
  const features = [
    {
      image:
        "https://media.blueapron.com/assets/registration/homepage/chef-experience.webp?height=374&quality=90",
      title: "5 decades of top restaurant experience",
      description: "Our chefs bring high standards to crafting your meals.",
    },
    {
      image:
        "https://media.blueapron.com/pricing/howitworks/unpack_your_box.jpg?height=374&quality=90",
      title: "Fresher ingredients faster",
      description: "80% of ingredients come directly from producers.",
    },
    {
      image:
        "https://media.blueapron.com/pricing/howitworks/choose_your_meals.jpg?height=374&quality=90",
      title: "You're busy, so we're flexible",
      description:
        "Get boxes on your schedule. Skip, pause, or cancel anytime.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-700">
          530+ million meals shipped
        </h2>
        <p className="text-lg text-muted-foreground">
          See why home cooks stick with our special meal kit.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="text-center space-y-4">
            <div className="h-[280px] w-full relative mb-6">
              <Image
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-black">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center space-y-6">
        <p className="text-lg">
          Get started for as little as{" "}
          <span className="font-semibold">$7.99 per serving</span>
        </p>
        <Button className="bg-teal-700 hover:bg-teal-900 text-white px-8 py-5 text-sm rounded-md">
          SEE PLANS
        </Button>
      </div>
    </div>
  );
}
