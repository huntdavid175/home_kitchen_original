import { Check, Filter, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MealPreferences() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meal Preferences</h2>
          <p className="text-gray-600 mt-1">
            Customize your meal plan and dietary preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold text-lg mb-4">
                Dietary Preferences
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="vegetarian" />
                  <Label
                    htmlFor="vegetarian"
                    className="cursor-pointer text-sm md:text-base"
                  >
                    Vegetarian
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pescatarian" />
                  <Label
                    htmlFor="pescatarian"
                    className="cursor-pointer text-sm md:text-base"
                  >
                    Pescatarian
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="calorie-smart" />
                  <Label
                    htmlFor="calorie-smart"
                    className="cursor-pointer text-sm md:text-base"
                  >
                    Calorie Smart
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="carb-smart" />
                  <Label
                    htmlFor="carb-smart"
                    className="cursor-pointer text-sm md:text-base"
                  >
                    Carb Smart
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="family-friendly" />
                  <Label
                    htmlFor="family-friendly"
                    className="cursor-pointer text-sm md:text-base"
                  >
                    Family Friendly
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="quick-easy" />
                  <Label
                    htmlFor="quick-easy"
                    className="cursor-pointer text-sm md:text-base"
                  >
                    Quick & Easy
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-lg mb-4">
                  Avoid Ingredients
                </h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-1 py-1.5 px-3">
                    Shellfish
                    <button className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-1 py-1.5 px-3">
                    Peanuts
                    <button className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-1 py-1.5 px-3">
                    Tree Nuts
                    <button className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Ingredient
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <h3 className="font-semibold text-lg mb-4">Spice Level</h3>

                <div className="space-y-6">
                  <Slider defaultValue={[2]} max={5} step={1} />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Mild</span>
                    <span>Medium</span>
                    <span>Spicy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Your Meal Plan</h3>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="py-4">
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-100">
                      Top Rated
                    </Badge>
                    <span>Garlic Butter Steak</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 h-40 bg-gray-200 rounded-md"></div>
                    <div className="w-full md:w-2/3">
                      <h4 className="font-medium text-lg">
                        Garlic Butter Steak
                      </h4>
                      <p className="text-gray-600 mt-1 text-sm">
                        with Roasted Potatoes & Green Beans
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          35 min
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          650 cal
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          High Protein
                        </Badge>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-2">
                            Servings:
                          </span>
                          <div className="flex border rounded-md">
                            <button className="px-2 py-1 border-r">-</button>
                            <span className="px-3 py-1">4</span>
                            <button className="px-2 py-1 border-l">+</button>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="py-4">
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                      New
                    </Badge>
                    <span>Creamy Tuscan Chicken</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 h-40 bg-gray-200 rounded-md"></div>
                    <div className="w-full md:w-2/3">
                      <h4 className="font-medium text-lg">
                        Creamy Tuscan Chicken
                      </h4>
                      <p className="text-gray-600 mt-1 text-sm">
                        with Sun-Dried Tomatoes & Spinach
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          40 min
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          580 cal
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Gluten-Free
                        </Badge>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-2">
                            Servings:
                          </span>
                          <div className="flex border rounded-md">
                            <button className="px-2 py-1 border-r">-</button>
                            <span className="px-3 py-1">4</span>
                            <button className="px-2 py-1 border-l">+</button>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b">
                <AccordionTrigger className="py-4">
                  <div className="flex items-center">
                    <span>Vegetable Stir Fry</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 h-40 bg-gray-200 rounded-md"></div>
                    <div className="w-full md:w-2/3">
                      <h4 className="font-medium text-lg">
                        Vegetable Stir Fry
                      </h4>
                      <p className="text-gray-600 mt-1 text-sm">
                        with Sesame Ginger Sauce & Rice
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          25 min
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          520 cal
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Vegetarian
                        </Badge>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-2">
                            Servings:
                          </span>
                          <div className="flex border rounded-md">
                            <button className="px-2 py-1 border-r">-</button>
                            <span className="px-3 py-1">4</span>
                            <button className="px-2 py-1 border-l">+</button>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
              <Button variant="outline" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add More Meals
              </Button>
              <Button className="w-full sm:w-auto">
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
