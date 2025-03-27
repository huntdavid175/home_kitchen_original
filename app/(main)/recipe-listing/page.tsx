"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  time: string;
  calories: number;
}

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Sesame honey chicken with rice",
    description:
      "Sesame honey chicken is a mouth-watering dish from American-Chinese cuisine.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/a8C361u3tUAUD2xtCZdlA_zaIvtZyhfwv6TbO59A6cU.jpg?v=1722046023&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "35 minutes",
    calories: 641,
  },
  {
    id: "2",
    title: "Baoburgers with chicken kebab and curry-mango sauce",
    description:
      "Steamed bao buns are also great for burger buns. This time, a burger recipe with steamed buns, chicken, and curry-mango sauce.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/UzbT9ZKHKeqoB-_4b2zeZgSW-wsEtLwj4nqBcoHE_gI.jpg?v=1721743606&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "20 minutes",
    calories: 682,
  },
  {
    id: "3",
    title: "Crispy chicken in sweet and sour sauce served with rice",
    description:
      "Sweet and sour chicken, a favorite of many, is a dish that probably doesn't need much introduction. The rich sweet and sour sauce makes pre-stir-fried chicken simply irresistible. Favorites are created for a reason. It goes without saying that the result is definitely best when made at home and served fresh.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/ij2GrXD7XdhMLTJdpzNyP6YC46fdpLn1RbOxGT6oZ9k.jpg?v=1722218664&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "35 minutes",
    calories: 508,
  },
  {
    id: "4",
    title: "Chicken schnitzel with baked potatoes",
    description:
      "Classic chicken schnitzel served with baked potatoes and fresh salad.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "40 minutes",
    calories: 720,
  },
  {
    id: "5",
    title: "Chicken lo mein with noodles",
    description:
      "A delicious stir-fried noodle dish with tender chicken and vegetables.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/C_UQBXrDnEhfXMR6t5Ay7WB9zhPm5sa4qfyTUMvNqi4.jpg?v=1738721018&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "25 minutes",
    calories: 550,
  },
  {
    id: "6",
    title: "Beef steak with mashed potatoes",
    description:
      "Perfectly cooked beef steak served with creamy mashed potatoes.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/PECHYKTxgiO1eQG0YrK-Niki4jCwmvX-wKifw60fOrM.jpg?v=1722823520&width=1200",
    categories: ["Meat", "Recipes"],
    time: "30 minutes",
    calories: 850,
  },
];

const categories = [
  "Premium",
  "Fish and shellfish",
  "Meat",
  "Chicken",
  "Vegetarian food",
  "Vegan",
  "Quick to prepare",
  "Family friendly",
  "Gluten-free",
  "Lactose-free",
  "Dessert",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function RecipeListingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h1 className="text-xl font-bold mb-6">RECIPES</h1>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href="#"
                    className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-white hover:text-[#6D1D3A] rounded-lg transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-between px-4 py-6 h-auto text-base"
                >
                  <span className="font-semibold text-base">RECIPES</span>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <ScrollArea className="h-full py-4 -mx-6">
                  <div className="px-6">
                    <h2 className="text-xl font-bold mb-6">Categories</h2>
                    <nav className="space-y-1">
                      {categories.map((category) => (
                        <Link
                          key={category}
                          href="#"
                          className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {category}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>

          {/* Recipe Grid */}
          <div className="flex-1">
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {recipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  variants={itemVariants}
                  className="flex"
                >
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {recipe.categories.map((category) => (
                          <span
                            key={category}
                            className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-sm sm:text-base font-semibold mb-2 line-clamp-2 group-hover:text-[#6D1D3A] transition-colors">
                        {recipe.title}
                      </h2>
                      <p className="text-gray-600 text-xs mb-4 line-clamp-2 flex-grow">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">{recipe.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Flame className="w-4 h-4" />
                          <span className="text-xs">
                            {recipe.calories} kcal
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
