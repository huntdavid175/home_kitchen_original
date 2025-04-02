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

interface Nutrition {
  id: string;
  nutrition: string;
  value: string;
  created_at: string;
}

interface Tag {
  id: string;
  name: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface CookingStep {
  id: string;
  step_number: number;
  instruction: string;
  image_url: string | null;
  created_at: string;
}

interface Ingredient {
  id: string;
  name: string;
  description: string;
  quantity: string;
  unit: string;
  created_at: string;
}

interface Recipe {
  recipe_id: string;
  recipe_name: string;
  subname: string;
  description: string;
  difficulty: string;
  cooking_time: string;
  total_time: string;
  image_url: string | null;
  recipe_created_at: string;
  category: Category;
  cooking_steps: CookingStep[];
  tags: Tag[];
  cooking_tools: any[];
  ingredients: Ingredient[];
  not_shipped_ingredients: any[];
  nutritions: Nutrition[];
}

export default function RecipeDetailsDialog({
  isOpen,
  showNutrition,
  setIsOpen,
  setShowNutrition,
  recipe,
}: {
  isOpen: boolean;
  showNutrition: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setShowNutrition: (showNutrition: boolean) => void;
  recipe: Recipe | null;
}) {
  if (!recipe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-7xl p-0 overflow-auto max-h-[90vh] pb-20 md:px-8 ">
        <DialogHeader className="p-6 pb-0 space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {recipe.recipe_name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 space-y-6">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src={
                recipe.image_url ||
                "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/BtMVIpRvwBPz-6P8nXIS5creMVA4MCLGbYCf4Hoza5w_300x200_crop_center@2x.jpg?v=1723255557"
              }
              alt={recipe.recipe_name}
              fill
              className="object-cover"
            />
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
                {recipe.nutritions.map((nutrition) => (
                  <div key={nutrition.id} className="flex justify-between mb-2">
                    <span className="font-medium">{nutrition.nutrition}:</span>
                    <span>{nutrition.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pb-4">
            {recipe.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>

          <div className="text-xs text-center text-gray-600">
            <span className="font-semibold">Tools: </span>
            {recipe.cooking_tools.map((tool, index) => (
              <span key={index}>
                {tool.name}
                {index < recipe.cooking_tools.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>

          <p className="text-center text-sm">{recipe.description}</p>

          <div>
            <h2 className="text-lg font-semibold mb-4">
              Ingredients for 2 servings
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {recipe.ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src="https://img.hellofresh.com/w_256,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/image/57484aea4dab71ac228b4567.png"
                      alt={ingredient.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{ingredient.name}</div>
                    <div className="text-xs text-gray-600">
                      {ingredient.quantity} {ingredient.unit}
                    </div>
                    {ingredient.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {ingredient.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mt-8 mb-8">Recipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipe.cooking_steps.map((step) => (
                <div key={step.id} className="space-y-4">
                  <div className="relative">
                    <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
                      <Image
                        src={
                          step.image_url ||
                          "https://img.hellofresh.com/w_750,q_auto,f_auto,c_limit,fl_lossy/hellofresh_s3/step/5845b27b2e69d7646110f1c2-4-0-c6ce45e5.jpg"
                        }
                        alt={`Recipe step ${step.step_number}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-2 left-2 bg-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-xs shadow-md">
                      {step.step_number}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
