"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame } from "lucide-react";
import { s, select } from "framer-motion/client";
import PurchaseList from "@/components/Subscription/PurchaseList";
import SubscriptionNav from "@/components/Subscription/SubscriptionNav";
import MealPlanSelection from "@/components/Subscription/MealPlanSelection";
import DeliveryForm from "@/components/Registration/DeliveryForm";
import CheckoutPage from "@/components/Subscription/Checkout";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { mealPlanAtom } from "@/store/atoms";

export default function SubscribePage() {
  const router = useRouter();
  const [mealPlan, setMealPlan] = useAtom(mealPlanAtom);

  useEffect(() => {
    console.log("Current meal plan state:", mealPlan);
  }, [mealPlan]);

  const handlePlanSelect = (plan: any) => {
    console.log("Selecting new plan:", plan);
    setMealPlan((prev) => ({
      ...prev,
      people: plan.people,
      mealsPerWeek: plan.mealsPerWeek,
      total: plan.total,
    }));
    router.push("/subscribe/select-meals");
  };

  const handleGoBack = () => {
    console.log("Resetting meal plan");
    setMealPlan((prev) => ({
      ...prev,
      total: 0,
      prices: {
        boxPrice: 0,
        pricePerServing: 0,
        firstBoxTotal: 0,
        discount: 0,
      },
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mealPlan]);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <MealPlanSelection handlePlanSelect={handlePlanSelect} />
    </div>
  );
}
