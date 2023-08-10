import { useState } from "react";
import { Link } from "react-router-dom";
import { SupplyAsset, TokenData } from "../types";
import RowSupplyAsset from "./RowSupplyAsset";
import Skeleton from "./Skeleton";
import SupplyRow from "./SupplyRow";
import { replacer } from "../utils/helper";
import ModalSupply from "./ModalSupply";
import SupplyAssetItem from "./SupplyAssetItem";

interface IsupplyAssetSmall {
  tokens: TokenData[];
}
export default function SupplyAssetsSmall({ tokens }: IsupplyAssetSmall) {
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

      <div className="block w-full divide-solid divide-slate-600 divide-y overflow-x-auto space-y-3">
        {!tokens && <Skeleton />}
        {tokens?.map((token: any) => {
          return (
            <SupplyAssetItem
              token={token}
              key={token.tokenAddress}
              Supply={() => {
                return (
                  <button
                    onClick={() => setSelectedTokenToSupply(token)}
                    className="w-full bg-gray-300 text-base text-gray-800 p-2 rounded-md hover:bg-gray-400"
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
                    className="text-center w-full border border-slate-600 text-base font-medium text-white p-2 rounded-md hover:bg-gray-900"
                  >
                    Details
                  </Link>
                );
              }}
            />
          );
        })}

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
