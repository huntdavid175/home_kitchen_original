import Footer from "@/components/Landing/Footer";
import "../globals.css";
import { CartProvider } from "@/components/Subscription/Cart/CartProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Subscribe to House Kitchen meal plans",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main lang="en">
        <CartProvider>
          <div className="min-h-screen">{children}</div>
        </CartProvider>
      </main>
      <Footer />
    </>
  );
}
