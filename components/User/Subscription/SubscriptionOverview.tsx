"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  CalendarDays,
  Check,
  ChevronRight,
  Edit2,
  Plus,
  Users,
  X,
  Clock,
  Truck,
  Calendar,
  Filter,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Meal {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  popular?: boolean;
  new?: boolean;
}

interface Delivery {
  id: number;
  date: string;
  status: "confirmed" | "scheduled" | "planned";
  timeWindow: string;
  meals: string;
  hasMealsSelected: boolean;
  selectedMeals: number[];
}

interface Plan {
  id: number;
  name: string;
  servings: number;
  mealsPerWeek: number;
  pricePerServing: number;
  shipping: number;
}

interface TempSelectedMeals {
  [key: number]: number[];
}

export default function SubscriptionOverview() {
  // This would come from your API in a real app
  const [hasMealsSelected, setHasMealsSelected] = useState(false);
  const [isSelectingMeals, setIsSelectingMeals] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const nextDeliveryDate = "Tuesday, March 26, 2025";
  const [isViewingAllDeliveries, setIsViewingAllDeliveries] = useState(false);
  const [deliveryFilter, setDeliveryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const deliveriesPerPage = 5;

  const availableMeals: Meal[] = [
    {
      id: 1,
      name: "Garlic Butter Steak",
      description: "with Roasted Potatoes & Green Beans",
      image:
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/65afe538a33a91ae6a3f7dc6-dd87bf5a.jpeg",
      tags: ["35 min", "650 cal", "High Protein"],
      popular: true,
    },
    {
      id: 2,
      name: "Creamy Tuscan Chicken",
      description: "with Sun-Dried Tomatoes & Spinach",
      image:
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/665df842bb68d6ba93ee1b10-dd5d6be0.jpeg",
      tags: ["40 min", "580 cal", "Gluten-Free"],
      new: true,
    },
    {
      id: 3,
      name: "Vegetable Stir Fry",
      description: "with Sesame Ginger Sauce & Rice",
      image:
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/honey-chicken-jambalaya-fa9beda0.jpg",
      tags: ["25 min", "520 cal", "Vegetarian"],
    },
    {
      id: 4,
      name: "Honey Glazed Salmon",
      description: "with Roasted Brussels Sprouts & Quinoa",
      image:
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/sweet-southwest-chicken-salad-e6a04578.jpg",
      tags: ["30 min", "590 cal", "Omega-3"],
    },
    {
      id: 5,
      name: "Beef Burrito Bowl",
      description: "with Cilantro Lime Rice & Black Beans",
      image:
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/63694ec409ce3d5d010754bc-4e392210.jpg",
      tags: ["35 min", "720 cal", "Family Favorite"],
      popular: true,
    },
    {
      id: 6,
      name: "Mediterranean Falafel Bowl",
      description: "with Hummus & Tzatziki",
      image:
        "https://img.hellofresh.com/c_fit,f_auto,fl_lossy,h_1100,q_50,w_2600/hellofresh_s3/image/64107772879178b2770f5e75-079b8eb9.jpg",
      tags: ["30 min", "550 cal", "Vegetarian"],
      new: true,
    },
  ];

  // Generate upcoming deliveries for the next 3 months (12 weeks)
  const allDeliveries = Array.from({ length: 12 }, (_, i) => {
    // Calculate date - starting from next Tuesday (March 26, 2025)
    const date = new Date(2025, 2, 25 + i * 7); // March 25, 2025 + 7 days per week
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // First 2 deliveries are confirmed, next 2 are scheduled, rest are planned
    let status = "planned";
    if (i < 2) status = "confirmed";
    else if (i < 4) status = "scheduled";

    // First delivery doesn't have meals selected, others are random
    const hasMealsSelected = i === 0 ? false : Math.random() > 0.3;

    return {
      id: i + 1,
      date: formattedDate,
      status,
      timeWindow: "8am - 8pm",
      meals: "3 meals, 4 servings each",
      hasMealsSelected,
      selectedMeals: hasMealsSelected
        ? Array.from(
            { length: 3 },
            () => Math.floor(Math.random() * availableMeals.length) + 1
          )
        : [],
    };
  });

  const [isChangingPlan, setIsChangingPlan] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan>({
    id: 3,
    name: "Family Plan",
    servings: 4,
    mealsPerWeek: 3,
    pricePerServing: 8.99,
    shipping: 9.99,
  });
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectingMealsForDelivery, setSelectingMealsForDelivery] = useState<
    number | null
  >(null);
  const [tempSelectedMeals, setTempSelectedMeals] = useState<TempSelectedMeals>(
    {}
  );

  // Filter deliveries based on current filter
  const filteredDeliveries = allDeliveries.filter((delivery) => {
    if (deliveryFilter === "all") return true;
    return delivery.status === deliveryFilter;
  });

  // Paginate deliveries
  const indexOfLastDelivery = currentPage * deliveriesPerPage;
  const indexOfFirstDelivery = indexOfLastDelivery - deliveriesPerPage;
  const currentDeliveries = filteredDeliveries.slice(
    indexOfFirstDelivery,
    indexOfLastDelivery
  );
  const totalPages = Math.ceil(filteredDeliveries.length / deliveriesPerPage);

  const handleSelectMeals = () => {
    setIsSelectingMeals(true);
  };

  const handleToggleMeal = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(selectedMeals.filter((id: number) => id !== mealId));
    } else {
      if (selectedMeals.length < 3) {
        setSelectedMeals([...selectedMeals, mealId]);
      }
    }
  };

  const handleConfirmMealSelection = () => {
    setHasMealsSelected(true);
    setIsSelectingMeals(false);
  };

  const handleSelectMealsForDelivery = (deliveryId: number) => {
    setSelectingMealsForDelivery(deliveryId);
    // Initialize selected meals for this delivery if not already done
    if (!tempSelectedMeals[deliveryId]) {
      const delivery = allDeliveries.find((d) => d.id === deliveryId);
      if (delivery) {
        setTempSelectedMeals({
          ...tempSelectedMeals,
          [deliveryId]: delivery.selectedMeals || [],
        });
      }
    }
  };

  const handleToggleMealForDelivery = (mealId: number) => {
    if (!selectingMealsForDelivery) return;

    const currentSelected = tempSelectedMeals[selectingMealsForDelivery] || [];

    if (currentSelected.includes(mealId)) {
      setTempSelectedMeals({
        ...tempSelectedMeals,
        [selectingMealsForDelivery]: currentSelected.filter(
          (id: number) => id !== mealId
        ),
      });
    } else {
      if (currentSelected.length < 3) {
        setTempSelectedMeals({
          ...tempSelectedMeals,
          [selectingMealsForDelivery]: [...currentSelected, mealId],
        });
      }
    }
  };

  const handleConfirmMealSelectionForDelivery = () => {
    // Update the delivery to mark meals as selected
    const updatedDeliveries = allDeliveries.map((delivery) =>
      delivery.id === selectingMealsForDelivery
        ? {
            ...delivery,
            hasMealsSelected: true,
            selectedMeals: tempSelectedMeals[selectingMealsForDelivery] || [],
          }
        : delivery
    );

    // Update first delivery in state for the overview page
    if (selectingMealsForDelivery === 1) {
      setHasMealsSelected(true);
      setSelectedMeals(tempSelectedMeals[selectingMealsForDelivery] || []);
    }

    // Close the meal selection dialog
    setSelectingMealsForDelivery(null);
  };

  const handleSkipDelivery = (deliveryId: number) => {
    // In a real app, you would call an API to skip the delivery
    alert(
      `Delivery ${deliveryId} has been skipped. This would update in the backend.`
    );
  };

  if (isSelectingMeals) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Select Your Meals
            </h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Choose 3 meals for delivery on {nextDeliveryDate}
            </p>
          </div>
          <div className="self-start mt-2 md:mt-0 flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedMeals.length}/3 selected
            </span>
            <Button
              onClick={handleConfirmMealSelection}
              disabled={selectedMeals.length !== 3}
              className="w-full md:w-auto"
            >
              <Check className="h-4 w-4 mr-2" />
              Confirm Selection
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableMeals.map((meal) => (
            <Card
              key={meal.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                selectedMeals.includes(meal.id)
                  ? "ring-2 ring-blue-500"
                  : "hover:shadow-md"
              }`}
              onClick={() => handleToggleMeal(meal.id)}
            >
              <div className="relative h-48">
                <Image
                  src={meal.image || "/placeholder.svg"}
                  alt={meal.name}
                  fill
                  className="object-cover"
                />
                {meal.popular && (
                  <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 hover:bg-green-100">
                    Popular
                  </Badge>
                )}
                {meal.new && (
                  <Badge className="absolute top-2 left-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                    New
                  </Badge>
                )}
                {selectedMeals.includes(meal.id) && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-blue-500 text-white rounded-full p-2">
                      <Check className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{meal.name}</h3>
                <p className="text-gray-600 text-sm">{meal.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {meal.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      Servings:
                    </span>
                    <span className="font-medium">4</span>
                  </div>
                  <Button
                    size="sm"
                    variant={
                      selectedMeals.includes(meal.id) ? "default" : "outline"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleMeal(meal.id);
                    }}
                  >
                    {selectedMeals.includes(meal.id) ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Select
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={() => setIsSelectingMeals(false)}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleConfirmMealSelection}
            disabled={selectedMeals.length !== 3}
          >
            <Check className="h-4 w-4 mr-2" />
            Confirm Selection ({selectedMeals.length}/3)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Your Subscription
          </h2>
          <p className="text-gray-600 mt-1 text-sm md:text-base">
            Current plan and upcoming deliveries
          </p>
        </div>
        <Button
          variant="outline"
          className="self-start mt-2 md:mt-0 w-full md:w-auto"
          onClick={() => setIsChangingPlan(true)}
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Change Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{currentPlan.name}</h3>
                <div className="flex items-center mt-1 text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{currentPlan.servings} servings</span>
                </div>
                <div className="flex items-center mt-1 text-gray-600">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span>{currentPlan.mealsPerWeek} meals per week</span>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Active
              </Badge>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per serving</span>
                <span className="font-medium">
                  ${currentPlan.pricePerServing.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  ${currentPlan.shipping.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-semibold mt-4">
                <span>Weekly total</span>
                <span>
                  $
                  {(
                    currentPlan.pricePerServing *
                      currentPlan.servings *
                      currentPlan.mealsPerWeek +
                    currentPlan.shipping
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg">Next Delivery</h3>
            <p className="text-gray-600 mt-1">{nextDeliveryDate}</p>

            {!hasMealsSelected ? (
              <Alert className="mt-4 bg-amber-50 border-amber-200 text-amber-800">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Meals not selected</AlertTitle>
                <AlertDescription className="mt-1">
                  You haven't selected your meals for this delivery yet. Please
                  select your meals before the cutoff date.
                </AlertDescription>
                <Button
                  className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleSelectMeals}
                >
                  Select Your Meals Now
                </Button>
              </Alert>
            ) : (
              <div className="mt-4 space-y-4">
                {selectedMeals.map((mealId) => {
                  const meal = availableMeals.find((m) => m.id === mealId);
                  if (!meal) return null;
                  return (
                    <div key={meal.id} className="flex items-center gap-4">
                      <div className="h-16 w-16 relative rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={meal.image || "/placeholder.svg"}
                          alt={meal.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{meal.name}</h4>
                        <p className="text-sm text-gray-600">
                          {meal.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => setIsViewingAllDeliveries(true)}
            >
              <span>View All Upcoming Deliveries</span>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 md:p-6">
        <div className="flex flex-col gap-4 items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">Refer a Friend</h3>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Give $40, get $40 when your friends sign up
            </p>
          </div>
          <Button className="w-full md:w-auto">Share Referral Link</Button>
        </div>
      </div>

      {/* Plan Change Dialog */}
      <Dialog
        open={isChangingPlan}
        onOpenChange={(open) => !open && setIsChangingPlan(false)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Change Your Meal Plan</DialogTitle>
            <DialogDescription>
              Select a new plan that better fits your needs. Changes will apply
              to your next billing cycle.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <h3 className="font-medium text-sm text-gray-500 mb-3">
              CURRENT PLAN
            </h3>
            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {currentPlan.name}
                    </h3>
                    <div className="flex items-center mt-1 text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{currentPlan.servings} servings</span>
                    </div>
                    <div className="flex items-center mt-1 text-gray-600">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{currentPlan.mealsPerWeek} meals per week</span>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    Current
                  </Badge>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per serving</span>
                    <span className="font-medium">
                      ${currentPlan.pricePerServing.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      ${currentPlan.shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold mt-4">
                    <span>Weekly total</span>
                    <span>
                      $
                      {(
                        currentPlan.pricePerServing *
                          currentPlan.servings *
                          currentPlan.mealsPerWeek +
                        currentPlan.shipping
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="font-medium text-sm text-gray-500 mb-3">
              AVAILABLE PLANS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 1,
                  name: "Couple Plan",
                  servings: 2,
                  mealsPerWeek: 3,
                  pricePerServing: 10.99,
                  shipping: 8.99,
                },
                {
                  id: 2,
                  name: "Couple Plan+",
                  servings: 2,
                  mealsPerWeek: 4,
                  pricePerServing: 10.49,
                  shipping: 8.99,
                },
                {
                  id: 3,
                  name: "Family Plan",
                  servings: 4,
                  mealsPerWeek: 3,
                  pricePerServing: 8.99,
                  shipping: 9.99,
                },
                {
                  id: 4,
                  name: "Family Plan+",
                  servings: 4,
                  mealsPerWeek: 4,
                  pricePerServing: 8.49,
                  shipping: 9.99,
                },
                {
                  id: 5,
                  name: "Family Plan Max",
                  servings: 4,
                  mealsPerWeek: 5,
                  pricePerServing: 7.99,
                  shipping: 9.99,
                },
                {
                  id: 6,
                  name: "Large Family Plan",
                  servings: 6,
                  mealsPerWeek: 3,
                  pricePerServing: 7.49,
                  shipping: 9.99,
                },
              ]
                .filter(
                  (plan) =>
                    !(
                      plan.servings === currentPlan.servings &&
                      plan.mealsPerWeek === currentPlan.mealsPerWeek
                    )
                )
                .map((plan) => (
                  <Card
                    key={plan.id}
                    className={`cursor-pointer transition-all ${
                      selectedPlan?.id === plan.id
                        ? "ring-2 ring-[#067a46]"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{plan.name}</h3>
                          <div className="flex items-center mt-1 text-gray-600">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{plan.servings} servings</span>
                          </div>
                          <div className="flex items-center mt-1 text-gray-600">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            <span>{plan.mealsPerWeek} meals per week</span>
                          </div>
                        </div>
                        {plan.mealsPerWeek > 3 && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Save ${(0.5 * (plan.mealsPerWeek - 3)).toFixed(2)}
                            /serving
                          </Badge>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Price per serving
                          </span>
                          <span className="font-medium">
                            ${plan.pricePerServing.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium">
                            ${plan.shipping.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between font-semibold mt-4">
                          <span>Weekly total</span>
                          <span>
                            $
                            {(
                              plan.pricePerServing *
                                plan.servings *
                                plan.mealsPerWeek +
                              plan.shipping
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {selectedPlan && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Plan Change Summary</h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Current weekly total:</span>
                <span>
                  $
                  {(
                    currentPlan.pricePerServing *
                      currentPlan.servings *
                      currentPlan.mealsPerWeek +
                    currentPlan.shipping
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>New weekly total:</span>
                <span>
                  $
                  {(
                    selectedPlan.pricePerServing *
                      selectedPlan.servings *
                      selectedPlan.mealsPerWeek +
                    selectedPlan.shipping
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-medium text-sm">
                <span>Difference:</span>
                <span
                  className={
                    selectedPlan.pricePerServing *
                      selectedPlan.servings *
                      selectedPlan.mealsPerWeek +
                      selectedPlan.shipping <
                    currentPlan.pricePerServing *
                      currentPlan.servings *
                      currentPlan.mealsPerWeek +
                      currentPlan.shipping
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {selectedPlan.pricePerServing *
                    selectedPlan.servings *
                    selectedPlan.mealsPerWeek +
                    selectedPlan.shipping <
                  currentPlan.pricePerServing *
                    currentPlan.servings *
                    currentPlan.mealsPerWeek +
                    currentPlan.shipping
                    ? "-"
                    : "+"}
                  $
                  {Math.abs(
                    selectedPlan.pricePerServing *
                      selectedPlan.servings *
                      selectedPlan.mealsPerWeek +
                      selectedPlan.shipping -
                      (currentPlan.pricePerServing *
                        currentPlan.servings *
                        currentPlan.mealsPerWeek +
                        currentPlan.shipping)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsChangingPlan(false);
                setSelectedPlan(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // In a real app, you would call an API to update the plan
                if (selectedPlan) {
                  setCurrentPlan(selectedPlan);
                  setIsChangingPlan(false);
                  setSelectedPlan(null);
                }
              }}
              disabled={!selectedPlan}
            >
              Confirm Plan Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View All Upcoming Deliveries Dialog */}
      <Dialog
        open={isViewingAllDeliveries}
        onOpenChange={(open) => !open && setIsViewingAllDeliveries(false)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upcoming Deliveries</DialogTitle>
            <DialogDescription>
              View and manage all your upcoming meal deliveries
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <Tabs
                defaultValue="all"
                className="w-full sm:w-auto"
                onValueChange={setDeliveryFilter}
              >
                <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select defaultValue="date-asc">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-asc">
                      Date (Earliest first)
                    </SelectItem>
                    <SelectItem value="date-desc">
                      Date (Latest first)
                    </SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {currentDeliveries.map((delivery) => (
                <Card key={delivery.id}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div
                          className={`${
                            delivery.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : delivery.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          } p-2 md:p-3 rounded-full flex-shrink-0`}
                        >
                          {delivery.status === "confirmed" ? (
                            <Truck className="h-5 w-5 md:h-6 md:w-6" />
                          ) : (
                            <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                            <h4 className="font-semibold text-sm md:text-base">
                              {delivery.date}
                            </h4>
                            <Badge
                              className={`${
                                delivery.status === "confirmed"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : delivery.status === "scheduled"
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              } w-fit capitalize`}
                            >
                              {delivery.status}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-1 text-gray-600 text-xs md:text-sm">
                            <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                            <span>Delivery between {delivery.timeWindow}</span>
                          </div>
                          <p className="text-gray-600 mt-1 text-xs md:text-sm">
                            {delivery.meals}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 self-start">
                        {!delivery.hasMealsSelected ? (
                          <Alert className="bg-amber-50 border-amber-200 text-amber-800 p-3">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 mt-0.5" />
                              <div>
                                <AlertTitle className="text-xs font-semibold">
                                  Meals not selected
                                </AlertTitle>
                                <AlertDescription className="text-xs mt-1">
                                  Please select your meals before the cutoff
                                  date.
                                </AlertDescription>
                              </div>
                            </div>
                            <Button
                              className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white text-xs py-1 h-auto"
                              onClick={() =>
                                handleSelectMealsForDelivery(delivery.id)
                              }
                            >
                              Select Meals
                            </Button>
                          </Alert>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs md:text-sm px-2 py-1 h-auto"
                              onClick={() =>
                                handleSelectMealsForDelivery(delivery.id)
                              }
                            >
                              <Edit2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                              Edit Meals
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs md:text-sm px-2 py-1 h-auto"
                              onClick={() => handleSkipDelivery(delivery.id)}
                            >
                              Skip
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {delivery.hasMealsSelected && (
                      <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-3">
                        {delivery.selectedMeals.map((mealId) => {
                          const meal = availableMeals.find(
                            (m) => m.id === mealId
                          );
                          if (!meal) return null;
                          return (
                            <div
                              key={meal.id}
                              className="flex items-center gap-3"
                            >
                              <div className="h-12 w-12 relative rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                  src={meal?.image || "/placeholder.svg"}
                                  alt={meal?.name || "Meal"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="overflow-hidden">
                                <h4 className="font-medium text-sm truncate">
                                  {meal?.name || "Meal"}
                                </h4>
                                <p className="text-xs text-gray-600 truncate">
                                  {meal?.description || ""}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={() => setIsViewingAllDeliveries(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Meal Selection Dialog */}
      <Dialog
        open={selectingMealsForDelivery !== null}
        onOpenChange={(open) => !open && setSelectingMealsForDelivery(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Select Your Meals
              <p className="text-sm font-normal text-gray-600 mt-1">
                Choose 3 meals for delivery on{" "}
                {
                  allDeliveries.find((d) => d.id === selectingMealsForDelivery)
                    ?.date
                }
              </p>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {availableMeals.map((meal) => {
              const isSelected = selectingMealsForDelivery
                ? tempSelectedMeals[selectingMealsForDelivery]?.includes(
                    meal.id
                  )
                : false;
              return (
                <Card
                  key={meal.id}
                  className={`overflow-hidden cursor-pointer transition-all ${
                    isSelected ? "ring-2 ring-blue-500" : "hover:shadow-md"
                  }`}
                  onClick={() => handleToggleMealForDelivery(meal.id)}
                >
                  <div className="relative h-40">
                    <Image
                      src={meal.image || "/placeholder.svg"}
                      alt={meal.name}
                      fill
                      className="object-cover"
                    />
                    {meal.popular && (
                      <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 hover:bg-green-100">
                        Popular
                      </Badge>
                    )}
                    {meal.new && (
                      <Badge className="absolute top-2 left-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                        New
                      </Badge>
                    )}
                    {isSelected && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-blue-500 text-white rounded-full p-2">
                          <Check className="h-6 w-6" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{meal.name}</h3>
                    <p className="text-sm text-gray-600">{meal.description}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {meal.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">
                          Servings:
                        </span>
                        <span className="font-medium">4</span>
                      </div>
                      <Button
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleMealForDelivery(meal.id);
                        }}
                      >
                        {isSelected ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Selected
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Select
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <div className="mr-auto text-sm">
              {selectingMealsForDelivery
                ? `${
                    tempSelectedMeals[selectingMealsForDelivery]?.length || 0
                  }/3 meals selected`
                : "0/3 meals selected"}
            </div>
            <Button
              variant="outline"
              onClick={() => setSelectingMealsForDelivery(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmMealSelectionForDelivery}
              disabled={
                !selectingMealsForDelivery ||
                !tempSelectedMeals[selectingMealsForDelivery] ||
                tempSelectedMeals[selectingMealsForDelivery].length !== 3
              }
            >
              Confirm Selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
