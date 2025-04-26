"use client";

import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { AccountSettings } from "@/components/User/Dashboard/AccountSettings";
import { useEffect, useState } from "react";

export default function Settings({ user }: { user: any }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <DashboardTabs defaultTab="settings">
      <div
        className={`${
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
        <AccountSettings user={user} />
      </div>
    </DashboardTabs>
  );
}
