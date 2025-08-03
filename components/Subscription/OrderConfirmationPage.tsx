"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight, Clock, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";

interface Recipe {
  id: string;
  name: string;
  subname: string;
  difficulty: string;
  total_time: string;
  description: string;
  cooking_time: string;
}

interface Item {
  id: string;
  recipe: Recipe;
  quantity: number;
  meal_kit_id: string;
  delivery_date: string;
}

interface Delivery {
  id: string;
  status: string;
  delivery_date: string;
  tracking_number: string | null;
  address: string;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
}

interface Subscription {
  id: string;
  user_id: string;
  meals_per_week: number;
  people_count: number;
  total_price: number;
  preferred_delivery_day: string;
  delivery_date: string;
  delivery_instruction: string;
  delivery_address: string;
  status: string;
  start_date: string;
  end_date: string | null;
  next_billing_date: string;
  created_at: string;
  updated_at: string;
  items: Item[];
  deliveries: Delivery[];
  payment: Payment;
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get("orderNumber");
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Search Params:", Object.fromEntries(searchParams.entries()));
    console.log("Subscription ID:", subscriptionId);

    const fetchSubscription = async () => {
      if (!subscriptionId) {
        setError("No subscription ID provided");
        setLoading(false);
        return;
      }

      try {
        // Get Supabase client
        const supabase = createClient();

        // Get the current session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session) {
          throw new Error("Authentication required");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL}/api/orders/${subscriptionId}`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subscription details");
        }

        const data = await response.json();
        console.log("Subscription data:", data);
        setSubscription(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [subscriptionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#17CF97] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !subscription) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "Subscription not found"}
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your order. We&apos;ve received your meal kit
            selection and are preparing it for delivery.
          </p>
        </div>

        <div className="bg-gray-50 rounded-none sm:rounded-lg shadow-none sm:shadow-md mb-8">
          <div className="p-4 sm:p-6">
            <div className="pb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Order #{subscription.id}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Placed on{" "}
                    {format(new Date(subscription.created_at), "MMMM d, yyyy")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to your email address.
                </p>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Estimated Delivery</h3>
                </div>
                <p className="text-sm">
                  {format(new Date(subscription.delivery_date), "MMMM d, yyyy")}
                </p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Delivery Address</h3>
                </div>
                <p className="text-sm">
                  {subscription.delivery_address ||
                    "Address will be updated soon"}
                </p>
              </div>

              <Separator />

              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-medium">Order Summary</h3>
                </div>
                <div className="grid gap-2">
                  {subscription.items.map((meal: any) => (
                    <div key={meal.id} className="flex justify-between text-sm">
                      <span>
                        {meal.quantity} × {meal.recipe.name}
                      </span>
                      <span>
                        $
                        {(Number(meal.price) * Number(meal.quantity)).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subscription.total_price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${subscription.total_price}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 border-t">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/user/subscriptions">
                  Track Order <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/meal-kits">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* What's next section with visual cards */}
        <h2 className="mb-6 text-xl font-semibold">What&apos;s Next?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 relative">
                <Image
                  src="https://images.everyplate.com/f_auto,fl_lossy,q_auto,w_500/everyplate_contentful/1iLd8LVdYs4eGVPnDaXyGK/1052081f9a549413441f9530371dc8af/CP_WE_DELIVER_TILE_02_2022.png"
                  alt="Chef preparing meal"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="mb-2 font-semibold">Preparing Your Meal Kit</h3>
              <p className="text-sm text-muted-foreground">
                Our chefs are carefully selecting fresh ingredients for your
                culinary adventure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 relative">
                <Image
                  src="https://images.pexels.com/photos/6994261/pexels-photo-6994261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Package delivery"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="mb-2 font-semibold">Delivery Updates</h3>
              <p className="text-sm text-muted-foreground">
                You&apos;ll receive email updates as your order is prepared and
                shipped to your door.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 relative">
                <Image
                  src="https://images.everyplate.com/f_auto,fl_lossy,q_auto,w_500/everyplate_contentful/1Dkw9fmzX8DXZTRFCaaUwy/fa3bc07d420d7613ca08d059ac35c202/CP_YOU_CHOOSE_TILE_01_2022.png"
                  alt="Dining experience"
                  // width={40}
                  // height={40}
                  className="object-cover rounded-full"
                  fill
                />
              </div>
              <h3 className="mb-2 font-semibold">Ready to Cook</h3>
              <p className="text-sm text-muted-foreground">
                Follow our simple recipe cards to create restaurant-quality
                meals in your own kitchen.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
