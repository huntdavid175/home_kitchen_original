"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Settings, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface DashboardTabsProps {
  children: React.ReactNode;
  defaultTab: string;
}

export function DashboardTabs({ children, defaultTab }: DashboardTabsProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Extract the last part of the pathname to determine the active tab
    const path = pathname.split("/").pop() || "dashboard";
    setActiveTab(path);

    // Set loaded state for animation
    setIsLoaded(true);
  }, [pathname]);

  // Add ripple effect to buttons
  const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className =
      "absolute rounded-full bg-white bg-opacity-30 pointer-events-none";
    ripple.style.animation = "ripple 0.6s linear";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px] p-0 border-r-0">
          <div className="flex h-16 items-center gap-2 border-b px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 text-white">
              <Package className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold">MealBox</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="p-4 space-y-2">
            <Link
              href="/user/subscriptions"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 transition-all",
                activeTab === "subscriptions"
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/user/subscriptions/orders"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 transition-all",
                activeTab === "orders"
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Package className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/user/subscriptions/settings"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 transition-all",
                activeTab === "settings"
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <div className="border-b bg-white/80 backdrop-blur-md rounded-xl shadow-md">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-3 p-1 rounded-xl bg-gray-100/80 my-2">
              <TabsTrigger
                value="subscriptions"
                asChild
                className="rounded-lg relative overflow-hidden"
              >
                <Link
                  href="/user/subscriptions"
                  className={cn(
                    "flex items-center justify-center gap-2 py-2 transition-all",
                    activeTab === "subscriptions" ? "font-medium" : ""
                  )}
                >
                  <Home
                    className={cn(
                      "h-4 w-4",
                      activeTab === "subscriptions"
                        ? "animate-[scale_2s_ease-in-out_infinite]"
                        : ""
                    )}
                  />
                  <span className="hidden md:inline">Dashboard</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                asChild
                className="rounded-lg relative overflow-hidden"
              >
                <Link
                  href="/user/subscriptions/orders"
                  className={cn(
                    "flex items-center justify-center gap-2 py-2 transition-all",
                    activeTab === "orders" ? "font-medium" : ""
                  )}
                >
                  <Package
                    className={cn(
                      "h-4 w-4",
                      activeTab === "orders"
                        ? "animate-[scale_2s_ease-in-out_infinite]"
                        : ""
                    )}
                  />
                  <span className="hidden md:inline">Orders</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                asChild
                className="rounded-lg relative overflow-hidden"
              >
                <Link
                  href="/user/subscriptions/settings"
                  className={cn(
                    "flex items-center justify-center gap-2 py-2 transition-all",
                    activeTab === "settings" ? "font-medium" : ""
                  )}
                >
                  <Settings
                    className={cn(
                      "h-4 w-4",
                      activeTab === "settings"
                        ? "animate-[scale_2s_ease-in-out_infinite]"
                        : ""
                    )}
                  />
                  <span className="hidden md:inline">Settings</span>
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <main
        className={cn(
          "flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8",
          isLoaded
            ? "animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)]"
            : "opacity-0"
        )}
      >
        {children}
      </main>
    </div>
  );
}
