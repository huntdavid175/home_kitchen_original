import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { OrderDetails } from "@/components/User/Dashboard/OrderDetails";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type PageProps = {
  params: { id: string };
};

export default async function OrderDetailsPage({ params }: PageProps) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardTabs defaultTab="orders">
      <OrderDetails orderId={params.id} />
    </DashboardTabs>
  );
}
