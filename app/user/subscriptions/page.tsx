import type { Metadata } from "next";
import SubscriptionDashboard from "@/components/User/Subscription/SubscriptionDashboard";

export const metadata: Metadata = {
  title: "Manage Your Subscription | MealKit",
  description:
    "View and manage your meal subscription details, delivery schedule, and preferences.",
};

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <SubscriptionDashboard />
    </main>
  );
}
