// import { todp } from "@utils/todp";
import { useState } from "react";
import Skeleton from "./Skeleton";
import SupplyRow from "./SupplyRow";
import useDefi from "../hooks/useDefi";
import { inCurrencyFormat } from "../utils/helper";
import { DetailedSuppliedToken } from "../types";

interface IYourSupply {
  tokens: DetailedSuppliedToken[];
}

export default function YourSupply({ tokens }: IYourSupply) {
  const [selectedTokenToSupply, setSelectedTokenToSupply] = useState(null);
  const [selectedTokenToWithdraw, setSelectedTokenToWithdraw] = useState(null);
  const { userTotalCollateralInUsd } = useDefi();

  return (
    <div className="text-white">
      <div className="relative flex flex-col min-w-0 break-words bg-gray-800 border border-slate-700 w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 ">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full">
              <h3 className="font-bold text-lg">Your Supplies</h3>
              {Number(userTotalCollateralInUsd) != 0 && (
                <div className="mt-4 flex">
                  <div className="border border-slate-600 rounded-md font-normal px-2">
                    <p className="text-gray-400">
                      Balance {"  "}
                      <span className="font-normal text-gray-300">
                        $
                        {inCurrencyFormat(
                          Number(userTotalCollateralInUsd) / 10 ** 18
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="ml-5 border border-slate-600 rounded-md font-normal px-2">
                    <p className="text-gray-400">
                      Collateral {"  "}
                      <span className="font-normal text-gray-300">
                        $
                        {inCurrencyFormat(
                          Number(userTotalCollateralInUsd) / 10 ** 18
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-4 bg-blueGray-50  align-middle border border-solid border-slate-700 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Assets
                </th>
                <th className="px-4 bg-blueGray-50  align-middle border border-solid border-slate-700 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Debts
                </th>
                <th className="px-4 bg-blueGray-50  align-middle border border-solid border-slate-700 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  APY
                </th>
                <th className="px-4 bg-blueGray-50  align-middle border border-solid border-slate-700 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  APY type
                </th>
                <th className="px-4 bg-blueGray-50  align-middle border border-solid border-slate-700 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
              </tr>
            </thead>
            <tbody>
              {!tokens && <Skeleton />}
              {tokens?.map((token: any) => {
                return (
                  <SupplyRow
                    key={token.tokenAddress}
                    token={token}
                    Withdraw={() => {
                      return (
                        <button
                          onClick={() => setSelectedTokenToWithdraw(token)}
                          className="bg-gray-300 text-gray-700 text-base p-2 rounded-md"
                        >
                          Withdraw
                        </button>
                      );
                    }}
                    Supply={() => {
                      return (
                        <button
                          onClick={() => setSelectedTokenToSupply(token)}
                          className="ml-2 border border-gray-400 bg-slate-800 text-base font-medium p-2 px-4 rounded-md"
                        >
                          Supply
                        </button>
                      );
                    }}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
