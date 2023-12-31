import { TokenData } from "../types";
import { inCurrencyFormat } from "../utils/helper";

export default function ReserveStatus({ token }: { token: TokenData }) {
  const formattedMaxLTV = Number(token.maxLTV) / 100;
  const formattedLiquidationThreshold = Number(token.liquidationThreshold) / 100;
  const formattedLiquidationPenalty = Number(token.liquidationPenalty) / 100;
  const formattedBorrowStableRate = Number(token.borrowStableRate) / 100;
  const formattedSupplyStableRate = Number(token.supplyStableRate) / 100;
  const fTotalSuppliedInUsd = inCurrencyFormat(
    Number(token.totalSuppliedInUsd) / 10 ** token.decimals
  );
  const fTotalBorrowedInUsd = inCurrencyFormat(
    Number(token.totalBorrowedInUsd) / 10 ** token.decimals
  );

  return (
    <div className="relative flex flex-col min-w-0 break-words px-4 border border-slate-700 text-white bg-gray-800 w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 py-3 border-0">
        <div className="flex flex-wrap">
          <div className="relative w-full  max-w-full">
            <p className="font-bold text-base sm:text-lg">
              Reserve status and Configuration
            </p>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
        </div>
      </div>

      <div className="block w-full overflow-x-auto ">
        <div className="flex md:flex-row flex-col border mb-8 pb-8 border-r-0 border-l-0 border-t-0 border-slate-700">
          <div className="font-medium text-base sm:text-lg md:w-3/12 mb-2">
            Supply Info
          </div>
          <div className="flex flex-col  md:w-9/12">
            <div className="flex mt-3 sm:mt-0">
              <div>
                <p className="font-medium text-gray-500 text-[12px] ss:text-sm ">
                  Total Supplied
                </p>
                <p className="font-medium text-base ss:text-lg">
                  ${fTotalSuppliedInUsd}
                </p>
              </div>
              <div className="ml-6">
                <p className="font-medium text-gray-500 text-[12px] ss:text-sm ">
                  APY Stable
                </p>
                <p className="font-medium text-base ss:text-lg">
                  {formattedSupplyStableRate}%
                </p>
              </div>
            </div>
            <div className=" my-3 rounded-md">
              <div className="text-sm ssm:text-base">
                Collateral Usage: ✔️{" "}
                <span className="text-green-500 font-medium">
                  Can be collateral
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:flex mt-2">
                <div className="w-full flex flex-col items-left border border-slate-600 p-1 rounded-md">
                  <p className="text-[12px] ss:text-[13px] text-gray-400 font-medium">
                    Max LTV
                  </p>
                  <p className="font-medium text-sm ss:text-base">
                    {formattedMaxLTV}%
                  </p>
                </div>
                <div className="w-full flex flex-col items-left border border-slate-600 p-1 rounded-md">
                  <p className="text-[12px] ss:text-[13px] text-gray-400 font-medium">
                    Liquidation Threshold
                  </p>
                  <p className="font-medium text-sm ss:text-base">
                    {formattedLiquidationThreshold}%
                  </p>
                </div>
                <div className="w-full flex flex-col items-left border border-slate-600 p-1 rounded-md">
                  <p className="text-[12px] ss:text-[13px] text-gray-400 font-medium">
                    Liquidation Penalty
                  </p>
                  <p className="font-medium text-sm ss:text-base">
                    {formattedLiquidationPenalty}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col pb-8 ">
          <div className="font-medium text-base sm:text-lg  sm:w-3/12">
            Borrow Info
          </div>
          <div className="flex flex-col sm:w-9/12">
            <div className="flex mt-3 sm:mt-0">
              <div>
                <p className="font-medium text-gray-500 text-[12px] ss:text-sm ">
                  Total Borrowed
                </p>
                <p className="font-medium text-sm ss:text-base">
                  ${fTotalBorrowedInUsd}
                </p>
              </div>
              <div className="ml-6">
                <p className="font-medium text-gray-500 text-[12px] ss:text-sm">
                  APY Stable{" "}
                </p>
                <p className="font-medium text-sm ss:text-base">
                  {formattedBorrowStableRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
