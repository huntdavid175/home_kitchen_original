import Image from "next/image";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Truck } from "lucide-react";
import ProgressBar from "../Subscription/progressBar";

export default function DeliveryForm({
  handleNext, handleBack
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
  
  return (
    <div className="container mx-auto p-6">
      <ProgressBar progress={3} />
      <div className="grid gap-16 pt-16 lg:grid-cols-[1fr,400px]">
        {/* Delivery Form */}
        <div className="space-y-6">
          <div className="bg-muted/50 flex gap-2 p-4 rounded-lg">
            <Truck className="w-5 h-5 text-black" />
            <span className="text-muted-foreground text-sm">
              Please provide your address to see available delivery dates.
            </span>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name *</Label>
                <div className="relative">
                  <Input id="firstName" placeholder="First name" required />
                  <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name *</Label>
                <div className="relative">
                  <Input id="lastName" placeholder="Last name" required />
                  <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address1">Address line 1 *</Label>
              <div className="relative">
                <Input id="address1" placeholder="Address line 1" required />
                <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address2">Address line 2</Label>
              <div className="relative">
                <Input id="address2" placeholder="Address line 2" />
                <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" placeholder="City" required />
                <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP code *</Label>
                <div className="relative">
                  <Input
                    id="zipCode"
                    placeholder="ZIP code"
                    defaultValue="N2L 3K8"
                    required
                  />
                  <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number *</Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  required
                />
                <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery">Delivery Instruction</Label>
              <Select defaultValue="concierge">
                <SelectTrigger id="delivery" className="w-full">
                  <SelectValue placeholder="Select delivery instruction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concierge">
                    Leave with concierge
                  </SelectItem>
                  <SelectItem value="door">Leave at door</SelectItem>
                  <SelectItem value="hand">Hand delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="billing" defaultChecked />
              <label
                htmlFor="billing"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Billing is the same as delivery
              </label>
            </div>
          </div>

          <div className="flex gap-4">
          <Button onClick={handleBack} className="w-full bg-red-200 text-black hover:bg-red-300" size="lg">
            Go back
          </Button>
          <Button onClick={handleNext} className="w-full bg-green-700 hover:bg-green-800" size="lg">
            Next step
          </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Order summary</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Image
                  src="https://img.hellofresh.com/w_256,q_auto,f_auto,c_limit,fl_lossy/f_auto,fl_lossy,q_auto/hellofresh_website/us/cms/checkout/order-summary.png"
                  alt="Meal box"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-sm">
                    5 meals for 4 people per week
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    20 servings at <span className="line-through">$9.99</span>{" "}
                    <span className="text-red-600">$5.00</span> each
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Box price</span>
                  <span>$199.80</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <div>
                    <span className="line-through text-muted-foreground mr-2">
                      $10.99
                    </span>
                    <span className="text-red-600 ">FREE</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between text-green-700 text-sm">
                  <span>Free Item for Life</span>
                  <span>FREE</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Choose a breakfast item or side item every time you order,
                  while subscription is active.
                </p>
              </div>

              <div className="flex justify-between text-red-600 text-sm">
                <span>Discount</span>
                <span>$110.89</span>
              </div>

              <button className="text-green-700 text-sm font-medium">
                Apply promo code ▼
              </button>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold">First box total</span>
                  <div>
                    <span className="line-through text-muted-foreground mr-2">
                      $210.79
                    </span>
                    <span className="text-base font-bold text-red-600">
                      $99.90
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-red-700 text-sm">
              <span className="font-medium">Order now</span> to get a box in{" "}
              <span className="font-medium">as few as 6 days</span>
            </div>
          </div>
          <div>
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Shipping</h2>
                <Button variant="link" className="text-green-700">
                  Edit
                </Button>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-2">Delivery details</h3>
                <p className="text-muted-foreground text-xs">
                  <span className="font-semibold text-black">
                    First delivery:
                  </span>
                  <br /> Tuesday, February 25 09:00-20:00
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  <span className="font-semibold text-black">
                    Delivery instructions:
                  </span>
                  <br /> Tuesday, February 25 09:00-20:00
                </p>
                <p className="text-muted-foreground text-xs mt-2">
                  <span className="font-semibold text-black">
                    Subsequent deliveries:
                  </span>
                  <br /> Tuesday, February 25 09:00-20:00
                </p>
              </div>
            </Card>
            <div className="bg-muted/50 flex gap-2 p-4 rounded-lg ">
              <span className="text-muted-foreground text-sm">
                You can{" "}
                <span className="font-semibold text-black">
                  {" "}
                  skip a week or cancel{" "}
                </span>{" "}
                at any time.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
