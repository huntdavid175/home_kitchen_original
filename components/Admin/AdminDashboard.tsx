"use client";

import { useState } from "react";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Grid,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import DashboardOverview from "./DashboardOverview";
import UserManagement from "./UserManagement";
import MealManagement from "./MealManagement";
import OrderManagement from "./OrderManagement";
import SubscriptionManagement from "./SubscriptionManagement";
import ReportsAnalytics from "./ReportsAnalytics";
import SettingsPage from "./SettingsPage";
import WeeklyMealPlanning from "./WeeklyManagement";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Overview", value: "overview", icon: LayoutDashboard },
    { name: "Users", value: "users", icon: Users },
    { name: "Meals", value: "meals", icon: ShoppingBag },
    { name: "Weekly Planning", value: "weekly-planning", icon: Calendar },
    { name: "Orders", value: "orders", icon: Package },
    { name: "Subscriptions", value: "subscriptions", icon: Calendar },
    { name: "Reports", value: "reports", icon: BarChart3 },
    { name: "Settings", value: "settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-bold text-gray-900">
              MealKit Admin
            </span>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.value)}
                  className={`${
                    activeTab === item.value
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  <item.icon
                    className={`${
                      activeTab === item.value
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    } mr-3 flex-shrink-0 h-5 w-5`}
                  />
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex-shrink-0 group block w-full">
                  <div className="flex items-center">
                    <div>
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt="Admin"
                        />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Admin User
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="fixed inset-0 flex z-40">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 pt-5 pb-2 border-b">
                  <span className="text-xl font-bold text-gray-900">
                    MealKit Admin
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex-1 px-2 pt-4 space-y-1">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.value);
                        setMobileMenuOpen(false);
                      }}
                      className={`${
                        activeTab === item.value
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center px-2 py-2 text-base font-medium rounded-md w-full`}
                    >
                      <item.icon
                        className={`${
                          activeTab === item.value
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500"
                        } mr-4 flex-shrink-0 h-5 w-5`}
                      />
                      {item.name}
                    </button>
                  ))}
                </nav>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <div className="flex-shrink-0 w-full group block">
                    <div className="flex items-center">
                      <div>
                        <Avatar>
                          <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt="Admin"
                          />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                          Admin User
                        </p>
                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                          View profile
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          <button
            type="button"
            className="md:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between px-3 sm:px-4 md:px-6">
            <div className="flex-1 flex items-center">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                {navigation.find((item) => item.value === activeTab)?.name}
              </h1>
            </div>
            <div className="ml-2 sm:ml-4 flex items-center md:ml-6">
              <Button variant="outline" className="hidden sm:flex mr-3">
                <Grid className="h-4 w-4 mr-2" />
                Quick Actions
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Admin"
                      />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-3 sm:p-4 md:p-6 bg-gray-50">
          {activeTab === "overview" && <DashboardOverview />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "meals" && <MealManagement />}
          {activeTab === "weekly-planning" && <WeeklyMealPlanning />}
          {activeTab === "orders" && <OrderManagement />}
          {activeTab === "subscriptions" && <SubscriptionManagement />}
          {activeTab === "reports" && <ReportsAnalytics />}
          {activeTab === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}
