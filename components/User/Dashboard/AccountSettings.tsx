import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function AccountSettings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
          Account Settings
        </h2>
        <p className="text-muted-foreground">
          Manage your account preferences and personal information
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4 w-full justify-start overflow-x-auto rounded-xl bg-muted/50 p-1">
          <TabsTrigger
            value="profile"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="addresses"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Addresses
          </TabsTrigger>
          <TabsTrigger
            value="payment"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Payment Methods
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0 space-y-6">
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-green-300">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    defaultValue="Alex"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    defaultValue="Johnson"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="alex.johnson@example.com"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="(555) 123-4567"
                  className="rounded-xl"
                />
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <Button className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-green-300">
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input
                  id="current-password"
                  type="password"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="rounded-xl"
                />
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <Button className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="mt-0 space-y-6">
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Delivery Addresses</CardTitle>
                <CardDescription>
                  Manage your delivery locations
                </CardDescription>
              </div>
              <Button className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Add New Address
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="rounded-xl border p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Home</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Main Street, Apt 4B
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600 rounded-full"
                  >
                    Default
                  </Badge>
                </div>
              </div>

              <div className="rounded-xl border p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-medium">Work</h3>
                    <p className="text-sm text-muted-foreground">
                      456 Office Plaza, Suite 200
                      <br />
                      New York, NY 10002
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Button variant="link" className="h-auto p-0 text-green-600">
                    Set as Default
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-0 space-y-6">
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options</CardDescription>
              </div>
              <Button className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Add Payment Method
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="rounded-xl border p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-blue-600"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Visa ending in 4242</h3>
                      <p className="text-sm text-muted-foreground">
                        Expires 04/2025
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600 rounded-full"
                  >
                    Default
                  </Badge>
                </div>
              </div>

              <div className="rounded-xl border p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-orange-600"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Mastercard ending in 8888</h3>
                      <p className="text-sm text-muted-foreground">
                        Expires 09/2024
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="rounded-lg">
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Button variant="link" className="h-auto p-0 text-green-600">
                    Set as Default
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 space-y-6">
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control how and when we contact you
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl hover:bg-muted/20 transition-colors">
                  <div className="space-y-0.5">
                    <Label>Order Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about your order status
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl hover:bg-muted/20 transition-colors">
                  <div className="space-y-0.5">
                    <Label>Delivery Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders about upcoming deliveries
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl hover:bg-muted/20 transition-colors">
                  <div className="space-y-0.5">
                    <Label>Weekly Menu Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Be notified when new menus are available
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl hover:bg-muted/20 transition-colors">
                  <div className="space-y-0.5">
                    <Label>Special Offers</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional offers and discounts
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <div className="space-y-4 w-full">
                <div className="space-y-2">
                  <Label>Notification Method</Label>
                  <Select defaultValue="both">
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select notification method" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="email">Email Only</SelectItem>
                      <SelectItem value="sms">SMS Only</SelectItem>
                      <SelectItem value="both">Email and SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Save Preferences
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-0 space-y-6">
          <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle>Delivery Preferences</CardTitle>
              <CardDescription>
                Set your preferred delivery options
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>Preferred Delivery Day</Label>
                <Select defaultValue="tuesday">
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select delivery day" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred Time Window</Label>
                <Select defaultValue="afternoon">
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select time window" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="morning">
                      Morning (8am - 12pm)
                    </SelectItem>
                    <SelectItem value="afternoon">
                      Afternoon (12pm - 4pm)
                    </SelectItem>
                    <SelectItem value="evening">Evening (4pm - 8pm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Delivery Instructions</Label>
                <Textarea
                  placeholder="Add any special delivery instructions here..."
                  className="h-24 rounded-xl"
                  defaultValue="Please leave the package at the front door. The building has a keypad entry - code is 1234."
                />
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <Button className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
