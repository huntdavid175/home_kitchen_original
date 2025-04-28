import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { OrderDetails } from "@/components/User/Dashboard/OrderDetails";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const order = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/orders/${resolvedParams.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  ).then((res) => res.json());

  console.log(order);

  return (
    <DashboardTabs defaultTab="orders">
      <OrderDetails orderDetails={order} />
    </DashboardTabs>
  );
}
