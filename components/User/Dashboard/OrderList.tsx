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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OrdersList({ orders }: { orders: any[] }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  //   const orders = [
  //     {
  //       id: "ORD-7291",
  //       date: "April 11, 2023",
  //       status: "Delivered",
  //       meals: [
  //         "Garlic Butter Salmon",
  //         "Vegetable Stir Fry",
  //         "Chicken Fajita Bowl",
  //         "Mushroom Risotto",
  //       ],
  //       total: "$59.96",
  //       payment: "Visa •••• 4242",
  //     },
  //     {
  //       id: "ORD-6384",
  //       date: "April 4, 2023",
  //       status: "Preparing",
  //       meals: ["Beef Tacos", "Pasta Primavera", "Vegetable Stir Fry"],
  //       total: "$44.97",
  //       payment: "Visa •••• 4242",
  //     },
  //     {
  //       id: "ORD-5127",
  //       date: "March 28, 2023",
  //       status: "Ready",
  //       meals: [
  //         "Garlic Butter Salmon",
  //         "Chicken Fajita Bowl",
  //         "Beef Tacos",
  //         "Mushroom Risotto",
  //       ],
  //       total: "$59.96",
  //       payment: "Mastercard •••• 8888",
  //     },
  //     {
  //       id: "ORD-4982",
  //       date: "March 21, 2023",
  //       status: "Confirmed",
  //       meals: ["Pasta Primavera", "Vegetable Stir Fry"],
  //       total: "$29.98",
  //       payment: "Visa •••• 4242",
  //     },
  //     {
  //       id: "ORD-3756",
  //       date: "March 14, 2023",
  //       status: "Pending",
  //       meals: [
  //         "Garlic Butter Salmon",
  //         "Chicken Fajita Bowl",
  //         "Beef Tacos",
  //         "Mushroom Risotto",
  //       ],
  //       total: "$59.96",
  //       payment: "Visa •••• 4242",
  //     },
  //     {
  //       id: "ORD-2891",
  //       date: "March 7, 2023",
  //       status: "Cancelled",
  //       meals: ["Pasta Primavera", "Vegetable Stir Fry", "Beef Tacos"],
  //       total: "$44.97",
  //       payment: "Mastercard •••• 8888",
  //     },
  //     {
  //       id: "ORD-1745",
  //       date: "February 28, 2023",
  //       status: "Delivered",
  //       meals: [
  //         "Garlic Butter Salmon",
  //         "Chicken Fajita Bowl",
  //         "Beef Tacos",
  //         "Mushroom Risotto",
  //       ],
  //       total: "$59.96",
  //       payment: "Visa •••• 4242",
  //     },
  //     {
  //       id: "ORD-1632",
  //       date: "February 21, 2023",
  //       status: "Delivered",
  //       meals: ["Beef Tacos", "Pasta Primavera", "Vegetable Stir Fry"],
  //       total: "$44.97",
  //       payment: "Visa •••• 4242",
  //     },
  //     {
  //       id: "ORD-1521",
  //       date: "February 14, 2023",
  //       status: "Delivered",
  //       meals: [
  //         "Garlic Butter Salmon",
  //         "Chicken Fajita Bowl",
  //         "Beef Tacos",
  //         "Mushroom Risotto",
  //       ],
  //       total: "$59.96",
  //       payment: "Mastercard •••• 8888",
  //     },
  //     {
  //       id: "ORD-1423",
  //       date: "February 7, 2023",
  //       status: "Delivered",
  //       meals: ["Pasta Primavera", "Vegetable Stir Fry"],
  //       total: "$29.98",
  //       payment: "Visa •••• 4242",
  //     },
  //     {
  //       id: "ORD-1312",
  //       date: "January 31, 2023",
  //       status: "Delivered",
  //       meals: [
  //         "Garlic Butter Salmon",
  //         "Chicken Fajita Bowl",
  //         "Beef Tacos",
  //         "Mushroom Risotto",
  //       ],
  //       total: "$59.96",
  //       payment: "Visa •••• 4242",
  //     },
  //     {
  //       id: "ORD-1201",
  //       date: "January 24, 2023",
  //       status: "Delivered",
  //       meals: ["Pasta Primavera", "Vegetable Stir Fry", "Beef Tacos"],
  //       total: "$44.97",
  //       payment: "Mastercard •••• 8888",
  //     },
  //   ];

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Generate page numbers
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Limit visible page numbers
  const getVisiblePageNumbers = (): (number | string)[] => {
    if (totalPages <= 5) {
      return pageNumbers;
    }

    if (currentPage <= 3) {
      return [...pageNumbers.slice(0, 5), "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", ...pageNumbers.slice(totalPages - 5)];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  // Create a reusable OrdersTable component
  const OrdersTable = ({ orders }: { orders: typeof currentItems }) => (
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
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600 hidden md:table-cell">
              Meals
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600 hidden md:table-cell">
              Payment
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600 text-right">
              Total
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-gray-600"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <TableRow
                key={order.id}
                className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                style={{
                  animationDelay: `${0.1 + (index % itemsPerPage) * 0.1}s`,
                }}
              >
                <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                  {order.id}
                </TableCell>
                <TableCell className="py-3 px-4 border-t border-gray-100 flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {order.date}
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
                      order.status.slice(1).toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-4 border-t border-gray-100 hidden md:table-cell">
                  {order.items.length} meals
                </TableCell>
                <TableCell className="py-3 px-4 border-t border-gray-100 hidden md:table-cell">
                  {order.payment.payment_method === "credit_card"
                    ? "Momo •••• 7432"
                    : order.payment.payment_method}
                </TableCell>
                <TableCell className="py-3 px-4 border-t border-gray-100 text-right font-medium">
                  ${order.total_price}
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
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-6 text-center text-muted-foreground"
              >
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
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
        @keyframes slideIn {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
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
      <div className="flex flex-col gap-2 animate-[slideIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]">
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600">
          Order History
        </h2>
        <p className="text-muted-foreground">
          View and manage all your past orders
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Card
          className={`rounded-2xl border-none shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
            isLoaded
              ? "animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              : "opacity-0"
          }`}
        >
          <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Your Orders</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-9 rounded-xl border-none bg-white shadow-sm"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl bg-white shadow-sm relative overflow-hidden transition-all hover:-translate-y-1"
                      onClick={addRipple}
                    >
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl">
                    <DropdownMenuCheckboxItem checked>
                      Show all orders
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Last 30 days
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Last 90 days
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <TabsList className="p-4 justify-start gap-2 bg-transparent">
                <TabsTrigger
                  value="all"
                  className="rounded-xl data-[state=active]:bg-green-50 data-[state=active]:text-green-700 relative transition-all"
                >
                  All Orders
                </TabsTrigger>
                <TabsTrigger
                  value="recent"
                  className="rounded-xl data-[state=active]:bg-green-50 data-[state=active]:text-green-700 relative transition-all"
                >
                  Recent
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="rounded-xl data-[state=active]:bg-green-50 data-[state=active]:text-green-700 relative transition-all"
                >
                  Past 3 Months
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <OrdersTable orders={currentItems} />
                {/* Pagination */}
                {filteredOrders.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
                    <div className="text-sm text-muted-foreground">
                      Showing{" "}
                      <span className="font-medium">
                        {indexOfFirstItem + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredOrders.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredOrders.length}
                      </span>{" "}
                      orders
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                        onClick={(e) => {
                          addRipple(e);
                          prevPage();
                        }}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                      </Button>
                      <div className="hidden sm:flex items-center space-x-1">
                        {getVisiblePageNumbers().map((pageNumber, index) =>
                          pageNumber === "..." ? (
                            <span
                              key={`ellipsis-${index}`}
                              className="px-2 text-muted-foreground"
                            >
                              ...
                            </span>
                          ) : (
                            <Button
                              key={`page-${pageNumber}`}
                              variant={
                                currentPage === pageNumber
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className={`rounded-xl relative overflow-hidden transition-all hover:-translate-y-1 ${
                                currentPage === pageNumber
                                  ? "bg-green-600 hover:bg-green-700"
                                  : ""
                              }`}
                              onClick={(e) => {
                                addRipple(e);
                                paginate(pageNumber as number);
                              }}
                            >
                              {pageNumber}
                            </Button>
                          )
                        )}
                      </div>
                      <div className="sm:hidden">
                        <span className="text-sm font-medium">
                          Page {currentPage} of {totalPages}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                        onClick={(e) => {
                          addRipple(e);
                          nextPage();
                        }}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next page</span>
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="recent" className="mt-0">
                <OrdersTable orders={orders.slice(0, 3)} />
              </TabsContent>

              <TabsContent value="past" className="mt-0">
                <OrdersTable orders={orders.slice(0, 6)} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
