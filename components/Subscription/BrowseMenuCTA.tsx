import Image from "next/image";
import { Button } from "@/components/ui/button";

const images = [
  {
    src: "https://media.blueapron.com/assets/registration/pricing/wellness.webp?quality=90&height=560",
    alt: "Wellness meal option",
    width: 200,
    height: 256,
    category: "Wellness",
  },
  {
    src: "https://media.blueapron.com/assets/registration/pricing/six-hundred-cals.webp?quality=90&height=560",
    alt: "600 Calories or Less meal option",
    width: 200,
    height: 256,
    category: "600 Calories or Less",
  },
  {
    src: "https://media.blueapron.com/assets/registration/pricing/carb-conscious.webp?quality=90&height=560",
    alt: "Carb Conscious meal option",
    width: 200,
    height: 256,
    category: "Carb Conscious",
  },
  {
    src: "https://media.blueapron.com/assets/registration/pricing/fast-and-easy.webp?quality=90&height=560",
    alt: "Fast & Easy meal option",
    width: 200,
    height: 256,
    category: "Fast & Easy",
  },
  {
    src: "https://media.blueapron.com/assets/registration/pricing/family-friendly.webp?quality=90&height=560",
    alt: "Family Friendly meal option",
    width: 200,
    height: 256,
    category: "Family Friendly",
  },
  {
    src: "https://media.blueapron.com/assets/registration/pricing/veggies.webp?quality=90&height=560",
    alt: "Veggies meal option",
    width: 200,
    height: 256,
    category: "Veggies",
  },
];

export default function BrowseMenuCTA() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 text-center">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#067a46] mb-2 sm:mb-4">
        Choose from 100+ weekly options
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 lg:mb-12 max-w-4xl mx-auto">
        Enjoy a wide variety of easy recipes and pre-made meals with quality
        ingredients.
      </p>

      {/* Mobile View (Grid) */}
      <div className="grid grid-cols-2 gap-4 mb-8 sm:hidden">
        {images.map((image) => (
          <div className="flex flex-col" key={image.category}>
            <div className="h-40 relative overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                height={256}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-gray-700 text-sm font-medium mt-2">
              {image.category}
            </span>
          </div>
        ))}
      </div>

      {/* Tablet and Desktop View (Horizontal Scroll) */}
      <div className="relative w-full mb-8 sm:mb-12 hidden sm:block">
        <div className="flex overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex flex-nowrap space-x-4 sm:space-x-6 md:space-x-8">
            {images.map((image) => (
              <div
                className="flex flex-col flex-shrink-0 sm:w-40 md:w-48 lg:w-56"
                key={image.category}
              >
                <div className="h-48 sm:h-56 md:h-64 relative overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={200}
                    height={256}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-gray-700 font-medium mt-3">
                  {image.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="rounded-full px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-6 text-sm sm:text-base text-[#067a46] border-[#067a46] border-2 font-bold hover:bg-[#067a46] hover:text-white transition-colors"
      >
        BROWSE OUR MENUS
      </Button>
    </div>
  );
}
