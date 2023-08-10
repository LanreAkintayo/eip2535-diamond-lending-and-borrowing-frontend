import * as React from "react";
import * as ReactDOM from "react-dom";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import { VscTriangleDown } from "react-icons/vsc";

export default function HealthFactorBar() {
  const value = 10;
  const maxValue = 100;

  const progress = (value / maxValue) * 100;

  return (
    <div className=" w-full h-3 bg-gray-300 overflow-hidden text-white">
      {/* Indicator at 10% */}
      <div className="absolute -top-1 left-[10%] h-6 w-[5px] bg-red-600 z-20" />

      {/* Triangle-shaped indicator at 50% */}
      <div className="absolute top-[calc(-2.3rem)] left-[50%] transform -translate-x-1/2 z-30">
        <div className="text-center flex flex-col items-center">
          <p>2.86</p>
          <VscTriangleDown />
        </div>
        {/* <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-white transform -translate-x-1/2" /> */}
      </div>

      <div
        className="h-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 to-green-600"
        style={{ width: `${100}%` }}
      >
        {/* Label positioned slightly above the progress bar */}
        <div className="z-10 absolute bottom-[calc(-4.5rem)] left-[10%] transform -translate-x-1/2">
          <div className="text-center text-red-500 font-medium text-sm">
            <p>1.00</p>
            <p>Liquidation</p>
            <p> Value</p>
          </div>
        </div>
      </div>
    </div>
  );
}
