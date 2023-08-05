// import Image from "next/image";
import btc from "@assets/btc.png";
import { DetailedSuppliedToken } from "../types";
import { inCurrencyFormat } from "../utils/helper";
// import { todp } from "@utils/todp";

interface ISupplyRow {
  token: DetailedSuppliedToken;
  Withdraw: any;
  Supply: any;
}
export default function SupplyRow({ token, Withdraw, Supply }: ISupplyRow) {
 

  const formattedAmountSupplied = inCurrencyFormat(Number(token.amountSupplied) / 10** token.decimals)
  const formattedAmountSuppliedInUsd = inCurrencyFormat(Number(token.amountSuppliedInUsd) / 10 ** token.decimals)
  const formattedStableRate = Number(token.supplyStableRate) / 100

  return (
    <>
      <tr className="">
        <th className="border-b-0 px-4 border border-slate-700 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
          <div className="flex items-center">
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
        </th>
        <td className="border-b-0 px-4 border align-middle border-slate-700 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="text-base font-medium ">
            {formattedAmountSupplied}
          </div>
          <div className="text-sm text-gray-500">
            ${formattedAmountSuppliedInUsd}
          </div>
        </td>
        <td className="border-b-0 px-4 border align-middle border-slate-700 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {formattedStableRate}%
        </td>
        <td className="border-b-0 px-4 border  align-middle border-slate-700 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="text-green-700 text-lg font-medium"> &#10004; </div>
        </td>
        <td className="border-b-0 px-4 border align-middle border-slate-700 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <Withdraw />
          <Supply />
        </td>
      </tr>
    </>
  );
}
