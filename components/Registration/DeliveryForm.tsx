"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { mealPlanAtom, cartAtom } from "@/store/atoms";
import { createClient } from "@/utils/supabase/client";
import { useCart } from "@/components/Subscription/Cart/CartProvider";

const deliverySchema = z.object({
  firstName: z.string().min(2, "Please enter a valid first name"),
  lastName: z.string().min(2, "Please enter a valid last name"),
  address1: z.string().min(5, "Please enter a valid address"),
  address2: z.string().optional(),
  city: z.string().min(2, "Please enter a valid city"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  deliveryInstruction: z.string().optional(),
  sameAsBilling: z.boolean().default(true),
});

type DeliveryFormValues = z.infer<typeof deliverySchema>;

const makePaymentIntent = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/payment`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "fawaz.dogbe@gmail.com",
          amount: 1000,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Payment error:", errorData);
      throw new Error(errorData.message || "Payment failed");
    }

    const data = await response.json();
    console.log("Payment success:", data);
    return data;
  } catch (error) {
    console.error("Payment error:", error);
    throw error;
  }
};

const createSubscription = async (orderData: {
  transactionId: string;
  deliveryDetails: DeliveryFormValues;
  mealPlan: any;
  cartItems: any[];
}) => {
  try {
    // Get Supabase client
    const supabase = createClient();

    // Get the current session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error("No active session:", sessionError);
      throw new Error("Authentication required");
    }

    // Transform cart items to match the required format with hardcoded meal ID
    const selectedMeals = orderData.cartItems.map((item) => ({
      meal_kit_id: item.id,
      quantity: item.quantity,
    }));

    // Create subscription payload
    const subscriptionPayload = {
      meals_per_week: orderData.mealPlan.mealsPerWeek,
      people_count: orderData.mealPlan.people,
      price: orderData.mealPlan.prices.firstBoxTotal,
      preferred_delivery_day: "Monday", // Hardcoded as requested
      next_delivery_date: "2024-03-25", // Hardcoded as requested
      start_date: "2024-03-18", // Hardcoded as requested
      next_billing_date: "2024-04-18", // Hardcoded as requested
      payment_method: "credit_card", // Hardcoded as requested
      transaction_id: orderData.transactionId,
      selected_meals: selectedMeals,
    };

    console.log("Creating subscription with payload:", subscriptionPayload);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(subscriptionPayload),
        credentials: "include", // Include cookies for authentication
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Subscription creation failed:", errorData);
      throw new Error(errorData.message || "Failed to create subscription");
    }

    return await response.json();
  } catch (error) {
    console.error("Subscription creation error:", error);
    throw error;
  }
};

export default function DeliveryForm({
  handleNext,
  handleBack,
}: {
  handleNext: () => void;
  handleBack: () => void;
}) {
  const [mealPlan] = useAtom(mealPlanAtom);
  const [cartItems] = useAtom(cartAtom);
  const { clearCart } = useCart();

  useEffect(() => {
    console.log("DeliveryForm - Selected Meal Plan:", mealPlan);
    console.log("DeliveryForm - Cart Items:", cartItems);
  }, [mealPlan, cartItems]);

  const form = useForm<DeliveryFormValues>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      zipCode: "",
      phone: "",
      deliveryInstruction: "concierge",
      sameAsBilling: true,
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paystackHandler, setPaystackHandler] = useState<any>(null);
  const [progress, setProgress] = useState(3);

  useEffect(() => {
    // Dynamically import PaystackPop only on the client side
    import("@paystack/inline-js").then((module) => {
      const PaystackPop = module.default;
      const handler = new PaystackPop();
      setPaystackHandler(handler);
    });
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await makePaymentIntent();

      if (response.status === true && paystackHandler) {
        try {
          paystackHandler.newTransaction({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
            email: "fawaz.dogbe@gmail.com",
            amount: 1000,
            currency: "GHS",
            onSuccess: async (transaction: any) => {
              try {
                setProgress(4);
                console.log("Payment successful:", transaction);
                const transactionId = transaction.reference;
                console.log("Transaction ID:", transactionId);

                // Get form data
                const formData = form.getValues();

                // Create subscription in database with meal plan and cart data
                const subscriptionResponse = await createSubscription({
                  transactionId,
                  deliveryDetails: formData,
                  mealPlan,
                  cartItems,
                });

                // Clear the cart after successful payment
                clearCart();

                // Navigate to success page with both transaction ID and subscription ID
                router.replace(
                  `/subscribe/order-confirmation?transactionId=${transactionId}&orderNumber=${subscriptionResponse.id}`
                );
              } catch (error) {
                console.error("Error creating subscription:", error);
                toast.error(
                  "Payment successful but failed to create subscription. Please contact support."
                );
                setLoading(false);
              }
            },
            onCancel: () => {
              console.log("Payment cancelled");
              setLoading(false);
            },
            onError: (error: any) => {
              console.error("Payment error:", error);
              toast.error("Payment failed");
              setLoading(false);
            },
          });
        } catch (error) {
          console.error("Paystack popup error:", error);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  const onSubmit = async (data: DeliveryFormValues) => {
    try {
      await handlePayment();
    } catch (error) {
      console.error("Form submission error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ProgressBar progress={progress} />
      <div className="max-w-5xl mx-auto grid gap-8 lg:gap-16 pt-16 lg:grid-cols-[1fr,400px]">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Delivery Form */}
          <div className="lg:col-start-1">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="bg-muted/50 flex gap-2 p-4 rounded-lg">
                  <Truck className="w-5 h-5 text-black" />
                  <span className="text-muted-foreground text-sm">
                    Please provide your address to see available delivery dates.
                  </span>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} placeholder="First name" />
                              {!form.formState.errors.firstName &&
                                field.value.length >= 2 && (
                                  <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                                )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} placeholder="Last name" />
                              {!form.formState.errors.lastName &&
                                field.value.length >= 2 && (
                                  <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                                )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address line 1 *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} placeholder="Address line 1" />
                            {!form.formState.errors.address1 &&
                              field.value.length >= 5 && (
                                <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                              )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address line 2</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} placeholder="Address line 2" />
                            {!form.formState.errors.address2 &&
                              typeof field.value === "string" &&
                              field.value.length > 0 && (
                                <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                              )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} placeholder="City" />
                              {!form.formState.errors.city &&
                                field.value.length >= 2 && (
                                  <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                                )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP code *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} placeholder="ZIP code" />
                              {!form.formState.errors.zipCode &&
                                field.value.length >= 5 && (
                                  <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                                )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone number *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="tel"
                              placeholder="Phone number"
                            />
                            {!form.formState.errors.phone &&
                              field.value.length >= 10 && (
                                <Check className="absolute right-3 top-2.5 h-5 w-5 text-green-600" />
                              )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryInstruction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Instruction</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select delivery instruction" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="concierge">
                              Leave with concierge
                            </SelectItem>
                            <SelectItem value="door">Leave at door</SelectItem>
                            <SelectItem value="hand">Hand delivery</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="sameAsBilling"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <label
                          htmlFor="billing"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Billing is the same as delivery
                        </label>
                      </FormItem>
                    )}
                  /> */}
                </div>
              </form>
            </Form>
          </div>

          {/* Shipping Info */}
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
            <div className="bg-muted/50 flex gap-2 p-4 rounded-lg mt-4">
              <span className="text-muted-foreground text-sm">
                You can{" "}
                <span className="font-semibold text-black">
                  skip a week or cancel
                </span>{" "}
                at any time.
              </span>
            </div>
          </div>
        </div>

        {/* Order Summary and Checkout */}
        <div className="space-y-6 lg:col-start-2 lg:sticky lg:top-24 lg:self-start">
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
                    <span className="text-red-600">₵5.00</span> each
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Box price</span>
                  <span>₵199.80</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <div>
                    <span className="line-through text-muted-foreground mr-2">
                      ₵10.99
                    </span>
                    <span className="text-red-600 ">FREE</span>
                  </div>
                </div>
              </div>

              {/* <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between text-green-700 text-sm">
                  <span>Free Item for Life</span>
                  <span>FREE</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Choose a breakfast item or side item every time you order,
                  while subscription is active.
                </p>
              </div> */}

              <div className="flex justify-between text-red-600 text-sm">
                <span>Discount</span>
                <span>₵110.89</span>
              </div>

              <button className="text-green-700 text-sm font-medium">
                Apply promo code ▼
              </button>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold">First box total</span>
                  <div>
                    <span className="line-through text-muted-foreground mr-2">
                      ₵210.79
                    </span>
                    <span className="text-base font-bold text-red-600">
                      ₵99.90
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

          {/* Checkout Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleBack}
              className="w-full bg-red-200 text-black hover:bg-red-300"
              size="lg"
            >
              Go back
            </Button>
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800"
              size="lg"
              disabled={loading}
              onClick={form.handleSubmit(onSubmit)}
            >
              {loading ? "Processing..." : "Checkout"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
