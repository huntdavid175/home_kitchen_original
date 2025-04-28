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
import { OrdersTable } from "./OrdersTable";
import { useOrders } from "./useOrders";

export function OrdersList({ orders }: { orders: any[] }) {
  const {
    isLoaded,
    currentPage,
    searchTerm,
    setSearchTerm,
    currentItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    paginate,
    nextPage,
    prevPage,
    getVisiblePageNumbers,
  } = useOrders(orders);

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
          <CardHeader className="pb-3 bg-gradient-to-r from-green-300 to-emerald-500">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Your Orders</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-9 rounded-xl border-none bg-white shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                {currentItems.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
                    <div className="text-sm text-muted-foreground">
                      Showing{" "}
                      <span className="font-medium">
                        {indexOfFirstItem + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, currentItems.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">{currentItems.length}</span>{" "}
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
