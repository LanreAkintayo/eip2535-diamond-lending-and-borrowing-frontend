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

  //  const formattedAmountSupplied = inCurrencyFormat(Number(token.amountSupplied) / 10** token.decimals)
  // const formattedAmountSuppliedInUsd = inCurrencyFormat(Number(token.amountSuppliedInUsd) / 10 ** token.decimals)
  // const formattedStableRate = Number(token.supplyStableRate) / 100

  const [selectedTokenToSupply, setSelectedTokenToSupply] =
    useState<TokenData | null>();
  const [selectedTokenToBorrow, setSelectedTokenToBorrow] =
    useState<TokenData | null>();

  const [supplyError, setSupplyError] = useState(null);
  const [supplyResult, setSupplyResult] = useState(null);

  const [borrowingError, setBorrowingError] = useState(null);
  const [borrowingResult, setBorrowingResult] = useState(null);

  const handleCloseModal = () => {
    setSelectedTokenToSupply(null);
    setSelectedTokenToBorrow(null);
  };

  const supplyToken = async (token: any, value: any) => {
    alert("Supply token");
    // const tokenInst = new web3.eth.Contract(ERC20.abi, token.tokenAddress);
    // const larToken = new web3.eth.Contract(
    //   ERC20.abi,
    //   map[NETWORK_ID]["LARToken"][0]
    // );

    // try {
    //   await trackPromise(
    //     tokenInst.methods
    //       .approve(contract.options.address, web3.utils.toWei(value))
    //       .send({ from: account.data })
    //   );

    //   const supplyResult = await trackPromise(
    //     contract.methods
    //       .lend(tokenInst.options.address, web3.utils.toWei(value))
    //       .send({ from: account.data })
    //   );

    //   const larTokenBalance = await larToken.methods
    //     .balanceOf(account.data)
    //     .call();

    //   await trackPromise(
    //     larToken.methods
    //       .approve(contract.options.address, web3.utils.toWei(larTokenBalance))
    //       .send({ from: account.data })
    //   );

    //   setSupplyResult(supplyResult);
    // } catch (err) {
    //   setSupplyError(err);
    // }
  };

  const borrowToken = async (token: any, value: any) => {
    alert("borrowToken");
    // setBorrowingError(null);
    // setBorrowingResult(null);

    // try {
    //   const borrowingResult = await trackPromise(
    //     contract.methods
    //       .borrow(web3.utils.toWei(value), token.tokenAddress)
    //       .send({ from: account.data })
    //   );
    //   setBorrowingResult(borrowingResult);
    // } catch (err) {
    //   setBorrowingError(err);
    // }
  };

  const addTokenToMetamask = async (token: any) => {
    alert("Add token to metamask");
    // const tokenAddress = token.tokenAddress;
    // const tokenSymbol = token.name;
    // const tokenDecimals = token.decimals;
    // const tokenImage = IMAGES[token.name];

    // try {
    //   // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    //   const wasAdded = await ethereum.request({
    //     method: "wallet_watchAsset",
    //     params: {
    //       type: "ERC20", // Initially only supports ERC20, but eventually more!
    //       options: {
    //         address: tokenAddress, // The address that the token is at.
    //         symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
    //         decimals: tokenDecimals, // The number of decimals in the token
    //         image: tokenImage, // A string url of the token logo
    //       },
    //     },
    //   });

    //   if (wasAdded) {
    //   // Added
    //   } else {
    //     // Not Added
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const addLAR = async (token: any) => {
    alert("Add LAR");
    // const larToken = new web3.eth.Contract(
    //   ERC20.abi,
    //   map[NETWORK_ID]["LARToken"][0]
    // );

    // const tokenAddress = larToken.options.address;
    // const tokenSymbol = "LAR";
    // const tokenDecimals = 18;
    // const tokenImage = IMAGES["LAR"];

    // try {
    //   // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    //   const wasAdded = await ethereum.request({
    //     method: "wallet_watchAsset",
    //     params: {
    //       type: "ERC20", // Initially only supports ERC20, but eventually more!
    //       options: {
    //         address: tokenAddress, // The address that the token is at.
    //         symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
    //         decimals: tokenDecimals, // The number of decimals in the token
    //         image: tokenImage, // A string url of the token logo
    //       },
    //     },
    //   });

    //   if (wasAdded) {
    //    // Added
    //   } else {
    //    // Not Added
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="flex flex-col p-4 break-words px-4 border border-slate-700 text-white bg-gray-800  w-full mb-6 shadow-lg rounded">
      <p className="font-bold text-lg">Your Info</p>

      <div className="divide-y divide-slate-700">
        <div className="mt-8 flex items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-gray-700 border border-slate-400 rounded-md">
            <TfiWallet />
          </div>
          <div className="ml-3">
            <p className="text-gray-400 font-medium text-base">
              Wallet Balance
            </p>
            <p className="text-xl font-bold">
              {formattedWalletBalance} {token.tokenName}
            </p>
          </div>
        </div>

        <div className="my-5 py-5">
          <div className="flex items-center">
            <div className="w-9/12">
              <p className="text-gray-400 font-medium text-sm">
                Available to supply
              </p>
              <p className="text-xl font-bold">
                {" "}
                {formattedWalletBalance} {token.tokenName}
              </p>
              <p className="text-gray-400 font-medium text-base">
                ${formattedWalletBalanceInUsd}
              </p>
            </div>
            <div className="w-3/12">
              <button
                onClick={() => setSelectedTokenToSupply(token)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md px-4 text-base p-2 font-bold "
              >
                Supply
              </button>
            </div>
          </div>
          <div className=" mt-5 flex items-center">
            <div className="w-9/12">
              <p className="text-gray-400 font-medium text-sm">
                Available to Borrow
              </p>
              <p className="text-xl font-bold">
                {" "}
                {formattedAvailableToBorrow} {token.tokenName}
              </p>
              <p className="text-gray-400 font-medium text-base">
                ${formattedAvailableToBorrowInUsd}
              </p>
            </div>
            <div className="w-3/12">
              <button
                onClick={() => setSelectedTokenToBorrow(token)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md px-4 text-base p-2 font-bold "
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
