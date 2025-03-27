"use client";

import { useState } from "react";
import { AlertCircle, Calendar, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PauseSubscription() {
  const [pauseReason, setPauseReason] = useState("");
  const [pauseDuration, setPauseDuration] = useState("1-week");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pause or Cancel</h2>
          <p className="text-gray-600 mt-1">
            Temporarily pause or permanently cancel your subscription
          </p>
        </div>
      </div>

      <Alert className="bg-blue-50 text-blue-800 border-blue-200">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Need a break?</AlertTitle>
        <AlertDescription>
          You can pause your subscription for up to 8 weeks. Your subscription
          will automatically resume after the pause period.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">
            Pause Your Subscription
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">
                How long would you like to pause?
              </h4>
              <RadioGroup
                value={pauseDuration}
                onValueChange={setPauseDuration}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div className="flex items-start space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="1-week" id="1-week" className="mt-1" />
                  <div>
                    <Label
                      htmlFor="1-week"
                      className="font-medium cursor-pointer"
                    >
                      1 Week
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Pause until April 2, 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border rounded-lg p-4">
                  <RadioGroupItem
                    value="2-weeks"
                    id="2-weeks"
                    className="mt-1"
                  />
                  <div>
                    <Label
                      htmlFor="2-weeks"
                      className="font-medium cursor-pointer"
                    >
                      2 Weeks
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Pause until April 9, 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border rounded-lg p-4">
                  <RadioGroupItem
                    value="4-weeks"
                    id="4-weeks"
                    className="mt-1"
                  />
                  <div>
                    <Label
                      htmlFor="4-weeks"
                      className="font-medium cursor-pointer"
                    >
                      4 Weeks
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Pause until April 23, 2025
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 border rounded-lg p-4">
                  <RadioGroupItem
                    value="8-weeks"
                    id="8-weeks"
                    className="mt-1"
                  />
                  <div>
                    <Label
                      htmlFor="8-weeks"
                      className="font-medium cursor-pointer"
                    >
                      8 Weeks
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Pause until May 21, 2025
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="font-medium mb-3">
                Why are you pausing? (Optional)
              </h4>
              <Textarea
                placeholder="Tell us why you're pausing your subscription..."
                value={pauseReason}
                onChange={(e) => setPauseReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <Button className="w-full md:w-auto">
              <PauseCircle className="h-4 w-4 mr-2" />
              Pause Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-lg mb-4">Cancel Your Subscription</h3>
        <p className="text-gray-600 mb-4">
          We&apos;re sorry to see you go. If you cancel, your subscription will
          remain active until the end of your current billing period.
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Cancel Subscription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to cancel?</DialogTitle>
              <DialogDescription>
                Your subscription will remain active until March 31, 2025. You
                will not be charged after this date.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <h4 className="font-medium">Why are you cancelling?</h4>
              <RadioGroup defaultValue="too-expensive">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="too-expensive" id="too-expensive" />
                  <Label htmlFor="too-expensive">Too expensive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="food-quality" id="food-quality" />
                  <Label htmlFor="food-quality">Food quality issues</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="delivery-issues"
                    id="delivery-issues"
                  />
                  <Label htmlFor="delivery-issues">Delivery issues</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="too-much-food" id="too-much-food" />
                  <Label htmlFor="too-much-food">Too much food</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other reason</Label>
                </div>
              </RadioGroup>

              <Textarea
                placeholder="Please provide more details about why you're cancelling..."
                className="min-h-[100px]"
              />
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Pause Instead
              </Button>
              <Button variant="destructive" className="w-full">
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
