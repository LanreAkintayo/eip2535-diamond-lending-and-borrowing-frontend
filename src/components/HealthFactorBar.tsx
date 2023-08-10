import * as React from "react";
import * as ReactDOM from "react-dom";
import { ProgressBarComponent } from "@syncfusion/ej2-react-progressbar";
import { VscTriangleDown } from "react-icons/vsc";
import useDefi from "../hooks/useDefi";

export default function HealthFactorBar() {
  const value = 10;
  const maxValue = 100;

  const progress = (value / maxValue) * 100;

  const { healthFactor } = useDefi();

  const fHealthFactor = Number(healthFactor) / 10000;
  const apparentTotalHealthFactor = 10;

  const hFPercentage =
    fHealthFactor > 10
      ? 100
      : (fHealthFactor * 100) / apparentTotalHealthFactor;

  console.log("hFPercentage: ", hFPercentage);

  console.log("Health factor: ", fHealthFactor);

  // const progress = (value / maxValue) * 100;
  const internalProgress2 = 67.4;

  return (
    <div className="w-full h-2 bg-gray-300 overflow-hidden text-white">
      {/* Indicator at 10% */}
      <div className="absolute -top-1 left-[10%] h-5 w-[3px] bg-red-600 z-20" />

      {/* Triangle-shaped indicator at 50% */}
      <div
        className={`absolute top-[calc(-1.7rem)] transform -translate-x-1/2 z-30`}
        style={{ left: `${hFPercentage}%` }}
      >
        <div className="text-center flex flex-col items-center text-[12px]">
          <p>{fHealthFactor.toFixed(2)}</p>
          <VscTriangleDown />
        </div>
      </div>

      <div
        className="h-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 to-green-600"
        style={{ width: `${100}%` }}
      >
        {/* Label positioned slightly above the progress bar */}
        <div className="z-10 absolute bottom-[calc(-4.5rem)] left-[10%] transform -translate-x-1/2">
          <div className="text-center text-red-500 font-medium text-[12px]">
            <p>1.00</p>
            <p>Liquidation</p>
            <p> Value</p>
          </div>
        </div>
      </div>
    </div>
  );
}
