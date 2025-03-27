"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RecipeCard from "@/components/Subscription/PurchaseRecipeCard";
import RecipeDetailsDialog from "./RecipeDetailsDialog";
import SubscriptionNav from "./SubscriptionNav";

const recipes = [
  {
    title: "Cream cheese stuffed pork tenderloin with baked beets",
    images: [
      "https://www.cleankitchen.ee/cdn/shop/files/a8C361u3tUAUD2xtCZdlA_zaIvtZyhfwv6TbO59A6cU.jpg?v=1722046023&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/ij2GrXD7XdhMLTJdpzNyP6YC46fdpLn1RbOxGT6oZ9k.jpg?v=1722218664&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
    ],
    price: 10.13,
    cookingTime: 35,
    tags: ["FAMILY FRIENDLY"],
  },
  {
    title: "Grilled salmon with asparagus and lemon butter sauce",
    images: [
      "https://www.cleankitchen.ee/cdn/shop/files/UzbT9ZKHKeqoB-_4b2zeZgSW-wsEtLwj4nqBcoHE_gI.jpg?v=1721743606&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/ij2GrXD7XdhMLTJdpzNyP6YC46fdpLn1RbOxGT6oZ9k.jpg?v=1722218664&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
    ],
    price: 12.5,
    cookingTime: 25,
    tags: ["HEALTHY", "GLUTEN-FREE"],
  },
  {
    title: "Vegetarian lasagna with roasted vegetables",
    images: [
      "https://www.cleankitchen.ee/cdn/shop/files/ij2GrXD7XdhMLTJdpzNyP6YC46fdpLn1RbOxGT6oZ9k.jpg?v=1722218664&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/PECHYKTxgiO1eQG0YrK-Niki4jCwmvX-wKifw60fOrM.jpg?v=1722823520&width=1200",
    ],
    price: 9.75,
    cookingTime: 45,
    tags: ["VEGETARIAN", "FAMILY FRIENDLY"],
  },
  {
    title: "Spicy chicken stir-fry with mixed vegetables",
    images: [
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/PECHYKTxgiO1eQG0YrK-Niki4jCwmvX-wKifw60fOrM.jpg?v=1722823520&width=1200",
    ],
    price: 11.25,
    cookingTime: 30,
    tags: ["SPICY", "QUICK"],
  },
  {
    title: "Spicy chicken stir-fry with mixed vegetables",
    images: [
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/PECHYKTxgiO1eQG0YrK-Niki4jCwmvX-wKifw60fOrM.jpg?v=1722823520&width=1200",
    ],
    price: 11.25,
    cookingTime: 30,
    tags: ["SPICY", "QUICK"],
  },
  {
    title: "Spicy chicken stir-fry with mixed vegetables",
    images: [
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
      "https://www.cleankitchen.ee/cdn/shop/files/PECHYKTxgiO1eQG0YrK-Niki4jCwmvX-wKifw60fOrM.jpg?v=1722823520&width=1200",
    ],
    price: 11.25,
    cookingTime: 30,
    tags: ["SPICY", "QUICK"],
  },
];

export default function PurchaseList() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  const filteredRecipes = selectedTag
    ? recipes.filter((recipe) => recipe.tags.includes(selectedTag))
    : recipes;

  const allTags = Array.from(new Set(recipes.flatMap((recipe) => recipe.tags)));

  const setOpenHandler = (open: boolean) => {
    setOpen(open);
  };

  const setShowNutritionHandler = (show: boolean) => {
    setShowNutrition(show);
  };

  return (
    <div className="min-h-screen py-2 px-4 sm:px-6 lg:px-8 pt-[140px]">
      <SubscriptionNav />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Our Recipes
        </h1> */}

        {/* Tag filter */}
        {/* <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </div> */}

        {/* Recipe grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <RecipeCard {...recipe} showDetails={setOpenHandler} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <RecipeDetailsDialog
        isOpen={open}
        setIsOpen={setOpenHandler}
        showNutrition={showNutrition}
        setShowNutrition={setShowNutritionHandler}
      />
    </div>
  );
}
