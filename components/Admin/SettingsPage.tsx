"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6">
          <TabsTrigger value="general" className="text-xs sm:text-sm">
            General
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-xs sm:text-sm">
            Billing
          </TabsTrigger>
          <TabsTrigger value="api" className="text-xs sm:text-sm">
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-0 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg">
                Company Information
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Update your company details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="company-name"
                      className="text-xs sm:text-sm"
                    >
                      Company Name
                    </Label>
                    <Input
                      id="company-name"
                      defaultValue="MealKit Inc."
                      className="text-xs sm:text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="website" className="text-xs sm:text-sm">
                      Website
                    </Label>
                    <Input
                      id="website"
                      defaultValue="https://mealkit.example.com"
                      className="text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <Label
                      htmlFor="support-email"
                      className="text-xs sm:text-sm"
                    >
                      Support Email
                    </Label>
                    <Input
                      id="support-email"
                      type="email"
                      defaultValue="support@mealkit.example.com"
                      className="text-xs sm:text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="(555) 123-4567"
                      className="text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="address" className="text-xs sm:text-sm">
                    Business Address
                  </Label>
                  <Textarea
                    id="address"
                    defaultValue="123 Main Street, Suite 100, San Francisco, CA 94107"
                    className="text-xs sm:text-sm"
                  />
                </div>

                <Button className="text-xs sm:text-sm h-9 sm:h-10">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>
                Configure timezone and currency settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america-los_angeles">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-los_angeles">
                          America/Los Angeles (PST/PDT)
                        </SelectItem>
                        <SelectItem value="america-new_york">
                          America/New York (EST/EDT)
                        </SelectItem>
                        <SelectItem value="europe-london">
                          Europe/London (GMT/BST)
                        </SelectItem>
                        <SelectItem value="asia-tokyo">
                          Asia/Tokyo (JST)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                        <SelectItem value="jpy">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure email notification settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-orders">New Orders</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications for new orders
                    </p>
                  </div>
                  <Switch
                    id="new-orders"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="subscription-changes">
                      Subscription Changes
                    </Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications when customers modify their
                      subscriptions
                    </p>
                  </div>
                  <Switch id="subscription-changes" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="payment-failures">Payment Failures</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications for failed payments
                    </p>
                  </div>
                  <Switch id="payment-failures" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="inventory-alerts">Inventory Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Receive notifications when inventory levels are low
                    </p>
                  </div>
                  <Switch id="inventory-alerts" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-emails">
                    Notification Recipients
                  </Label>
                  <Input
                    id="notification-emails"
                    placeholder="Email addresses (comma separated)"
                    defaultValue="admin@mealkit.example.com, operations@mealkit.example.com"
                  />
                  <p className="text-sm text-gray-500">
                    Enter email addresses that should receive administrative
                    notifications
                  </p>
                </div>

                <Button>Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>
                Configure SMS notification settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-order-updates">Order Updates</Label>
                    <p className="text-sm text-gray-500">
                      Send SMS notifications for important order updates
                    </p>
                  </div>
                  <Switch
                    id="sms-order-updates"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-delivery-alerts">Delivery Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Send SMS notifications for delivery status changes
                    </p>
                  </div>
                  <Switch id="sms-delivery-alerts" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sms-phone-numbers">SMS Recipients</Label>
                  <Input
                    id="sms-phone-numbers"
                    placeholder="Phone numbers (comma separated)"
                    defaultValue="+1 (555) 123-4567, +1 (555) 987-6543"
                  />
                  <p className="text-sm text-gray-500">
                    Enter phone numbers that should receive operational SMS
                    alerts
                  </p>
                </div>

                <Button>Save SMS Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Processors</CardTitle>
              <CardDescription>
                Configure payment processing settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="payment-processor">
                      Default Payment Processor
                    </Label>
                    <Select defaultValue="stripe">
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment processor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                        <SelectItem value="gbp">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe-api-key">Stripe API Key</Label>
                  <Input
                    id="stripe-api-key"
                    type="password"
                    defaultValue="sk_test_••••••••••••••••••••••••"
                  />
                  <p className="text-sm text-gray-500">
                    Your Stripe secret key. Keep this confidential.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook-secret">
                    Stripe Webhook Secret
                  </Label>
                  <Input
                    id="stripe-webhook-secret"
                    type="password"
                    defaultValue="whsec_••••••••••••••••••••••••"
                  />
                  <p className="text-sm text-gray-500">
                    Your Stripe webhook secret for verifying webhook events.
                  </p>
                </div>

                <Button>Save Payment Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>
                Configure tax calculation settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-tax">Automatic Tax Calculation</Label>
                    <p className="text-sm text-gray-500">
                      Automatically calculate taxes based on customer location
                    </p>
                  </div>
                  <Switch id="auto-tax" defaultChecked />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tax-provider">Tax Provider</Label>
                    <Select defaultValue="avalara">
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="avalara">Avalara</SelectItem>
                        <SelectItem value="taxjar">TaxJar</SelectItem>
                        <SelectItem value="manual">Manual Rates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-tax-rate">
                      Default Tax Rate (%)
                    </Label>
                    <Input
                      id="default-tax-rate"
                      type="number"
                      defaultValue="8.5"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </div>

                <Button>Save Tax Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for external integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex">
                    <Input
                      id="api-key"
                      readOnly
                      value="mk_live_••••••••••••••••••••••••••••••••••••••••••"
                      className="rounded-r-none"
                    />
                    <Button className="rounded-l-none">Regenerate</Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Use this key to authenticate API requests from your
                    applications.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    defaultValue="https://your-app.example.com/webhooks/mealkit"
                  />
                  <p className="text-sm text-gray-500">
                    We'll send webhook events to this URL.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Webhook Events</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="order-created" defaultChecked />
                      <Label htmlFor="order-created">order.created</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="order-updated" defaultChecked />
                      <Label htmlFor="order-updated">order.updated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="order-fulfilled" defaultChecked />
                      <Label htmlFor="order-fulfilled">order.fulfilled</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="subscription-created" defaultChecked />
                      <Label htmlFor="subscription-created">
                        subscription.created
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="subscription-updated" defaultChecked />
                      <Label htmlFor="subscription-updated">
                        subscription.updated
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="subscription-cancelled" defaultChecked />
                      <Label htmlFor="subscription-cancelled">
                        subscription.cancelled
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="payment-succeeded" defaultChecked />
                      <Label htmlFor="payment-succeeded">
                        payment.succeeded
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="payment-failed" defaultChecked />
                      <Label htmlFor="payment-failed">payment.failed</Label>
                    </div>
                  </div>
                </div>

                <Button>Save API Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>
                Configure integrations with other services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shipping-provider">Shipping Provider</Label>
                  <Select defaultValue="shippo">
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shippo">Shippo</SelectItem>
                      <SelectItem value="easypost">EasyPost</SelectItem>
                      <SelectItem value="shipstation">ShipStation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping-api-key">Shipping API Key</Label>
                  <Input
                    id="shipping-api-key"
                    type="password"
                    defaultValue="shippo_test_••••••••••••••••••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="analytics-provider">Analytics Provider</Label>
                  <Select defaultValue="google">
                    <SelectTrigger>
                      <SelectValue placeholder="Select analytics provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Analytics</SelectItem>
                      <SelectItem value="segment">Segment</SelectItem>
                      <SelectItem value="mixpanel">Mixpanel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="analytics-id">Analytics ID/Key</Label>
                  <Input id="analytics-id" defaultValue="G-XXXXXXXXXX" />
                </div>

                <Button>Save Integration Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
