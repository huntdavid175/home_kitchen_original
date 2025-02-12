"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Subscribe", href: "#" },
  { name: "Recipes", href: "/recipe-listing" },
  { name: "How it Works", href: "/how-it-works" },
  { name: "Gift Card", href: "#" },
  { name: "FAQ", href: "#" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-teal-700">
              Home Kitchen
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-teal-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <button className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors">
              Log In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-teal-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-teal-700 hover:bg-gray-50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full text-left block px-3 py-2 text-base font-medium text-white bg-teal-700 hover:bg-teal-800 transition-colors rounded-md">
              Log In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
