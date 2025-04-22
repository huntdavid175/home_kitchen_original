"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, User, Settings, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AccountSummary() {
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
    <div className="space-y-4">
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
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
      <h2 className="text-3xl font-bold tracking-tight animate-[slideIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards] bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
        Welcome back, Alex!
      </h2>
      <p className="text-muted-foreground animate-[slideIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards] animation-delay-100">
        Manage your orders and account settings from your personal dashboard.
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Card
          className="rounded-2xl border-none shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards] animation-delay-100"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500 to-emerald-600">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-green-600 shadow-sm">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">12</div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Since you joined</p>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-green-600 hover:text-green-700 -mr-2 relative overflow-hidden transition-all hover:-translate-y-1"
                asChild
                onClick={addRipple}
              >
                <Link
                  href="/user/subscriptions/orders"
                  className="flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card
          className="rounded-2xl border-none shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-400 to-indigo-500">
            <CardTitle className="text-sm font-medium">
              Account Status
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-blue-600 shadow-sm">
              <User className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">Active</div>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Member since Jan 2023
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-blue-600 hover:text-blue-700 -mr-2 relative overflow-hidden transition-all hover:-translate-y-1"
                asChild
                onClick={addRipple}
              >
                <Link
                  href="/user/subscriptions/settings"
                  className="flex items-center gap-1"
                >
                  Profile
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card
          className="rounded-2xl border-none shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-400 to-pink-500">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-purple-600 shadow-sm">
              <Settings className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start rounded-xl border-gray-200 hover:border-gray-300 hover:bg-gray-50 relative overflow-hidden transition-all hover:-translate-y-1"
              onClick={addRipple}
            >
              Update Delivery Address
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start rounded-xl border-gray-200 hover:border-gray-300 hover:bg-gray-50 relative overflow-hidden transition-all hover:-translate-y-1"
              onClick={addRipple}
            >
              Manage Payment Methods
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start rounded-xl border-gray-200 hover:border-gray-300 hover:bg-gray-50 relative overflow-hidden transition-all hover:-translate-y-1"
              onClick={addRipple}
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
