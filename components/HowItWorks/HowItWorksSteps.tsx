// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// export default function HowItWorksSteps() {
//   return (
//     <div className="container mx-auto px-4 py-12 md:py-16">
//       <div className="max-w-6xl mx-auto space-y-24">
//         {/* Step 1 */}
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <div className="relative aspect-[3/4] w-full">
//             <Image
//               src="https://img.hellofresh.com/w_3840,q_auto,f_auto,c_limit,fl_lossy/hellofresh_website/us/cms/howitworks/hiw-plan.jpg"
//               alt="HelloFresh mobile app showing recipe selection"
//               fill
//               className="object-cover rounded-lg"
//               priority
//             />
//           </div>
//           <div className="space-y-6">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
//               1. Pick a plan
//             </h2>
//             <p className="text-lg text-muted-foreground">
//               Choose from{" "}
//               <span className="font-semibold">over 60 recipes every week</span>{" "}
//               that cater to your household's needs, including quick & easy
//               options, Calorie Smart, and family-friendly meals. Plus, take
//               advantage of our amazing offer and{" "}
//               <span className="font-semibold">GET STARTED!</span>
//             </p>
//             <Button
//               size="lg"
//               className="w-full md:w-auto bg-green-700 hover:bg-green-800 text-lg py-6"
//             >
//               Get Offer
//             </Button>
//           </div>
//         </div>

//         {/* Step 2 */}
//         <div className="grid md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
//           <div className="order-1 md:order-2">
//             <div className="relative aspect-square w-full">
//               <Image
//                 src="https://img.hellofresh.com/w_3840,q_auto,f_auto,c_limit,fl_lossy/hellofresh_website/ca/cms/howitworks/How_It_Works_-_Delivery_458x320_1908.jpg"
//                 alt="HelloFresh delivery boxes with fresh ingredients"
//                 fill
//                 className="object-cover rounded-lg"
//               />
//             </div>
//           </div>
//           <div className="space-y-6 order-2 md:order-1">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
//               2. Get your delivery
//             </h2>
//             <p className="text-lg text-muted-foreground">
//               Forget groceries. Each week, you'll receive{" "}
//               <span className="font-semibold">
//                 simple step-by-step recipes complete with nutritional
//                 information and fresh, pre-measured ingredients
//               </span>{" "}
//               to get you whipping up delicious dinners in no time.
//             </p>
//             <Button
//               size="lg"
//               className="w-full md:w-auto bg-green-700 hover:bg-green-800 text-lg py-6"
//             >
//               Get Offer
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HowItWorksSteps() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Step 1 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="h-[400px] relative w-full">
            <Image
              src="https://img.hellofresh.com/w_3840,q_auto,f_auto,c_limit,fl_lossy/hellofresh_website/us/cms/howitworks/hiw-plan.jpg"
              alt="HelloFresh mobile app showing recipe selection"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl  md:text-2xl font-medium">1. Pick a plan</h2>
            <p className="text-base ">
              Choose from{" "}
              <span className="font-semibold">over 60 recipes every week</span>{" "}
              that cater to your household's needs, including quick & easy
              options, Calorie Smart, and family-friendly meals. Plus, take
              advantage of our amazing offer and{" "}
              <span className="font-semibold">GET STARTED!</span>
            </p>
            <Button
              size="lg"
              className="w-full md:w-auto bg-green-700 hover:bg-green-800 px-8"
            >
              Get Offer
            </Button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-1 md:order-2">
            <div className="h-[400px] relative w-full">
              <Image
                src="https://img.hellofresh.com/w_3840,q_auto,f_auto,c_limit,fl_lossy/hellofresh_website/ca/cms/howitworks/How_It_Works_-_Delivery_458x320_1908.jpg"
                alt="HelloFresh delivery boxes with fresh ingredients"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-4 order-2 md:order-1">
            <h2 className="text-xl md:text-2xl  font-medium">
              2. Get your delivery
            </h2>
            <p className="text-base">
              Forget groceries. Each week, you'll receive{" "}
              <span className="font-semibold">
                simple step-by-step recipes complete with nutritional
                information and fresh, pre-measured ingredients
              </span>{" "}
              to get you whipping up delicious dinners in no time.
            </p>
            <Button
              size="lg"
              className="w-full md:w-auto bg-green-700 hover:bg-green-800 px-8"
            >
              Get Offer
            </Button>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="h-[400px] relative w-full">
            <Image
              src="https://img.hellofresh.com/w_3840,q_auto,f_auto,c_limit,fl_lossy/hellofresh_website/ca/cms/howitworks/How_It_Works_-_Enjoy_458x320_1908.jpg"
              alt="HelloFresh mobile app showing recipe selection"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl  font-medium">
              3. Cook, eat, enjoy!
            </h2>
            <p className="text-base">
              Enjoy dinner that&apos;s always planned, simple, and perfectly
              suited to your taste. Whether you stick with the recipe or
              customize it by swapping or upgrading proteins, HelloFresh always
              hits the mark. Savor meals for every occasions with over
              <span className="font-semibold">
                100+ weekly menu items across dinners, sides, desserts, and
                more.
              </span>
            </p>
            <Button
              size="lg"
              className="w-full md:w-auto bg-green-700 hover:bg-green-800 px-8"
            >
              Get Offer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
