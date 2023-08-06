import { useState } from "react";
import { Link } from "react-router-dom";
import { BorrowAsset } from "../types";
import RowBorrowAsset from "./RowBorrowAsset";
import Skeleton from "./Skeleton";
import CryptoJS from "crypto-js";
import { replacer } from "../utils/helper";

export default function BorrowAssets({ tokens }: { tokens: BorrowAsset[]; }) {
  const [selectedTokenToBorrow, setSelectedTokenToBorrow] = useState(null);
  
  
  return (
    <div className="flex flex-col min-w-0 break-words bg-gray-800 text-white border border-slate-700 w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full">
            <h3 className="font-bold text-lg">Assets to Borrow</h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Assets
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Available
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                APY, variable
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                APY, stable
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
            </tr>
          </thead>
          <tbody>
            {!tokens && <Skeleton />}
            {tokens?.map((token: any) => {
                return (
                  <RowBorrowAsset
                    token={token}
                    key={token.tokenAddress}
                    balance={100}
                    Borrow={() => {
                      return (
                        <button
                          onClick={() => {
                            setSelectedTokenToBorrow(token);
                          }}
                          className="bg-gray-300 text-base text-gray-800 hover:bg-gray-400 p-2 rounded-md"
                        >
                          Borrow
                        </button>
                      );
                    }}
                    Details={() => {
                      // Step 1: Convert JSON object to a string
                      const jsonString = JSON.stringify(token, replacer);

                      return (
                        <Link
                          to={`/reserve_overview/${token.tokenAddress}`}
                          state={{ tokenData: jsonString }}
                          className="ml-2 border border-slate-600 text-base text-white font-medium text-black p-2 rounded-md hover:bg-gray-900"
                        >
                          Details
                        </Link>
                      );
                    }}
                  />
                );
            })}</tbody>
        </table>
      </div>
    </div>
  );
}
