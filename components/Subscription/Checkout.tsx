import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ProgressBar from "./progressBar";
// import { useRouter } from "next/router";

export default function CheckoutPage({ Goback }: { Goback: () => void }) {
  //   const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const storedPlan = localStorage.getItem("selectedPlan");
  const plan = storedPlan
    ? JSON.parse(storedPlan)
    : { name: "Basic", price: 19.99 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Payment successful!");
      //   router.push("/order-confirmation");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ProgressBar progress={4} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full "
      >
        <div className="flex flex-col lg:flex-row pt-24 lg:pt-0 gap-4 w-full ">
          <div className="space-y-6">
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
                      <span className="text-red-600">$5.00</span> each
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Box price</span>
                    <span>$199.80</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <div>
                      <span className="line-through text-muted-foreground mr-2">
                        $10.99
                      </span>
                      <span className="text-red-600 ">FREE</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-red-600 text-sm">
                  <span>Discount</span>
                  <span>$110.89</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold">First box total</span>
                    <div>
                      <span className="line-through text-muted-foreground mr-2">
                        $210.79
                      </span>
                      <span className="text-base font-bold text-red-600">
                        $99.90
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div>
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Shipping</h2>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-2">
                    Delivery details
                  </h3>
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
            </div>
          </div>
          <Card className="shadow-xl rounded-2xl py-4 lg:py-6 lg:px-6 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Checkout
            </h2>
            <CardContent>
              <div className="border rounded-lg p-4 mb-4 bg-gray-50">
                <h3 className="font-medium">Plan: {plan.name}</h3>
                <p className="text-lg font-semibold">
                  ${plan.price.toFixed(2)}
                </p>
              </div>

              <form className="space-y-4">
                {/* <Input placeholder="Full Name" name="name" value={form.name} onChange={handleChange} required />
              <Input type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} required />
              <Input placeholder="Card Number" name="cardNumber" value={form.cardNumber} onChange={handleChange} required />
              <div className="flex gap-2">
                <Input placeholder="MM/YY" name="expiry" value={form.expiry} onChange={handleChange} required />
                <Input placeholder="CVV" name="cvv" value={form.cvv} onChange={handleChange} required />
              </div> */}
                <div className="flex gap-4">
                  <Button
                    onClick={Goback}
                    className="w-full bg-red-200 text-black hover:bg-red-300"
                    disabled={loading}
                  >
                    Go Back
                  </Button>
                  <Button
                    onClick={handlePayment}
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
