"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Before Blue Apron, I tried HelloFresh. Blue Apron beats them on all counts—directions, freshness, packing, and prep.",
    author: "CHERYL",
  },
  {
    quote:
      "The recipes are creative and delicious. It has transformed our weeknight dinners from stressful to enjoyable!",
    author: "MICHAEL",
  },
  {
    quote:
      "I love how everything is pre-measured and the instructions are so clear. It's made cooking fun again!",
    author: "SARAH",
  },
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) =>
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://media.blueapron.com/assets/registration/homepage/cooking-pot.webp?height=600&quality=90"
        alt="Kitchen scene with recipe books and prepared food"
        fill
        className="object-cover"
        priority
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="bg-white p-8 md:p-12 max-w-3xl text-center rounded-sm">
          <p className="text-teal-500 text-lg md:text-xl mb-6">
            Celebrating 10 years of happy customers
          </p>

          <div className="relative h-[120px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute w-full transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <blockquote className="text-teal-800 text-lg md:text-lg font-medium mb-6">
                  {testimonial.quote}
                </blockquote>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-0.5 bg-teal-600 mb-3" />
                  <cite className="text-teal-700 font-medium not-italic">
                    {testimonial.author}
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
