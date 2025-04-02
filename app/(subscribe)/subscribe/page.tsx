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
import { useRouter } from "next/navigation";

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const router = useRouter();

  const handlePlanSelect = (plan: any) => {
    // Save meal plan selection
    localStorage.setItem("selectedMealPlan", JSON.stringify(plan));
    router.push("/subscribe/select-meals");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPlan]);

  return (
    <div className="max-w-5xl mx-auto px-4 ">
      <MealPlanSelection handlePlanSelect={handlePlanSelect} />
    </div>
  );
}
