import AdminDashboard from "@/components/Admin/AdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | MealKit",
  description:
    "Manage users, meals, orders, and subscriptions for your meal kit service.",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <AdminDashboard />
    </main>
  );
}
