// import Image from "next/image";
import btc from "@assets/btc.png";
import { DetailedSuppliedToken } from "../types";
import { inCurrencyFormat } from "../utils/helper";
// import { todp } from "@utils/todp";

interface ISupplyItem {
  token: DetailedSuppliedToken;
  Withdraw: any;
  Supply: any;
}
export default function SupplyItem({ token, Withdraw, Supply }: ISupplyItem) {
  const formattedAmountSupplied = inCurrencyFormat(
    Number(token.amountSupplied) / 10 ** token.decimals
  );
  const formattedAmountSuppliedInUsd = inCurrencyFormat(
    Number(token.amountSuppliedInUsd) / 10 ** token.decimals
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
        <p className="w-9/12">Supply Balance</p>
        <div className="w-3/12 flex flex-col text-[12px]">
          <p>{formattedAmountSupplied}</p>
          <p className="text-gray-400"> ${formattedAmountSuppliedInUsd}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="w-9/12">Supply APY</p>

        <p className="w-3/12">{formattedStableRate}%</p>
      </div>
      <div className="flex">
        <p className="w-9/12">Used as collateral</p>

        <div className=" w-3/12 text-green-700 text-lg font-medium">
          &#10004;
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <Withdraw />
        <Supply />
      </div>
    </div>
  );
}
