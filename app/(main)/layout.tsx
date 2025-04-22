import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Navigation from "@/components/Landing/Navigation/Navigation";
import Footer from "@/components/Landing/Footer";
import NavigationContainer from "@/components/Landing/Navigation/NavigationContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "Healthy, delicious meals delivered to your door",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className={cn("min-h-screen bg-gray-50")}>
        {/* Main site header */}
        <NavigationContainer />

        {/* Main content */}
        <main className="max-w-6xl mx-auto py-16">{children}</main>

        {/* Main site footer */}
        <Footer />
      </div>
    </main>
  );
}
