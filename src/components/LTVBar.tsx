import * as React from "react";
import * as ReactDOM from "react-dom";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import { VscTriangleDown } from "react-icons/vsc";
import { range } from "../utils/helper";

export default function LTVBar() {
  const value = 10;
  const maxValue = 100;

  const progress = (value / maxValue) * 100;
  const internalProgress = 67.43;
  const internalProgress1 = 26.34;
  const internalProgress2 = 67.43;

  return (
    <div className="w-full h-3 bg-gray-700 overflow-hidden text-white">
      {/* Indicator at 10% */}
      <div className="absolute -top-1 left-[75.73%] h-6 w-[5px] bg-red-600 z-20" />

      {/* Triangle-shaped indicator at 50% */}
      <div className="absolute top-[calc(-2.9rem)] left-[26.34%] transform -translate-x-1/2 z-30">
        <div className="text-center flex flex-col items-center text-[12px]">
          <p>26.34%</p>
          <p>MAX 67.43%</p>
          <VscTriangleDown />
        </div>
      </div>

      {/* First internal progress bar with green background */}
      {/* <div
        className="h-full bg-green-500 relative space-x-5"
        style={{ width: `${internalProgress1}%` }}
      ></div> */}

      {/* Second internal progress bar with blue background */}
      <div
        className="h-full bg-green-500 relative space-x-5 z-10"
        style={{ width: `${internalProgress2}%` }}
      >
        <div className="w-full absolute inset-0 flex justify-between items-center z-12">
          {range(1, 30).map((_, index) => (
            <div
              key={index}
              className="bg-gray-700 w-[4px] h-full transform -skew-x-45"
            />
          ))}
        </div>
      </div>

      <div className="h-full bg-gray-400" style={{ width: `${100}%` }}>
        {/* Label positioned slightly above the progress bar */}
        <div className="z-10 absolute bottom-[calc(-4.3rem)] left-[75.73%] transform -translate-x-1/2">
          <div className="text-center text-red-500 font-medium text-[12px]">
            <p>75.73%</p>
            <p>Liquidation</p>
            <p> Threshold</p>
          </div>
        </div>
      </div>
    </div>
  );
}
