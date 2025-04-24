import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { OrdersList } from "@/components/User/Dashboard/OrderList";
import OrdersContainer from "@/components/User/Dashboard/OrdersContainer";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

// Add page transition animation to the orders page
export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/orders`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      // next: { revalidate: 60 }, // Also revalidate the fetch request
    }
  ).then((res) => res.json());

  return <OrdersContainer orders={orders.data} />;
}
