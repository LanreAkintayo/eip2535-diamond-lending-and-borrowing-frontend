import { useState } from "react";
import ModalBorrow from "./ModalBorrow";
import ModalSupply from "./ModalSupply";
import { TokenData } from "../types";
import { inCurrencyFormat, todp } from "../utils/helper";


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

  const formattedWalletBalance = inCurrencyFormat(Number(token.walletBalance) / 10** token.decimals)
  const formattedWalletBalanceInUsd = inCurrencyFormat(Number(token.walletBalanceInUsd) / 10 ** token.decimals)
  const formattedAvailableToBorrow = inCurrencyFormat(Number(token.availableToBorrow) / 10 ** 18)
  const formattedAvailableToBorrowInUsd = inCurrencyFormat(Number(token.availableToBorrowInUsd) / 10 ** 18)
  
  //  const formattedAmountSupplied = inCurrencyFormat(Number(token.amountSupplied) / 10** token.decimals)
  // const formattedAmountSuppliedInUsd = inCurrencyFormat(Number(token.amountSuppliedInUsd) / 10 ** token.decimals)
  // const formattedStableRate = Number(token.supplyStableRate) / 100


  const [selectedTokenToSupply, setSelectedTokenToSupply] = useState<TokenData | null>();
  const [selectedTokenToBorrow, setSelectedTokenToBorrow] = useState<TokenData | null>();

  const [supplyError, setSupplyError] = useState(null);
  const [supplyResult, setSupplyResult] = useState(null);

  const [borrowingError, setBorrowingError] = useState(null);
  const [borrowingResult, setBorrowingResult] = useState(null);

  const handleCloseModal = () => {
    setSupplyError(null);
    setSupplyResult(null);
    setBorrowingError(null);
    setBorrowingResult(null);
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
    alert("Add token to metamask")
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
    alert("Add LAR")
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
    <div className="relative flex flex-col min-w-0 break-words px-4 border border-slate-700 text-white bg-gray-800  w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 py-3 border-0">
        <div className="flex flex-wrap">
          <div className="relative w-full  max-w-full">
            <p className="font-bold text-lg">Your Info</p>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right"></div>
        </div>
      </div>

      <div className="block w-full overflow-x-auto ">
        <div className="flex sm:flex-row flex-col mb-8 pb-2  border-gray-300">
          <div className="flex w-full flex-col">
            <div className="flex w-full my-8 justify-between">
              <p className="w-7/12 text-gray-500 text-sm sm:text-base">
                Wallet Balance
              </p>
              <div className="w-5/12 flex flex-col">
                <p className="font-medium text-sm sm:text-base">
                  {formattedWalletBalance} {token.tokenName}
                </p>
                <p className="font-medium text-gray-500 text-sm">
                  ${formattedWalletBalanceInUsd}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <p className="w-7/12 text-gray-500 text-sm sm:text-base">
                Available to Supply
              </p>
              <div className="w-5/12">
                <p className="font-medium text-sm sm:text-base">
                  {formattedWalletBalance} {token.tokenName}
                </p>
                <p className="font-medium text-gray-500 text-sm">
                  ${formattedWalletBalanceInUsd}
                </p>
              </div>
            </div>
            <div className="mt-8 flex w-full">
              <p className="w-7/12 text-gray-500 text-sm sm:text-base">
                Available to Borrow
              </p>
              <div className="flex flex-col w-5/12">
                <p className="font-medium text-sm sm:text-base">
                  {formattedAvailableToBorrow} {token.tokenName}
                </p>
                <p className="font-medium text-gray-500 text-sm">
                  ${formattedAvailableToBorrowInUsd}
                </p>
              </div>
            </div>
            <div className="flex w-full pt-8">
              <button
                onClick={() => setSelectedTokenToSupply(token)}
                className="bg-gray-300 text-gray-800 p-2 rounded-md text-base"
              >
                Supply
              </button>
              <button
                onClick={() => setSelectedTokenToBorrow(token)}
                className="bg-gray-300 text-gray-800 ml-2 p-2 rounded-md text-base"
              >
                Borrow
              </button>
            </div>

            <div className="flex justify-center text-center sm:block sm:p-0 mt-2">
              {selectedTokenToSupply && (
                <ModalSupply
                  token={selectedTokenToSupply}
                  supplyError={supplyError}
                  supplyResult={supplyResult}
                  addLAR={addLAR}
                  closeModal={handleCloseModal}
                  onSupply={supplyToken}
                />
              )}

              {selectedTokenToBorrow && (
                <ModalBorrow
                  token={selectedTokenToBorrow}
                  closeModal={handleCloseModal}
                  balance={yourSupplies.data?.yourBalance}
                  onBorrow={borrowToken}
                  borrowingError={borrowingError}
                  borrowingResult={borrowingResult}
                  addBorrowedToken={addTokenToMetamask}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
