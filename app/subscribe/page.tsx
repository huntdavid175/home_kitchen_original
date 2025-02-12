"use client";

import { useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion, AnimatePresence } from "framer-motion";
import SubscriptionCard from "@/components/Subscription/SubscriptionCard";

export default function Home() {
  const [peopleCount, setPeopleCount] = useState("2");

  const subscriptionPlans = [
    {
      frequency: "Weekly",
      meals: 3,
      servings: Number.parseInt(peopleCount),
      price: 160 * (Number.parseInt(peopleCount) / 2),
      features: [
        "Chicken and meat meals",
        "Protein up to 200 gm",
        "1 daily free snack",
      ],
      image:
        "https://freepngimg.com/save/139180-food-plate-fish-download-hd/792x797",
    },
    {
      frequency: "Weekly",
      meals: 7,
      servings: Number.parseInt(peopleCount),
      price: 460 * (Number.parseInt(peopleCount) / 2),
      features: [
        "Chicken and meat meals",
        "Protein up to 200 gm",
        "1 daily free snack",
      ],
      image:
        "https://freepngimg.com/save/139180-food-plate-fish-download-hd/792x797",
    },
    {
      frequency: "Monthly",
      meals: 28,
      servings: Number.parseInt(peopleCount),
      price: 1740 * (Number.parseInt(peopleCount) / 2),
      features: [
        "All meal varieties",
        "Protein up to 250 gm",
        "2 daily free snacks",
      ],
      image:
        "https://png.pngtree.com/png-clipart/20231019/original/pngtree-salmon-fillet-with-potato-and-vegetable-on-the-plate-png-image_13369543.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-center">
              How many people are eating?
            </h2>
            <ToggleGroup
              type="single"
              value={peopleCount}
              onValueChange={(value: any) => value && setPeopleCount(value)}
              className="justify-center"
            >
              {["1", "2", "4", "6"].map((count) => (
                <ToggleGroupItem
                  key={count}
                  value={count}
                  className="px-6 py-2 data-[state=on]:bg-teal-500 data-[state=on]:text-white"
                >
                  {count}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={peopleCount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {subscriptionPlans.map((plan, index) => (
                <SubscriptionCard
                  key={index}
                  frequency={plan.frequency}
                  meals={plan.meals}
                  servings={plan.servings}
                  price={Math.round(plan.price)}
                  features={plan.features}
                  image={plan.image}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
