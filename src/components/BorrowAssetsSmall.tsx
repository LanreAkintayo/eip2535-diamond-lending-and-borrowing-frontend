import { useState } from "react";
import { Link } from "react-router-dom";
import { BorrowAsset } from "../types";
import RowBorrowAsset from "./RowBorrowAsset";
import Skeleton from "./Skeleton";
import CryptoJS from "crypto-js";
import { replacer } from "../utils/helper";
import ModalBorrow from "./ModalBorrow";
import BorrowAssetItem from "./BorrowAssetItem";

export default function BorrowAssetsSmall({
  tokens,
}: {
  tokens: BorrowAsset[];
}) {
  const [selectedTokenToBorrow, setSelectedTokenToBorrow] = useState(null);

  const handleCloseModal = () => {
    setSelectedTokenToBorrow(null);
  };

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

      <div className="block w-full divide-solid divide-slate-600 divide-y overflow-x-auto space-y-3">
        {tokens?.map((token: any) => {
          return (
            <BorrowAssetItem
              token={token}
              key={token.tokenAddress}
              balance={100}
              Borrow={() => {
                return (
                  <button
                    onClick={() => {
                      setSelectedTokenToBorrow(token);
                    }}
                    className="w-full bg-gray-300 text-base text-gray-800 hover:bg-gray-400 p-2 rounded-md "
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
                    className="w-full text-center border border-slate-600 text-base text-white font-medium text-black p-2 rounded-md hover:bg-gray-900"
                  >
                    Details
                  </Link>
                );
              }}
            />
          );
        })}

        <div className="flex justify-center text-center sm:block sm:p-0 mt-2">
          {selectedTokenToBorrow && (
            <ModalBorrow
              token={selectedTokenToBorrow}
              closeModal={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}
