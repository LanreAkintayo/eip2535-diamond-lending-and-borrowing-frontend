// import Image from "next/image";
import btc from "@assets/btc.png";
import { SupplyAsset } from "../types";
import { inCurrencyFormat } from "../utils/helper";
// import Link from "next/link";
// import { todp } from "@utils/todp";
import { Link } from "react-router-dom";

interface ISupplyAssetItem {
  token: SupplyAsset;
  Supply: any;
  Details: any;
}

export default function SupplyAssetItem({
  token,
  Supply,
  Details,
}: ISupplyAssetItem) {
  const formattedWalletBalance = inCurrencyFormat(
    Number(token.walletBalance) / 10 ** token.decimals
  );
  const formattedWalletBalanceInUsd = inCurrencyFormat(
    Number(token.walletBalanceInUsd) / 10 ** token.decimals
  );
  const formattedStableRate = Number(token.supplyStableRate) / 100;

  return (
    <div className="w-full flex flex-col p-2 space-y-2 text-sm">
      <div className="flex space-x-3 items-center ">
        <img
          src={token.tokenImage}
          width={30}
          height={30}
          // layout="fixed"
          className="card-img-top"
          alt="coinimage"
        />
        <div className="ml-2">{token.tokenName}</div>
      </div>
      <div className="flex justify-between">
        <p className="w-9/12">Wallet Balance</p>
        <div className="w-3/12 flex flex-col text-[12px]">
          <p>{formattedWalletBalance}</p>
          <p className="text-gray-400"> ${formattedWalletBalanceInUsd}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="w-9/12">Supply APY</p>

        <p className="w-3/12">{formattedStableRate}%</p>
      </div>
      <div className="flex">
        <p className="w-9/12">Can be collateral</p>

        <div className=" w-3/12 text-green-700 text-lg font-medium">
          &#10004;
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <Supply />
        <Details />
      </div>
    </div>
  );
}
