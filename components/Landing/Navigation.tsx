"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Subscribe", href: "/subscribe" },
  { name: "Recipes", href: "/recipe-listing" },
  { name: "How it Works", href: "/how-it-works" },
  { name: "Gift Card", href: "#" },
  { name: "FAQ", href: "/faq" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeFixed = scrollPosition > -10; // Adjust this value as needed

      setIsScrolled(scrollPosition > 0);
      setIsFixed(shouldBeFixed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Placeholder div to prevent content jump when header becomes fixed */}
      {isFixed && <div className="h-16" />}

      <motion.header
        className={`w-full z-50 transition-all duration-300 ${
          isFixed ? "fixed top-0" : "relative"
        } ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
        initial={{ y: 0 }}
        animate={{
          y: isFixed ? 0 : 0,
          translateY: isFixed ? ["-100%", "0%"] : 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
      >
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
                <button onClick={()=>window.location.href = "/login"} className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition-colors">
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`px-2 pt-2 pb-8 space-y-1 sm:px-3 rounded-b-2xl ${
                  isScrolled ? "bg-white/80 backdrop-blur-md " : "bg-white"
                }`}
              >
                {navItems.map((item) => (
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-teal-700 hover:bg-gray-50 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex gap-4 pt-12">
                  <button onClick={()=>window.location.href = "/login"} className="w-full text-center block px-3 py-2 text-base  font-medium text-teal-700 bg-white border border-teal-700 hover:bg-teal-800 transition-colors rounded-md">
                    Log In
                  </button>
                  <button onClick={()=>window.location.href = "/login"} className="w-full text-center block px-3 py-2 text-base font-medium text-white bg-teal-700 hover:bg-teal-800 transition-colors rounded-md">
                    Register
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}