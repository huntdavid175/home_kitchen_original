import { Plus_Jakarta_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | House Kitchen",
    default: "House Kitchen",
  },
  description: "Delicious Meals, Delivered to Your Door",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#006B5F",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://housekitchen.com",
    siteName: "House Kitchen",
    title: "House Kitchen - Delicious Meals, Delivered to Your Door",
    description: "Delicious Meals, Delivered to Your Door",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "House Kitchen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "House Kitchen - Delicious Meals, Delivered to Your Door",
    description: "Delicious Meals, Delivered to Your Door",
    images: ["/og-image.jpg"],
  },
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
