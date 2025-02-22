"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

interface Recipe {
  title: string;
  image: string;
  prepTime?: string;
  servings?: number;
  description?: string;
  ingredients?: Array<{
    name: string;
    amount: string;
  }>;
  steps?: Array<{
    text: string;
    image: string;
  }>;
}

import { useRouter } from "next/navigation";
import MidSection from "@/components/Landing/MidSection";
import StatsSection from "@/components/Landing/StatsSection";
import HeroSection from "@/components/Landing/HeroSection";
import Testimonial from "@/components/Landing/Testimonial";
import MealsShippedSection from "@/components/Landing/MealsShippedSection";

function App() {
  const router = useRouter();

  const recipes: Recipe[] = [
    {
      title: "Beef burger with caramelized onions and BBQ sauce",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800",
      prepTime: "30 minutes",
      servings: 2,
      description:
        "A delicious burger that takes just 30 minutes to prepare! Perfect for a quick and tasty dinner.",
      ingredients: [
        { name: "Ground beef", amount: "400g" },
        { name: "Onions", amount: "2 medium" },
        { name: "BBQ sauce", amount: "4 tbsp" },
        { name: "Burger buns", amount: "2" },
        { name: "Salt", amount: "to taste" },
        { name: "Black pepper", amount: "to taste" },
      ],
      steps: [
        {
          text: "Slice the onions thinly and caramelize in a pan over medium heat for 15-20 minutes.",
          image:
            "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Form the beef into patties and season with salt and pepper.",
          image:
            "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Cook the burgers to desired doneness and assemble with the caramelized onions and BBQ sauce.",
          image:
            "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Lentil soup with coconut milk",
      image:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
      prepTime: "45 minutes",
      servings: 4,
      description:
        "A warming, creamy lentil soup with a touch of coconut milk. Perfect for cold evenings!",
      ingredients: [
        { name: "Red lentils", amount: "300g" },
        { name: "Coconut milk", amount: "400ml" },
        { name: "Onion", amount: "1 large" },
        { name: "Garlic", amount: "3 cloves" },
        { name: "Vegetable stock", amount: "1L" },
      ],
      steps: [
        {
          text: "Dice onions and garlic, sauté until translucent.",
          image:
            "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Add lentils and stock, simmer for 20 minutes.",
          image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Stir in coconut milk and season to taste.",
          image:
            "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Smoked salmon risotto with arugula",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
      prepTime: "40 minutes",
      servings: 2,
      description:
        "Creamy risotto with smoked salmon and fresh arugula. A sophisticated dinner option.",
      ingredients: [
        { name: "Arborio rice", amount: "200g" },
        { name: "Smoked salmon", amount: "150g" },
        { name: "Arugula", amount: "100g" },
        { name: "White wine", amount: "100ml" },
        { name: "Parmesan", amount: "50g" },
      ],
      steps: [
        {
          text: "Toast rice in butter until translucent.",
          image:
            "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Gradually add stock, stirring constantly.",
          image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Fold in salmon and arugula at the end.",
          image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Meatballs with garlic mashed potatoes",
      image:
        "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800",
      prepTime: "50 minutes",
      servings: 4,
      description:
        "Classic meatballs served with creamy garlic mashed potatoes. Pure comfort food!",
      ingredients: [
        { name: "Ground meat mix", amount: "500g" },
        { name: "Potatoes", amount: "800g" },
        { name: "Garlic", amount: "4 cloves" },
        { name: "Milk", amount: "200ml" },
        { name: "Butter", amount: "100g" },
      ],
      steps: [
        {
          text: "Form and fry the meatballs until golden brown.",
          image:
            "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Boil potatoes until tender, then mash with garlic, milk, and butter.",
          image:
            "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Serve meatballs over mashed potatoes.",
          image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Korean tacos with tofu and kimchi",
      image:
        "https://images.unsplash.com/photo-1562059390-a761a084768e?auto=format&fit=crop&q=80&w=800",
      prepTime: "35 minutes",
      servings: 3,
      description:
        "Fusion tacos with crispy tofu and spicy kimchi. A vegetarian twist on Korean flavors.",
      ingredients: [
        { name: "Firm tofu", amount: "400g" },
        { name: "Kimchi", amount: "200g" },
        { name: "Corn tortillas", amount: "9 pieces" },
        { name: "Gochujang", amount: "2 tbsp" },
        { name: "Sesame oil", amount: "2 tbsp" },
      ],
      steps: [
        {
          text: "Press and cube tofu, then fry until crispy.",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Warm tortillas and prepare toppings.",
          image:
            "https://images.unsplash.com/photo-1464219222984-216ebffaaf85?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Assemble tacos with tofu, kimchi, and sauce.",
          image:
            "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Steamed salmon with couscous",
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
      prepTime: "25 minutes",
      servings: 2,
      description:
        "Light and healthy steamed salmon served with fluffy couscous and vegetables.",
      ingredients: [
        { name: "Salmon fillets", amount: "2 pieces" },
        { name: "Couscous", amount: "200g" },
        { name: "Mixed vegetables", amount: "300g" },
        { name: "Lemon", amount: "1" },
        { name: "Fresh herbs", amount: "1 bunch" },
      ],
      steps: [
        {
          text: "Steam salmon with lemon and herbs.",
          image:
            "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Prepare couscous according to package instructions.",
          image:
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Serve salmon over couscous with steamed vegetables.",
          image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Korean tacos with tofu and kimchi",
      image:
        "https://images.unsplash.com/photo-1562059390-a761a084768e?auto=format&fit=crop&q=80&w=800",
      prepTime: "35 minutes",
      servings: 3,
      description:
        "Fusion tacos with crispy tofu and spicy kimchi. A vegetarian twist on Korean flavors.",
      ingredients: [
        { name: "Firm tofu", amount: "400g" },
        { name: "Kimchi", amount: "200g" },
        { name: "Corn tortillas", amount: "9 pieces" },
        { name: "Gochujang", amount: "2 tbsp" },
        { name: "Sesame oil", amount: "2 tbsp" },
      ],
      steps: [
        {
          text: "Press and cube tofu, then fry until crispy.",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Warm tortillas and prepare toppings.",
          image:
            "https://images.unsplash.com/photo-1464219222984-216ebffaaf85?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Assemble tacos with tofu, kimchi, and sauce.",
          image:
            "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
    {
      title: "Korean tacos with tofu and kimchi",
      image:
        "https://images.unsplash.com/photo-1562059390-a761a084768e?auto=format&fit=crop&q=80&w=800",
      prepTime: "35 minutes",
      servings: 3,
      description:
        "Fusion tacos with crispy tofu and spicy kimchi. A vegetarian twist on Korean flavors.",
      ingredients: [
        { name: "Firm tofu", amount: "400g" },
        { name: "Kimchi", amount: "200g" },
        { name: "Corn tortillas", amount: "9 pieces" },
        { name: "Gochujang", amount: "2 tbsp" },
        { name: "Sesame oil", amount: "2 tbsp" },
      ],
      steps: [
        {
          text: "Press and cube tofu, then fry until crispy.",
          image:
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Warm tortillas and prepare toppings.",
          image:
            "https://images.unsplash.com/photo-1464219222984-216ebffaaf85?auto=format&fit=crop&q=80&w=400",
        },
        {
          text: "Assemble tacos with tofu, kimchi, and sauce.",
          image:
            "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=400",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <HeroSection /> */}

      <MidSection />

      {/* Weekly Recipes */}
      <div className="max-w-7xl  md:mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {/* This Week&apos;s Menu */}
            Week of February 24th
          </h2>
          <button className="text-teal-700 hover:text-teal-800">
            View all recipes →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => router.push(`/recipe-details`)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {recipe.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <MealsShippedSection />

      {/* Testimonials */}
      <Testimonial />

      {/* Newsletter */}
      <div className="max-w-7xl mx-6 md:mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Get weekly recipes and exclusive offers delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
