"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Stat {
  number: number;
  label: string;
}

const stats: Stat[] = [
  { number: 1287, label: "SAVINGS" },
  { number: 5786, label: "PHOTOS" },
  { number: 1440, label: "ROCKETS" },
  { number: 7110, label: "GLOBES" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#6D1D3A] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              >
                <Counter from={0} to={stat.number} />+
              </motion.div>
              <div className="text-sm md:text-base tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface CounterProps {
  from: number;
  to: number;
}

function Counter({ from, to }: CounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          animate={
            isInView
              ? {
                  opacity: 1,
                  transition: {
                    duration: 2,
                  },
                }
              : { opacity: 0 }
          }
        >
          {isInView ? to : from}
        </motion.span>
      </motion.span>
    </span>
  );
}
