// import Image from "next/image";
// import { Utensils } from "lucide-react";

// interface SubscriptionCardProps {
//   frequency: string;
//   meals: number;
//   servings: number;
//   price: number;
//   currency?: string;
//   features: string[];
//   image: string;
// }

// export default function SubscriptionCard({
//   frequency,
//   meals,
//   servings,
//   price,
//   currency = "SR",
//   features,
//   image,
// }: SubscriptionCardProps) {
//   return (
//     <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ease-in-out flex cursor-pointer hover:bg-green-50">
//       {/* Content side */}
//       <div className="p-6 flex-1">
//         <div className="space-y-4">
//           <span className="text-teal-500 font-medium">{frequency}</span>

//           <div className="space-y-2">
//             <h3 className="text-2xl font-semibold">
//               {meals} Meals / {price} {currency}
//             </h3>
//             <div className="flex items-center text-gray-600">
//               <Utensils className="w-5 h-5 mr-2" />
//               <span>{servings} servings per meal</span>
//             </div>
//             <ul className="space-y-1 mt-3">
//               {features.map((feature, index) => (
//                 <li
//                   key={index}
//                   className="text-gray-600 text-sm flex items-start"
//                 >
//                   <span className="mr-2">•</span>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Image side */}
//       <div className="relative w-[220px] flex-shrink-0">
//         <Image
//           src={image || "/placeholder.svg"}
//           alt="Subscription meal preview"
//           fill
//           className="object-cover"
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { Utensils } from "lucide-react";
import { motion } from "framer-motion";

interface SubscriptionCardProps {
  frequency: string;
  meals: number;
  servings: number;
  price: number;
  currency?: string;
  features: string[];
  image: string;
}

export default function SubscriptionCard({
  frequency,
  meals,
  servings,
  price,
  currency = "GHS",
  features,
  image,
}: SubscriptionCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ease-in-out duration-200 flex cursor-pointer hover:bg-green-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Content side */}
      <div className="p-6 flex-1">
        <div className="space-y-4">
          <motion.span
            className="text-teal-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {frequency}
          </motion.span>

          <div className="space-y-2">
            <motion.h3
              className="text-2xl font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {meals} Meals /{" "}
              <span className="text-red-500">
                {price} {currency}
              </span>
            </motion.h3>
            <motion.div
              className="flex items-center text-gray-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Utensils className="w-5 h-5 mr-2" />
              <span>{servings} servings per meal</span>
            </motion.div>
            <motion.ul
              className="space-y-1 mt-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="text-gray-600 text-sm flex items-start"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <span className="mr-2">•</span>
                  {feature}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>

      {/* Image side */}
      <motion.div
        className="relative w-[180px] flex-shrink-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt="Subscription meal preview"
          fill
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}
