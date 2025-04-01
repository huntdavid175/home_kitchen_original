"use client";
import { Clock, Scale, ChefHat, Utensils } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

interface CookingTool {
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
  cooking_tools: CookingTool[];
  ingredients: Ingredient[];
  not_shipped_ingredients: Ingredient[];
  nutritions: Nutrition[];
}

export default function RecipeDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/recipes/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const { data } = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast.error("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006B5F] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Recipe not found"}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#006B5F] text-white rounded-lg hover:bg-[#005a4f] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get calories from nutritions
  const calories =
    recipe.nutritions.find((n) => n.nutrition === "calories")?.value || "0";
  const protein =
    recipe.nutritions.find((n) => n.nutrition === "protein")?.value || "0";
  const carbs =
    recipe.nutritions.find((n) => n.nutrition === "carbs")?.value || "0";

  return (
    <div className="min-h-screen bg-white mt-8 md:mt-0">
      <div className="relative w-full overflow-hidden">
        {/* Mobile Layout */}
        <div className="md:hidden mx-2">
          <div className="relative aspect-square w-full">
            <Image
              src={recipe.image_url || "/placeholder.svg"}
              alt={recipe.recipe_name}
              fill
              className="object-cover rounded-3xl"
              priority
            />
          </div>
          <div className="bg-white px-2 py-8 rounded-b-3xl">
            <div className="flex items-center justify-between gap-6 text-sm mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#006B5F]" />
                  <span className="text-[#006B5F] text-xs">
                    {recipe.total_time} MINUTES
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#006B5F]" />
                  <span className="text-[#006B5F] text-xs">
                    {calories} KCAL
                  </span>
                </div>
              </div>
              <span className="text-[#006B5F] text-xs">NUTRITIONAL VALUE</span>
            </div>

            <h1 className="text-[#006B5F] text-3xl font-serif mb-4">
              {recipe.recipe_name}
            </h1>
            <p className="text-gray-500 text-sm mb-4">{recipe.subname}</p>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-5 bg-[#006B5F] rounded-full" />
                <span className="uppercase">{recipe.category.name}</span>
              </div>

              <p className="text-gray-700">{recipe.description}</p>

              <div>
                <p className="font-medium mb-1">
                  Tools:{" "}
                  {recipe.cooking_tools.map((tool) => tool.name).join(", ")}
                </p>
                <p className="text-gray-500 text-xs">
                  Tags: {recipe.tags.map((tag) => tag.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block min-h-[600px] relative">
          <div className="absolute top-10 left-10 z-10 flex items-center">
            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl ml-auto -mr-16">
              <div className="flex items-center justify-between gap-6 text-sm mb-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#006B5F]" />
                    <span className="text-[#006B5F] text-xs font-light">
                      {recipe.total_time} MINUTES
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#006B5F]" />
                    <span className="text-[#006B5F] text-xs font-light">
                      {calories} KCAL
                    </span>
                  </div>
                </div>
                <span className="text-[#006B5F] text-xs font-light">
                  NUTRITIONAL VALUE
                </span>
              </div>

              <h1 className="text-[#006B5F] text-4xl font-serif mb-2">
                {recipe.recipe_name}
              </h1>
              <p className="text-gray-500 text-sm mb-6">{recipe.subname}</p>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#006B5F] rounded-full" />
                  <span className="uppercase text-xs">
                    {recipe.category.name}
                  </span>
                </div>

                <p className="text-gray-700">{recipe.description}</p>

                <div>
                  <p className="font-medium mb-1 text-sm">
                    Tools:{" "}
                    {recipe.cooking_tools.map((tool) => tool.name).join(", ")}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Tags: {recipe.tags.map((tag) => tag.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={recipe.image_url || "/placeholder.svg"}
            alt={recipe.recipe_name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Recipe Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <div className="md:bg-rose-50 md:rounded-2xl md:p-8 md:shadow-lg mb-4">
              <h2 className="text-xl font-semibold mb-4 text-green-900">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="rounded text-teal-700"
                      />
                    </div>
                    <div>
                      <span className="text-gray-700">{ingredient.name}</span>
                      <span className="text-gray-500 ml-2">
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">
                        {ingredient.description}
                      </p>
                    </div>
                  </li>
                ))}
                {recipe.not_shipped_ingredients.length > 0 && (
                  <>
                    <li className="text-sm font-semibold text-gray-500 mt-4">
                      Not Shipped:
                    </li>
                    {recipe.not_shipped_ingredients.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="rounded text-teal-700"
                          />
                        </div>
                        <div>
                          <span className="text-gray-700">
                            {ingredient.name}
                          </span>
                          <span className="text-gray-500 ml-2">
                            {ingredient.quantity} {ingredient.unit}
                          </span>
                          <p className="text-gray-400 text-xs mt-1">
                            {ingredient.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3 text-green-900">
                  Nutritional Information
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#006B5F]">
                      {calories}
                    </p>
                    <p className="text-sm text-gray-600">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#006B5F]">
                      {protein}g
                    </p>
                    <p className="text-sm text-gray-600">Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#006B5F]">
                      {carbs}g
                    </p>
                    <p className="text-sm text-gray-600">Carbs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative max-md:mx-2 md:w-full rounded-3xl aspect-[5/6] bg-black">
              <video
                className="absolute left-0 top-0 w-full max-w-full h-full object-cover rounded-3xl opacity-90"
                src="https://videos.pexels.com/video-files/6590940/6590940-uhd_1440_2732_25fps.mp4"
                playsInline
                autoPlay
                loop
                muted
              ></video>
              <div className="absolute inset-0 flex flex-col justify-between p-2">
                <div className="p-4 text-white flex flex-col gap-4">
                  <h1 className="text-white text-6xl md:text-7xl z-10">
                    We&apos;ll bring <br /> it home!
                  </h1>
                  <p className="text-xl [text-wrap:balance] max-w-xs">
                    Precise amounts of ingredients delivered to your door.
                  </p>
                </div>
                <button className="inline-flex items-center justify-center ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 md:h-16 rounded-xl md:rounded-2xl font-display text-xl tracking-wide px-4 whitespace-nowrap font-semibold bg-white text-green-800 hover:bg-green-50 hover:text-green-700 active:bg-green-700 active:text-white">
                  Cook more easily
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white md:col-span-2 md:rounded-2xl md:p-8 md:shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-green-900">
              Preparation
            </h2>
            <div className="space-y-8">
              {recipe.cooking_steps.map((step) => (
                <div
                  key={step.id}
                  className="flex flex-col md:flex-row md:space-x-6"
                >
                  <div className="md:w-1/4 flex-shrink-0">
                    {step.image_url ? (
                      <Image
                        src={step.image_url}
                        alt={`Step ${step.step_number}`}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover rounded-lg aspect-[3/2]"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg aspect-[3/2] flex items-center justify-center">
                        <Utensils className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 bg-[#006B5F] text-white rounded-full flex items-center justify-center font-bold">
                        {step.step_number}
                      </span>
                    </div>
                    <p className="text-sm mt-2 md:mt-0 text-gray-600 leading-relaxed">
                      {step.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
