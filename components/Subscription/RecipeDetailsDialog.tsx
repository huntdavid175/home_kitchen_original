"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  weight?: string;
  image: string;
}

export default function RecipeDetailsDialog({
  isOpen,
  showNutrition,
  setIsOpen,
  setShowNutrition,
}: {
  isOpen: boolean;
  showNutrition: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setShowNutrition: (showNutrition: boolean) => void;
}) {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [showNutrition, setShowNutrition] = useState(false);

  const ingredients: Ingredient[] = [
    {
      name: "Lime",
      amount: "1",
      unit: "pc",
      weight: "65g",
      image:
        "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/Ha68Y6PMxUiCilTsadcNro38kNUVh3gjIHwKVKiIqtk_98cd5aaf-6481-4328-a805-d33f3c5f8117_100x100_crop_center@2x.jpg?v=1738983825",
    },
    {
      name: "Lingbam sauce",
      amount: "1",
      unit: "cup",
      weight: "30g",
      image:
        "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/UggngN-DRKxuDXRDxHAMz7jLwfbhA_jfV19DSa2ow2o_d57455b9-ccb8-429e-b4b2-1a2257a339ce_100x100_crop_center@2x.jpg?v=1738983866",
    },
    {
      name: "Soy sauce",
      amount: "1",
      unit: "cup",
      weight: "40g",
      image:
        "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/GYkiWavsCYsvEQgXtaAhUCGeaq6C17SFJtqKU3pdRD0_a414f3b6-6078-4096-8fac-2cd069859a3b_100x100_crop_center@2x.jpg?v=1738168032",
    },
    {
      name: "Sesame seeds",
      amount: "1",
      unit: "pack",
      weight: "8g",
      image:
        "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/U9210c9rCb7KIEikEdVMKYRA050s656vl0rBJD0t6Eg_1703a29b-4fa9-4238-a42c-d105c396eeaa_100x100_crop_center@2x.jpg?v=1738172782",
    },
    {
      name: "Egg noodles",
      amount: "1",
      unit: "pack",
      weight: "120g",
      image:
        "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/Jwzq61U3tgVGOis8beD27N9Q7nNJEvZxOuAy-u_0g9w_100x100_crop_center@2x.jpg?v=1738168553",
    },
    {
      name: "Turkish beans",
      amount: "1",
      unit: "pack",
      weight: "100g",
      image:
        "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/fiT4d2YlSKFAwOEt_X69l7rdej__oSPbhXnU_36-p68_50d64e6a-e6fa-4900-8b76-7f2578174366_100x100_crop_center@2x.jpg?v=1738169710",
    },
    {
      name: "Sesame oil",
      amount: "1",
      unit: "cup",
      weight: "15g",
      image:
        "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/36EESJomlX2MBKhdijYx53E0zpsF9iQ1Hxw2n5JoVw_100x100_crop_center@2x.jpg?v=1738983831",
    },
    {
      name: "Chilli, fresh",
      amount: "0.5",
      unit: "pcs",
      weight: "7.5g",
      image:
        "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/iNSEy8itgPowsP_qfnX8xph7rI5yi7TE3letDCHXN3Q_7c882fb8-513e-4138-b2ef-cfd8b16471f0_100x100_crop_center@2x.jpg?v=1738983893",
    },
    {
      name: "Salmon fillet",
      amount: "1",
      unit: "pack of 2",
      weight: "280g",
      image:
        "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/l6TYY37Am6eK_RZBA9pCO2W_IbR8fFYTyI2SUBEz708_ff45c576-a34f-43de-b01a-30ea4b467731_100x100_crop_center@2x.jpg?v=1738168226",
    },
  ];

  //   const condiments = [
  //     { name: "Salt", amount: "-" },
  //     { name: "Black pepper", amount: "-" },
  //     { name: "Olive oil", amount: "-" },
  //   ];

  const recipeSteps = [
    {
      number: 1,
      image:
        "https://www.cleankitchen.ee/cdn/shop/files/ij2GrXD7XdhMLTJdpzNyP6YC46fdpLn1RbOxGT6oZ9k.jpg?v=1722218664&width=1200",
      description:
        "Preheat the oven to 200 degrees. Peel the potatoes and carrots and cut into 1 cm cubes. Season with olive oil and salt and place on a baking sheet lined with baking paper. Bake in the oven for 15-20 minutes, until the potatoes and carrots are cooked.",
    },
    {
      number: 2,
      image:
        "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
      description:
        "Meanwhile, dry the fish fillets with paper towels and season with salt and pepper.",
    },
    {
      number: 3,
      image:
        "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
      description:
        "Chop the parsley and garlic and mix with the panko, parmesan and oregano. Grate the lemon zest. Season with salt and pepper.",
    },
    {
      number: 4,
      image:
        "https://www.cleankitchen.ee/cdn/shop/files/ij2GrXD7XdhMLTJdpzNyP6YC46fdpLn1RbOxGT6oZ9k.jpg?v=1722218664&width=1200",
      description:
        "Place the fish fillets on top of the vegetables and cover with the herb mixture.",
    },
    {
      number: 5,
      image:
        "https://www.cleankitchen.ee/cdn/shop/files/a8C361u3tUAUD2xtCZdlA_zaIvtZyhfwv6TbO59A6cU.jpg?v=1722046023&width=1200",
      description:
        "Return to the oven and bake for another 10-12 minutes until the fish is cooked through and the topping is golden.",
    },
    {
      number: 6,
      image:
        "https://www.cleankitchen.ee/cdn/shop/files/PECHYKTxgiO1eQG0YrK-Niki4jCwmvX-wKifw60fOrM.jpg?v=1722823520&width=1200",
      description: "Serve immediately with a wedge of lemon.",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Open Recipe</Button>
      </DialogTrigger> */}
      <DialogContent className="max-w-7xl p-0 overflow-auto max-h-[90vh]">
        <DialogHeader className="p-6 pb-0 space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Fried salmon fillet with spicy sesame noodles
            </DialogTitle>
            {/* <button
              className="rounded-full p-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </button> */}
          </div>
        </DialogHeader>

        <div className="px-6 space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="https://www.cleankitchen.ee/cdn/shop/files/PECHYKTxgiO1eQG0YrK-Niki4jCwmvX-wKifw60fOrM.jpg?v=1722823520&width=1200"
              alt="Fried salmon fillet with spicy sesame noodles"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-sm text-gray-600">
            Tools: Cutting board, Knife, Pot, Pan
          </div>

          <p>
            A simple meal of juicy red fish fillet and spicy egg noodles with
            Turkish beans. You can control the spiciness of the food yourself!
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Ingredients for 2 servings
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={ingredient.image || "/placeholder.svg"}
                      alt={ingredient.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{ingredient.name}</div>
                    <div className="text-sm text-gray-600">
                      {ingredient.amount} {ingredient.unit}, {ingredient.weight}
                    </div>
                  </div>
                </div>
              ))}
              {/* {condiments.map((condiment) => (
                <div
                  key={condiment.name}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt={condiment.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{condiment.name}</div>
                    <div className="text-sm text-gray-600">
                      {condiment.amount}
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            For 4 servings, all quantities are doubled.
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Recipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipeSteps.map((step) => (
                <div key={step.number} className="space-y-4">
                  <div className="relative">
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                      <Image
                        src={step.image || "/placeholder.svg"}
                        alt={`Recipe step ${step.number}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-2 left-2 bg-white rounded-full w-8 h-8 flex items-center justify-center font-semibold shadow-md">
                      {step.number}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <button
              className="w-full py-3 border rounded-lg flex items-center justify-between px-4 hover:bg-gray-50"
              onClick={() => setShowNutrition(!showNutrition)}
            >
              <span className="font-medium">Nutritional value</span>
              <ChevronDown
                className={`h-5 w-5 transform transition-transform ${
                  showNutrition ? "rotate-180" : ""
                }`}
              />
            </button>
            {showNutrition && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p>Nutritional information would be displayed here.</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pb-4">
            <Badge variant="secondary">Fish and seafood</Badge>
            <Badge variant="secondary">Lactose-free</Badge>
            <Badge variant="secondary">Ready in up to 30 minutes</Badge>
            <Badge variant="secondary">Spicy</Badge>
          </div>

          <div className="text-sm text-gray-600 pb-6">
            Allergens: Peanuts, Sulphur dioxide and sulphites, Sesame seeds, Egg
            products, Gluten, Nut products, Soy protein, Fish products
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
