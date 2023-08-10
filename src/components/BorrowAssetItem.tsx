import { BorrowAsset } from "../types";
import { inCurrencyFormat } from "../utils/helper";

interface IBorrowAssetItem {
  token: BorrowAsset;
  balance: any;
  Borrow: any;
  Details: any;
}

export default function BorrowAssetItem({ token, balance, Borrow, Details }: IBorrowAssetItem) {
   const fAvailableToBorrow = inCurrencyFormat(
     Number(token.availableToBorrow) / 10 ** 18
   );
   const fAvailableToBorrowInUsd = inCurrencyFormat(
     Number(token.availableToBorrowInUsd) / 10 ** 18
  );
  
   const fBorrowStableRate = Number(token.borrowStableRate) / 100;


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
        <p className="w-9/12">Available to borrow</p>
        <div className="w-3/12 flex flex-col text-[12px]">
          <p>{fAvailableToBorrow}</p>
          <p className="text-gray-400"> ${fAvailableToBorrowInUsd}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="w-9/12">Borrow APY</p>

        <p className="w-3/12">{fBorrowStableRate}%</p>
      </div>
      <div className="flex">
        <p className="w-9/12">APY Type</p>

        <span className="border border-gray-400 text-gray-400 text-[12px] bg-slate-800  px-3 rounded-md">
          STABLE
        </span>
      </div>
      <div className="flex justify-center items-center space-x-2">
        <Borrow />
        <Details />
      </div>
    </div>
  );
}
