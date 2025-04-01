"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="font-semibold text-gray-900">{orderNumber}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="font-semibold text-gray-900">{transactionId}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-8">
          Thank you for your subscription. We&apos;ll send you a confirmation
          email with your order details shortly.
        </p>
        <div className="space-y-4">
          <Link href="/user/subscriptions/" className="block">
            <Button className="w-full bg-green-700 hover:bg-green-800">
              Go to Dashboard
            </Button>
          </Link>
          {/* <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
