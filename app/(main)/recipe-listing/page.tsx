"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PagePagination from "@/components/Landing/Recipes/PagePagination";

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
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [shouldAnimate, setShouldAnimate] = useState(true);

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
        // Reset animation
        setShouldAnimate(false);
        setTimeout(() => setShouldAnimate(true), 100);
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
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-48 flex-shrink-0">
            <div className="sticky top-8">
              <h1 className="text-xl font-bold mb-6">RECIPES</h1>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href="#"
                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-white hover:text-[#6D1D3A] rounded-lg transition-colors"
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
          <div className="flex-1 max-w-4xl">
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
            >
              {recipes.map((recipe) => (
                <motion.div
                  key={recipe.recipe_id}
                  variants={itemVariants}
                  className="flex"
                >
                  <Link
                    href={`/recipe-listing/${recipe.recipe_id}`}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={
                          recipe.image_url ||
                          "https://cdn.shopify.com/s/files/1/0273/0993/2644/files/zjfOqW8yc9T2Rl4cCS5jGcvMfK3bJ8te_EvB_R7BU5A_300x200_crop_center@2x.png?v=1741831515"
                        }
                        alt={recipe.recipe_name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          {recipe.category.name}
                        </span>
                        {recipe.tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-sm sm:text-base font-semibold mb-2 line-clamp-2 group-hover:text-[#6D1D3A] transition-colors">
                        {recipe.recipe_name}
                      </h2>
                      <p className="text-gray-600 text-xs mb-4 line-clamp-2 flex-grow">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-auto">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span className="text-xs">
                            {recipe.total_time} mins
                          </span>
                        </div>
                        {recipe.nutritions.map(
                          (nutrition) =>
                            nutrition.nutrition === "calories" && (
                              <div
                                key={nutrition.id}
                                className="flex items-center gap-1.5"
                              >
                                <Flame className="w-4 h-4" />
                                <span className="text-xs">
                                  {nutrition.value} kcal
                                </span>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <PagePagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
