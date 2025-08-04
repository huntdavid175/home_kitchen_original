"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface OrderDetailsProps {
  orderId: string;
}

interface TimelineEvent {
  status: string;
  date: string;
  time: string;
  description: string;
  completed: boolean;
}

interface Meal {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Order {
  id: string;
  date: string;
  deliveryDate: string;
  status: string;
  total: string;
  subtotal: string;
  discount: string;
  payment: {
    method: string;
    date: string;
  };
  address: {
    name: string;
    street: string;
    city: string;
    phone: string;
  };
  meals: Meal[];
  timeline: TimelineEvent[];
}

export function OrderDetails({ orderDetails }: any) {
  // Define order status progression
  const getOrderProgress = () => {
    const status = orderDetails.status.toLowerCase();

    if (status === "cancelled") {
      return {
        currentStep: 0,
        totalSteps: 5,
        steps: [
          { name: "Order Placed", completed: true },
          { name: "Order Confirmed", completed: false },
          { name: "Preparing", completed: false },
          { name: "Ready", completed: false },
          { name: "Delivered", completed: false },
        ],
        cancelled: true,
      };
    }

    const steps = [
      { name: "Order Placed", completed: true },
      { name: "Order Confirmed", completed: !["pending"].includes(status) },
      {
        name: "Preparing",
        completed: ["preparing", "ready", "delivered"].includes(status),
      },
      { name: "Ready", completed: ["ready", "delivered"].includes(status) },
      { name: "Delivered", completed: status === "delivered" },
    ];

    const currentStep = steps.findIndex((step) => !step.completed);
    const totalSteps = steps.length;

    return {
      currentStep: currentStep === -1 ? totalSteps : currentStep,
      totalSteps,
      steps,
      cancelled: false,
    };
  };

  const progress = getOrderProgress();

  return (
    <div className="space-y-6">
      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(74, 222, 128, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
          }
        }
      `}</style>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button variant="outline" size="icon" asChild>
          <Link href="/user/subscriptions/orders">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to orders</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {orderDetails.formatted_order_number}
          </h2>
          <p className="text-muted-foreground">
            Placed on{" "}
            {new Date(orderDetails.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`mt-2 sm:mt-0 sm:ml-auto rounded-full px-3 py-1 text-xs font-medium ${
            orderDetails.status === "Delivered"
              ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700 animate-[pulse_2s_infinite]"
              : orderDetails.status.toLowerCase() === "preparing"
              ? "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700 animate-[pulse_2s_infinite]"
              : orderDetails.status.toLowerCase() === "pending"
              ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700 animate-[pulse_2s_infinite]"
              : orderDetails.status.toLowerCase() === "confirmed"
              ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700 animate-[pulse_2s_infinite]"
              : orderDetails.status.toLowerCase() === "ready"
              ? "bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700 animate-[pulse_2s_infinite]"
              : orderDetails.status.toLowerCase() === "cancelled"
              ? "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
              : ""
          }`}
        >
          {orderDetails.status.charAt(0).toUpperCase() +
            orderDetails.status.slice(1).toLowerCase()}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="rounded-2xl border shadow-md overflow-hidden">
            {/* <CardHeader>
              <CardTitle>Order Progress</CardTitle>
              <CardDescription> Track your order journey</CardDescription>
            </CardHeader> */}
            <CardContent>
              <div className="space-y-6">
                {/* Modern Progress Bar */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-center pt-4">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        Order Progress
                      </h3>
                      <p className="text-xs text-gray-500">
                        Track your order journey
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">
                        {progress.currentStep}
                      </span>
                      <span className="text-xs text-gray-500">
                        / {progress.totalSteps}
                      </span>
                    </div>
                  </div>

                  {/* Modern Progress Bar */}
                  <div className="relative">
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          progress.cancelled
                            ? "bg-gradient-to-r from-red-400 to-red-600"
                            : "bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
                        }`}
                        style={{
                          width: `${
                            (progress.currentStep / progress.totalSteps) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Modern Step Indicators */}
                  <div className="relative">
                    <div className="flex justify-between items-center">
                      {progress.steps.map((step, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center space-y-2 relative"
                        >
                          {/* Step Circle */}
                          <div className="relative">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500 ${
                                progress.cancelled && index > 0
                                  ? "bg-gradient-to-br from-red-100 to-red-200 text-red-700 border-2 border-red-300 shadow-lg"
                                  : step.completed
                                  ? "bg-gradient-to-br from-green-100 to-green-200 text-green-700 border-2 border-green-300 shadow-lg"
                                  : "bg-white text-gray-400 border-2 border-gray-200 shadow-md"
                              }`}
                            >
                              {step.completed ? (
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                index + 1
                              )}
                            </div>

                            {/* Pulse animation for current step */}
                            {!step.completed &&
                              index === progress.currentStep - 1 &&
                              !progress.cancelled && (
                                <div className="absolute inset-0 w-8 h-8 rounded-full bg-green-400 animate-ping opacity-20"></div>
                              )}
                          </div>

                          {/* Step Label */}
                          <div className="text-center max-w-16">
                            <span
                              className={`text-xs font-medium ${
                                progress.cancelled && index > 0
                                  ? "text-red-600"
                                  : step.completed
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {step.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Connecting Lines */}
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
                  </div>
                </div>

                {/* Modern Status Card */}
                <div
                  className={`rounded-lg p-4 ${
                    progress.cancelled
                      ? "bg-gradient-to-r from-red-50 to-red-100 border border-red-200"
                      : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          progress.cancelled ? "bg-red-500" : "bg-green-500"
                        }`}
                      ></div>
                      {!progress.cancelled && (
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`text-sm font-semibold ${
                          progress.cancelled ? "text-red-800" : "text-gray-900"
                        }`}
                      >
                        {progress.cancelled
                          ? "Order Cancelled"
                          : progress.steps[progress.currentStep - 1]?.name ||
                            "Order Placed"}
                      </h4>
                      <p
                        className={`text-xs ${
                          progress.cancelled ? "text-red-600" : "text-gray-600"
                        }`}
                      >
                        {progress.cancelled
                          ? "Your order has been cancelled and will not be processed"
                          : progress.currentStep === progress.totalSteps
                          ? "Your order has been delivered successfully! 🎉"
                          : `Your order is currently being ${progress.steps[
                              progress.currentStep - 1
                            ]?.name.toLowerCase()}`}
                      </p>
                    </div>

                    {/* Status Icon */}
                    <div
                      className={`p-2 rounded-full ${
                        progress.cancelled ? "bg-red-100" : "bg-green-100"
                      }`}
                    >
                      {progress.cancelled ? (
                        <svg
                          className="w-4 h-4 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Meals included in your order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderDetails.items.map((meal: any) => (
                  <div
                    key={meal.id}
                    className="flex flex-col sm:flex-row gap-4 p-2 rounded-md transition-colors duration-200 hover:bg-muted/20"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image
                        src={
                          meal.recipe.image_url ||
                          "https://www.howsweeteats.com/wp-content/uploads/2023/01/sticky-garlic-butter-salmon-9.jpg"
                        }
                        alt={meal.recipe.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{meal.recipe.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {meal.recipe.description}
                      </p>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <p className="font-medium">
                        ${meal.price * meal.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {meal.quantity} × ${meal.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-2xl border shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${orderDetails.total_price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discount</span>
                <span className="text-green-600">
                  {orderDetails.discount_price
                    ? `-$${orderDetails.discount_price}`
                    : "$0"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${orderDetails.total_price}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Delivery Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {orderDetails?.delivery_address.split(",")[0]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderDetails?.delivery_address.split(",")[1]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderDetails?.delivery_address.split(",")[2]}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderDetails?.delivery_address?.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Delivery Date</h3>
                  <p className="text-sm text-muted-foreground">
                    {orderDetails?.status === "Cancelled"
                      ? "Cancelled"
                      : new Date(
                          orderDetails?.delivery_date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Payment Method</h3>
                  <p className="text-sm text-muted-foreground">
                    {orderDetails.payment.payment_method === "credit_card"
                      ? "Credit Card"
                      : "Mobile Money"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderDetails.status === "Cancelled"
                      ? "Payment not processed"
                      : `Charged on ${new Date(
                          orderDetails?.payment?.created_at
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}`}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full rounded-xl">
                Download Receipt
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
