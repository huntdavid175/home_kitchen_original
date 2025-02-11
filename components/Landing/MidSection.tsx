import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const MidSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // custom ease curve for smooth animation
      },
    },
  };
  return (
    <section className="py-12 md:py-24 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="md:grid md:grid-cols-2 md:gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Image */}
          <motion.div className="mb-8 md:mb-0" variants={itemVariants}>
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="https://demo.tutsflow.com/foodera/images/features/1.png"
                alt="Fresh ingredients and healthy bowl"
                width={800}
                height={600}
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-700 leading-tight"
              variants={itemVariants}
            >
              We pride ourselves on making real food from the best ingredients.
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et
              purus a odio finibus bibendum in sit amet leo. Mauris feugiat erat
              tellus.
            </motion.p>
            <motion.div variants={itemVariants}>
              <button className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-3 h-auto text-base rounded-lg">
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MidSection;
