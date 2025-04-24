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
  //   const order: Order = {
  //     id: orderId,
  //     date: "April 11, 2023",
  //     deliveryDate: "April 13, 2023",
  //     status:
  //       orderId === "ORD-7291" || orderId === "ORD-1745"
  //         ? "Delivered"
  //         : orderId === "ORD-6384"
  //         ? "Preparing"
  //         : orderId === "ORD-5127"
  //         ? "Ready"
  //         : orderId === "ORD-4982"
  //         ? "Confirmed"
  //         : orderId === "ORD-3756"
  //         ? "Pending"
  //         : "Cancelled",
  //     total: "$59.96",
  //     subtotal: "$64.96",
  //     discount: "-$5.00",
  //     payment: {
  //       method: "Visa •••• 4242",
  //       date: "April 11, 2023",
  //     },
  //     address: {
  //       name: "Alex Johnson",
  //       street: "123 Main Street, Apt 4B",
  //       city: "New York, NY 10001",
  //       phone: "(555) 123-4567",
  //     },
  //     meals: [
  //       {
  //         id: 1,
  //         name: "Garlic Butter Salmon",
  //         description:
  //           "Pan-seared salmon with garlic butter sauce, served with roasted vegetables",
  //         price: "$14.99",
  //         image:
  //           "https://www.howsweeteats.com/wp-content/uploads/2023/01/sticky-garlic-butter-salmon-9.jpg",
  //       },
  //       {
  //         id: 2,
  //         name: "Vegetable Stir Fry",
  //         description:
  //           "Fresh vegetables stir-fried with tofu in a savory sauce, served with rice",
  //         price: "$14.99",
  //         image:
  //           "https://www.budgetbytes.com/wp-content/uploads/2022/03/Easy-Vegetable-Stir-Fry-V1.jpg",
  //       },
  //       {
  //         id: 3,
  //         name: "Chicken Fajita Bowl",
  //         description:
  //           "Grilled chicken with bell peppers and onions, served over cilantro lime rice",
  //         price: "$14.99",
  //         image:
  //           "https://whatsgabycooking.com/wp-content/uploads/2019/01/Albertsons-Chicken-Fajita-Bowls-Prep-Shot-2-copy-2.jpg",
  //       },
  //       {
  //         id: 4,
  //         name: "Mushroom Risotto",
  //         description:
  //           "Creamy arborio rice with sautéed mushrooms, garlic, and parmesan cheese",
  //         price: "$14.99",
  //         image:
  //           "https://assets.epicurious.com/photos/5c191ba2b950cf635908c333/1:1/w_2560%2Cc_limit/Oven-Risotto-with-Mushrooms-recipe-13122018.jpg",
  //       },
  //     ],
  //     timeline: [],
  //   };

  // Define timeline after order is created
  //   order.timeline = [
  //     {
  //       status: "Order Placed",
  //       date: "April 11, 2023",
  //       time: "10:23 AM",
  //       description: "Your order has been received and is being processed",
  //       completed: true,
  //     },
  //     {
  //       status: "Order Confirmed",
  //       date: "April 11, 2023",
  //       time: "10:30 AM",
  //       description:
  //         "Your order has been confirmed and scheduled for preparation",
  //       completed: orderDetails.status !== "Pending",
  //     },
  //     {
  //       status: "Preparing",
  //       date: "April 12, 2023",
  //       time: "8:15 AM",
  //       description: "Your meals are being prepared by our chefs",
  //       completed: ["Preparing", "Ready", "Delivered"].includes(
  //         orderDetails.status
  //       ),
  //     },
  //     {
  //       status: "Out for Delivery",
  //       date: "April 13, 2023",
  //       time: "9:45 AM",
  //       description: "Your order is on its way to you",
  //       completed: ["Ready", "Delivered"].includes(orderDetails.status),
  //     },
  //     {
  //       status: "Delivered",
  //       date: "April 13, 2023",
  //       time: "2:30 PM",
  //       description: "Your order has been delivered successfully",
  //       completed: orderDetails.status === "Delivered",
  //     },
  //   ];

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
          <Link href="/dashboard/orders">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to orders</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Order {orderDetails.id}
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
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
              <CardDescription>Track the status of your order</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <div className="space-y-4">
                {order.timeline.map((event: TimelineEvent, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          order.status === "Cancelled" && index > 0
                            ? "border-red-600 bg-red-50"
                            : event.completed
                            ? "border-green-600 bg-green-50"
                            : "border-muted-foreground bg-background"
                        }`}
                      >
                        {index === 0 && <Package className="h-4 w-4" />}
                        {index === 1 && <Package className="h-4 w-4" />}
                        {index === 2 && <Package className="h-4 w-4" />}
                        {index === 3 && <Truck className="h-4 w-4" />}
                        {index === 4 && <Package className="h-4 w-4" />}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className="absolute top-8 h-full w-0.5 bg-muted-foreground/30"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{event.status}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.date} at {event.time}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                      {order.status === "Cancelled" && index === 1 && (
                        <p className="mt-2 text-sm text-red-600 font-medium">
                          Order was cancelled on April 11, 2023 at 11:45 AM
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div> */}
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
                      <p className="font-medium">${meal.price}</p>
                      <p className="text-sm text-muted-foreground">
                        1 × ${meal.price}
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
