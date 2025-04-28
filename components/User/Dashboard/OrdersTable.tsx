import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye } from "lucide-react";
import Link from "next/link";

export const OrdersTable = ({ orders }: { orders: any[] }) => (
  <div className="overflow-x-auto">
    <Table className="border-collapse border-spacing-0">
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
            Order ID
          </TableHead>
          <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
            Date
          </TableHead>
          <TableHead className="py-3 px-4 text-sm font-medium text-gray-600">
            Status
          </TableHead>
          <TableHead className="py-3 px-4 text-sm font-medium text-gray-600 hidden md:table-cell">
            Meals
          </TableHead>
          <TableHead className="py-3 px-4 text-sm font-medium text-gray-600 hidden md:table-cell">
            Payment
          </TableHead>
          <TableHead className="py-3 px-4 text-sm font-medium text-gray-600 text-right">
            Total
          </TableHead>
          <TableHead className="py-3 px-4 text-sm font-medium text-gray-600"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <TableRow
              key={order.id}
              className="transition-all duration-300 hover:bg-gray-50 hover:scale-[1.01] opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              style={{
                animationDelay: `${0.1 + (index % 15) * 0.1}s`,
              }}
            >
              <TableCell className="py-3 px-4 border-t border-gray-100 font-medium">
                {order.id}
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100 flex items-center gap-2">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100">
                <Badge
                  variant="outline"
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    order.status.toLowerCase() === "delivered"
                      ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700 animate-[pulse_2s_infinite]"
                      : order.status.toLowerCase() === "preparing"
                      ? "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700 animate-[pulse_2s_infinite]"
                      : order.status.toLowerCase() === "pending"
                      ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700 animate-[pulse_2s_infinite]"
                      : order.status.toLowerCase() === "confirmed"
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700 animate-[pulse_2s_infinite]"
                      : order.status.toLowerCase() === "ready"
                      ? "bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700 animate-[pulse_2s_infinite]"
                      : order.status.toLowerCase() === "cancelled"
                      ? "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                      : ""
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() +
                    order.status.slice(1).toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100 hidden md:table-cell">
                {order.items.length} meals
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100 hidden md:table-cell">
                {order.payment.payment_method === "credit_card"
                  ? "Momo •••• 7432"
                  : order.payment.payment_method}
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100 text-right font-medium">
                ${order.total_price}
              </TableCell>
              <TableCell className="py-3 px-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-xl relative overflow-hidden transition-all hover:-translate-y-1"
                  asChild
                >
                  <Link
                    href={`/user/subscriptions/orders/${order.id}`}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={7}
              className="py-6 text-center text-muted-foreground"
            >
              No orders found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);
