"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RecipeCard from "@/components/Subscription/PurchaseRecipeCard";
import RecipeDetailsDialog from "./RecipeDetailsDialog";
import SubscriptionNav from "./SubscriptionNav";
import { FloatingCart } from "./Cart/FloatiingCart";
import { CartProvider } from "./Cart/CartProvider";
import { toast } from "sonner";
import PagePagination from "../Landing/Recipes/PagePagination";

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
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3001/api/recipes?page=${pagination.currentPage}`
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
                price={10.13} // You might want to add price to your recipe interface
                cookingTime={parseInt(recipe.cooking_time)}
                tags={recipe.tags.map((tag) => tag.name)}
                showDetails={(open) => setOpenHandler(open, recipe)}
                id={recipe.recipe_id}
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
    </div>
  );
}
