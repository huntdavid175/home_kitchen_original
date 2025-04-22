import { DashboardTabs } from "@/components/User/Dashboard/DashBoardTabs";
import { OrderDetails } from "@/components/User/Dashboard/OrderDetails";
import { Metadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function OrderDetailsPage({ params }: Props) {
  return (
    <DashboardTabs defaultTab="orders">
      <OrderDetails orderId={params.id} />
    </DashboardTabs>
  );
}
