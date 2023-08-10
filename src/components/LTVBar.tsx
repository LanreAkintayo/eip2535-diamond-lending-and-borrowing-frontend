import * as React from "react";
import * as ReactDOM from "react-dom";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import { VscTriangleDown } from "react-icons/vsc";
import { range } from "../utils/helper";
import useDefi from "../hooks/useDefi";

export default function LTVBar() {
  const value = 10;
  const maxValue = 100;



  const { healthFactor, maxLTV, currentLTV, liquidationThresholdWeighted } = useDefi();

  const fMaxLTV = Number(maxLTV) / 100;
  const fCurrentLTV = Number(currentLTV) / 100;
  const fLiquidationThresholdWeighted = Number(liquidationThresholdWeighted) / 100;
  
  console.log("fMaxLTV: ", fMaxLTV)
  console.log("fCurrentLTV: ", fCurrentLTV)
  console.log("fLiquidationThresholdWeighted: ", fLiquidationThresholdWeighted)


  return (
    <div className="w-full h-2 bg-gray-700 overflow-hidden text-white">
      {/* Indicator at 10% */}
      <div
        className="absolute -top-1 h-4 w-[3px] bg-red-600 z-20"
        style={{ left: `${fLiquidationThresholdWeighted}%` }}
      />

      {/* Triangle-shaped indicator at 50% */}
      <div
        className="absolute top-[calc(-2.9rem)]  transform -translate-x-1/2 z-30"
        style={{ left: `${fCurrentLTV}%` }}
      >
        <div className="text-center flex flex-col items-center text-[12px]">
          <p>{fCurrentLTV}%</p>
          <p>MAX {fMaxLTV}%</p>
          <VscTriangleDown />
        </div>
      </div>

      {/* Nested progress bar with blue background */}
      <div
        className="absolute top-0 left-[0%] h-full bg-green-600 space-x-5 z-50"
        style={{ width: `${fCurrentLTV}%` }}
      ></div>
      {/* First internal progress bar with green background */}
      <div
        className="h-full bg-green-600 opacity-50 relative space-x-5 z-40"
        style={{ width: `${fMaxLTV}%` }}
      >
        <div className="w-full absolute inset-0 flex justify-between items-center">
          {range(1, 30).map((_, index) => (
            <div
              key={index}
              className="bg-gray-700 w-[4px] h-full transform skew-x-45"
            />
          ))}
        </div>
      </div>

      <div className="h-full bg-gray-400" style={{ width: `${100}%` }}>
        {/* Label positioned slightly above the progress bar */}
        <div
          className="z-10 absolute bottom-[calc(-4.3rem)] transform -translate-x-1/2"
          style={{ left: `${fLiquidationThresholdWeighted}%` }}
        >
          <div className="text-center text-red-500 font-medium text-[12px]">
            <p>{fLiquidationThresholdWeighted}%</p>
            <p>Liquidation</p>
            <p> Threshold</p>
          </div>
        </div>
      </div>
    </div>
  );
}
