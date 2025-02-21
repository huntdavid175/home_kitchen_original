import {
  ClockIcon as ClockDome,
  ShoppingBasket,
  Files,
  Globe,
  PackageOpen,
} from "lucide-react";

export default function OurValues() {
  const values = [
    {
      icon: ClockDome,
      title: "Deliciousness",
      description:
        "Our culinary team creates our delicious recipes with customer feedback! They read EVERY comment, positive or negative, before they work their magic in the kitchen to create new recipes or bring back your favourites.",
    },
    {
      icon: ShoppingBasket,
      title: "Simplicity",
      description:
        "From delivering fresh ingredients paired with step-by-step recipes, to no-hassle account changes, we make your life easier every way we can.",
    },
    {
      icon: Files,
      title: "Flexibility",
      description:
        "We accommodate every appetite, household size, and schedule. Need to skip a week or cancel? No problem!",
    },
    {
      icon: Globe,
      title: "Something for everyone",
      description:
        "Picky appetites and alternate dietary lifestyles welcome! Tell us what you like and we'll help you find meals that work for you.",
    },
    {
      icon: PackageOpen,
      title: "Stress-free",
      description:
        "Take back your evenings with meal kit deliveries that mean fewer trips to the grocery store.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl text-center mb-12">Our Values</h2>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {values.slice(0, 3).map((value) => (
            <div key={value.title} className="text-center space-y-4">
              <div className="flex justify-center">
                <value.icon
                  className="w-16 h-16 text-green-800"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-medium">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {values.slice(3).map((value) => (
            <div key={value.title} className="text-center space-y-4">
              <div className="flex justify-center">
                <value.icon
                  className="w-16 h-16 text-green-800"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-xl font-medium">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
