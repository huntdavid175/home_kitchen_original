import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl  md:mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-teal-700 mb-4">
              Home Kitchen
            </h3>
            <p className="text-gray-600 text-sm">
              Making home cooking easy and enjoyable.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-700">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-700">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-700">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-700">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-700">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-700">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-700">
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-teal-700">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-700">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-700">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-teal-700">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>© 2025 Clean Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
