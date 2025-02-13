"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface TimeBadgeProps {
  time: number; // time in minutes
  maxTime?: number; // maximum time for reference (default 100 minutes)
}

export default function TimeBadge({ time, maxTime = 100 }: TimeBadgeProps) {
  const percentage = (time / maxTime) * 100;
  const circumference = 2 * Math.PI * 18; // radius is 18px
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="absolute w-full h-full -rotate-90">
        {/* Background ring */}
        <circle
          cx="24"
          cy="24"
          r="18"
          strokeWidth="2"
          stroke="#E5E7EB"
          fill="none"
        />
        {/* Progress ring */}
        <motion.circle
          cx="24"
          cy="24"
          r="18"
          strokeWidth="2"
          stroke="#3B82F6"
          fill="none"
          strokeLinecap="round"
          initial={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference,
          }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="relative flex flex-col items-center justify-center">
        <span className="text-xs font-semibold">{time}</span>
        {/* <Clock className="w-3 h-3" /> */}
      </div>
    </div>
  );
}
