import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function PaymentMethods() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
          <p className="text-gray-600 mt-1">
            Manage your payment information and billing history
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Saved Payment Methods</h3>

          <RadioGroup defaultValue="card1" className="space-y-4">
            <div className="flex items-start space-x-3 border rounded-lg p-3 md:p-4">
              <RadioGroupItem value="card1" id="card1" className="mt-1" />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
                  <Label
                    htmlFor="card1"
                    className="font-medium cursor-pointer flex items-center text-sm md:text-base"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Visa ending in 4242
                  </Label>
                  <Badge className="w-fit">Default</Badge>
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  Expires 09/2026
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-0 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto text-xs md:text-sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto text-xs md:text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 border rounded-lg p-4">
              <RadioGroupItem value="card2" id="card2" className="mt-1" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <Label
                    htmlFor="card2"
                    className="font-medium cursor-pointer flex items-center"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Mastercard ending in 5678
                  </Label>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Expires 12/2025
                </div>
                <div className="flex justify-between items-center mt-3">
                  <Button variant="outline" size="sm">
                    Set as Default
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Billing History</h3>

          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Receipt</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Mar 19, 2025</td>
                  <td className="py-3 px-4">Weekly Meal Delivery</td>
                  <td className="py-3 px-4">$117.87</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Paid
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Mar 12, 2025</td>
                  <td className="py-3 px-4">Weekly Meal Delivery</td>
                  <td className="py-3 px-4">$117.87</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Paid
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Mar 5, 2025</td>
                  <td className="py-3 px-4">Weekly Meal Delivery</td>
                  <td className="py-3 px-4">$117.87</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      Paid
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">
                      Download
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Button variant="outline" className="mt-4 w-full">
            View All Transactions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
