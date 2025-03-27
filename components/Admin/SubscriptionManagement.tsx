"use client";

import { useState } from "react";
import {
  Calendar,
  Download,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckedState } from "@radix-ui/react-checkbox";

interface Customer {
  name: string;
  email: string;
  avatar: string;
}

interface Subscription {
  id: string;
  customer: Customer;
  plan: string;
  status: "active" | "paused" | "cancelled";
  startDate: string;
  nextDelivery: string;
  amount: string;
  deliveryDay: string;
  mealsPerWeek: number;
  servings: number;
  pauseEndDate?: string;
  cancellationDate?: string;
}

export default function SubscriptionManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>(
    []
  );
  const [isEditSubscriptionOpen, setIsEditSubscriptionOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Mock subscription data
  const subscriptions: Subscription[] = [
    {
      id: "SUB-1234",
      customer: {
        name: "Emma Wilson",
        email: "emma.w@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Family Plan",
      status: "active",
      startDate: "Jan 15, 2025",
      nextDelivery: "Mar 26, 2025",
      amount: "$117.87 / week",
      deliveryDay: "Tuesday",
      mealsPerWeek: 3,
      servings: 4,
    },
    {
      id: "SUB-1235",
      customer: {
        name: "Michael Chen",
        email: "michael.c@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Couple Plan",
      status: "active",
      startDate: "Feb 3, 2025",
      nextDelivery: "Mar 26, 2025",
      amount: "$89.99 / week",
      deliveryDay: "Tuesday",
      mealsPerWeek: 3,
      servings: 2,
    },
    {
      id: "SUB-1236",
      customer: {
        name: "Sophia Rodriguez",
        email: "sophia.r@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Family Plan+",
      status: "active",
      startDate: "Dec 10, 2024",
      nextDelivery: "Mar 26, 2025",
      amount: "$135.84 / week",
      deliveryDay: "Tuesday",
      mealsPerWeek: 4,
      servings: 4,
    },
    {
      id: "SUB-1237",
      customer: {
        name: "James Johnson",
        email: "james.j@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Family Plan",
      status: "paused",
      startDate: "Mar 5, 2025",
      nextDelivery: "Apr 16, 2025",
      amount: "$117.87 / week",
      deliveryDay: "Tuesday",
      mealsPerWeek: 3,
      servings: 4,
      pauseEndDate: "Apr 15, 2025",
    },
    {
      id: "SUB-1238",
      customer: {
        name: "Olivia Smith",
        email: "olivia.s@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Couple Plan+",
      status: "active",
      startDate: "Feb 18, 2025",
      nextDelivery: "Mar 27, 2025",
      amount: "$83.92 / week",
      deliveryDay: "Wednesday",
      mealsPerWeek: 4,
      servings: 2,
    },
    {
      id: "SUB-1239",
      customer: {
        name: "Daniel Brown",
        email: "daniel.b@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Family Plan Max",
      status: "cancelled",
      startDate: "Jan 22, 2025",
      nextDelivery: "N/A",
      amount: "$159.80 / week",
      deliveryDay: "Friday",
      mealsPerWeek: 5,
      servings: 4,
      cancellationDate: "Mar 15, 2025",
    },
    {
      id: "SUB-1240",
      customer: {
        name: "Ava Martinez",
        email: "ava.m@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      plan: "Family Plan",
      status: "active",
      startDate: "Mar 1, 2025",
      nextDelivery: "Mar 29, 2025",
      amount: "$117.87 / week",
      deliveryDay: "Saturday",
      mealsPerWeek: 3,
      servings: 4,
    },
  ];

  // Filter subscriptions based on search query and active tab
  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      (activeTab === "all" || activeTab === subscription.status) &&
      (subscription.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscription.customer.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        subscription.customer.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        subscription.plan.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectSubscription = (subscriptionId: string) => {
    if (selectedSubscriptions.includes(subscriptionId)) {
      setSelectedSubscriptions(
        selectedSubscriptions.filter((id) => id !== subscriptionId)
      );
    } else {
      setSelectedSubscriptions([...selectedSubscriptions, subscriptionId]);
    }
  };

  const handleSelectAllSubscriptions = (e: CheckedState) => {
    if (e === true) {
      setSelectedSubscriptions(
        filteredSubscriptions.map((subscription) => subscription.id)
      );
    } else {
      setSelectedSubscriptions([]);
    }
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsEditSubscriptionOpen(true);
  };

  // Update the getStatusBadge function to be more responsive
  const getStatusBadge = (status: Subscription["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 capitalize text-[10px] sm:text-xs">
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 capitalize text-[10px] sm:text-xs">
            Paused
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 capitalize text-[10px] sm:text-xs">
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 capitalize text-[10px] sm:text-xs">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Subscription Management
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Filter by Date
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>
            View and manage all customer subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Improve responsiveness of the subscription table and filters */}

          {/* Update the filters to be more responsive */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative w-full sm:w-auto sm:min-w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search subscriptions..."
                className="pl-9 text-xs sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 sm:h-10 text-xs sm:text-sm"
              >
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Filter
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px] sm:w-[180px] text-xs sm:text-sm h-9 sm:h-10">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs sm:text-sm">
                    All Plans
                  </SelectItem>
                  <SelectItem value="couple" className="text-xs sm:text-sm">
                    Couple Plan
                  </SelectItem>
                  <SelectItem
                    value="couple-plus"
                    className="text-xs sm:text-sm"
                  >
                    Couple Plan+
                  </SelectItem>
                  <SelectItem value="family" className="text-xs sm:text-sm">
                    Family Plan
                  </SelectItem>
                  <SelectItem
                    value="family-plus"
                    className="text-xs sm:text-sm"
                  >
                    Family Plan+
                  </SelectItem>
                  <SelectItem value="family-max" className="text-xs sm:text-sm">
                    Family Plan Max
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Make the tabs more responsive */}
          <Tabs
            defaultValue="all"
            className="mb-4 sm:mb-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All Subscriptions
              </TabsTrigger>
              <TabsTrigger value="active" className="text-xs sm:text-sm">
                Active
              </TabsTrigger>
              <TabsTrigger value="paused" className="text-xs sm:text-sm">
                Paused
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Update the subscription table to be more responsive */}
          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-3 sm:px-6 text-left">
                    <div className="flex items-center">
                      <Checkbox
                        id="select-all"
                        checked={
                          selectedSubscriptions.length ===
                            filteredSubscriptions.length &&
                          filteredSubscriptions.length > 0
                        }
                        onCheckedChange={handleSelectAllSubscriptions}
                      />
                    </div>
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Subscription ID
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Customer
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Plan
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Status
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Next Delivery
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Amount
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-right font-medium text-gray-500 text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-b">
                    <td className="py-3 px-3 sm:px-6">
                      <Checkbox
                        checked={selectedSubscriptions.includes(
                          subscription.id
                        )}
                        onCheckedChange={() =>
                          handleSelectSubscription(subscription.id)
                        }
                      />
                    </td>
                    <td className="py-3 px-3 sm:px-6 font-medium text-xs sm:text-sm">
                      {subscription.id}
                    </td>
                    <td className="py-3 px-3 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                          <AvatarImage
                            src={subscription.customer.avatar}
                            alt={subscription.customer.name}
                          />
                          <AvatarFallback>
                            {subscription.customer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-xs sm:text-sm">
                            {subscription.customer.name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {subscription.customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                      {subscription.plan}
                    </td>
                    <td className="py-3 px-3 sm:px-6">
                      {getStatusBadge(subscription.status)}
                    </td>
                    <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                      {subscription.nextDelivery}
                    </td>
                    <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                      {subscription.amount}
                    </td>
                    <td className="py-3 px-3 sm:px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 sm:h-8 sm:w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel className="text-xs sm:text-sm">
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-xs sm:text-sm"
                            onClick={() => handleEditSubscription(subscription)}
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            Edit Subscription
                          </DropdownMenuItem>
                          {/* Other dropdown items with similar responsive adjustments */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubscriptions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No subscriptions found matching your search criteria.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">
                {filteredSubscriptions.length}
              </span>{" "}
              of <span className="font-medium">{subscriptions.length}</span>{" "}
              subscriptions
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Subscription Dialog */}
      <Dialog
        open={isEditSubscriptionOpen}
        onOpenChange={setIsEditSubscriptionOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
            <DialogDescription>
              Modify subscription details and preferences.
            </DialogDescription>
          </DialogHeader>
          {selectedSubscription && (
            <div className="py-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {selectedSubscription.id}
                  {getStatusBadge(selectedSubscription.status)}
                </h3>
                <p className="text-sm text-gray-500">
                  Customer: {selectedSubscription.customer.name} (
                  {selectedSubscription.customer.email})
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan">Subscription Plan</Label>
                    <Select
                      defaultValue={selectedSubscription.plan
                        .toLowerCase()
                        .replace(/\s+/g, "-")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="couple-plan">Couple Plan</SelectItem>
                        <SelectItem value="couple-plan+">
                          Couple Plan+
                        </SelectItem>
                        <SelectItem value="family-plan">Family Plan</SelectItem>
                        <SelectItem value="family-plan+">
                          Family Plan+
                        </SelectItem>
                        <SelectItem value="family-plan-max">
                          Family Plan Max
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue={selectedSubscription.status}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meals-per-week">Meals Per Week</Label>
                    <Select
                      defaultValue={selectedSubscription.mealsPerWeek.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select meals per week" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Meals</SelectItem>
                        <SelectItem value="4">4 Meals</SelectItem>
                        <SelectItem value="5">5 Meals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="servings">Servings Per Meal</Label>
                    <Select
                      defaultValue={selectedSubscription.servings.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select servings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Servings</SelectItem>
                        <SelectItem value="4">4 Servings</SelectItem>
                        <SelectItem value="6">6 Servings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Delivery Day</Label>
                  <RadioGroup
                    defaultValue={selectedSubscription.deliveryDay.toLowerCase()}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tuesday" id="tuesday" />
                        <Label htmlFor="tuesday">Tuesday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wednesday" id="wednesday" />
                        <Label htmlFor="wednesday">Wednesday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="thursday" id="thursday" />
                        <Label htmlFor="thursday">Thursday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="friday" id="friday" />
                        <Label htmlFor="friday">Friday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="saturday" id="saturday" />
                        <Label htmlFor="saturday">Saturday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sunday" id="sunday" />
                        <Label htmlFor="sunday">Sunday</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monday" id="monday" />
                        <Label htmlFor="monday">Monday</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {selectedSubscription.status === "paused" && (
                  <div className="space-y-2">
                    <Label htmlFor="pause-end-date">Resume Date</Label>
                    <Input
                      id="pause-end-date"
                      type="date"
                      defaultValue={selectedSubscription.pauseEndDate}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditSubscriptionOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
