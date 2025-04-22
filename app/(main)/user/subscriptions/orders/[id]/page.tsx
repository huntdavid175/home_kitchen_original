import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { OrderDetails } from "@/components/User/Dashboard/OrderDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailsPage({ params }: PageProps) {
  return (
    <DashboardTabs defaultTab="orders">
      <OrderDetails orderId={params.id} />
    </DashboardTabs>
  );
}
