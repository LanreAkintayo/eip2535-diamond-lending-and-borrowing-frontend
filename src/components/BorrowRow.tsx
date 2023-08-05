import matic from "@assets/matic.png";
import { inCurrencyFormat } from "../utils/helper";
import { DetailedBorrowedToken } from "../types";

export default function BorrowRow({
  token,
  Repay,
  Borrow,
}: {
  token: DetailedBorrowedToken;
  Repay: any;
  Borrow: any;
}) {
  const formattedAmountBorrowed = inCurrencyFormat(
    Number(token.amountBorrowed) / 10 ** token.decimals
  );
  const formattedAmountBorrowedInUsd = inCurrencyFormat(
    Number(token.amountBorrowedInUsd) / 10 ** token.decimals
  );
  const formattedStableRate = Number(token.stableRate) / 100;

  return (
    <>
      <tr>
        <th className="border-b-0 px-4 border align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
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
        <td className="border-b-0 px-4 border align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <div className="text-base font-medium">
            {formattedAmountBorrowed}
          </div>
          <div className="text-sm text-gray-500">
            ${formattedAmountBorrowedInUsd}
          </div>
        </td>
        <td className="border-b-0 px-4 border  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {formattedStableRate}%
        </td>
        <td className="border-b-0 px-4 border  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <span className="border border-gray-400 text-gray-400  bg-slate-800 p-1 px-3 rounded-md">
            STABLE
          </span>
        </td>
        <td className="border-b-0 px-4 border align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          <Repay />
          <Borrow />
        </td>
      </tr>
    </>
  );
}
