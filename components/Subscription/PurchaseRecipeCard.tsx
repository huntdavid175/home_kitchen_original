"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Minus } from "lucide-react";
import TimeBadge from "./TimeBadge";
import { useCart } from "./Cart/CartProvider";
import { useAtom } from "jotai";
import { mealPlanAtom } from "@/store/atoms";

interface RecipeCardProps {
  title: string;
  images: string[];
  price: number;
  cookingTime: number;
  tags: string[];
  showDetails: (open: boolean) => void;
  id: string;
  maxServings?: number;
}

export default function PurchaseRecipeCard({
  title,
  images,
  price,
  cookingTime,
  tags,
  showDetails,
  id,
  maxServings,
}: RecipeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { items, addItem, removeItem } = useCart();
  const [mealPlan] = useAtom(mealPlanAtom);

  // Get the current quantity from cart
  const cartItem = items.find((item) => item.id === id);
  const isSelected = (cartItem?.quantity || 0) > 0;

  // Calculate unique meals in cart (not total servings)
  const uniqueMealsInCart = items.filter((item) => item.quantity > 0).length;
  const remainingMeals = maxServings
    ? maxServings - uniqueMealsInCart
    : Infinity;
  const canAddMore = remainingMeals > 0 || isSelected; // Can add if there are remaining meals OR if this item is already selected
  const isMaxedOut = remainingMeals === 0 && !isSelected;

  useEffect(() => {
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1500); // Change image every 1.5 seconds when hovered
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, images.length]);

  const handleAddToCart = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    if (canAddMore && !isSelected) {
      addItem({
        id: id,
        name: title,
        image: images[0],
        price: price,
        quantity: 1,
      });
    }
  };

  const handleRemove = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    removeItem(id);
  };

  return (
    <motion.div
      className={`bg-white overflow-hidden shadow-sm border border-gray-200 w-full group cursor-pointer transition-all duration-300`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={isMaxedOut ? {} : { y: -2 }}
      transition={{ duration: 0.3 }}
      onClick={() => showDetails(true)}
      style={{
        boxShadow:
          isHovered && !isMaxedOut
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : undefined,
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${title} - image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-base font-bold leading-tight text-gray-900 group-hover:text-green-600 transition-colors">
          {title}
        </h3>

        {/* Key Metrics */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>{cookingTime} mins</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>619 kcal</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>30.8g protein</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-red-500 font-bold">₵</span>
            <span className="text-red-500 font-bold text-lg">
              {price.toFixed(2)}
            </span>
            <span className="text-gray-500 text-xs">/ meal</span>
          </div>

          {!isSelected ? (
            <button
              onClick={(e) => handleAddToCart(e)}
              disabled={!canAddMore}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
                canAddMore
                  ? "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Plus size={16} />
            </button>
          ) : (
            <button
              onClick={(e) => handleRemove(e)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 hover:shadow-md transition-all duration-200"
            >
              <Minus size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
