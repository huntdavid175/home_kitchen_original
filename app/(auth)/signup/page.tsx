import SignupForm from "@/components/Auth/Signup/SignupForm";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
const page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (user) {
    redirect("/");
  }

  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default page;
