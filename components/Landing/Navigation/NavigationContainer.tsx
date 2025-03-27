import React from "react";
import Navigation from "./Navigation";
import { createClient } from "@/utils/supabase/server";

const NavigationContainer = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navigation user={user} />
    </>
  );
};

export default NavigationContainer;
