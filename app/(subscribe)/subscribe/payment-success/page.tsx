"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Package } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Get order details from URL parameters
  const orderNumber = searchParams.get("orderNumber") || "Unknown";
  const totalAmount = searchParams.get("total") || "0";
  const total = Number.parseFloat(totalAmount);

  // Set delivery date (2 days from now)
  const deliveryDate = new Date(
    Date.now() + 2 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();

  //   If no order number is provided, redirect to home
  useEffect(() => {
    setMounted(true);
    if (!searchParams.get("orderNumber") && mounted) {
      router.push("/");
    }
  }, [searchParams, router, mounted]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              delay: 0.2,
            }}
            className="inline-block"
          >
            <CheckCircle className="h-24 w-24 text-green-700 mx-auto" />
          </motion.div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Payment Successful!
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Thank you for your order.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b dark:border-gray-700">
                  <span className="font-medium">Order Number</span>
                  <span className="font-bold">{orderNumber}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Order Total</span>
                  <span className="font-bold">{total}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Estimated Delivery</span>
                  <span className="font-bold">{deliveryDate}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
                  <span className="font-medium">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-sm font-medium">
                    Processing
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Link href="/user/subscriptions">
              <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            {/* <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link> */}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Package className="h-4 w-4" />
              <span>Your order details have been sent to your email</span>
            </div>
            <p>
              If you have any questions, please contact our customer support.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
