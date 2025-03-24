"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  CreditCard,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardOverview() {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,389.50",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Subscribers",
      value: "1,248",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Meal Deliveries",
      value: "3,782",
      change: "+8.1%",
      trend: "up",
      icon: Package,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg. Order Value",
      value: "$112.40",
      change: "-2.3%",
      trend: "down",
      icon: CreditCard,
      color: "text-amber-500",
      bgColor: "bg-amber-100",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-7352",
      customer: "Emma Wilson",
      date: "Mar 23, 2025",
      amount: "$117.87",
      status: "Delivered",
    },
    {
      id: "ORD-7351",
      customer: "Michael Chen",
      date: "Mar 23, 2025",
      amount: "$89.99",
      status: "Processing",
    },
    {
      id: "ORD-7350",
      customer: "Sophia Rodriguez",
      date: "Mar 22, 2025",
      amount: "$117.87",
      status: "Delivered",
    },
    {
      id: "ORD-7349",
      customer: "James Johnson",
      date: "Mar 22, 2025",
      amount: "$117.87",
      status: "Delivered",
    },
    {
      id: "ORD-7348",
      customer: "Olivia Smith",
      date: "Mar 21, 2025",
      amount: "$89.99",
      status: "Delivered",
    },
  ];

  const topMeals = [
    { name: "Garlic Butter Steak", orders: 428, revenue: "$4,836.12" },
    { name: "Creamy Tuscan Chicken", orders: 356, revenue: "$4,021.24" },
    { name: "Honey Glazed Salmon", orders: 312, revenue: "$3,523.68" },
    { name: "Beef Burrito Bowl", orders: 287, revenue: "$3,242.31" },
    { name: "Vegetable Stir Fry", orders: 243, revenue: "$2,745.09" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className={`${stat.bgColor} p-2 sm:p-3 rounded-full`}>
                  <stat.icon
                    className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`}
                  />
                </div>
                <div className="flex items-center">
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  {stat.trend === "up" ? (
                    <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 ml-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 ml-1" />
                  )}
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                  {stat.title}
                </h3>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="meals">Top Meals</TabsTrigger>
          <TabsTrigger value="subscribers">New Subscribers</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Latest orders across all subscription plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-4 sm:-mx-6">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 sm:px-6 font-medium text-xs sm:text-sm">
                          {order.id}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm">
                          {order.customer}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-gray-500 text-xs sm:text-sm">
                          {order.date}
                        </td>
                        <td className="py-3 px-4 sm:px-6 font-medium text-xs sm:text-sm">
                          {order.amount}
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-xs sm:text-sm">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 sm:px-6 text-right text-xs sm:text-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 sm:h-8 sm:w-auto sm:px-2"
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">View All Orders</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meals" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Top Performing Meals</CardTitle>
              <CardDescription>
                Most ordered meals in the selected time period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-6">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-6 font-medium text-gray-500">
                        Meal
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-500">
                        Orders
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-500">
                        Revenue
                      </th>
                      <th className="text-right py-3 px-6 font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topMeals.map((meal, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-6 font-medium">{meal.name}</td>
                        <td className="py-3 px-6">{meal.orders}</td>
                        <td className="py-3 px-6 font-medium">
                          {meal.revenue}
                        </td>
                        <td className="py-3 px-6 text-right">
                          <Button variant="ghost" size="sm">
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">View All Meals</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>New Subscribers</CardTitle>
              <CardDescription>Recently joined subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-6">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-6 font-medium text-gray-500">
                        Customer
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-500">
                        Email
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-500">
                        Joined
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-500">
                        Plan
                      </th>
                      <th className="text-right py-3 px-6 font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Alex Thompson",
                        email: "alex.t@example.com",
                        date: "Mar 23, 2025",
                        plan: "Family Plan",
                      },
                      {
                        name: "Jessica Lee",
                        email: "jessica.l@example.com",
                        date: "Mar 22, 2025",
                        plan: "Couple Plan",
                      },
                      {
                        name: "David Miller",
                        email: "david.m@example.com",
                        date: "Mar 22, 2025",
                        plan: "Family Plan+",
                      },
                      {
                        name: "Sarah Wilson",
                        email: "sarah.w@example.com",
                        date: "Mar 21, 2025",
                        plan: "Couple Plan+",
                      },
                      {
                        name: "Robert Garcia",
                        email: "robert.g@example.com",
                        date: "Mar 20, 2025",
                        plan: "Family Plan",
                      },
                    ].map((subscriber, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-6 font-medium">
                          {subscriber.name}
                        </td>
                        <td className="py-3 px-6">{subscriber.email}</td>
                        <td className="py-3 px-6 text-gray-500">
                          {subscriber.date}
                        </td>
                        <td className="py-3 px-6">{subscriber.plan}</td>
                        <td className="py-3 px-6 text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline">View All Subscribers</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Subscription Growth
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              New subscribers over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-60 sm:h-80 flex items-center justify-center bg-gray-50 border rounded-md">
            <div className="text-center text-gray-500">
              <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-xs sm:text-sm">
                Subscription growth chart would appear here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Revenue Breakdown
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Revenue by subscription plan
            </CardDescription>
          </CardHeader>
          <CardContent className="h-60 sm:h-80 flex items-center justify-center bg-gray-50 border rounded-md">
            <div className="text-center text-gray-500">
              <DollarSign className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-gray-400" />
              <p className="text-xs sm:text-sm">
                Revenue breakdown chart would appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
