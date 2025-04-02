import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your House Kitchen account",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main lang="en">
      <div>{children}</div>
    </main>
  );
}
