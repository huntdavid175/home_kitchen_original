"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Upload,
  Check,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Import CheckedState type for Checkbox
import { CheckedState } from "@radix-ui/react-checkbox";

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
}

export default function MealManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<Meal | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Add a new state for the meal scheduling dialog
  const [isScheduleMealsOpen, setIsScheduleMealsOpen] = useState(false);

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
      status: "inactive",
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
    },
    {
      id: 2,
      startDate: "Mar 31, 2025",
      endDate: "Apr 6, 2025",
      status: "planned",
      selectedMeals: [2, 3, 4, 6, 1, 5],
    },
    {
      id: 3,
      startDate: "Apr 7, 2025",
      endDate: "Apr 13, 2025",
      status: "planned",
      selectedMeals: [5, 6, 7, 1, 2, 3],
    },
    {
      id: 4,
      startDate: "Apr 14, 2025",
      endDate: "Apr 20, 2025",
      status: "planned",
      selectedMeals: [],
    },
  ];

  // Add state for the selected week and its meals
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [weekMeals, setWeekMeals] = useState<number[]>([]);

  // Filter meals based on search query and active tab
  const filteredMeals = meals.filter(
    (meal) =>
      (activeTab === "all" ||
        (activeTab === "active" && meal.status === "active") ||
        (activeTab === "inactive" && meal.status === "inactive") ||
        activeTab === meal.category) &&
      (meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  const handleSelectMeal = (mealId: number) => {
    if (selectedMeals.includes(mealId)) {
      setSelectedMeals(selectedMeals.filter((id) => id !== mealId));
    } else {
      setSelectedMeals([...selectedMeals, mealId]);
    }
  };

  const handleSelectAllMeals = (checked: CheckedState) => {
    if (checked === true) {
      setSelectedMeals(filteredMeals.map((meal) => meal.id));
    } else {
      setSelectedMeals([]);
    }
  };

  const handleDeleteMeal = (meal: Meal) => {
    setMealToDelete(meal);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDeleteMeal = () => {
    // In a real app, you would call an API to delete the meal
    if (mealToDelete) {
      console.log(`Deleting meal: ${mealToDelete.id}`);
    }
    setIsDeleteConfirmOpen(false);
    setMealToDelete(null);
  };

  // Add this function to handle opening the schedule meals dialog
  const handleScheduleMeals = () => {
    setIsScheduleMealsOpen(true);
  };

  // Add this function to handle selecting a week
  const handleSelectWeek = (week: Week) => {
    setSelectedWeek(week);
    setWeekMeals(week.selectedMeals);
  };

  // Add this function to handle toggling a meal for the selected week
  const handleToggleWeekMeal = (mealId: number) => {
    if (weekMeals.includes(mealId)) {
      setWeekMeals(weekMeals.filter((id) => id !== mealId));
    } else {
      setWeekMeals([...weekMeals, mealId]);
    }
  };

  // Add this function to save the meal selection for the week
  const handleSaveWeekMeals = () => {
    // In a real app, you would call an API to update the week's meals
    if (selectedWeek) {
      console.log(`Saving meals for week ${selectedWeek.id}:`, weekMeals);

      // Update the local state
      const updatedWeeks = upcomingWeeks.map((week) =>
        week.id === selectedWeek.id
          ? { ...week, selectedMeals: weekMeals }
          : week
      );
    }

    // Close the dialog
    setSelectedWeek(null);
    setIsScheduleMealsOpen(false);
  };

  // Create a properly typed handler for each individual meal checkbox
  const handleToggleMeal = (mealId: number) => (checked: CheckedState) => {
    if (checked === true) {
      handleSelectMeal(mealId);
    } else if (!selectedMeals.includes(mealId)) {
      handleSelectMeal(mealId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Meal Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setIsAddMealOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Meal
          </Button>
          <Button
            variant="outline"
            onClick={handleScheduleMeals}
            className="hidden sm:flex"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meals
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Meals</CardTitle>
          <CardDescription>
            Manage your meal offerings and categories
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
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

          <Tabs
            defaultValue="all"
            className="mb-6"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="meat">Meat</TabsTrigger>
              <TabsTrigger value="poultry">Poultry</TabsTrigger>
              <TabsTrigger value="vegetarian">Vegetarian</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="overflow-x-auto -mx-4 sm:-mx-6">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-3 sm:px-6 text-left">
                    <div className="flex items-center">
                      <Checkbox
                        id="select-all"
                        checked={
                          selectedMeals.length === filteredMeals.length &&
                          filteredMeals.length > 0
                        }
                        onCheckedChange={handleSelectAllMeals}
                      />
                    </div>
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Meal
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Category
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Tags
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Status
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-left font-medium text-gray-500 text-xs sm:text-sm">
                    Price
                  </th>
                  <th className="py-3 px-3 sm:px-6 text-right font-medium text-gray-500 text-xs sm:text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMeals.map((meal) => (
                  <tr key={meal.id} className="border-b">
                    <td className="py-3 px-3 sm:px-6">
                      <Checkbox
                        checked={selectedMeals.includes(meal.id)}
                        onCheckedChange={handleToggleMeal(meal.id)}
                      />
                    </td>
                    <td className="py-3 px-3 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 relative rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={meal.image || "/placeholder.svg"}
                            alt={meal.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                            <p className="font-medium text-xs sm:text-sm">
                              {meal.name}
                            </p>
                            {meal.popular && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[10px] sm:text-xs">
                                Popular
                              </Badge>
                            )}
                            {meal.new && (
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-[10px] sm:text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            {meal.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-6 capitalize text-xs sm:text-sm">
                      {meal.category}
                    </td>
                    <td className="py-3 px-3 sm:px-6">
                      <div className="flex flex-wrap gap-1">
                        {meal.tags.slice(0, 2).map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-[10px] sm:text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {meal.tags.length > 2 && (
                          <Badge
                            variant="outline"
                            className="text-[10px] sm:text-xs"
                          >
                            +{meal.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 sm:px-6">
                      <Badge
                        className={`${
                          meal.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        } capitalize text-[10px] sm:text-xs`}
                      >
                        {meal.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 sm:px-6 text-xs sm:text-sm">
                      ${meal.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 sm:px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 sm:h-8 sm:w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel className="text-xs sm:text-sm">
                            Actions
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            Edit Meal
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs sm:text-sm">
                            {meal.status === "active"
                              ? "Deactivate"
                              : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 text-xs sm:text-sm"
                            onClick={() => handleDeleteMeal(meal)}
                          >
                            Delete Meal
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMeals.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No meals found matching your search criteria.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">{filteredMeals.length}</span> of{" "}
              <span className="font-medium">{meals.length}</span> meals
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Meal Dialog */}
      <Dialog open={isAddMealOpen} onOpenChange={setIsAddMealOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              Add New Meal
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Add a new meal to your subscription service.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="name" className="text-xs sm:text-sm">
                  Meal Name
                </Label>
                <Input
                  id="name"
                  placeholder="Meal name"
                  className="text-xs sm:text-sm"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="price" className="text-xs sm:text-sm">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="text-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="description" className="text-xs sm:text-sm">
                Description
              </Label>
              <Input
                id="description"
                placeholder="Brief description"
                className="text-xs sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="category" className="text-xs sm:text-sm">
                  Category
                </Label>
                <Select defaultValue="meat">
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="poultry">Poultry</SelectItem>
                    <SelectItem value="fish">Fish</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="status" className="text-xs sm:text-sm">
                  Status
                </Label>
                <Select defaultValue="active">
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="tags" className="text-xs sm:text-sm">
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                placeholder="e.g. High Protein, 30 min, Gluten-Free"
                className="text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="full-description" className="text-xs sm:text-sm">
                Full Description
              </Label>
              <Textarea
                id="full-description"
                placeholder="Detailed description of the meal"
                className="min-h-[100px] text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Label className="text-xs sm:text-sm">Meal Image</Label>
              <div className="border-2 border-dashed rounded-md p-4 sm:p-6 text-center">
                <Upload className="h-6 w-6 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag and drop an image, or{" "}
                  <span className="text-blue-600 cursor-pointer">browse</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="featured" />
              <Label htmlFor="featured" className="text-xs sm:text-sm">
                Mark as featured meal
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMealOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Meal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this meal? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {mealToDelete && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-16 w-16 relative rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={mealToDelete.image || "/placeholder.svg"}
                    alt={mealToDelete.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{mealToDelete.name}</p>
                  <p className="text-sm text-gray-500">
                    {mealToDelete.description}
                  </p>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm">
                <p>
                  <strong>Note:</strong> This meal may be part of active
                  subscriptions. Deleting it will remove it from all future
                  deliveries.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteMeal}>
              <Trash className="h-4 w-4 mr-2" />
              Delete Meal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Meals Dialog */}
      <Dialog open={isScheduleMealsOpen} onOpenChange={setIsScheduleMealsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule Meals for Upcoming Weeks</DialogTitle>
            <DialogDescription>
              Select which meals will be available for each upcoming week.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {upcomingWeeks.map((week) => (
                <Card
                  key={week.id}
                  className={`cursor-pointer transition-all ${
                    selectedWeek?.id === week.id
                      ? "ring-2 ring-blue-500"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => handleSelectWeek(week)}
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

            {selectedWeek && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    Select Meals for Week of {selectedWeek.startDate}
                  </h3>
                  <div className="text-sm text-gray-600">
                    {weekMeals.length} meals selected
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {meals.map((meal) => {
                    const isSelected = weekMeals.includes(meal.id);
                    return (
                      <Card
                        key={meal.id}
                        className={`cursor-pointer transition-all ${
                          isSelected
                            ? "ring-2 ring-blue-500"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => handleToggleWeekMeal(meal.id)}
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
                                handleToggleWeekMeal(meal.id);
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
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsScheduleMealsOpen(false)}
            >
              Cancel
            </Button>
            {selectedWeek && (
              <Button onClick={handleSaveWeekMeals}>Save Meal Selection</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
