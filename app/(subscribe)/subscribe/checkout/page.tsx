"use client";

import DeliveryForm from "@/components/Registration/DeliveryForm";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleBack = () => {
    localStorage.removeItem("selectedMealPlan");
    router.push("/subscribe");
  };

  useEffect(() => {
    const selectedPlan = localStorage.getItem("selectedMealPlan");
    console.log(selectedPlan);
    if (selectedPlan) {
      setSelectedPlan(JSON.parse(selectedPlan));
    }
  }, []);

  const handleNext = () => {};
  return (
    <div>
      <DeliveryForm handleBack={handleBack} handleNext={handleNext} />
    </div>
  );
};

export default CheckoutPage;
