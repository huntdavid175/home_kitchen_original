"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus } from "lucide-react";
import TimeBadge from "./TimeBadge";
import { useCart } from "./Cart/CartProvider";

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
      className={`bg-white overflow-hidden shadow-xl w-full group cursor-pointer transition-all duration-300 ${
        isMaxedOut ? "blur-sm" : ""
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={isMaxedOut ? {} : { scale: 1.02, y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={() => showDetails(true)}
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
              className={`object-cover transition-transform duration-500 ${
                isMaxedOut ? "" : "group-hover:scale-110"
              }`}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Cooking Time Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
          <TimeBadge time={cookingTime} />
        </div>

        {/* Max Meals Warning */}
        {isMaxedOut && (
          <div className="absolute top-4 right-4 bg-gray-500 text-white text-xs px-3 py-1.5 rounded-full font-medium">
            Max meals
          </div>
        )}

        {/* Selected Badge */}
        {isSelected && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
            <Check size={12} />
            Selected
          </div>
        )}

        {/* Overlay for selected state */}
        {isSelected && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
              <Check size={24} className="text-green-600" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-[8px] font-medium"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[8px] font-medium">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-red-500">₵</span>
            <span className="text-lg font-bold text-red-500">
              {price.toFixed(2)}
            </span>
            <span className="text-gray-500 text-xs">/ meal</span>
          </div>

          {!isSelected ? (
            <button
              onClick={(e) => handleAddToCart(e)}
              disabled={!canAddMore}
              className={`w-10 h-10 flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                canAddMore
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {canAddMore ? <Plus size={16} /> : "×"}
            </button>
          ) : (
            <button
              onClick={(e) => handleRemove(e)}
              className="w-10 h-10 flex items-center justify-center font-bold text-sm bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
