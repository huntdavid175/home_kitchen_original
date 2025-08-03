"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Check,
  Truck,
  MapPin,
  Phone,
  User,
  CreditCard,
  Calendar,
} from "lucide-react";
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
  deliveryDate: z.string().min(1, "Please select a delivery date"),
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
  const [loading, setLoading] = useState(false);
  const [paystackHandler, setPaystackHandler] = useState<any>(null);
  const [progress, setProgress] = useState(3);
  const router = useRouter();
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
      deliveryDate: "",
      deliveryInstruction: "concierge",
      sameAsBilling: true,
    },
  });

  const createPendingOrder = async (deliveryDetails: DeliveryFormValues) => {
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

      // Transform cart items to match the required format
      console.log("Cart items:", cartItems);
      const selectedMeals = cartItems.map((item: any) => ({
        recipe_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      // Create subscription payload
      const subscriptionPayload = {
        meals_per_week: mealPlan.mealsPerWeek,
        people_count: mealPlan.people,
        delivery_date: form.getValues().deliveryDate,
        delivery_instruction: form.getValues().deliveryInstruction,
        delivery_address: `${form.getValues().address1}, ${
          form.getValues().address2
        }, ${form.getValues().city}, ${form.getValues().zipCode}`,
        payment_method: "credit_card", // Hardcoded as requested
        items: selectedMeals,
      };

      console.log(
        "Creating pending subscription with payload:",
        subscriptionPayload
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(subscriptionPayload),
          credentials: "include",
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

  // useEffect(() => {
  //   console.log("DeliveryForm - Selected Meal Plan:", mealPlan);
  //   console.log("DeliveryForm - Cart Items:", cartItems);
  // }, [mealPlan, cartItems]);

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

      // First, create a pending subscription
      const formData = form.getValues();
      const orderResponse = await createPendingOrder(formData);
      const orderId = orderResponse.order.id;
      console.log("Order ID:", orderResponse);

      // Then process the payment
      // const paymentResponse = await makePaymentIntent();
      // console.log("Paymentintent response:", paymentResponse);

      if (orderResponse.payment.paystack.status === true && paystackHandler) {
        try {
          const response = await paystackHandler.resumeTransaction(
            orderResponse.payment.paystack.data.access_code,
            {
              onSuccess: () => {
                try {
                  setProgress(4);
                  // console.log("Payment successful:", transaction);
                  // const transactionId = transaction.reference;

                  // Clear the cart after successful payment
                  clearCart();

                  // Navigate to success page
                  router.replace(
                    `/subscribe/order-confirmation?&orderNumber=${orderId}`
                  );
                } catch (error) {
                  console.error("Error after payment:", error);
                  toast.error(
                    "Payment successful but there was an error. Please contact support."
                  );
                  setLoading(false);
                }
              },
            }
          );
          console.log("response of resume:", response);
          //     paystackHandler.resumeTransaction({
          //       // key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
          //       // email: "fawaz.dogbe@gmail.com",
          //       // amount: orderResponse.payment.amount * 100,
          //       // currency: "GHS",
          //       accessCode: paymentResponse.data.access_code,
          //       onSuccess: async (transaction: any) => {
          //         try {
          //           setProgress(4);
          //           console.log("Payment successful:", transaction);
          //           const transactionId = transaction.reference;

          //           // Clear the cart after successful payment
          //           clearCart();

          //           // Navigate to success page
          //           router.replace(
          //             `/subscribe/order-confirmation?transactionId=${transactionId}&orderNumber=${orderId}`
          //           );
          //         } catch (error) {
          //           console.error("Error after payment:", error);
          //           toast.error(
          //             "Payment successful but there was an error. Please contact support."
          //           );
          //           setLoading(false);
          //         }
          //       },
          //       onCancel: () => {
          //         console.log("Payment cancelled");
          //           setLoading(false);
          //         },
          //         onError: (error: any) => {
          //           console.error("Payment error:", error);
          //           toast.error("Payment failed");
          //           setLoading(false);
          //         },
          //       });
        } catch (error) {
          console.error("Paystack popup error:", error);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Payment process error:", error);
      toast.error("An error occurred during the payment process");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <ProgressBar progress={progress} />

      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Delivery Information
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please provide your delivery details to complete your order
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Delivery Form */}
              <Card className="p-8 shadow-lg border-0">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Delivery Details
                    </h2>
                    <p className="text-gray-600">
                      Where should we deliver your meals?
                    </p>
                  </div>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <User className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Personal Information
                        </h3>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                First name *
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    placeholder="Enter your first name"
                                    className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                  {!form.formState.errors.firstName &&
                                    field.value.length >= 2 && (
                                      <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
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
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Last name *
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    placeholder="Enter your last name"
                                    className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                  {!form.formState.errors.lastName &&
                                    field.value.length >= 2 && (
                                      <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
                                    )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Address Information
                        </h3>
                      </div>

                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="address1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Address line 1 *
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    placeholder="Street address, apartment, suite, etc."
                                    className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                  {!form.formState.errors.address1 &&
                                    field.value.length >= 5 && (
                                      <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
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
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Address line 2
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                    className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                  {!form.formState.errors.address2 &&
                                    typeof field.value === "string" &&
                                    field.value.length > 0 && (
                                      <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
                                    )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid gap-6 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">
                                  City *
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      placeholder="Enter your city"
                                      className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {!form.formState.errors.city &&
                                      field.value.length >= 2 && (
                                        <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
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
                                <FormLabel className="text-sm font-medium text-gray-700">
                                  ZIP code *
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      placeholder="Enter ZIP code"
                                      className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {!form.formState.errors.zipCode &&
                                      field.value.length >= 5 && (
                                        <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
                                      )}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Phone className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Contact Information
                        </h3>
                      </div>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Phone number *
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="Enter your phone number"
                                  className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                {!form.formState.errors.phone &&
                                  field.value.length >= 10 && (
                                    <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
                                  )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Delivery Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <Calendar className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Delivery Information
                        </h3>
                      </div>

                      <FormField
                        control={form.control}
                        name="deliveryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Delivery Date *
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="date"
                                  placeholder="Select delivery date"
                                  className="h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                                {!form.formState.errors.deliveryDate &&
                                  field.value && (
                                    <Check className="absolute right-3 top-3 h-6 w-6 text-green-600" />
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
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Delivery Instructions
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                                  <SelectValue placeholder="Select delivery instruction" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="concierge">
                                  Leave with concierge
                                </SelectItem>
                                <SelectItem value="door">
                                  Leave at door
                                </SelectItem>
                                <SelectItem value="hand">
                                  Hand delivery
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </Card>
            </div>

            {/* Order Summary and Checkout */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card className="p-6 shadow-lg border-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>

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
                      <h3 className="font-semibold text-sm text-gray-900">
                        {mealPlan.mealsPerWeek}{" "}
                        {mealPlan.mealsPerWeek === 1 ? "meal" : "meals"} for{" "}
                        {mealPlan.people}{" "}
                        {mealPlan.people === 1 ? "person" : "people"} per week
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {mealPlan.mealsPerWeek * mealPlan.people} total servings
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Meals total</span>
                      <span className="font-semibold text-gray-900">
                        ₵
                        {cartItems
                          .reduce(
                            (total, item) =>
                              total +
                              item.price * item.quantity * mealPlan.people,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-500 text-xs">
                        Paid at delivery
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">
                        Order total
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-red-600">
                          ₵
                          {cartItems
                            .reduce(
                              (total, item) =>
                                total +
                                item.price * item.quantity * mealPlan.people,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-700 text-sm">
                  <span className="font-medium">Order now</span> to get a box in{" "}
                  <span className="font-medium">as few as 6 days</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-4">
                <Button
                  type="button"
                  onClick={handleBack}
                  className="w-full h-12 bg-gray-100 text-gray-700 hover:bg-gray-200 border-0 font-semibold"
                  size="lg"
                >
                  Go back
                </Button>
                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 border-0 font-semibold shadow-lg"
                  size="lg"
                  disabled={loading}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {loading ? "Processing..." : "Complete Order"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
