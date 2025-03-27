"use client";

import { TabsContent } from "@/components/ui/tabs";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Meal {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  status: "active" | "inactive";
  price: number;
  popular?: boolean;
  new?: boolean;
}

interface Week {
  id: number;
  startDate: string;
  endDate: string;
  status: "active" | "planned";
  selectedMeals: number[];
  cutoffDate: string;
}

export default function WeeklyMealPlanning() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [isAddMealsOpen, setIsAddMealsOpen] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);

  // Mock meal data
  const meals: Meal[] = [
    {
      id: 1,
      name: "Garlic Butter Steak",
      description: "with Roasted Potatoes & Green Beans",
      image: "/placeholder.svg?height=200&width=200",
      category: "meat",
      tags: ["High Protein", "Customer Favorite", "35 min"],
      status: "active",
      price: 12.99,
      popular: true,
    },
    {
      id: 2,
      name: "Creamy Tuscan Chicken",
      description: "with Sun-Dried Tomatoes & Spinach",
      image: "/placeholder.svg?height=200&width=200",
      category: "poultry",
      tags: ["Gluten-Free", "40 min"],
      status: "active",
      price: 11.99,
      new: true,
    },
    {
      id: 3,
      name: "Vegetable Stir Fry",
      description: "with Sesame Ginger Sauce & Rice",
      image: "/placeholder.svg?height=200&width=200",
      category: "vegetarian",
      tags: ["Vegetarian", "25 min"],
      status: "active",
      price: 10.99,
    },
    {
      id: 4,
      name: "Honey Glazed Salmon",
      description: "with Roasted Brussels Sprouts & Quinoa",
      image: "/placeholder.svg?height=200&width=200",
      category: "fish",
      tags: ["Omega-3", "30 min"],
      status: "active",
      price: 13.99,
    },
    {
      id: 5,
      name: "Beef Burrito Bowl",
      description: "with Cilantro Lime Rice & Black Beans",
      image: "/placeholder.svg?height=200&width=200",
      category: "meat",
      tags: ["Family Favorite", "35 min"],
      status: "active",
      price: 11.99,
      popular: true,
    },
    {
      id: 6,
      name: "Mediterranean Falafel Bowl",
      description: "with Hummus & Tzatziki",
      image: "/placeholder.svg?height=200&width=200",
      category: "vegetarian",
      tags: ["Vegetarian", "30 min"],
      status: "active",
      price: 10.99,
      new: true,
    },
    {
      id: 7,
      name: "Teriyaki Chicken",
      description: "with Stir-Fried Vegetables & Jasmine Rice",
      image: "/placeholder.svg?height=200&width=200",
      category: "poultry",
      tags: ["Family Favorite", "30 min"],
      status: "active",
      price: 11.99,
    },
  ];

  // Mock upcoming weeks data
  const upcomingWeeks: Week[] = [
    {
      id: 1,
      startDate: "Mar 24, 2025",
      endDate: "Mar 30, 2025",
      status: "active",
      selectedMeals: [1, 2, 3, 5, 7, 4],
      cutoffDate: "Mar 17, 2025",
    },
    {
      id: 2,
      startDate: "Mar 31, 2025",
      endDate: "Apr 6, 2025",
      status: "planned",
      selectedMeals: [2, 3, 4, 6, 1, 5],
      cutoffDate: "Mar 24, 2025",
    },
    {
      id: 3,
      startDate: "Apr 7, 2025",
      endDate: "Apr 13, 2025",
      status: "planned",
      selectedMeals: [5, 6, 7, 1, 2, 3],
      cutoffDate: "Mar 31, 2025",
    },
    {
      id: 4,
      startDate: "Apr 14, 2025",
      endDate: "Apr 20, 2025",
      status: "planned",
      selectedMeals: [],
      cutoffDate: "Apr 7, 2025",
    },
    {
      id: 5,
      startDate: "Apr 21, 2025",
      endDate: "Apr 27, 2025",
      status: "planned",
      selectedMeals: [],
      cutoffDate: "Apr 14, 2025",
    },
    {
      id: 6,
      startDate: "Apr 28, 2025",
      endDate: "May 4, 2025",
      status: "planned",
      selectedMeals: [],
      cutoffDate: "Apr 21, 2025",
    },
  ];

  // Filter meals based on search query
  const filteredMeals = meals.filter(
    (meal) =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const currentWeek = upcomingWeeks[currentWeekIndex];

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < upcomingWeeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  const handleAddMeals = () => {
    setSelectedMeals(currentWeek.selectedMeals);
    setIsAddMealsOpen(true);
  };

  const handleToggleMeal = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(selectedMeals.filter((id) => id !== mealId));
    } else {
      setSelectedMeals([...selectedMeals, mealId]);
    }
  };

  const handleSaveMealSelection = () => {
    // In a real app, you would call an API to update the week's meals
    console.log(`Saving meals for week ${currentWeek.id}:`, selectedMeals);

    // Update the local state
    upcomingWeeks[currentWeekIndex].selectedMeals = [...selectedMeals];

    // Close the dialog
    setIsAddMealsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Weekly Meal Planning
        </h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Weeks</SelectItem>
              <SelectItem value="active">Active Week</SelectItem>
              <SelectItem value="upcoming">Upcoming Weeks</SelectItem>
              <SelectItem value="past">Past Weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs
        defaultValue="upcoming"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Upcoming Weeks</TabsTrigger>
          <TabsTrigger value="active">Active Week</TabsTrigger>
          <TabsTrigger value="past">Past Weeks</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle>Upcoming Meal Rotations</CardTitle>
                  <CardDescription>
                    Plan and schedule meals for upcoming weeks
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousWeek}
                    disabled={currentWeekIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Week {currentWeekIndex + 1} of {upcomingWeeks.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextWeek}
                    disabled={currentWeekIndex === upcomingWeeks.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Week of {currentWeek.startDate}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {currentWeek.startDate} - {currentWeek.endDate}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Meal selection cutoff: {currentWeek.cutoffDate}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${
                        currentWeek.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {currentWeek.status === "active" ? "Active" : "Planned"}
                    </Badge>
                    <Button onClick={handleAddMeals}>
                      {currentWeek.selectedMeals.length > 0
                        ? "Edit Meals"
                        : "Add Meals"}
                    </Button>
                  </div>
                </div>

                {currentWeek.selectedMeals.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {currentWeek.selectedMeals.map((mealId) => {
                      const meal = meals.find((m) => m.id === mealId);
                      return meal ? (
                        <Card key={meal.id} className="overflow-hidden">
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
                          </div>
                          <CardContent className="p-3">
                            <h4 className="font-medium">{meal.name}</h4>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {meal.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {meal.tags.slice(0, 2).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 bg-gray-50 border rounded-md">
                    <Calendar className="h-12 w-12 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-700">
                      No Meals Selected
                    </h3>
                    <p className="text-gray-500 text-center max-w-md mt-1">
                      You haven&apos;t selected any meals for this week yet.
                      Click the &quot;Add Meals&quot; button to start planning.
                    </p>
                    <Button className="mt-4" onClick={handleAddMeals}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Meals
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  All Upcoming Weeks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingWeeks.map((week, index) => (
                    <Card
                      key={week.id}
                      className={`cursor-pointer transition-all ${
                        index === currentWeekIndex
                          ? "ring-2 ring-blue-500"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setCurrentWeekIndex(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">
                              Week of {week.startDate}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {week.startDate} - {week.endDate}
                            </p>
                          </div>
                          <Badge
                            className={`${
                              week.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {week.status === "active" ? "Active" : "Planned"}
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            {week.selectedMeals.length > 0
                              ? `${week.selectedMeals.length} meals selected`
                              : "No meals selected yet"}
                          </p>
                          {week.selectedMeals.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {week.selectedMeals.slice(0, 3).map((mealId) => {
                                const meal = meals.find((m) => m.id === mealId);
                                return meal ? (
                                  <Badge
                                    key={mealId}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {meal.name}
                                  </Badge>
                                ) : null;
                              })}
                              {week.selectedMeals.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{week.selectedMeals.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Active Week</CardTitle>
              <CardDescription>Currently active meal rotation</CardDescription>
            </CardHeader>
            <CardContent>
              {(() => {
                const activeWeek = upcomingWeeks.find(
                  (week) => week.status === "active"
                );
                if (activeWeek) {
                  return (
                    <div>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold">
                          Week of {activeWeek.startDate}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {activeWeek.startDate} - {activeWeek.endDate}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {activeWeek.selectedMeals.map((mealId) => {
                          const meal = meals.find((m) => m.id === mealId);
                          return meal ? (
                            <Card key={meal.id} className="overflow-hidden">
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
                              </div>
                              <CardContent className="p-3">
                                <h4 className="font-medium">{meal.name}</h4>
                                <p className="text-sm text-gray-600 line-clamp-1">
                                  {meal.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {meal.tags.slice(0, 2).map((tag, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ) : null;
                        })}
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="flex flex-col items-center justify-center py-12 bg-gray-50 border rounded-md">
                    <Calendar className="h-12 w-12 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-700">
                      No Active Week
                    </h3>
                    <p className="text-gray-500 text-center max-w-md mt-1">
                      There is no active week currently. Go to Upcoming Weeks to
                      set an active week.
                    </p>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Past Weeks</CardTitle>
              <CardDescription>View past meal rotations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 border rounded-md">
                <Calendar className="h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-700">
                  No Past Weeks
                </h3>
                <p className="text-gray-500 text-center max-w-md mt-1">
                  Past weeks will appear here once they have completed.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Meals Dialog */}
      <Dialog open={isAddMealsOpen} onOpenChange={setIsAddMealsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Select Meals for Week of {currentWeek?.startDate}
            </DialogTitle>
            <DialogDescription>
              Choose which meals will be available for customers during this
              week.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search meals..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="poultry">Poultry</SelectItem>
                    <SelectItem value="fish">Fish</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Available Meals</h3>
              <div className="text-sm text-gray-600">
                {selectedMeals.length} meals selected
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {filteredMeals.map((meal) => {
                const isSelected = selectedMeals.includes(meal.id);
                return (
                  <Card
                    key={meal.id}
                    className={`cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-blue-500" : "hover:shadow-md"
                    }`}
                    onClick={() => handleToggleMeal(meal.id)}
                  >
                    <div className="relative h-32">
                      <Image
                        src={meal.image || "/placeholder.svg"}
                        alt={meal.name}
                        fill
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="bg-blue-500 text-white rounded-full p-2">
                            <Check className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm">{meal.name}</h4>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {meal.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge className="text-xs capitalize">
                          {meal.category}
                        </Badge>
                        <Button
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          className="h-7 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleMeal(meal.id);
                          }}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMealsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveMealSelection}>
              Save Meal Selection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
