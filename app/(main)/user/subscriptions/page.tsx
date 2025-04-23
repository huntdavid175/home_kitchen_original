import SummaryPage from "@/components/User/Dashboard/SummaryPage";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// Revalidate every 60 seconds
export const revalidate = 60;

// Add page transition animation to the main dashboard page
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const stats = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/orders/stats`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      // next: { revalidate: 60 }, // Also revalidate the fetch request
    }
  ).then((res) => res.json());

  return <SummaryPage stats={stats} />;
}
