"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useState } from "react";
import {
  Download,
  Edit,
  Filter,
  MoreHorizontal,
  Search,
  Trash,
  UserPlus,
  CreditCard,
  Package,
  PauseCircle,
  PlayCircle,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Eye } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive" | "paused";
  plan: string;
  joined: string;
  orders: number;
  avatar: string;
}

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Add state for user profile, edit, and subscription management
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isManageSubscriptionOpen, setIsManageSubscriptionOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock user data
  const users: User[] = [
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma.w@example.com",
      status: "active",
      plan: "Family Plan",
      joined: "Jan 15, 2025",
      orders: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.c@example.com",
      status: "active",
      plan: "Couple Plan",
      joined: "Feb 3, 2025",
      orders: 8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      email: "sophia.r@example.com",
      status: "active",
      plan: "Family Plan+",
      joined: "Dec 10, 2024",
      orders: 15,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "James Johnson",
      email: "james.j@example.com",
      status: "inactive",
      plan: "Family Plan",
      joined: "Mar 5, 2025",
      orders: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Olivia Smith",
      email: "olivia.s@example.com",
      status: "active",
      plan: "Couple Plan+",
      joined: "Feb 18, 2025",
      orders: 6,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Daniel Brown",
      email: "daniel.b@example.com",
      status: "paused",
      plan: "Family Plan Max",
      joined: "Jan 22, 2025",
      orders: 9,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 7,
      name: "Ava Martinez",
      email: "ava.m@example.com",
      status: "active",
      plan: "Family Plan",
      joined: "Mar 1, 2025",
      orders: 4,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAllUsers = (e: CheckedState) => {
    if (e === true) {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      // In a real app, you would call an API to delete the user
      console.log(`Deleting user: ${userToDelete.id}`);
      setIsDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  // Add handlers for user profile, edit, and subscription management
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewUserOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleManageSubscription = (user: User) => {
    setSelectedUser(user);
    setIsManageSubscriptionOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsAddUserOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your subscribers and their subscription plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <Checkbox
                        id="select-all"
                        checked={
                          selectedUsers.length === filteredUsers.length &&
                          filteredUsers.length > 0
                        }
                        onCheckedChange={handleSelectAllUsers}
                      />
                    </div>
                  </th>
                  <th className="py-3 px-6 text-left font-medium text-gray-500">
                    User
                  </th>
                  <th className="py-3 px-6 text-left font-medium text-gray-500">
                    Status
                  </th>
                  <th className="py-3 px-6 text-left font-medium text-gray-500">
                    Plan
                  </th>
                  <th className="py-3 px-6 text-left font-medium text-gray-500">
                    Joined
                  </th>
                  <th className="py-3 px-6 text-left font-medium text-gray-500">
                    Orders
                  </th>
                  <th className="py-3 px-6 text-right font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="py-3 px-6">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                      />
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <Badge
                        className={`${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : user.status === "paused"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        } capitalize`}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-6">{user.plan}</td>
                    <td className="py-3 px-6 text-gray-500">{user.joined}</td>
                    <td className="py-3 px-6">{user.orders}</td>
                    <td className="py-3 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleManageSubscription(user)}
                          >
                            <Package className="h-4 w-4 mr-2" />
                            Manage Subscription
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No users found matching your search criteria.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredUsers.length}</span> of{" "}
              <span className="font-medium">{users.length}</span> users
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

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Add a new user to your subscription service.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder="Full name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan" className="text-right">
                Plan
              </Label>
              <Select defaultValue="family">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="couple">Couple Plan</SelectItem>
                  <SelectItem value="couple-plus">Couple Plan+</SelectItem>
                  <SelectItem value="family">Family Plan</SelectItem>
                  <SelectItem value="family-plus">Family Plan+</SelectItem>
                  <SelectItem value="family-max">Family Plan Max</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select defaultValue="active">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {userToDelete && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage
                    src={userToDelete.avatar}
                    alt={userToDelete.name}
                  />
                  <AvatarFallback>{userToDelete.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{userToDelete.name}</p>
                  <p className="text-sm text-gray-500">{userToDelete.email}</p>
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-md p-3 text-red-800 text-sm">
                <p>
                  <strong>Warning:</strong> Deleting this user will remove all
                  their data, including subscription history, orders, and
                  payment information.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              <Trash className="h-4 w-4 mr-2" />
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Profile Dialog */}
      <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              View complete information about this user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                    />
                    <AvatarFallback className="text-2xl">
                      {selectedUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-4 text-center">
                    <Badge
                      className={`${
                        selectedUser.status === "active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : selectedUser.status === "paused"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      } capitalize`}
                    >
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Subscription Plan
                      </h4>
                      <p className="font-medium">{selectedUser.plan}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Joined
                      </h4>
                      <p>{selectedUser.joined}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Total Orders
                      </h4>
                      <p>{selectedUser.orders}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">
                        Last Order
                      </h4>
                      <p>March 23, 2025</p>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="orders">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>

                <TabsContent value="orders" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto -mx-4 px-4">
                        <table className="w-full min-w-[500px]">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-2 font-medium text-gray-500">
                                Order ID
                              </th>
                              <th className="text-left py-3 px-2 font-medium text-gray-500">
                                Date
                              </th>
                              <th className="text-left py-3 px-2 font-medium text-gray-500">
                                Amount
                              </th>
                              <th className="text-left py-3 px-2 font-medium text-gray-500">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                id: "ORD-7352",
                                date: "Mar 23, 2025",
                                amount: "$117.87",
                                status: "Delivered",
                              },
                              {
                                id: "ORD-7340",
                                date: "Mar 16, 2025",
                                amount: "$117.87",
                                status: "Delivered",
                              },
                              {
                                id: "ORD-7328",
                                date: "Mar 9, 2025",
                                amount: "$117.87",
                                status: "Delivered",
                              },
                            ].map((order, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-2 font-medium">
                                  {order.id}
                                </td>
                                <td className="py-3 px-2">{order.date}</td>
                                <td className="py-3 px-2">{order.amount}</td>
                                <td className="py-3 px-2">
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                    {order.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="subscription" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Subscription Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Current Plan
                            </h4>
                            <p className="font-medium">{selectedUser.plan}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Status
                            </h4>
                            <Badge
                              className={`${
                                selectedUser.status === "active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : selectedUser.status === "paused"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              } capitalize`}
                            >
                              {selectedUser.status}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Next Delivery
                            </h4>
                            <p>March 30, 2025</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Billing Cycle
                            </h4>
                            <p>Weekly</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Meals Per Week
                            </h4>
                            <p>3 meals, 4 servings each</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Delivery Day
                            </h4>
                            <p>Tuesday</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleManageSubscription(selectedUser)
                            }
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Subscription
                          </Button>
                          {selectedUser.status === "active" ? (
                            <Button size="sm" variant="outline">
                              <PauseCircle className="h-4 w-4 mr-2" />
                              Pause Subscription
                            </Button>
                          ) : selectedUser.status === "paused" ? (
                            <Button size="sm" variant="outline">
                              <PlayCircle className="h-4 w-4 mr-2" />
                              Resume Subscription
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="mt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Billing Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Payment Method
                          </h4>
                          <div className="flex items-center mt-1">
                            <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Visa ending in 4242</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Billing Address
                          </h4>
                          <p className="mt-1">
                            123 Main Street
                            <br />
                            Apt 4B
                            <br />
                            New York, NY 10001
                            <br />
                            United States
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500">
                            Recent Transactions
                          </h4>
                          <div className="overflow-x-auto -mx-4 px-4 mt-2">
                            <table className="w-full min-w-[500px]">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-3 px-2 font-medium text-gray-500">
                                    Date
                                  </th>
                                  <th className="text-left py-3 px-2 font-medium text-gray-500">
                                    Description
                                  </th>
                                  <th className="text-left py-3 px-2 font-medium text-gray-500">
                                    Amount
                                  </th>
                                  <th className="text-left py-3 px-2 font-medium text-gray-500">
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  {
                                    date: "Mar 23, 2025",
                                    description: "Weekly Subscription",
                                    amount: "$117.87",
                                    status: "Paid",
                                  },
                                  {
                                    date: "Mar 16, 2025",
                                    description: "Weekly Subscription",
                                    amount: "$117.87",
                                    status: "Paid",
                                  },
                                  {
                                    date: "Mar 9, 2025",
                                    description: "Weekly Subscription",
                                    amount: "$117.87",
                                    status: "Paid",
                                  },
                                ].map((transaction, index) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-3 px-2">
                                      {transaction.date}
                                    </td>
                                    <td className="py-3 px-2">
                                      {transaction.description}
                                    </td>
                                    <td className="py-3 px-2 font-medium">
                                      {transaction.amount}
                                    </td>
                                    <td className="py-3 px-2">
                                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                        {transaction.status}
                                      </Badge>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewUserOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewUserOpen(false);
                if (selectedUser) {
                  handleEditUser(selectedUser);
                }
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and preferences.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-first-name">First Name</Label>
                      <Input
                        id="edit-first-name"
                        defaultValue={selectedUser.name.split(" ")[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-last-name">Last Name</Label>
                      <Input
                        id="edit-last-name"
                        defaultValue={selectedUser.name.split(" ")[1] || ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email Address</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      defaultValue={selectedUser.email}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone Number</Label>
                    <Input
                      id="edit-phone"
                      type="tel"
                      defaultValue="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Account Status</Label>
                    <Select defaultValue={selectedUser.status}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-dietary">Dietary Preferences</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vegetarian" />
                        <Label htmlFor="vegetarian">Vegetarian</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gluten-free" />
                        <Label htmlFor="gluten-free">Gluten-Free</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="dairy-free" />
                        <Label htmlFor="dairy-free">Dairy-Free</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="low-carb" />
                        <Label htmlFor="low-carb">Low Carb</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-allergies">Allergies</Label>
                    <Input
                      id="edit-allergies"
                      placeholder="e.g. Nuts, Shellfish"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-communication">
                      Communication Preferences
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-marketing">Email Marketing</Label>
                        <Switch id="email-marketing" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sms-updates">SMS Updates</Label>
                        <Switch id="sms-updates" defaultChecked />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage User Subscription Dialog */}
      <Dialog
        open={isManageSubscriptionOpen}
        onOpenChange={setIsManageSubscriptionOpen}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Manage Subscription</DialogTitle>
            <DialogDescription>
              Update subscription details for this user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <div className="mb-6">
                <h3 className="text-lg font-semibold">
                  {selectedUser.name}'s Subscription
                </h3>
                <p className="text-gray-500">{selectedUser.email}</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subscription-plan">Subscription Plan</Label>
                    <Select
                      defaultValue={selectedUser.plan
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
                    <Label htmlFor="subscription-status">Status</Label>
                    <Select defaultValue={selectedUser.status}>
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
                    <Select defaultValue="3">
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
                    <Select defaultValue="4">
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
                  <RadioGroup defaultValue="tuesday">
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

                <div className="space-y-2">
                  <Label htmlFor="delivery-address">Delivery Address</Label>
                  <Textarea
                    id="delivery-address"
                    defaultValue="123 Main Street, Apt 4B, New York, NY 10001"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="next-delivery">Next Delivery Date</Label>
                  <Input
                    id="next-delivery"
                    type="date"
                    defaultValue="2025-03-30"
                  />
                </div>

                {selectedUser.status === "paused" && (
                  <div className="space-y-2">
                    <Label htmlFor="pause-end-date">Resume Date</Label>
                    <Input
                      id="pause-end-date"
                      type="date"
                      defaultValue="2025-04-15"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="billing-cycle">Billing Cycle</Label>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsManageSubscriptionOpen(false)}
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
