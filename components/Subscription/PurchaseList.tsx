"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RecipeCard from "@/components/Subscription/PurchaseRecipeCard";
import RecipeDetailsDialog from "./RecipeDetailsDialog";
import SubscriptionNav from "./SubscriptionNav";
import { FloatingCart } from "./Cart/FloatiingCart";
import { CartProvider } from "./Cart/CartProvider";
import { toast } from "sonner";
import PagePagination from "../Landing/Recipes/PagePagination";
import { useAtom } from "jotai";
import { mealPlanAtom } from "@/store/atoms";
import { useCart } from "./Cart/CartProvider";

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
  cooking_steps: any[];
  tags: Tag[];
  cooking_tools: any[];
  ingredients: any[];
  not_shipped_ingredients: any[];
  nutritions: Nutrition[];
  price: number;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function PurchaseList() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mealPlan] = useAtom(mealPlanAtom);
  const { items } = useCart();
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  // Calculate total servings needed
  const totalServingsNeeded = mealPlan.people * mealPlan.mealsPerWeek;

  // Calculate unique meals in cart
  const uniqueMealsInCart = items.filter((item) => item.quantity > 0).length;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/recipes?page=${pagination.currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const { data, pagination: paginationData } = await response.json();
        console.log("Recipes data:", data);
        setRecipes(data || []);
        setPagination({
          currentPage: paginationData.currentPage,
          totalPages: paginationData.totalPages,
          totalItems: paginationData.totalItems,
          itemsPerPage: paginationData.itemsPerPage,
        });
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast.error("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [pagination.currentPage]);

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const filteredRecipes = selectedTag
    ? recipes.filter((recipe) =>
        recipe.tags.some((tag) => tag.name === selectedTag)
      )
    : recipes;

  const allTags = Array.from(
    new Set(recipes.flatMap((recipe) => recipe.tags.map((tag) => tag.name)))
  );

  const setOpenHandler = (open: boolean, recipe?: Recipe) => {
    setOpen(open);
    if (recipe) {
      setSelectedRecipe(recipe);
    }
  };

  const setShowNutritionHandler = (show: boolean) => {
    setShowNutrition(show);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D1D3A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 px-4 sm:px-6 lg:px-8 pt-[140px]">
      <SubscriptionNav />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Tag filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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
        </div>

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
              key={recipe.recipe_id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <RecipeCard
                {...recipe}
                title={recipe.recipe_name}
                images={[
                  recipe.image_url ||
                    "https://www.cleankitchen.ee/cdn/shop/files/UzbT9ZKHKeqoB-_4b2zeZgSW-wsEtLwj4nqBcoHE_gI.jpg?v=1721743606&width=1200",
                ]}
                price={Number(recipe.price)} // You might want to add price to your recipe interface
                cookingTime={parseInt(recipe.cooking_time)}
                tags={recipe.tags.map((tag) => tag.name)}
                showDetails={(open) => setOpenHandler(open, recipe)}
                id={recipe.recipe_id}
                maxServings={mealPlan.mealsPerWeek}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center my-8">
          <PagePagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </motion.div>
      <RecipeDetailsDialog
        isOpen={open}
        setIsOpen={setOpenHandler}
        showNutrition={showNutrition}
        setShowNutrition={setShowNutritionHandler}
        recipe={selectedRecipe}
      />
      <FloatingCart />

      {/* Floating Progress Banner - Bottom Left */}
      <AnimatePresence>
        {uniqueMealsInCart > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm"
          >
            {uniqueMealsInCart >= mealPlan.mealsPerWeek ? (
              // Success message when all meals selected
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <span className="text-green-600 font-semibold text-sm">
                    ✓
                  </span>
                </div>
                <div className="text-sm text-gray-700 font-medium">
                  Nice! You&apos;ve got the best price per serving
                </div>
              </div>
            ) : (
              // Progress message when still selecting
              <div className="space-y-3">
                <div className="text-sm text-gray-700">
                  <span className="font-bold text-sm">
                    {Math.round(
                      (uniqueMealsInCart / mealPlan.mealsPerWeek) * 100
                    )}
                    %
                  </span>{" "}
                  Add{" "}
                  <span className="font-bold">
                    {Math.max(0, mealPlan.mealsPerWeek - uniqueMealsInCart)}
                  </span>{" "}
                  more recipes for the best price per serving
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (uniqueMealsInCart / mealPlan.mealsPerWeek) * 100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
