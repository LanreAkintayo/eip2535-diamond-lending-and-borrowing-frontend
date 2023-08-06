import { BorrowAsset } from "../types";
import { inCurrencyFormat } from "../utils/helper";

interface IRowBorrowAsset {
  token: BorrowAsset;
  balance: any;
  Borrow: any;
  Details: any;
}

export default function RowBorrowAsset({ token, balance, Borrow, Details }: IRowBorrowAsset) {
   const fAvailableToBorrow = inCurrencyFormat(
     Number(token.availableToBorrow) / 10 ** 18
   );
   const fAvailableToBorrowInUsd = inCurrencyFormat(
     Number(token.availableToBorrowInUsd) / 10 ** 18
  );
  
   const fBorrowStableRate = Number(token.borrowStableRate) / 100;


  return (
    <>
      <tr>
        <th className="border-t-0 border-slate-700 px-4 border align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
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
        <td className="border-t-0 border-slate-700 px-4 border align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="text-base font-medium ">
            {fAvailableToBorrow}
          </div>
          <div className="text-sm text-gray-500">
            ${fAvailableToBorrowInUsd}
          </div>
        </td>
        <td className="border-t-0 border-slate-700 px-4 border text-center align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          __
        </td>
        <td className="border-t-0 border-slate-700 px-4 border  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <span className=" p-1 px-3 rounded-md">
            {fBorrowStableRate}%
          </span>
        </td>
        <td className="border-t-0 border-slate-700 px-4 border align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <Borrow />
          <Details />
        </td>
      </tr>
    </>
  );
}
