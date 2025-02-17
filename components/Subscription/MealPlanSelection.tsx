"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PRICE_PER_SERVING = 11.49;
const SHIPPING_COST = 10.99;
const DISCOUNT_PERCENTAGE = 0.5;

export default function MealPlanSelection({
  handlePlanSelect,
}: {
  handlePlanSelect: any;
}) {
  const [people, setPeople] = useState(4);
  const [mealsPerWeek, setMealsPerWeek] = useState(3);
  const [prices, setPrices] = useState({
    boxPrice: 0,
    pricePerServing: 0,
    firstBoxTotal: 0,
    discount: 0,
  });

  useEffect(() => {
    const totalServings = people * mealsPerWeek;
    const originalBoxPrice = totalServings * PRICE_PER_SERVING;
    const discountedBoxPrice = originalBoxPrice * (1 - DISCOUNT_PERCENTAGE);
    const discountedPricePerServing = discountedBoxPrice / totalServings;
    const firstBoxTotal = discountedBoxPrice + SHIPPING_COST;
    const discount = originalBoxPrice - discountedBoxPrice + SHIPPING_COST;

    setPrices({
      boxPrice: discountedBoxPrice,
      pricePerServing: discountedPricePerServing,
      firstBoxTotal: firstBoxTotal,
      discount: discount,
    });
  }, [people, mealsPerWeek]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Image
            src="/placeholder.svg?height=32&width=120"
            alt="Hello Fresh"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-bold">Get $211 Off</div>
              <div className="text-sm text-gray-600">
                Pause or cancel anytime
              </div>
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c92020] text-white text-xs flex items-center justify-center">
                  2
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="fixed top-16 left-0 right-0 z-20 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[#067a46] text-white flex items-center justify-center text-xs mb-1">
                1
              </div>
              <span className="text-xs font-medium text-[#067a46]">
                Select Plan
              </span>
            </div>
            <div className="flex-1 mx-2 self-start mt-3">
              <div className="h-[2px] bg-gray-200">
                <div className="w-0 h-full bg-[#067a46]" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center text-xs mb-1">
                2
              </div>
              <span className="text-xs text-gray-400">Register</span>
            </div>
            <div className="flex-1 mx-2 self-start mt-3">
              <div className="h-[2px] bg-gray-200" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center text-xs mb-1">
                3
              </div>
              <span className="text-xs text-gray-400">Address</span>
            </div>
            <div className="flex-1 mx-2 self-start mt-3">
              <div className="h-[2px] bg-gray-200" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center text-xs mb-1">
                4
              </div>
              <span className="text-xs text-gray-400">Checkout</span>
            </div>
            <div className="flex-1 mx-2 self-start mt-3">
              <div className="h-[2px] bg-gray-200" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full border-2 border-gray-200 text-gray-400 flex items-center justify-center text-xs mb-1">
                5
              </div>
              <span className="text-xs text-gray-400">Select Meals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Alert */}
      <div className="fixed top-[134px] left-0 right-0 z-30 bg-[#e4f6d1]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#067a46]">
            <Tag size={20} />
            <span>You'll save $211 in total.</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-12 mt-[152px] shadow-lg mb-12">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl font-medium text-center mb-4">
            Choose your plan size
          </h1>
          <p className="text-center text-gray-600 mb-8">
            We'll set this as your default size, but you can always change it
            from week to week.
          </p>

          {/* Selection Controls */}
          <div className="space-y-8 mb-8">
            <div className="space-y-2">
              <label className="font-medium">Number of people</label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPeople(num)}
                    className={`py-3 border-2 rounded-lg ${
                      people === num
                        ? "border-[#067a46] bg-[#f8faf6] font-medium text-[#067a46]"
                        : "hover:border-[#067a46] hover:bg-[#f8faf6]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Meals per week</label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setMealsPerWeek(num)}
                    className={`py-3 border-2 rounded-lg ${
                      mealsPerWeek === num
                        ? "border-[#067a46] bg-[#f8faf6] font-medium text-[#067a46]"
                        : "hover:border-[#067a46] hover:bg-[#f8faf6]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <h2 className="font-bold text-xl">Price Summary</h2>
            <div className="space-y-2">
              <div>
                {mealsPerWeek} meals for {people} people per week
              </div>
              <div className="text-gray-600">
                {mealsPerWeek * people} total servings
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Box price</span>
                <span className="font-medium">
                  ${prices.boxPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Price per serving</span>
                <div className="text-right">
                  <span className="line-through text-gray-400 mr-2">
                    ${PRICE_PER_SERVING.toFixed(2)}
                  </span>
                  <span className="text-[#c92020] font-medium">
                    ${prices.pricePerServing.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <div className="text-right">
                  <span className="line-through text-gray-400 mr-2">
                    ${SHIPPING_COST.toFixed(2)}
                  </span>
                  <span className="text-[#c92020] font-medium">FREE</span>
                </div>
              </div>
              <div className="bg-gray-100 -mx-6 px-6 py-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">First box total</span>
                  <div className="text-right">
                    <div className="inline-block bg-[#c92020] text-white text-sm px-2 py-0.5 rounded mb-1">
                      ${prices.discount.toFixed(2)} off
                    </div>
                    <div>
                      <span className="line-through text-gray-400 mr-2">
                        ${(prices.boxPrice + SHIPPING_COST).toFixed(2)}
                      </span>
                      <span className="text-[#c92020] font-bold text-xl">
                        ${prices.firstBoxTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              className="w-full py-6 text-lg bg-[#067a46] hover:bg-[#056835]"
              onClick={() =>
                handlePlanSelect({
                  id: "2",
                  title: "Baoburgers with chicken kebab and curry-mango sauce",
                  description:
                    "Steamed bao buns are also great for burger buns. This time, a burger recipe with steamed buns, chicken, and curry-mango sauce.",
                  image:
                    "https://www.cleankitchen.ee/cdn/shop/files/UzbT9ZKHKeqoB-_4b2zeZgSW-wsEtLwj4nqBcoHE_gI.jpg?v=1721743606&width=1200",
                  categories: ["Poultry", "Recipes"],
                  time: "20 minutes",
                  calories: 682,
                })
              }
            >
              Select this plan
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
