import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { OrderDetails } from "@/components/User/Dashboard/OrderDetails";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  return (
    <DashboardTabs defaultTab="orders">
      <OrderDetails orderId={resolvedParams.id} />
    </DashboardTabs>
  );
}
