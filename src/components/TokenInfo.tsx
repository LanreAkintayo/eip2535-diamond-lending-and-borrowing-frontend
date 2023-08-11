import { useState } from "react";
import ModalBorrow from "./ModalBorrow";
import ModalSupply from "./ModalSupply";
import { TokenData } from "../types";
import { inCurrencyFormat, todp } from "../utils/helper";
import { TfiWallet } from "react-icons/tfi";

interface ITokenInfo {
  token: TokenData;
  actualAvailable: any;
  web3: any;
  contract: any;
  account: any;
  yourSupplies: any;
  yourBorrows: any;
}
export default function TokenInfo({
  token,
  actualAvailable,
  web3,
  contract,
  account,
  yourSupplies,
  yourBorrows,
}: ITokenInfo) {
  const formattedWalletBalance = inCurrencyFormat(
    Number(token.walletBalance) / 10 ** token.decimals
  );
  const formattedWalletBalanceInUsd = inCurrencyFormat(
    Number(token.walletBalanceInUsd) / 10 ** token.decimals
  );
  const formattedAvailableToBorrow = inCurrencyFormat(
    Number(token.availableToBorrow) / 10 ** 18
  );
  const formattedAvailableToBorrowInUsd = inCurrencyFormat(
    Number(token.availableToBorrowInUsd) / 10 ** 18
  );


  const [selectedTokenToSupply, setSelectedTokenToSupply] =
    useState<TokenData | null>();
  const [selectedTokenToBorrow, setSelectedTokenToBorrow] =
    useState<TokenData | null>();

  const handleCloseModal = () => {
    setSelectedTokenToSupply(null);
    setSelectedTokenToBorrow(null);
  };

 

  return (
    <div className="flex flex-col p-4 break-words px-4 border border-slate-700 text-white bg-gray-800  w-full mb-6 shadow-lg rounded">
      <p className="font-bold text-base sm:text-lg">Your Info</p>

      <div className="divide-y divide-slate-700">
        <div className="mt-8 flex items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-700 border border-slate-400 rounded-md">
            <TfiWallet />
          </div>
          <div className="ml-3">
            <p className="text-gray-400 font-medium text-sm sm:text-base">
              Wallet Balance
            </p>
            <p className="text-lg sm:text-xl font-bold">
              {formattedWalletBalance} {token.tokenName}
            </p>
          </div>
        </div>

        <div className="my-5 py-5">
          <div className="flex items-center">
            <div className="w-8/12 ssm:w-9/12">
              <p className="text-gray-400 font-medium text-sm">
                Available to supply
              </p>
              <p className="text-lg sm:text-xl font-bold">
                {" "}
                {formattedWalletBalance} {token.tokenName}
              </p>
              <p className="text-gray-400 font-medium text-sm sm:text-base">
                ${formattedWalletBalanceInUsd}
              </p>
            </div>
            <div className="w-4/12 ssm:w-3/12">
              <button
                onClick={() => setSelectedTokenToSupply(token)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md px-4 text-sm sm:text-base p-2 font-bold "
              >
                Supply
              </button>
            </div>
          </div>
          <div className=" mt-5 flex items-center">
            <div className="w-8/12 ssm:w-9/12">
              <p className="text-gray-400 font-medium text-sm">
                Available to Borrow
              </p>
              <p className="text-lg sm:text-xl font-bold">
                {" "}
                {formattedAvailableToBorrow} {token.tokenName}
              </p>
              <p className="text-gray-400 font-medium text-sm sm:text-base">
                ${formattedAvailableToBorrowInUsd}
              </p>
            </div>
            <div className="w-4/12 ssm:w-3/12">
              <button
                onClick={() => setSelectedTokenToBorrow(token)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md px-4 text-sm sm:text-base p-2 font-bold "
              >
                Borrow
              </button>
            </div>
          </div>

          <div className="justify-center items-center text-center sm:block sm:p-0 mt-2">
            {selectedTokenToSupply && (
              <ModalSupply
                token={selectedTokenToSupply}
                closeModal={handleCloseModal}
              />
            )}

            {selectedTokenToBorrow && (
              <ModalBorrow
                token={selectedTokenToBorrow}
                closeModal={handleCloseModal}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
