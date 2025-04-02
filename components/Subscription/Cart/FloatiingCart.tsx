"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ShoppingCart, X, Plus, Minus, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/button";

export function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, updateQuantity, removeItem } =
    useCart();
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle body scroll when cart is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isOpen]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] ${
              isMobile ? "block" : "hidden"
            }`}
            onClick={toggleCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300,
                mass: 0.8,
              },
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
              transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.6,
                duration: 0.4,
              },
            }}
            className={`fixed bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden
              ${
                isMobile
                  ? "w-[calc(100vw-32px)] max-h-[80vh]"
                  : "w-full max-w-md"
              }`}
            style={{
              maxWidth: isMobile ? "calc(100vw - 32px)" : "24rem",
              zIndex: 101,
              bottom: isMobile ? "5rem" : "6rem",
              right: isMobile ? "1rem" : "2rem",
            }}
          >
            {/* Cart Content */}
            <div className="p-3 sm:p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold text-base sm:text-base">
                Your Cart
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCart}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Rest of the cart content */}
            <div
              className={`${
                isMobile ? "max-h-[50vh]" : "max-h-[60vh]"
              } overflow-y-auto`}
            >
              {items.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  Your cart is empty
                </div>
              ) : (
                <ul className="divide-y dark:divide-gray-700">
                  {items.map((item, index) => (
                    <motion.li
                      key={item.id}
                      className="p-3 sm:p-4 flex gap-3 sm:gap-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: index * 0.05,
                          duration: 0.2,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.1,
                          delay: 0.05 * (items.length - index - 1),
                        },
                      }}
                    >
                      {/* Item content */}
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm sm:text-sm">
                          {item.name}
                        </h4>
                        <p className="text-orange-700 font-semibold mt-1 text-sm sm:text-sm">
                          ₵{item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 sm:h-7 sm:w-7"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 w-6 sm:w-8 text-center text-xs">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 sm:h-7 sm:w-7"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-muted-foreground text-xs sm:text-xs py-0 h-6 sm:h-8"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-3 sm:p-4 border-t dark:border-gray-700">
                <div className="flex justify-between mb-3 sm:mb-4">
                  <span className="font-medium text-sm">Total</span>
                  <span className="font-semibold text-sm text-red-600">
                    ₵{totalPrice.toFixed(2)}
                  </span>
                </div>
                <Button
                  className="w-full bg-green-700 text-white hover:bg-green-800"
                  onClick={() => router.push("/subscribe/checkout")}
                >
                  Proceed
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleCart}
        className="fixed bg-green-700 text-white rounded-full p-3 sm:p-4 shadow-lg flex items-center gap-2 z-[102]"
        style={{
          bottom: isMobile ? "1rem" : "2rem",
          right: isMobile ? "1rem" : "2rem",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
        transition={{
          rotate: {
            type: "spring",
            damping: 15,
            stiffness: 300,
          },
        }}
      >
        {isOpen ? (
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <>
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            {totalItems > 0 && (
              <span className="bg-white text-green-700 rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            )}
          </>
        )}
      </motion.button>
    </>
  );
}
