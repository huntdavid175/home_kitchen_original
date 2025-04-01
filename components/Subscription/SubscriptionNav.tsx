"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type React from "react"; // Added import for React
import Logo from "../ui/Logo";
import ProgressBar from "./progressBar";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function SubscriptionNav() {
  const [activeCategories, setActiveCategories] = useState<string[]>(["All"]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categories = [
    { name: "All", count: 44 },
    { name: "NEW", count: null },
    { name: "Barbecue", count: null },
    { name: "Pork and beef", count: null },
    { name: "Poultry", count: null },
    { name: "Fish and seafood", count: null },
    { name: "Gluten-free", count: null },
    { name: "Lactose-free", count: null },
    { name: "Ready in up to 30 minutes", count: null },
    { name: "Spicy", count: null },
    { name: "Family friendly", count: null },
    { name: "Dessert", count: null },
    { name: "Light meal", count: null },
    { name: "Vegan and vegetarian", count: null },
  ];

  const toggleCategory = (categoryName: string) => {
    setActiveCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((cat) => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => setIsDragging(false);
    document.addEventListener("mouseup", handleMouseUpGlobal);
    return () => document.removeEventListener("mouseup", handleMouseUpGlobal);
  }, []);

  return (
    // <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
    <div className="container mx-auto px-4 lg:px-6">
      {/* Progress Steps */}
      {/* <div className="flex items-center justify-between py-4 border-b">
          <Logo />
          <div className="flex items-center gap-4 sm:gap-8 ">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#14b8a6] text-white flex items-center justify-center text-xs font-medium">
                1
              </div>
              <span className="font-medium text-xs ">RECIPES</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center justify-center text-xs">
                2
              </div>
              <span className="text-[#64748b] text-xs   sm:inline">EXTRAS</span>
            
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center justify-center text-xs">
                3
              </div>
              <span className="text-[#64748b] text-xs   sm:inline">
                DELIVERY & PAYMENT
              </span>
            
            </div>
          </div>
          <div className="relative ml-4">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#14b8a6] text-white text-xs flex items-center justify-center font-medium">
              3
            </span>
          </div>
        </div> */}
      <ProgressBar progress={2} />

      {/* Categories */}
      <div
        className="pt-0 py-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex gap-2 pb-2" style={{ width: "max-content" }}>
          {categories.map((category) => (
            <Badge
              key={category.name}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs cursor-pointer transition-colors select-none",
                activeCategories.includes(category.name)
                  ? "bg-[#14b8a6] hover:bg-[#0d9488] text-white"
                  : "bg-[#e2e8f0] text-[#0f172a] hover:bg-[#cbd5e1]"
              )}
              onClick={() => toggleCategory(category.name)}
            >
              {category.name} {category.count ? `(${category.count})` : ""}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="pb-4">
        <p className="text-sm">
          Portion price from 4 meals{" "}
          <span className="line-through text-[#64748b]">€8.14</span>{" "}
          <span className="font-medium text-[#14b8a6]">€7.43</span>
        </p>
      </div>
    </div>
    // </div>
  );
}
