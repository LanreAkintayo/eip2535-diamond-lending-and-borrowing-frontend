import { useState } from "react";
import { Link } from "react-router-dom";
import { SupplyAsset, TokenData } from "../types";
import RowSupplyAsset from "./RowSupplyAsset";
import Skeleton from "./Skeleton";
import SupplyRow from "./SupplyRow";
import { replacer } from "../utils/helper";
import ModalSupply from "./ModalSupply";

interface IsupplyAsset {
  tokens: TokenData[];
}
export default function SupplyAssets({ tokens }: IsupplyAsset) {
  const [selectedTokenToSupply, setSelectedTokenToSupply] = useState(null);

  const handleCloseModal = () => {
    setSelectedTokenToSupply(null);
  };

  return (
    <div className=" flex flex-col min-w-0 break-words bg-gray-800 border border-slate-700 text-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full">
            <h3 className="font-bold text-lg px-0 ">Assets to Supply</h3>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
        </div>
      </div>
      <div className="block w-full overflow-auto scrollbar-hide">
        {/* Projects table */}
        <table className="items-center w-full bg-transparent border-collapse ">
          <thead>
            <tr>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs  border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Assets
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Wallet Balance
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                APY
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs  border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Is collateral
              </th>
              <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-slate-600 py-3 text-xs  border-t-0 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
            </tr>
          </thead>
          <tbody>
            {!tokens && <Skeleton />}
            {tokens?.map((token: any) => {
              return (
                <RowSupplyAsset
                  token={token}
                  key={token.tokenAddress}
                  Supply={() => {
                    return (
                      <button
                        onClick={() => setSelectedTokenToSupply(token)}
                        className="bg-gray-300 text-base text-gray-800 p-2 rounded-md hover:bg-gray-400"
                      >
                        Supply
                      </button>
                    );
                  }}
                  Details={() => {
                    const jsonString = JSON.stringify(token, replacer);

                    return (
                      <Link
                        to={`/reserve_overview/${token.tokenAddress}`}
                        state={{ tokenData: jsonString }}
                        className="ml-2 border border-slate-600 text-base font-medium text-white p-2 rounded-md hover:bg-gray-900"
                      >
                        Details
                      </Link>
                    );
                  }}
                />
              );
            })}
          </tbody>
        </table>

        <div className="justify-center items-center text-center sm:block sm:p-0 mt-2">
          {selectedTokenToSupply && (
            <ModalSupply
              token={selectedTokenToSupply}
              closeModal={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}
