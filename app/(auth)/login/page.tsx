"use client";

import AuthForm from "@/components/Login/SignIn";
import LoginForm from "@/components/Login/LoginForm";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="">
      <LoginForm />
    </div>
  );
}
