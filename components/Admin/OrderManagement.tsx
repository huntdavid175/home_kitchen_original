"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  Calendar,
  Check,
  Clock,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Package,
  Search,
  Truck,
  X,
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
import { CheckedState } from "@radix-ui/react-checkbox";

interface Customer {
  name: string;
  email: string;
  avatar: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  customer: Customer;
  date: string;
  amount: string;
  status: "delivered" | "processing" | "shipped" | "cancelled";
  items: OrderItem[];
  deliveryAddress: string;
  deliveryDate: string;
  deliveryWindow: string;
}

export default function OrderManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Mock order data
  const orders: Order[] = [
    {
      id: "ORD-7352",
      customer: {
        name: "Emma Wilson",
        email: "emma.w@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Mar 23, 2025",
      amount: "$117.87",
      status: "delivered" as const,
      items: [
        { name: "Garlic Butter Steak", quantity: 1, price: "$12.99" },
        { name: "Creamy Tuscan Chicken", quantity: 1, price: "$11.99" },
        { name: "Vegetable Stir Fry", quantity: 1, price: "$10.99" },
      ],
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
      deliveryDate: "Mar 23, 2025",
      deliveryWindow: "8am - 8pm",
    },
    {
      id: "ORD-7351",
      customer: {
        name: "Michael Chen",
        email: "michael.c@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Mar 23, 2025",
      amount: "$89.99",
      status: "processing" as const,
      items: [
        { name: "Honey Glazed Salmon", quantity: 1, price: "$13.99" },
        { name: "Beef Burrito Bowl", quantity: 1, price: "$11.99" },
        { name: "Mediterranean Falafel Bowl", quantity: 1, price: "$10.99" },
      ],
      deliveryAddress: "456 Park Ave, San Francisco, CA 94107",
      deliveryDate: "Mar 25, 2025",
      deliveryWindow: "8am - 8pm",
    },
    {
      id: "ORD-7350",
      customer: {
        name: "Sophia Rodriguez",
        email: "sophia.r@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Mar 22, 2025",
      amount: "$117.87",
      status: "delivered" as const,
      items: [
        { name: "Garlic Butter Steak", quantity: 1, price: "$12.99" },
        { name: "Creamy Tuscan Chicken", quantity: 1, price: "$11.99" },
        { name: "Vegetable Stir Fry", quantity: 1, price: "$10.99" },
      ],
      deliveryAddress: "789 Elm St, Chicago, IL 60007",
      deliveryDate: "Mar 22, 2025",
      deliveryWindow: "8am - 8pm",
    },
    {
      id: "ORD-7349",
      customer: {
        name: "James Johnson",
        email: "james.j@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Mar 22, 2025",
      amount: "$117.87",
      status: "delivered" as const,
      items: [
        { name: "Garlic Butter Steak", quantity: 1, price: "$12.99" },
        { name: "Creamy Tuscan Chicken", quantity: 1, price: "$11.99" },
        { name: "Vegetable Stir Fry", quantity: 1, price: "$10.99" },
      ],
      deliveryAddress: "101 Oak St, Austin, TX 78701",
      deliveryDate: "Mar 22, 2025",
      deliveryWindow: "8am - 8pm",
    },
    {
      id: "ORD-7348",
      customer: {
        name: "Olivia Smith",
        email: "olivia.s@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Mar 21, 2025",
      amount: "$89.99",
      status: "delivered" as const,
      items: [
        { name: "Honey Glazed Salmon", quantity: 1, price: "$13.99" },
        { name: "Beef Burrito Bowl", quantity: 1, price: "$11.99" },
        { name: "Mediterranean Falafel Bowl", quantity: 1, price: "$10.99" },
      ],
      deliveryAddress: "222 Pine St, Seattle, WA 98101",
      deliveryDate: "Mar 21, 2025",
      deliveryWindow: "8am - 8pm",
    },
    {
      id: "ORD-7347",
      customer: {
        name: "Daniel Brown",
        email: "daniel.b@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Mar 21, 2025",
      amount: "$117.87",
      status: "cancelled" as const,
      items: [
        { name: "Garlic Butter Steak", quantity: 1, price: "$12.99" },
        { name: "Creamy Tuscan Chicken", quantity: 1, price: "$11.99" },
        { name: "Vegetable Stir Fry", quantity: 1, price: "$10.99" },
      ],
      deliveryAddress: "333 Maple Ave, Denver, CO 80202",
      deliveryDate: "Mar 21, 2025",
      deliveryWindow: "8am - 8pm",
    },
    {
      id: "ORD-7346",
      customer: {
        name: "Ava Martinez",
        email: "ava.m@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "Mar 20, 2025",
      amount: "$89.99",
      status: "shipped" as const,
      items: [
        { name: "Honey Glazed Salmon", quantity: 1, price: "$13.99" },
        { name: "Beef Burrito Bowl", quantity: 1, price: "$11.99" },
        { name: "Mediterranean Falafel Bowl", quantity: 1, price: "$10.99" },
      ],
      deliveryAddress: "444 Cedar Rd, Miami, FL 33101",
      deliveryDate: "Mar 24, 2025",
      deliveryWindow: "8am - 8pm",
    },
  ];

  // Filter orders based on search query and active tab
  const filteredOrders = orders.filter(
    (order) =>
      (activeTab === "all" || activeTab === order.status) &&
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAllOrders = (e: CheckedState) => {
    if (e === true) {
      setSelectedOrders(filteredOrders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewOrderOpen(true);
  };

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 capitalize text-[10px] sm:text-xs">
            Delivered
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 capitalize text-[10px] sm:text-xs">
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 capitalize text-[10px] sm:text-xs">
            Shipped
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

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <Check className="h-5 w-5 text-green-600" />;
      case "processing":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-600" />;
      case "cancelled":
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
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
          <CardTitle>Orders</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative w-full sm:w-auto sm:min-w-[250px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search orders..."
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
              <Select defaultValue="recent">
                <SelectTrigger className="w-[130px] sm:w-[180px] text-xs sm:text-sm h-9 sm:h-10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent" className="text-xs sm:text-sm">
                    Most Recent
                  </SelectItem>
                  <SelectItem value="oldest" className="text-xs sm:text-sm">
                    Oldest First
                  </SelectItem>
                  <SelectItem
                    value="amount-high"
                    className="text-xs sm:text-sm"
                  >
                    Amount (High to Low)
                  </SelectItem>
                  <SelectItem value="amount-low" className="text-xs sm:text-sm">
                    Amount (Low to High)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            className="mb-4 sm:mb-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All Orders
              </TabsTrigger>
              <TabsTrigger value="processing" className="text-xs sm:text-sm">
                Processing
              </TabsTrigger>
              <TabsTrigger
                value="shipped"
                className="text-xs sm:text-sm hidden sm:block"
              >
                Shipped
              </TabsTrigger>
              <TabsTrigger value="delivered" className="text-xs sm:text-sm">
                Delivered
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="text-xs sm:text-sm hidden sm:block"
              >
                Cancelled
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-3 sm:px-6 text-left">
                    <div className="flex items-center">
                      <Checkbox
                        id="select-all"
                        checked={
                          selectedOrders.length === filteredOrders.length &&
                          filteredOrders.length > 0
                        }
                        onCheckedChange={handleSelectAllOrders}
                      />
                    </div>
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Order ID
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Customer
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Date
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Amount
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Status
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-right font-medium text-gray-500 text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-3 sm:px-6">
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="py-3 px-3 sm:px-6 font-medium text-xs sm:text-sm">
                      {order.id}
                    </td>
                    <td className="py-3 px-3 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                          <AvatarImage
                            src={order.customer.avatar}
                            alt={order.customer.name}
                          />
                          <AvatarFallback>
                            {order.customer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-xs sm:text-sm">
                            {order.customer.name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {order.customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-6 text-gray-500 text-xs sm:text-sm">
                      {order.date}
                    </td>
                    <td className="py-3 px-3 sm:px-6 font-medium text-xs sm:text-sm">
                      {order.amount}
                    </td>
                    <td className="py-3 px-3 sm:px-6">
                      {getStatusBadge(order.status)}
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
                          <DropdownMenuItem
                            className="text-xs sm:text-sm"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            <ArrowDownToLine className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            Download Invoice
                          </DropdownMenuItem>
                          {order.status === "processing" && (
                            <DropdownMenuItem className="text-xs sm:text-sm">
                              <Truck className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              Mark as Shipped
                            </DropdownMenuItem>
                          )}
                          {order.status === "shipped" && (
                            <DropdownMenuItem className="text-xs sm:text-sm">
                              <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                              Mark as Delivered
                            </DropdownMenuItem>
                          )}
                          {(order.status === "processing" ||
                            order.status === "shipped") && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 text-xs sm:text-sm">
                                <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                Cancel Order
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No orders found matching your search criteria.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredOrders.length}</span> of{" "}
              <span className="font-medium">{orders.length}</span> orders
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

      {/* View Order Dialog */}
      <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View complete information about this order.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {selectedOrder.id}
                    {getStatusBadge(selectedOrder.status)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Placed on {selectedOrder.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ArrowDownToLine className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  {selectedOrder.status === "processing" && (
                    <Button size="sm">
                      <Truck className="h-4 w-4 mr-2" />
                      Mark as Shipped
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Customer Information
                    </h4>
                    <div className="mt-2 flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={selectedOrder.customer.avatar}
                          alt={selectedOrder.customer.name}
                        />
                        <AvatarFallback>
                          {selectedOrder.customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {selectedOrder.customer.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedOrder.customer.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Delivery Address
                    </h4>
                    <p className="mt-2">{selectedOrder.deliveryAddress}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Delivery Information
                    </h4>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Delivery Date: {selectedOrder.deliveryDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Time Window: {selectedOrder.deliveryWindow}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Order Status
                    </h4>
                    <div className="mt-2 flex items-center gap-2">
                      {getStatusIcon(selectedOrder.status)}
                      <span className="capitalize">{selectedOrder.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
                        Item
                      </th>
                      <th className="py-3 px-4 text-center text-sm font-medium text-gray-500">
                        Quantity
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-medium text-gray-500">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4 text-center">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-4 text-right">{item.price}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 font-medium" colSpan={2}>
                        Subtotal
                      </td>
                      <td className="py-3 px-4 text-right font-medium">
                        {selectedOrder.amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOrderOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
