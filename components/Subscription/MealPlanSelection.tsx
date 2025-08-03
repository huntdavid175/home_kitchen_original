"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressBar from "./progressBar";
import BrowseMenuCTA from "./BrowseMenuCTA";
import { useAtom } from "jotai";
import { mealPlanAtom } from "@/store/atoms";

const PRICE_PER_SERVING = 11.49;
const SHIPPING_COST = 10.99;
const DISCOUNT_PERCENTAGE = 0.5;

export default function MealPlanSelection({
  handlePlanSelect,
}: {
  handlePlanSelect: any;
}) {
  const [mealPlan, setMealPlan] = useAtom(mealPlanAtom);
  const [discount, setDiscount] = useState(true);

  useEffect(() => {
    console.log("MealPlanSelection - Current meal plan:", mealPlan);
  }, [mealPlan]);

  useEffect(() => {
    const totalServings = mealPlan.people * mealPlan.mealsPerWeek;
    const originalBoxPrice = totalServings * PRICE_PER_SERVING;
    const discountedBoxPrice = originalBoxPrice * (1 - DISCOUNT_PERCENTAGE);
    const discountedPricePerServing = discountedBoxPrice / totalServings;
    const firstBoxTotal = discountedBoxPrice + SHIPPING_COST;
    const discount = originalBoxPrice - discountedBoxPrice + SHIPPING_COST;

    console.log("Calculating prices:", {
      totalServings,
      originalBoxPrice,
      discountedBoxPrice,
      discountedPricePerServing,
      firstBoxTotal,
      discount,
    });

    setMealPlan((prev) => ({
      ...prev,
      prices: {
        boxPrice: discountedBoxPrice,
        pricePerServing: discountedPricePerServing,
        firstBoxTotal: firstBoxTotal,
        discount: discount,
      },
    }));
  }, [mealPlan.people, mealPlan.mealsPerWeek]);

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Steps */}
      <ProgressBar progress={1} />

      {/* Savings Alert */}
      {discount && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-[#e4f6d1]">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#067a46]">
              <Tag size={20} />
              <span>You&apos;ll save ₵211 in total.</span>
            </div>
            <button
              type="button"
              onClick={() => setDiscount(!discount)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-12 mt-[152px] shadow-lg mb-12">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-medium text-center mb-4">
            How many meals do you need?
          </h1>
          <p className="text-center text-gray-600 mb-8 text-medium">
            Select the number of people and meals for this week&apos;s delivery.
          </p>

          {/* Selection Controls */}
          <div className="space-y-8 mb-8">
            <div className="space-y-2">
              <label className="font-medium text-sm flex items-center gap-2">
                <span className="text-blue-600">👥</span>
                Number of people
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() =>
                      setMealPlan((prev) => ({ ...prev, people: num }))
                    }
                    className={`py-3 border-2 text-sm transition-colors ${
                      mealPlan.people === num
                        ? "border-[#067a46] bg-[#067a46] font-bold text-white"
                        : "border-gray-200 hover:border-[#067a46] hover:bg-[#f8faf6]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-sm flex items-center gap-2">
                <span className="text-green-600">🍽️</span>
                Meals per week
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() =>
                      setMealPlan((prev) => ({ ...prev, mealsPerWeek: num }))
                    }
                    className={`py-3 border-2 text-sm transition-colors ${
                      mealPlan.mealsPerWeek === num
                        ? "border-[#067a46] bg-[#067a46] font-bold text-white"
                        : "border-gray-200 hover:border-[#067a46] hover:bg-[#f8faf6]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          {mealPlan.people > 0 && mealPlan.mealsPerWeek > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-2">
                  {mealPlan.mealsPerWeek}{" "}
                  {mealPlan.mealsPerWeek === 1 ? "meal" : "meals"} for{" "}
                  {mealPlan.people}{" "}
                  {mealPlan.people === 1 ? "person" : "people"}
                </div>
                <div className="text-sm text-gray-600">
                  {mealPlan.mealsPerWeek * mealPlan.people} total servings this
                  week
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Button
              className="w-full py-6 text-base bg-[#067a46] hover:bg-[#056835] rounded-none"
              onClick={() =>
                handlePlanSelect({
                  people: mealPlan.people,
                  mealsPerWeek: mealPlan.mealsPerWeek,
                  total: mealPlan.prices.firstBoxTotal,
                })
              }
            >
              Continue to menu selection
            </Button>
          </div>
        </div>
      </main>
      <div className="w-full flex justify-center px-4 ">
        <BrowseMenuCTA />
      </div>
    </div>
  );
}
