import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Navigation from "@/components/Landing/Navigation";
import Footer from "@/components/Landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meal Prep Service",
  description: "Healthy, delicious meals delivered to your door",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-white")}>
        {/* Main site header */}
        <Navigation />

        {/* Main content */}
        <main>{children}</main>

        {/* Main site footer */}
        <Footer />
      </body>
    </html>
  );
}
