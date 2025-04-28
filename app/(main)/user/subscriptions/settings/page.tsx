import Settings from "@/components/User/Dashboard/Settings";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const userData = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  ).then((res) => res.json());

  return <Settings user={userData} />;
}
