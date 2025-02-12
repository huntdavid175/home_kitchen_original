import React from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    text: "Clean Kitchen has transformed how I cook at home. The recipes are easy to follow and delicious!",
    author: "Sarah",
  },
  {
    text: "The meal planning service saves me so much time. Everything is fresh and perfectly portioned.",
    author: "Michael",
  },
  {
    text: "Best meal kit service I've tried. The variety keeps dinner exciting every week.",
    author: "Emma",
  },
];

const Testimonial = () => {
  return (
    <div className="bg-rose-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
        </div>
        <div className="relative">
          <div className="flex overflow-x-hidden">
            <div className="flex space-x-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-lg shadow-sm">
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{testimonial.text}</p>
                    <p className="font-semibold text-gray-900">
                      - {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <ChevronLeft className="text-gray-600" />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <ChevronRight className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
