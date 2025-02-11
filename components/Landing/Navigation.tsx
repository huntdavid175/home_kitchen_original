import React from "react";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold text-teal-700">
            <Link href="/">Home Kitchen</Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="#" className="text-gray-600 hover:text-teal-700">
              Subscribe
            </Link>
            <Link
              href="/recipe-listing"
              className="text-gray-600 hover:text-teal-700"
            >
              Recipes
            </Link>
            <Link href="#" className="text-gray-600 hover:text-teal-700">
              How it Works
            </Link>
            <Link href="#" className="text-gray-600 hover:text-teal-700">
              Gift Card
            </Link>
            <Link href="#" className="text-gray-600 hover:text-teal-700">
              FAQ
            </Link>
          </div>
          <button className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800">
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
