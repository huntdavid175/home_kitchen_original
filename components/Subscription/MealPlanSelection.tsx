"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressBar from "./progressBar";
import BrowseMenuCTA from "./BrowseMenuCTA";

const PRICE_PER_SERVING = 11.49;
const SHIPPING_COST = 10.99;
const DISCOUNT_PERCENTAGE = 0.5;

export default function MealPlanSelection({
  handlePlanSelect,
}: {
  handlePlanSelect: any;
}) {
  const [people, setPeople] = useState(4);
  const [discount, setDiscount] = useState(true);
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
            Choose your plan size
          </h1>
          <p className="text-center text-gray-600 mb-8 text-medium">
            We&apos;ll set this as your default size, but you can always change
            it from week to week.
          </p>

          {/* Selection Controls */}
          <div className="space-y-8 mb-8">
            <div className="space-y-2">
              <label className="font-medium text-sm">Number of people</label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPeople(num)}
                    className={`py-3 border-2 rounded-lg text-sm ${
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
              <label className="font-medium text-sm">Meals per week</label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setMealsPerWeek(num)}
                    className={`py-3 border-2 rounded-lg text-sm ${
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
            <h2 className="font-bold text-lg">Price Summary</h2>
            <div className="space-y-2">
              <div className="text-sm">
                {mealsPerWeek} meals for {people} people per week
              </div>
              <div className="text-gray-600 text-sm">
                {mealsPerWeek * people} total servings
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Box price</span>
                <span className="font-medium text-sm">
                  ₵{prices.boxPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Price per serving</span>
                <div className="text-right">
                  <span className="line-through text-gray-400 mr-2 text-sm">
                    ₵{PRICE_PER_SERVING.toFixed(2)}
                  </span>
                  <span className="text-[#c92020] text-sm font-medium">
                    ₵{prices.pricePerServing.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Shipping</span>
                <div className="text-right">
                  <span className="line-through text-gray-400 mr-2">
                    ₵{SHIPPING_COST.toFixed(2)}
                  </span>
                  <span className="text-[#c92020] font-medium text-sm">
                    FREE
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 -mx-6 px-6 py-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">First box total</span>
                  <div className="text-right">
                    <div className="inline-block bg-[#c92020] text-white text-xs px-2 py-0.5 rounded mb-1">
                      ₵{prices.discount.toFixed(2)} off
                    </div>
                    <div>
                      <span className="line-through text-gray-400 mr-2 text-lg">
                        ₵{(prices.boxPrice + SHIPPING_COST).toFixed(2)}
                      </span>
                      <span className="text-[#c92020] font-bold text-lg">
                        ₵{prices.firstBoxTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              className="w-full py-6 text-base bg-[#067a46] hover:bg-[#056835]"
              onClick={() =>
                handlePlanSelect({
                  people,
                  mealsPerWeek,
                  total: prices.firstBoxTotal,
                })
              }
            >
              Select this plan
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
