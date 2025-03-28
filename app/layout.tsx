import { Plus_Jakarta_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "./fonts.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "House Kitchen",
  description: "Delicious Meals, Delivered to Your Door",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.className} ${GeistMono.variable} font-sans`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
