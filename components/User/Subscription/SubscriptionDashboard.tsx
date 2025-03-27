"use client";

import { useState } from "react";
import {
  CalendarDays,
  CreditCard,
  Package,
  PauseCircle,
  Settings,
  Utensils,
  LucideIcon,
} from "lucide-react";
import SubscriptionOverview from "./SubscriptionOverview";
import DeliverySchedule from "./DeliverySchedule";
import MealPreferences from "./MealPreference";
import PaymentMethods from "./PaymentMethod";
import AccountSettings from "./AccountSetting";
import PauseSubscription from "./PauseSubscription";

export default function SubscriptionDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Your Subscription
        </h1>
        <p className="text-gray-600 mt-2">
          View and update your meal plan, delivery schedule, and account
          preferences
        </p>
      </div>

      <div className="w-full">
        <div className="flex overflow-x-auto scrollbar-hide mb-8 border-b">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<Package className="h-4 w-4 md:h-5 md:w-5" />}
            label="Overview"
          />
          <TabButton
            active={activeTab === "schedule"}
            onClick={() => setActiveTab("schedule")}
            icon={<CalendarDays className="h-4 w-4 md:h-5 md:w-5" />}
            label="Schedule"
          />
          <TabButton
            active={activeTab === "meals"}
            onClick={() => setActiveTab("meals")}
            icon={<Utensils className="h-4 w-4 md:h-5 md:w-5" />}
            label="Meals"
          />
          <TabButton
            active={activeTab === "payment"}
            onClick={() => setActiveTab("payment")}
            icon={<CreditCard className="h-4 w-4 md:h-5 md:w-5" />}
            label="Payment"
          />
          <TabButton
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            icon={<Settings className="h-4 w-4 md:h-5 md:w-5" />}
            label="Settings"
          />
          <TabButton
            active={activeTab === "pause"}
            onClick={() => setActiveTab("pause")}
            icon={<PauseCircle className="h-4 w-4 md:h-5 md:w-5" />}
            label="Pause"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-3 md:p-6">
          {activeTab === "overview" && <SubscriptionOverview />}
          {activeTab === "schedule" && <DeliverySchedule />}
          {activeTab === "meals" && <MealPreferences />}
          {activeTab === "payment" && <PaymentMethods />}
          {activeTab === "settings" && <AccountSettings />}
          {activeTab === "pause" && <PauseSubscription />}
        </div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 py-3 px-6 text-xs md:text-sm border-b-2 transition-colors ${
        active
          ? "border-[#067a46] text-[#067a46]"
          : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
