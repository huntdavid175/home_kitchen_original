import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { OrderDetails } from "@/components/User/Dashboard/OrderDetails";

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <DashboardTabs defaultTab="orders">
      <OrderDetails orderId={params.id} />
    </DashboardTabs>
  );
}
