"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit2,
  Plus,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Delivery {
  id: number;
  date: string;
  status: "confirmed" | "scheduled";
  timeWindow: string;
  meals: string;
  hasMealsSelected: boolean;
}

interface Meal {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  popular?: boolean;
  new?: boolean;
}

interface SelectedMeals {
  [key: number]: number[];
}

export default function DeliverySchedule() {
  const [frequency, setFrequency] = useState("weekly");
  const [deliveryDay, setDeliveryDay] = useState("tuesday");
  const [selectingMealsForDelivery, setSelectingMealsForDelivery] = useState<
    number | null
  >(null);
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeals>({});

  // This would come from your API in a real app
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 1,
      date: "Tuesday, March 26, 2025",
      status: "confirmed",
      timeWindow: "8am - 8pm",
      meals: "3 meals, 4 servings each",
      hasMealsSelected: false,
    },
    {
      id: 2,
      date: "Tuesday, April 2, 2025",
      status: "scheduled",
      timeWindow: "8am - 8pm",
      meals: "3 meals, 4 servings each",
      hasMealsSelected: false,
    },
    {
      id: 3,
      date: "Tuesday, April 9, 2025",
      status: "scheduled",
      timeWindow: "8am - 8pm",
      meals: "3 meals, 4 servings each",
      hasMealsSelected: true,
    },
  ]);

  const availableMeals = [
    {
      id: 1,
      name: "Garlic Butter Steak",
      description: "with Roasted Potatoes & Green Beans",
      image: "/placeholder.svg?height=200&width=200",
      tags: ["35 min", "650 cal", "High Protein"],
      popular: true,
    },
    {
      id: 2,
      name: "Creamy Tuscan Chicken",
      description: "with Sun-Dried Tomatoes & Spinach",
      image: "/placeholder.svg?height=200&width=200",
      tags: ["40 min", "580 cal", "Gluten-Free"],
      new: true,
    },
    {
      id: 3,
      name: "Vegetable Stir Fry",
      description: "with Sesame Ginger Sauce & Rice",
      image: "/placeholder.svg?height=200&width=200",
      tags: ["25 min", "520 cal", "Vegetarian"],
    },
    {
      id: 4,
      name: "Honey Glazed Salmon",
      description: "with Roasted Brussels Sprouts & Quinoa",
      image: "/placeholder.svg?height=200&width=200",
      tags: ["30 min", "590 cal", "Omega-3"],
    },
    {
      id: 5,
      name: "Beef Burrito Bowl",
      description: "with Cilantro Lime Rice & Black Beans",
      image: "/placeholder.svg?height=200&width=200",
      tags: ["35 min", "720 cal", "Family Favorite"],
      popular: true,
    },
    {
      id: 6,
      name: "Mediterranean Falafel Bowl",
      description: "with Hummus & Tzatziki",
      image: "/placeholder.svg?height=200&width=200",
      tags: ["30 min", "550 cal", "Vegetarian"],
      new: true,
    },
  ];

  const handleSelectMeals = (deliveryId: number) => {
    setSelectingMealsForDelivery(deliveryId);
    // Initialize selected meals for this delivery if not already done
    if (!selectedMeals[deliveryId]) {
      setSelectedMeals({
        ...selectedMeals,
        [deliveryId]: [],
      });
    }
  };

  const handleToggleMeal = (mealId: number) => {
    if (!selectingMealsForDelivery) return;

    const currentSelected = selectedMeals[selectingMealsForDelivery] || [];

    if (currentSelected.includes(mealId)) {
      setSelectedMeals({
        ...selectedMeals,
        [selectingMealsForDelivery]: currentSelected.filter(
          (id: number) => id !== mealId
        ),
      });
    } else {
      if (currentSelected.length < 3) {
        setSelectedMeals({
          ...selectedMeals,
          [selectingMealsForDelivery]: [...currentSelected, mealId],
        });
      }
    }
  };

  const handleConfirmMealSelection = () => {
    // Update the delivery to mark meals as selected
    setDeliveries(
      deliveries.map((delivery) =>
        delivery.id === selectingMealsForDelivery
          ? { ...delivery, hasMealsSelected: true }
          : delivery
      )
    );

    // Close the meal selection dialog
    setSelectingMealsForDelivery(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Delivery Schedule
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your delivery frequency and upcoming deliveries
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg">Delivery Preferences</h3>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="font-medium mb-3">Delivery Frequency</h4>
              <RadioGroup
                value={frequency}
                onValueChange={setFrequency}
                className="flex flex-col space-y-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="cursor-pointer">
                    Weekly (Most Popular)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="biweekly" id="biweekly" />
                  <Label htmlFor="biweekly" className="cursor-pointer">
                    Every 2 Weeks
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">
                    Monthly
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="font-medium mb-3">Preferred Delivery Day</h4>
              <RadioGroup
                value={deliveryDay}
                onValueChange={setDeliveryDay}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="monday" id="monday" />
                  <Label htmlFor="monday" className="cursor-pointer">
                    Monday
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="tuesday" id="tuesday" />
                  <Label htmlFor="tuesday" className="cursor-pointer">
                    Tuesday
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="wednesday" id="wednesday" />
                  <Label htmlFor="wednesday" className="cursor-pointer">
                    Wednesday
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="thursday" id="thursday" />
                  <Label htmlFor="thursday" className="cursor-pointer">
                    Thursday
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="friday" id="friday" />
                  <Label htmlFor="friday" className="cursor-pointer">
                    Friday
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="saturday" id="saturday" />
                  <Label htmlFor="saturday" className="cursor-pointer">
                    Saturday
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="sunday" id="sunday" />
                  <Label htmlFor="sunday" className="cursor-pointer">
                    Sunday
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h4 className="font-medium mb-3">Delivery Time Window</h4>
              <Select defaultValue="all-day">
                <SelectTrigger className="w-full md:w-[300px]">
                  <SelectValue placeholder="Select delivery time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-day">All Day (8am - 8pm)</SelectItem>
                  <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                  <SelectItem value="afternoon">
                    Afternoon (12pm - 5pm)
                  </SelectItem>
                  <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="mt-4">Save Preferences</Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Upcoming Deliveries</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {deliveries.map((delivery) => (
            <Card key={delivery.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div
                      className={`${
                        delivery.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
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
                              : "bg-blue-100 text-blue-800 hover:bg-blue-100"
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

                  <div className="flex flex-col gap-2 self-start mt-3 md:mt-0">
                    {!delivery.hasMealsSelected ? (
                      <Alert className="bg-amber-50 border-amber-200 text-amber-800 p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 mt-0.5" />
                          <div>
                            <AlertTitle className="text-xs font-semibold">
                              Meals not selected
                            </AlertTitle>
                            <AlertDescription className="text-xs mt-1">
                              Please select your meals before the cutoff date.
                            </AlertDescription>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white text-xs py-1 h-auto"
                          onClick={() => handleSelectMeals(delivery.id)}
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
                        >
                          <Edit2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                          Edit Meals
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs md:text-sm px-2 py-1 h-auto"
                        >
                          Skip
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

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
                  deliveries.find((d) => d.id === selectingMealsForDelivery)
                    ?.date
                }
              </p>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {availableMeals.map((meal) => {
              const isSelected = selectingMealsForDelivery
                ? selectedMeals[selectingMealsForDelivery]?.includes(meal.id)
                : false;
              return (
                <Card
                  key={meal.id}
                  className={`overflow-hidden cursor-pointer transition-all ${
                    isSelected ? "ring-2 ring-blue-500" : "hover:shadow-md"
                  }`}
                  onClick={() => handleToggleMeal(meal.id)}
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
                          handleToggleMeal(meal.id);
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
                    selectedMeals[selectingMealsForDelivery]?.length || 0
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
              onClick={handleConfirmMealSelection}
              disabled={
                !selectingMealsForDelivery ||
                !selectedMeals[selectingMealsForDelivery] ||
                selectedMeals[selectingMealsForDelivery].length !== 3
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
