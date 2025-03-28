"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Leaf,
  ChevronLeft,
  ChevronRight,
  Truck,
  RefreshCcw,
  CreditCard,
  Gift,
  CircleCheckBig,
  CookingPot,
} from "lucide-react";

const FeatureItem = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <motion.div
    className="flex items-start"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="w-8 h-8 text-[#8BC34A] mr-3 flex-shrink-0" />
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </motion.div>
);

export default function HeroSection() {
  return (
    <section className="relative bg-[#FAF9F6] overflow-visible">
      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-4"
            >
              <Leaf className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-lg font-semibold">
                100% organic Products
              </span>
            </motion.div>
            <motion.h1
              className="text-2xl lg:text-4xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Delicious Meals, <br /> Delivered to Your Door
            </motion.h1>
            <motion.p
              className="text-gray-600 mb-6 max-w-lg border-l border-black pl-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Fresh ingredients and easy-to-follow recipes for amazing
              home-cooked meals.
            </motion.p>
            <motion.button
              className="bg-orange-500 text-white text-sm px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET STARTED
            </motion.button>
          </div>

          {/* Right Image */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              src="https://broccoli-omega.vercel.app/_next/image?url=%2Fimg%2Fslider%2F21.png&w=3840&q=75"
              //  src="https://images.pexels.com/photos/7879834/pexels-photo-7879834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Fresh vegetables"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Feature Box */}
        <motion.div
          className="hidden absolute left-4 right-4 -bottom-10 mx-auto bg-white rounded-lg shadow-xl p-6 md:grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <FeatureItem
            icon={CreditCard}
            title="Subscribe On a Plan"
            description="Choose the plan that works for you"
          />
          <FeatureItem
            icon={CircleCheckBig}
            title="Choose Your Meals"
            description="Select from our weekly menu of delicious recipes."
          />
          <FeatureItem
            icon={Truck}
            title="We Deliver"
            description="Receive your fresh ingredients in our eco-friendly packaging."
          />
          <FeatureItem
            icon={CookingPot}
            title="Cook and Enjoy"
            description="Follow our simple recipes to create restaurant-quality meals at home"
          />
          {/* <FeatureItem
            icon={Gift}
            title="Offer & gift here"
            description="On all orders over"
          /> */}
        </motion.div>
      </div>

      {/* Feature Box */}
      <motion.div
        className="md:hidden  left-4 right-4 -bottom-10 mx-auto bg-white rounded-lg shadow-xl p-6 grid grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <FeatureItem
          icon={CircleCheckBig}
          title="Choose Your Meals"
          description="Select from our weekly menu of delicious recipes."
        />
        <FeatureItem
          icon={Truck}
          title="We Deliver"
          description="Receive your fresh ingredients in our eco-friendly packaging."
        />
        <FeatureItem
          icon={CookingPot}
          title="Cook and Enjoy"
          description="Follow our simple recipes to create restaurant-quality meals at home"
        />
        <FeatureItem
          icon={Gift}
          title="Offer & gift here"
          description="On all orders over"
        />
      </motion.div>

      {/* Slider Arrows */}
      {/* <motion.button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </motion.button>
      <motion.button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </motion.button> */}
    </section>
  );
}
