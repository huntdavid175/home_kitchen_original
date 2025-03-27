"use client";

import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { motion, AnimatePresence } from "framer-motion";
import SubscriptionCard from "@/components/Subscription/SubscriptionCard";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame } from "lucide-react";
import { s, select } from "framer-motion/client";
import PurchaseList from "@/components/Subscription/PurchaseList";
import SubscriptionNav from "@/components/Subscription/SubscriptionNav";
import MealPlanSelection from "@/components/Subscription/MealPlanSelection";
import DeliveryForm from "@/components/Registration/DeliveryForm";
import CheckoutPage from "@/components/Subscription/Checkout";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  time: string;
  calories: number;
}

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Sesame honey chicken with rice",
    description:
      "Sesame honey chicken is a mouth-watering dish from American-Chinese cuisine.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/a8C361u3tUAUD2xtCZdlA_zaIvtZyhfwv6TbO59A6cU.jpg?v=1722046023&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "35 minutes",
    calories: 641,
  },
  {
    id: "2",
    title: "Baoburgers with chicken kebab and curry-mango sauce",
    description:
      "Steamed bao buns are also great for burger buns. This time, a burger recipe with steamed buns, chicken, and curry-mango sauce.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/UzbT9ZKHKeqoB-_4b2zeZgSW-wsEtLwj4nqBcoHE_gI.jpg?v=1721743606&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "20 minutes",
    calories: 682,
  },
  {
    id: "3",
    title: "Crispy chicken in sweet and sour sauce served with rice",
    description:
      "Sweet and sour chicken, a favorite of many, is a dish that probably doesn't need much introduction. The rich sweet and sour sauce makes pre-stir-fried chicken simply irresistible. Favorites are created for a reason. It goes without saying that the result is definitely best when made at home and served fresh.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/ij2GrXD7XdhMLTJdpzNyP6YC46fdpLn1RbOxGT6oZ9k.jpg?v=1722218664&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "35 minutes",
    calories: 508,
  },
  {
    id: "4",
    title: "Chicken schnitzel with baked potatoes",
    description:
      "Classic chicken schnitzel served with baked potatoes and fresh salad.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/cro5gZYstLPTVjH0nT5sl71qylNtjnMv9Q8Wyh4GPWk.jpg?v=1722272721&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "40 minutes",
    calories: 720,
  },
  {
    id: "5",
    title: "Chicken lo mein with noodles",
    description:
      "A delicious stir-fried noodle dish with tender chicken and vegetables.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/C_UQBXrDnEhfXMR6t5Ay7WB9zhPm5sa4qfyTUMvNqi4.jpg?v=1738721018&width=1200",
    categories: ["Poultry", "Recipes"],
    time: "25 minutes",
    calories: 550,
  },
  {
    id: "6",
    title: "Beef steak with mashed potatoes",
    description:
      "Perfectly cooked beef steak served with creamy mashed potatoes.",
    image:
      "https://www.cleankitchen.ee/cdn/shop/files/PECHYKTxgiO1eQG0YrK-Niki4jCwmvX-wKifw60fOrM.jpg?v=1722823520&width=1200",
    categories: ["Meat", "Recipes"],
    time: "30 minutes",
    calories: 850,
  },
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

export default function Home() {
  const [peopleCount, setPeopleCount] = useState("2");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showMealPlanSelection, setShowMealPlanSelection] = useState(false);
  const [hasMealPlan, setHasMealPlan] = useState(false);

  const subscriptionPlans = [
    {
      frequency: "Weekly",
      meals: 3,
      servings: Number.parseInt(peopleCount),
      price: 160 * (Number.parseInt(peopleCount) / 2),
      features: [
        "Chicken and meat meals",
        "Protein up to 200 gm",
        "1 daily free snack",
      ],
      image:
        "https://freepngimg.com/save/139180-food-plate-fish-download-hd/792x797",
    },
    {
      frequency: "Weekly",
      meals: 7,
      servings: Number.parseInt(peopleCount),
      price: 460 * (Number.parseInt(peopleCount) / 2),
      features: [
        "Chicken and meat meals",
        "Protein up to 200 gm",
        "1 daily free snack",
      ],
      image:
        "https://freepngimg.com/save/139180-food-plate-fish-download-hd/792x797",
    },
    {
      frequency: "Monthly",
      meals: 28,
      servings: Number.parseInt(peopleCount),
      price: 1740 * (Number.parseInt(peopleCount) / 2),
      features: [
        "All meal varieties",
        "Protein up to 250 gm",
        "2 daily free snacks",
      ],
      image:
        "https://png.pngtree.com/png-clipart/20231019/original/pngtree-salmon-fillet-with-potato-and-vegetable-on-the-plate-png-image_13369543.png",
    },
  ];

  useEffect(() => {
    // Check authentication status (replace with actual logic)
    const user = localStorage.getItem("user"); // Example, replace with real auth check
    setIsAuthenticated(!!user);

    // Check if the user has already selected a meal plan
    const storedMealPlan = localStorage.getItem("selectedMealPlan");
    console.log("storedMealPlan", storedMealPlan);

    setHasMealPlan(!!storedMealPlan);

    if (storedMealPlan) {
      setShowDeliveryForm(true);
    }
  }, []);

  const handlePlanSelect = (plan: any) => {
    if (!isAuthenticated) {
      localStorage.setItem("selectedMealPlan", JSON.stringify(plan));
      setShowDeliveryForm(false);
      window.location.href = "/login"; // Redirect to login page if not logged in
      return;
    }

    // Save meal plan selection
    localStorage.setItem("selectedMealPlan", JSON.stringify(plan));
    setShowDeliveryForm(true);
    setSelectedPlan(plan);
  };
  const handleBack = () => {
    setSelectedPlan(null);
    setShowDeliveryForm(false);
    setHasMealPlan(false);
    localStorage.removeItem("selectedMealPlan");
  };
  const handleGoBack = () => {
    setShowDeliveryForm(true);
    setShowCheckout(false);
  };

  const handleNext = () => {
    setShowDeliveryForm(false);
    setShowCheckout(true);
  };

  const handleShowMealPlanSelection = () => {
    setShowCheckout(false);
    setShowMealPlanSelection(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPlan]);

  return (
    <div className="max-w-5xl mx-auto px-4 ">
      {!selectedPlan && !hasMealPlan && !showDeliveryForm && (
        <MealPlanSelection handlePlanSelect={handlePlanSelect} />
      )}
      {(selectedPlan || hasMealPlan) && showDeliveryForm && (
        <DeliveryForm handleBack={handleBack} handleNext={handleNext} />
      )}
      {showCheckout && (
        <CheckoutPage
          Goback={handleGoBack}
          handleNext={handleShowMealPlanSelection}
        />
      )}
      {showMealPlanSelection && <PurchaseList />}
    </div>
  );
}
