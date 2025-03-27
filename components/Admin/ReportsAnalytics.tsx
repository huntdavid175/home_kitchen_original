"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  LineChart,
  PieChart,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState("30d");

  // Mock data for the reports
  const revenueStats = [
    {
      title: "Total Revenue",
      value: "$87,342.50",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Average Order Value",
      value: "$112.40",
      change: "+3.2%",
      trend: "up",
    },
    {
      title: "Subscription Revenue",
      value: "$78,621.75",
      change: "+15.7%",
      trend: "up",
    },
    {
      title: "One-time Orders",
      value: "$8,720.75",
      change: "-2.3%",
      trend: "down",
    },
  ];

  const customerStats = [
    {
      title: "Total Customers",
      value: "1,248",
      change: "+5.2%",
      trend: "up",
    },
    {
      title: "Active Subscribers",
      value: "1,087",
      change: "+7.8%",
      trend: "up",
    },
    {
      title: "Churn Rate",
      value: "3.2%",
      change: "-0.5%",
      trend: "up", // Down is good for churn
    },
    {
      title: "Customer Acquisition Cost",
      value: "$42.18",
      change: "-1.3%",
      trend: "up", // Down is good for CAC
    },
  ];

  const topPlans = [
    { name: "Family Plan", subscribers: 428, revenue: "$50,436.36" },
    { name: "Couple Plan", subscribers: 356, revenue: "$32,036.44" },
    { name: "Family Plan+", subscribers: 187, revenue: "$25,401.08" },
    { name: "Couple Plan+", subscribers: 116, revenue: "$9,734.72" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Reports & Analytics
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px] sm:w-[180px] text-xs sm:text-sm h-9 sm:h-10">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d" className="text-xs sm:text-sm">
                Last 7 days
              </SelectItem>
              <SelectItem value="30d" className="text-xs sm:text-sm">
                Last 30 days
              </SelectItem>
              <SelectItem value="90d" className="text-xs sm:text-sm">
                Last 90 days
              </SelectItem>
              <SelectItem value="year" className="text-xs sm:text-sm">
                This year
              </SelectItem>
              <SelectItem value="all" className="text-xs sm:text-sm">
                All time
              </SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="h-9 sm:h-10 text-xs sm:text-sm">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Custom Range
          </Button>
          <Button
            variant="outline"
            className="hidden md:flex h-9 sm:h-10 text-xs sm:text-sm"
          >
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6">
          <TabsTrigger value="revenue" className="text-xs sm:text-sm">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="customers" className="text-xs sm:text-sm">
            Customers
          </TabsTrigger>
          <TabsTrigger value="meals" className="text-xs sm:text-sm">
            Meals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="mt-0 space-y-4 sm:space-y-6">
          {/* Revenue Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {revenueStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500">
                      {stat.title}
                    </h3>
                    <div className="flex items-center">
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
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
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">
                Revenue Overview
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Revenue breakdown by subscription plan and time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-60 sm:h-80 flex items-center justify-center bg-gray-50 border rounded-md">
              <div className="text-center text-gray-500">
                <LineChart className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-gray-400" />
                <p className="text-xs sm:text-sm">
                  Revenue chart would appear here
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Top Subscription Plans */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">
                Top Subscription Plans
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Revenue by subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-4 sm:-mx-6">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Plan
                      </th>
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Subscribers
                      </th>
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Revenue
                      </th>
                      <th className="text-left py-3 px-3 sm:px-6 font-medium text-gray-500 text-xs sm:text-sm">
                        Growth
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPlans.map((plan, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-3 sm:px-6 font-medium text-xs sm:text-sm">
                          {plan.name}
                        </td>
                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                          {plan.subscribers}
                        </td>
                        <td className="py-3 px-3 sm:px-6 font-medium text-xs sm:text-sm">
                          {plan.revenue}
                        </td>
                        <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                          <div className="flex items-center">
                            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mr-1" />
                            <span className="text-green-600">
                              +{Math.floor(Math.random() * 10) + 5}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-0 space-y-6">
          {/* Customer Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {customerStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </h3>
                    <div className="flex items-center">
                      <span
                        className={`text-sm font-medium ${
                          (stat.trend === "up" &&
                            !stat.title.includes("Churn") &&
                            !stat.title.includes("Cost")) ||
                          (stat.trend === "down" &&
                            (stat.title.includes("Churn") ||
                              stat.title.includes("Cost")))
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      {stat.trend === "up" ? (
                        <ArrowUp
                          className={`h-4 w-4 ml-1 ${
                            !stat.title.includes("Churn") &&
                            !stat.title.includes("Cost")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                      ) : (
                        <ArrowDown
                          className={`h-4 w-4 ml-1 ${
                            stat.title.includes("Churn") ||
                            stat.title.includes("Cost")
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Customer Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>
                New and churned customers over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-gray-50 border rounded-md">
              <div className="text-center text-gray-500">
                <LineChart className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p>Customer growth chart would appear here</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Demographics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Age and gender distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-gray-50 border rounded-md">
                <div className="text-center text-gray-500">
                  <PieChart className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>Demographics chart would appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>Retention rate by cohort</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-gray-50 border rounded-md">
                <div className="text-center text-gray-500">
                  <Users className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>Retention chart would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="meals" className="mt-0 space-y-6">
          {/* Meal Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Meal Performance</CardTitle>
              <CardDescription>
                Most popular meals by orders and revenue
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-gray-50 border rounded-md">
              <div className="text-center text-gray-500">
                <LineChart className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p>Meal performance chart would appear here</p>
              </div>
            </CardContent>
          </Card>

          {/* Meal Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Meal Categories</CardTitle>
                <CardDescription>Orders by meal category</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-gray-50 border rounded-md">
                <div className="text-center text-gray-500">
                  <PieChart className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>Meal categories chart would appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Meal Ratings</CardTitle>
                <CardDescription>Customer satisfaction by meal</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-gray-50 border rounded-md">
                <div className="text-center text-gray-500">
                  <LineChart className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>Meal ratings chart would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Meals */}
          <Card>
            <CardHeader>
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
                      <th className="text-left py-3 px-6 font-medium text-gray-500">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Garlic Butter Steak",
                        orders: 428,
                        revenue: "$5,559.72",
                        rating: "4.8/5",
                      },
                      {
                        name: "Creamy Tuscan Chicken",
                        orders: 356,
                        revenue: "$4,268.44",
                        rating: "4.7/5",
                      },
                      {
                        name: "Honey Glazed Salmon",
                        orders: 312,
                        revenue: "$4,364.88",
                        rating: "4.9/5",
                      },
                      {
                        name: "Beef Burrito Bowl",
                        orders: 287,
                        revenue: "$3,441.13",
                        rating: "4.6/5",
                      },
                      {
                        name: "Vegetable Stir Fry",
                        orders: 243,
                        revenue: "$2,670.57",
                        rating: "4.5/5",
                      },
                    ].map((meal, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-6 font-medium">{meal.name}</td>
                        <td className="py-3 px-6">{meal.orders}</td>
                        <td className="py-3 px-6 font-medium">
                          {meal.revenue}
                        </td>
                        <td className="py-3 px-6">{meal.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
