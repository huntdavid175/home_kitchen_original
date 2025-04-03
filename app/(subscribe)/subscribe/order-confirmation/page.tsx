import React, { Suspense } from "react";
import OrderConfirmationPage from "@/components/Subscription/OrderConfirmationPage";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationPage />
    </Suspense>
  );
};

export default Page;
