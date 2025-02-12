"use client";
import { Clock, Scale } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";

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

interface RecipeHeaderProps {
  title: string;
  description: string;
  cookingTime: string;
  calories: string;
  category: string;
  tools: string[];
  allergens: string[];
  image: string;
}

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
        text: "Thinly slice the iceberg lettuce . For the dressing, mix together the curry-mango sauce , lingham sauce (spicy!) and mayonnaise in a bowl ",
        image:
          "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=400",
      },
      {
        text: "Prepare a homemade steamer. If you have a food steamer at home, use it according to the instructions. The cooking time is the same for both methods. Put a pot of water on the fire. The water should be a few cm deep in the pot. Place a sieve on top. The sieve should not touch the water , ideally the distance between the two should be as large as possible.",
        image:
          "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?auto=format&fit=crop&q=80&w=400",
      },
      {
        text: "Make squares of baking paper the size of a bao bun . Place the baking paper on a sieve and place the bao bun on top and cover, either with a lid, foil or a plate. The less steam that escapes, the better! Don&apos;t put too many of them on the sieve: 1-3 pieces maximum, depending on the size of the sieve and pot.",
        image:
          "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=400",
      },
      {
        text: "Steam the buns, covered, for 7-9 minutes , until the dough has risen slightly and become fluffy. Repeat until all the buns have been steamed. Make sure the water in the pot does not run out!",
        image:
          "https://www.cleankitchen.ee/cdn/shop/files/oV0VYCNlHr9IYOlYihkkFGTVvgZktc6SQzTBaoMeFL8.jpg?crop=center&height=240&v=1722823521&width=360",
      },
      {
        text: "While the bread is steaming, prepare the chicken . To do this, heat a pan and add a drop of oil . Add the chicken and kebab seasoning and cook for a few minutes until the meat is browned. Season with salt and pepper .",
        image:
          "https://www.cleankitchen.ee/cdn/shop/files/fVpnl5p3WGM_xYoWjKalGSa-IyE0NFsXnFNAdBiVTPQ.jpg?crop=center&height=240&v=1722823520&width=360",
      },
      {
        text: "Serve warm bao buns with chicken , curry-mango sauce , iceberg lettuce and roasted onions . Sprinkle with green onions (not included) if desired. Enjoy your meal!",

        image:
          "https://www.cleankitchen.ee/cdn/shop/files/LU_w8OxEF50bcAgcXSg6pglD1wy0dKNE8kk4guXBJfw.jpg?crop=center&height=240&v=1722823521&width=360",
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
];

const RecipeDetailsPage = ({
  title = "American pulled pork wrap with guacamole",
  description = "American-inspired wraps with pulled pork, spicy guacamole, coleslaw and crispy onions. NB! This recipe can be prepared without spices!",
  cookingTime = "15 MINUTES",
  calories = "1241 KCAL",
  category = "MEAT",
  tools = ["Cutting board", "Knife", "Pot", "Pan", "Bowl (2 pcs)"],
  allergens = [
    "Soybeans",
    "Sesame seeds",
    "Egg products",
    "Gluten",
    "Mustard seeds",
    "Lactose",
    "Dairy products",
  ],
  image = "https://www.cleankitchen.ee/cdn/shop/files/K1HDtmoNMDjrpkKfZTzB45WId8E3m0DITXQ4JPQi_dE.jpg?crop=center&height=700&v=1722045832&width=1050",
}: any) => {
  //     setSelectedRecipe(recipe);
  //     window.scrollTo(0, 0);
  //   };
  const router = useRouter();

  const selectedRecipe = recipes[0];

  return (
    <div className="min-h-screen bg-white mt-8">
      <div className="relative w-full overflow-hidden">
        {/* Mobile Layout */}
        <div className="md:hidden mx-2">
          <div className="relative aspect-square w-full">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
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
                  <span className="text-[#006B5F] text-xs">{cookingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#006B5F]" />
                  <span className="text-[#006B5F] text-xs">{calories}</span>
                </div>
              </div>
              <span className="text-[#006B5F] text-xs">NUTRITIONAL VALUE</span>
            </div>

            <h1 className="text-[#006B5F] text-3xl font-serif mb-4">{title}</h1>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="w-5 h-5 bg-[#006B5F] rounded-full" />
                <span className="uppercase">{category}</span>
              </div>

              <p className="text-gray-700">{description}</p>

              <div>
                <p className="font-medium mb-1">Tools: {tools.join(", ")}</p>
                <p className="text-gray-500 text-xs">
                  Allergens: {allergens.join(", ")}
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
                      {cookingTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#006B5F]" />
                    <span className="text-[#006B5F] text-xs font-light">
                      {calories}
                    </span>
                  </div>
                </div>
                <span className="text-[#006B5F] text-xs font-light">
                  NUTRITIONAL VALUE
                </span>
              </div>

              <h1 className="text-[#006B5F] text-4xl font-serif mb-6">
                {title}
              </h1>

              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-5 bg-[#006B5F] rounded-full" />
                  <span className="uppercase text-xs">{category}</span>
                </div>

                <p className="text-gray-700">{description}</p>

                <div>
                  <p className="font-medium mb-1 text-sm">
                    Tools: {tools.join(", ")}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Allergens: {allergens.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="relative"> */}
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {/* </div> */}
        </div>
      </div>

      {/* Recipe Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        {/* <button
          // onClick={() => setSelectedRecipe(null)}
          onClick={() => router.back()}
          className="text-teal-700 hover:text-teal-800 mb-6 flex items-center"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to recipes
        </button> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <div className="md:bg-rose-50  md:rounded-2xl md:p-8 md:shadow-lg mb-4">
              {/* <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedRecipe.title}
              </h1>
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{selectedRecipe.prepTime}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{selectedRecipe.servings} servings</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{selectedRecipe.description}</p> */}

              <h2 className="text-xl font-semibold mb-4 text-green-900">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {selectedRecipe.ingredients?.map(
                  (ingredient: any, index: any) => (
                    <li key={index} className="flex items-center space-x-4">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="rounded text-teal-700"
                        />
                      </div>
                      <span className="text-gray-700">{ingredient.name}</span>
                      <span className="text-gray-500">{ingredient.amount}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="relative max-md:mx-2  md:w-full rounded-3xl aspect-[5/6] bg-black">
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
              {selectedRecipe.steps?.map((step: any, index: any) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:space-x-6"
                >
                  <div className="md:w-1/4 flex-shrink-0">
                    <img
                      src={step.image}
                      alt={`Step ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg aspect-[3/2] "
                    />
                  </div>
                  <div>
                    <p className="text-gray-600 mt-2 md:mt-0 font-semibold">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* You might also like */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You might also like...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {recipes.slice(0, 4).map((recipe: any, index: any) => (
              <div
                key={index}
                className="cursor-pointer group"
                onClick={() => router.push(`/recipe-details`)}
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {recipe.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        {/* <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                <Image
                  src="/placeholder.svg"
                  alt="Customer"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-gray-600 italic mb-2">
                  "It's so good that I can cook homemade meals for my family
                  instead of ready-made ones. And I don't have to spend time
                  planning the menu and shopping while I'm away from the kids."
                </p>
                <p className="font-medium">- Janika</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
