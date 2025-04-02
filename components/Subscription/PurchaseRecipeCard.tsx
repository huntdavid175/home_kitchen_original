"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
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
}

export default function PurchaseRecipeCard({
  title,
  images,
  price,
  cookingTime,
  tags,
  showDetails,
  id,
}: RecipeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { items, addItem, updateQuantity, removeItem } = useCart();

  // Get the current quantity from cart
  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem?.quantity || 0;

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
    addItem({
      id: id,
      name: title,
      image: images[0],
      price: price,
      quantity: 1,
    });
  };

  const adjustQuantity = (
    amount: number,
    event: React.MouseEvent | React.TouchEvent
  ) => {
    event.stopPropagation();
    const newQuantity = quantity + amount;
    if (newQuantity >= 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemove = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    removeItem(id);
  };

  return (
    <motion.div
      className="bg-white rounded-3xl overflow-hidden shadow-sm w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
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
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Cooking Time Badge */}
        <div className="absolute top-4 left-4 bg-white rounded-full shadow-md">
          <TimeBadge time={cookingTime} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-tight">{title}</h3>

        {/* Price and Action */}
        <div className="pt-2">
          {quantity === 0 ? (
            <div className="flex items-center justify-between">
              <div className="text-lg">
                <span className="text-red-500 text-xs">₵ </span>
                <span className="font-semibold text-xs text-red-500">
                  {price.toFixed(2)}
                </span>
                <span className="text-gray-500 text-xs"> / portion</span>
              </div>
              <button
                onClick={(e) => handleAddToCart(e)}
                className="bg-blue-600 text-white text-xs px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                ADD
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-600 text-white rounded-lg p-2.5"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={(e) => adjustQuantity(-1, e)}
                  className="p-1 hover:bg-blue-700 rounded-full transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="text-center">
                  <div className="font-medium text-sm">
                    {quantity} on your order
                  </div>
                  <div className="text-xs text-blue-200">
                    (2 servings, €{price.toFixed(2)}/serving)
                  </div>
                </div>
                <button
                  onClick={(e) => adjustQuantity(1, e)}
                  className="p-1 hover:bg-blue-700 rounded-full transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={(e) => handleRemove(e)}
                className="w-full mt-2 text-xs text-blue-200 hover:text-white transition-colors"
              >
                Remove from cart
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
