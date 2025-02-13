import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function SubscribeNav() {
  const categories = [
    { name: "All", count: 44, active: true },
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between py-4 border-b">
          <div className="flex items-center gap-4 sm:gap-8 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#14b8a6] text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="font-medium text-sm sm:text-base">RECIPES</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-[#64748b] text-sm sm:text-base hidden sm:inline">
                EXTRAS
              </span>
              <span className="text-[#64748b] text-sm sm:hidden">EXT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-[#64748b] text-sm sm:text-base hidden sm:inline">
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
        <div className="py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((category) => (
              <Badge
                key={category.name}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm cursor-pointer transition-colors",
                  category.active
                    ? "bg-[#14b8a6] hover:bg-[#0d9488] text-white"
                    : "bg-[#e2e8f0] text-[#0f172a] hover:bg-[#cbd5e1]"
                )}
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
