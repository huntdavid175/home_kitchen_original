import { Check, ShoppingCart } from "lucide-react";
import React from "react";

function ProgressBar({ progress }: any) {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-white border-b">
      <div className="container max-w-lg mx-auto px-4 py-4">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full ${
                progress === 1 ||
                progress === 2 ||
                progress === 3 ||
                progress === 4 ||
                progress === 5
                  ? "bg-[#067a46] text-white"
                  : "border-2 border-gray-200 text-gray-400"
              } flex items-center justify-center text-xs p-1 mb-1`}
            >
              <Check />
            </div>
            <span className="text-xs font-medium text-[#067a46]">
              Select Plan
            </span>
          </div>
          <div className="flex-1 mx-2 self-start mt-3">
            <div className="h-[2px] bg-gray-200">
              <div className="w-0 h-full bg-[#067a46]" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full ${
                progress === 3 || progress === 4 || progress === 5
                  ? "bg-[#067a46] text-white"
                  : "border-2 border-gray-200 text-gray-400"
              } flex items-center justify-center text-xs p-1 mb-1`}
            >
              <Check />
            </div>
            <span className="text-xs text-gray-400">Select Meals</span>
          </div>
          <div className="flex-1 mx-2 self-start mt-3">
            <div className="h-[2px] bg-gray-200" />
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full ${
                progress === 4 || progress === 5
                  ? "bg-[#067a46] text-white"
                  : "border-2 border-gray-200 text-gray-400"
              } flex items-center justify-center text-xs p-1 mb-1`}
            >
              <Check />
            </div>
            <span className="text-xs text-gray-400">Checkout</span>
          </div>
          {/* <div className="flex-1 mx-2 self-start mt-3">
            <div className="h-[2px] bg-gray-200" />
          </div> */}
          {/* <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full ${
                progress === 5
                  ? "bg-[#067a46] text-white"
                  : "border-2 border-gray-200 text-gray-400"
              } flex items-center justify-center text-xs p-1 mb-1`}
            >
              <Check />
            </div>
            <span className="text-xs text-gray-400">Select Meals</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
