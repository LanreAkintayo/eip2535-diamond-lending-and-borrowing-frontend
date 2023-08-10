// import { todp } from "@utils/helpfulScripts";
import { useState } from "react";
import useDefi from "../hooks/useDefi";
import { inCurrencyFormat } from "../utils/helper";
import BorrowRow from "./BorrowRow";
import Skeleton from "./Skeleton";
import { DetailedBorrowedToken } from "../types";
import ModalBorrow from "./ModalBorrow";
import ModalRepay from "./ModalRepay";
import BorrowItem from "./BorrowItem";

interface IYourBorrowsSmall {
  tokens: DetailedBorrowedToken[];
}
export default function YourBorrowsSmall({ tokens }: IYourBorrowsSmall) {
  const [selectedTokenToRepay, setSelectedTokenToRepay] = useState(null);
  const [selectedTokenToBorrow, setSelectedTokenToBorrow] = useState(null);
  const {
    userTotalBorrowedInUsd,
    borrowPower,
    userTotalCollateralInUsd,
    maxLTV,
  } = useDefi();

  const formattedBorrowPower = borrowPower ? Number(borrowPower) / 100 : 0;

  const handleCloseModal = () => {
    setSelectedTokenToBorrow(null);
    setSelectedTokenToRepay(null);
  };

  return (
    <div className="text-white">
      <div className="relative flex flex-col min-w-0 break-words bg-gray-800 border border-slate-700 w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-2 py-3 border border-t-0 border-r-0 border-l-0 border-slate-700">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-1 max-w-full">
              <h3 className="font-bold sm:text-lg">Your Borrows</h3>
              {Number(userTotalBorrowedInUsd) != 0 && (
                <div className="mt-4 flex space-x-2">
                  <div className="text-[12px] border border-slate-600 rounded-md font-normal px-2">
                    <p className="text-gray-400">
                      Balance {"  "}
                      <span className="font-normal text-gray-300">
                        $
                        {inCurrencyFormat(
                          Number(userTotalBorrowedInUsd) / 10 ** 18
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="text-[12px] border border-slate-600 rounded-md font-normal px-2">
                    <p className="text-gray-400">
                      Borrow power used{" "}
                      <span className="font-normal text-gray-300">
                        {formattedBorrowPower}%
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
          </div>
        </div>

        <div className="block w-full divide-solid divide-slate-600 divide-y overflow-x-auto space-y-3">
          {tokens?.length == 0 && (
            <div className="w-full flex flex-col items-center justify-center p-2 space-y-2 text-sm">
              No Borrows yet
            </div>
          )}

          {tokens?.map((token: any) => {
            return (
              <BorrowItem
                key={token.tokenAddress}
                token={token}
                Repay={() => {
                  return (
                    <button
                      onClick={() => setSelectedTokenToRepay(token)}
                      className="w-full bg-gray-300 text-gray-700  px-4 text-sm p-2 rounded-md hover:bg-gray-400"
                    >
                      Repay
                    </button>
                  );
                }}
                Borrow={() => {
                  return (
                    <button
                      onClick={() => setSelectedTokenToBorrow(token)}
                      className="w-full border border-gray-400 hover:bg-gray-900 bg-slate-800 px-4 text-base font-medium p-2 rounded-md"
                    >
                      Borrow
                    </button>
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

            {selectedTokenToRepay && (
              <ModalRepay
                token={selectedTokenToRepay}
                closeModal={handleCloseModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
