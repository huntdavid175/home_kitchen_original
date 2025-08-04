"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";

export function RecentOrders({ recentOrders }: { recentOrders: any }) {
  const orders = recentOrders;
  //    [
  //     {
  //       id: "ORD-7291",
  //       date: "April 11, 2023",
  //       status: "Delivered",
  //       meals: 4,
  //       total: "$59.96",
  //     },
  //     {
  //       id: "ORD-6384",
  //       date: "April 4, 2023",
  //       status: "Preparing",
  //       meals: 3,
  //       total: "$44.97",
  //     },
  //     {
  //       id: "ORD-5127",
  //       date: "March 28, 2023",
  //       status: "Cancelled",
  //       meals: 4,
  //       total: "$59.96",
  //     },
  //   ];

  // Add ripple effect to buttons
  const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className =
      "absolute rounded-full bg-white bg-opacity-30 pointer-events-none";
    ripple.style.animation = "ripple 0.6s linear";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <Card className="rounded-2xl border-none shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-200 to-emerald-400">
        <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl bg-white shadow-sm relative overflow-hidden transition-all hover:-translate-y-1"
          asChild
          onClick={addRipple}
        >
          <Link
            href="/user/subscriptions/orders"
            className="flex items-center gap-1"
          >
            View All Orders
            <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="border-collapse border-spacing-0">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                  Order ID
                </TableHead>
                <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                  Date
                </TableHead>
                <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                  Status
                </TableHead>
                <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
                  Meals
                </TableHead>
                <TableHead className="py-3 px-4 text-sm font-medium text-gray-600 text-right">
                  Total
                </TableHead>
                <TableHead className="py-3 px-4 text-sm font-medium text-gray-600"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: any, index: number) => (
                <TableRow
                  key={order.id}
                  className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                    {order.formatted_order_number}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-t border-gray-100">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-t border-gray-100">
                    <Badge
                      variant="outline"
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.status.toLowerCase() === "delivered"
                          ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700 animate-[pulse_2s_infinite]"
                          : order.status.toLowerCase() === "preparing"
                          ? "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700 animate-[pulse_2s_infinite]"
                          : order.status.toLowerCase() === "pending"
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700 animate-[pulse_2s_infinite]"
                          : order.status.toLowerCase() === "confirmed"
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700 animate-[pulse_2s_infinite]"
                          : order.status.toLowerCase() === "ready"
                          ? "bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700 animate-[pulse_2s_infinite]"
                          : order.status.toLowerCase() === "cancelled"
                          ? "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                          : ""
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-4 border-t border-gray-100">
                    {order.items.length}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-t border-gray-100 text-right font-medium">
                    ${Number(order.total_price).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-4 border-t border-gray-100">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                      asChild
                      onClick={addRipple}
                    >
                      <Link
                        href={`/user/subscriptions/orders/${order.id}`}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
