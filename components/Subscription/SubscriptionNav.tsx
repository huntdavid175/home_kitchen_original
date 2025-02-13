"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type React from "react"; // Added import for React

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
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between py-4 border-b">
          <div>
            <svg
              id="logo-15"
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>
              <path
                d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>
              <path
                d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                className="ccustom"
                fill="#17CF97"
              ></path>
              <path
                d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                className="ccustom"
                fill="#17CF97"
              ></path>
            </svg>
          </div>
          <div className="flex items-center gap-4 sm:gap-8 ">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#14b8a6] text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="font-medium text-sm sm:text-sm">RECIPES</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-[#64748b] text-sm sm:text-sm hidden sm:inline">
                EXTRAS
              </span>
              <span className="text-[#64748b] text-sm sm:hidden">EXT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-[#64748b] text-sm sm:text-sm hidden sm:inline">
                DELIVERY & PAYMENT
              </span>
              <span className="text-[#64748b] text-sm sm:hidden">DEL</span>
            </div>
          </div>
          <div className="relative ml-4">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#14b8a6] text-white text-xs flex items-center justify-center font-medium">
              3
            </span>
          </div>
        </div>

        {/* Categories */}
        <div
          className="py-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
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
    </div>
  );
}
