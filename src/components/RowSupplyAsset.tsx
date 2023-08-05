// import Image from "next/image";
import btc from "@assets/btc.png";
import { SupplyAsset } from "../types";
import { inCurrencyFormat } from "../utils/helper";
// import Link from "next/link";
// import { todp } from "@utils/todp";
import { Link } from "react-router-dom";


interface IRowSupplyAsset {
  token: SupplyAsset;
  Supply: any;
  Details: any;
}

export default function RowSupplyAsset({ token, Supply, Details }: IRowSupplyAsset) {

   const formattedWalletBalance = inCurrencyFormat(
     Number(token.walletBalance) / 10 ** token.decimals
   );
   const formattedWalletBalanceInUsd = inCurrencyFormat(
     Number(token.walletBalanceInUsd) / 10 ** token.decimals
   );
   const formattedStableRate = Number(token.supplyStableRate) / 100;

  
  return (
    <>
      <tr>
        <th className="border-t-0 px-4 border border-slate-700 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
          <div className="flex items-center">
            <img
              src={token.tokenImage}
              width={30}
              height={30}
              // layout="fixed"
              className="card-img-top"
              alt="coinimage"
            />
            <div className="ml-2 mr-2">{token.tokenName}</div>
          </div>
        </th>
        <td className="border-t-0 px-4 border align-middle border-slate-700 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="text-base font-medium ">{formattedWalletBalance}</div>
          <div className="text-sm text-gray-500">
            ${formattedWalletBalanceInUsd}
          </div>
        </td>
        <td className="border-t-0 px-4 border border-slate-700 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="text-base">{formattedStableRate}%</div>
        </td>
        <td className="border-t-0 px-4 border border-slate-700 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="text-green-700 text-lg font-medium"> &#10004; </div>
        </td>
        <td className="border-t-0 px-4 border border-slate-700 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <Supply />
          <Details />
          {/* <Link to="./detail">
            <a className="ml-2 border border-gray-400 text-base font-medium text-black p-2 rounded-md">
              Details
            </a>
          </Link> */}
        </td>
      </tr>
    </>
  );
}
