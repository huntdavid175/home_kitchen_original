import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { OrderDetails } from "@/components/User/Dashboard/OrderDetails";

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  return (
    <DashboardTabs defaultTab="orders">
      <OrderDetails orderId={params.id} />
    </DashboardTabs>
  );
}
