"use client";

import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { RecentOrders } from "@/components/User/Dashboard/RecentOrders";
import { AccountSummary } from "@/components/User/Dashboard/AccountSummary";
import { useEffect, useState } from "react";

// Add page transition animation to the main dashboard page
export default function SummaryPage({ stats }: { stats: any }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <DashboardTabs defaultTab="dashboard">
      <div
        className={`flex flex-col gap-8 ${
          isLoaded
            ? "animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)]"
            : "opacity-0"
        }`}
      >
        <style jsx global>{`
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
        <AccountSummary totalOrders={stats.totalOrders} />
        <RecentOrders recentOrders={stats.recentOrders} />
      </div>
    </DashboardTabs>
  );
}
