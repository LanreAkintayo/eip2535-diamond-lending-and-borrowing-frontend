import matic from "@assets/matic.png";
import { inCurrencyFormat } from "../utils/helper";
import { DetailedBorrowedToken } from "../types";

export default function BorrowItem({
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
    <div className="w-full flex flex-col p-2 space-y-3 text-sm">
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
        <p className="w-9/12">Debt</p>
        <div className="w-3/12 flex flex-col text-[12px]">
          <p>{formattedAmountBorrowed}</p>
          <p className="text-gray-400"> ${formattedAmountBorrowedInUsd}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="w-9/12">Borrow APY</p>

        <p className="w-3/12">{formattedStableRate}%</p>
      </div>
      <div className="flex">
        <p className="w-9/12">APY Type</p>

        <span className="border border-gray-400 text-gray-400 text-[12px] bg-slate-800  px-3 rounded-md">
          STABLE
        </span>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <Repay />
        <Borrow />
      </div>
    </div>
  );
}
