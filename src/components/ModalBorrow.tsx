import correct from "@assets/correct.png";
import { useEffect, useState } from "react";
import BorderLayout from "./BorderLayout";
import { TokenData } from "../types";
import { GiCheckMark } from "react-icons/gi";
import {
  getBorrowHealthFactor,
  getLatestHealthFactor,
  inCurrencyFormat,
} from "../utils/helper";
import {
  IMAGES,
  diamondAbi,
  diamondAddress,
  erc20Abi,
  erc20PermitAbi,
  getterAbi,
  larAddress,
  types,
} from "../constants";
import useWallet from "../hooks/useWallet";
import { Signature, ethers } from "ethers";
import { erc20ABI } from "wagmi";
import {
  readContract,
  signTypedData,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { getEthersProvider } from "../ethers";
import { getEthersSigner } from "../ethersSigner";
import { TfiWallet } from "react-icons/tfi";
import { ClipLoader } from "react-spinners";
import useDefi from "../hooks/useDefi";
import { BsArrowRight } from "react-icons/bs";
import { displayToast } from "./Toast";
import {IoMdInfinite} from "react-icons/io"

interface IModalBorrow {
  token: TokenData;
  closeModal: any;
}

export default function ModalBorrow({ token, closeModal }: IModalBorrow) {
  const [value, setValue] = useState("");
  const [valueInUsd, setValueInUsd] = useState("0.00");
  const [deadline, setDeadline] = useState(0);
  const [sig, setSig] = useState<Signature>();
  const [transactionHash, setTransactionHash] = useState("");

  const { signerAddress, chainId, addToken } = useWallet();
  const {
    loadHealthFactor,
    loadSupplyAssets,
    loadUserSupplies,
    loadUserTotalCollateralInUsd,
    loadUserTotalBorrowedInUsd,
    loadCurrentLTV,
    loadMaxLTV,
    loadBorrowPower,
    healthFactor,
    userSupplies,
    userTotalCollateralInUsd,
    userTotalBorrowedInUsd,
    liquidationThresholdWeighted,
    loadLiquidationThresholdWeighted,
    loadBorrowAssets,
    loadUserBorrows,
  } = useDefi();

  const [isLoading, setIsLoading] = useState(false);

  const [isApproving, setIsApproving] = useState(false);
  const [approveText, setApproveText] = useState(
    `Approve ${token.tokenName} to continue`
  );
  const [hasApproved, setHasApproved] = useState(true);

  const [isBorrowing, setIsBorrowing] = useState(false);
  const [borrowText, setBorrowText] = useState(`Borrow ${token.tokenName}`);

  const [isSuccess, setIsSuccess] = useState(false);

  const formattedHealthFactor = healthFactor ? Number(healthFactor) / 10000 : 0;
  const [latestHealthFactor, setLatestHealthFactor] = useState(0);

  const [reserveBalance, setReserveBalance] = useState(-1);
  const [reserveBalanceInUsd, setReserveBalanceInUsd] = useState(-1);

  // health factor color
  let healthFactorColor;
  let latestHealthFactorColor;
  if (healthFactor) {
    healthFactorColor =
      formattedHealthFactor > 10
        ? "text-green-600"
        : formattedHealthFactor > 2
        ? "text-orange-300"
        : formattedHealthFactor > 0
        ? "text-red-300"
        : "text-white";
  }

  if (latestHealthFactor > 0) {
    latestHealthFactorColor =
      latestHealthFactor > 10
        ? "text-green-600"
        : latestHealthFactor > 2
        ? "text-orange-300"
        : latestHealthFactor > 0
        ? "text-red-300"
        : "text-white";
  }

  useEffect(() => {
    // Check the reserve amount
    const checkReserveBalance = async () => {
      const reserveBalance = (await readContract({
        address: token.tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [diamondAddress],
      })) as bigint;
      const oraclePrice = Number(token.oraclePrice) / 10 ** token.decimals;

      const reserveBalanceInUsd =
        (Number(reserveBalance) / 10 ** token.decimals) * oraclePrice;

      console.log(
        "Reserve Balance: ",
        Number(reserveBalance) / 10 ** token.decimals
      );

      console.log("Reserve balance in usd: ", reserveBalanceInUsd);
      //  console.log("Reserve balance: ", reserveBalance);

      const formattedReserveBalance =
        Number(reserveBalance) / 10 ** token.decimals;

      setReserveBalance(formattedReserveBalance);
      setReserveBalanceInUsd(reserveBalanceInUsd);
    };

    checkReserveBalance();
  }, []);
  const updateBorrow = async () => {
    await loadHealthFactor(signerAddress);
    await loadMaxLTV(signerAddress)
    await loadCurrentLTV(signerAddress)
    await loadBorrowAssets(signerAddress);
    await loadUserBorrows(signerAddress);
    await loadUserTotalBorrowedInUsd(signerAddress);
    await loadLiquidationThresholdWeighted(signerAddress);
    await loadBorrowPower(signerAddress)
  };

  const borrowToken = async () => {
    console.log("We are here");

    setIsBorrowing(true);
    setBorrowText(`Borrowing ${token.tokenName}`);
    const parsedValue = (Number(value) * 10 ** token.decimals).toFixed(0);
    console.log("We are now here");
    console.log("We are inside try block");
    try {
      const borrowRequest = await prepareWriteContract({
        address: diamondAddress as `0x${string}`,
        abi: diamondAbi,
        functionName: "borrow",
        args: [token.tokenAddress, parsedValue],
      });

      const { hash } = await writeContract(borrowRequest);
      setTransactionHash(hash);

      const borrowReceipt = await waitForTransaction({
        hash,
      });

      console.log("Receipt: ", borrowReceipt);
      if (borrowReceipt.status == "success") {
        console.log("Supplied");
        setIsSuccess(true);
        await updateBorrow();

        // await
        // await loadAllWalletTokens(signerAddress)
      } else {
        console.log("Failure");
        console.log("Failed to borrow");
      }

      setIsBorrowing(false);
      setBorrowText(`Borrow ${token.tokenName}`);
    } catch (error) {
      console.log("Error: ", error);
      displayToast("failure", "Failed to borrow");
      setIsBorrowing(false);
      setBorrowText(`Borrow ${token.tokenName}`);
    }
  };

  return (
    <BorderLayout>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-t">
          <h3 className="text-xl font-medium text-white">
            {isSuccess ? `Sucessful` : `Borrow ${token.tokenName}`}
          </h3>
          <button
            placeholder="0.00"
            onClick={() => {
              setValue("");
              setValueInUsd("0.00");
              closeModal();
            }}
            disabled={isLoading}
            type="button"
            className={`text-gray-400 bg-transparent ${
              isLoading
                ? "text-gray-200"
                : "dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900"
            }  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center `}
            data-modal-toggle="small-modal"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* <div className="p-2 mt-2 rounded-md bg-orange-200 ">
                    <p className="">Wrong Network. Please switch to Kovan</p>
                  </div> */}
      </div>
      {/* <!-- Modal body --> */}
      {isSuccess ? (
        <div className="w-full max-w-md pt-1 space-y-3">
          <div className="flex flex-col justify-center items-center">
            <GiCheckMark className="w-10 h-10 rounded-full text-green-200 bg-green-800 p-2" />

            <div className="font-bold mt-4">All Done!</div>
            <p>
              You borrowed {value} {token?.tokenName}
            </p>
            <div className="p-4 w-[300px] border my-3 space-y-2 border-slate-700 rounded-md flex items-center justify-center flex-col">
              <img
                src={token.tokenImage}
                width={40}
                height={40}
                // layout="fixed"
                className="card-img-top"
                alt="coinimage"
              />
              <p>Add {token.tokenName} to wallet</p>
              <button
                onClick={async () => {
                  const tokenName = token.tokenName;
                  const tokenAddress = token.tokenAddress;
                  const tokenImage = token.tokenImage;
                  const tokenDecimals = token.decimals;
                  const tokenSymbol = token.tokenName;

                  const tokenToAdd = {
                    tokenName,
                    tokenAddress,
                    tokenImage,
                    tokenDecimals,
                    tokenSymbol,
                  };

                  const hasAdded = await addToken(tokenToAdd);

                  if (hasAdded) {
                    displayToast(
                      "success",
                      `${token.tokenName} has been added to your wallet`
                    );
                  } else {
                    displayToast("failure", `Failed to add ${token.tokenName}`);
                  }
                }}
                className="bg-slate-700 p-2 flex space-x-2 items-center rounded-md text-base font-medium "
              >
                <TfiWallet />
                <p>Add to wallet</p>
              </button>
            </div>

            <button
              onClick={() => {
                window.open(
                  `https://mumbai.polygonscan.com/tx/${transactionHash}`,
                  "_blank"
                );
              }}
              className="text-sm self-end pr-3 mt-3 text-gray-400 "
            >
              Review tx details
            </button>

            <div className="flex w-full items-center p-6 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
              <button
                onClick={() => {
                  setValue("");
                  setValueInUsd("0.00");
                  closeModal();
                  setIsSuccess(false);
                }}
                data-modal-toggle="small-modal"
                type="button"
                className="text-white w-full bg-gray-700  hover:bg-gray-900 hover:text-white rounded-md p-3"
              >
                <div className="flex justify-center ">Ok, Close.</div>
                {/*  */}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="p-6 w-full pt-1 space-y-3">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Amount
            </p>
            <div className="flex flex-col items-center border rounded-md p-2 border-slate-700">
              <div className="w-full flex items-center">
                <input
                  onChange={async (event) => {
                    console.log("Borrow stable rate: ", token.borrowStableRate);
                    setHasApproved(false);

                    const availableToBorrow =
                      Number(token.availableToBorrow) / 10 ** 18;
                    const availableToBorrowInUsd = inCurrencyFormat(
                      Number(token.availableToBorrowInUsd) / 10 ** 18
                    );

                    console.log("Available to borrow: ", availableToBorrow);
                    console.log(
                      "Available to borrow in usd: ",
                      availableToBorrowInUsd
                    );

                    const { value } = event.target;
                    if (isNaN(Number(value))) {
                      return;
                    }

                    console.log("Value: ", Number(value));
                    // console.log("Wallet balance: ", walletBalance);

                    // console.log("Token.walletBalance: ", token.walletBalance);
                    if (Number(value) >= availableToBorrow) {
                      setValue(availableToBorrow.toString());
                      setValueInUsd(availableToBorrowInUsd);

                      const latestHealthFactor = getBorrowHealthFactor(
                        token,
                        availableToBorrow,
                        userTotalCollateralInUsd,
                        userTotalBorrowedInUsd,
                        liquidationThresholdWeighted
                      );

                      setLatestHealthFactor(latestHealthFactor);
                      return;
                    } else {
                      let usableValue = "0.00";

                      if (value) {
                        usableValue = inCurrencyFormat(
                          parseFloat(value) *
                            (Number(token.oraclePrice) / 10 ** token.decimals)
                        );
                      }

                      setValueInUsd(usableValue);
                      setValue(value);

                      const latestHealthFactor = getBorrowHealthFactor(
                        token,
                        Number(value),
                        userTotalCollateralInUsd,
                        userTotalBorrowedInUsd,
                        liquidationThresholdWeighted
                      );

                      setLatestHealthFactor(latestHealthFactor);
                    }

                    console.log("Latest Health factor: ", latestHealthFactor);
                  }}
                  value={value}
                  type="text"
                  name="text"
                  id="text"
                  placeholder="0.00"
                  className="bg-slate-800 w-full block pl-2 p-1 font-medium sm:text-lg focus:outline-none rounded-md"
                />

                <div className="w-full flex items-center space-x-3 justify-end">
                  <img
                    src={token.tokenImage}
                    width={30}
                    height={30}
                    // layout="fixed"
                    className="w-[24px] ssm:w-[30px]"
                    alt="coinimage"
                  />

                  <p className="font-medium text-base ssm:text-lg ml-2">
                    {token.tokenName}
                  </p>
                </div>
              </div>

              <div className="w-full justify-between flex items-center">
                <p className="pl-2 pt-0 mt-0 font-medium text-sm text-gray-400">
                  ${valueInUsd}
                </p>
                <div className="flex items-center">
                  <p className="font-bold text-[12px] ssm:text-sm text-gray-500 ">
                    Balance:{" "}
                    {inCurrencyFormat(
                      Number(token.availableToBorrow) / 10 ** 18
                    )}
                  </p>
                  <button
                    onClick={() => {
                      const availableToBorrow =
                        Number(token.availableToBorrow) / 10 ** 18;
                      const availableToBorrowInUsd = inCurrencyFormat(
                        Number(token.availableToBorrowInUsd) / 10 ** 18
                      );

                      const latestHealthFactor = getBorrowHealthFactor(
                        token,
                        availableToBorrow,
                        userTotalCollateralInUsd,
                        userTotalBorrowedInUsd,
                        liquidationThresholdWeighted
                      );

                      setLatestHealthFactor(latestHealthFactor);

                      setValue(availableToBorrow.toString());
                      setValueInUsd(availableToBorrowInUsd);
                    }}
                    className="font-medium ml-2 text-gray-6 00 text-[12px] ssm:text-sm"
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>

            {/* {supplyError && (
            <div className="text-red-600 text-sm mt-5 bg-red-200 border overflow-auto scrollbar-hide rounded-md p-2 border-red-200 font-medium">
              {supplyError.message}
            </div>
          )} */}

            {/* <!-- Modal footer --> */}
          </div>

          {reserveBalanceInUsd != -1 &&
            reserveBalanceInUsd <=
              Number(token.availableToBorrowInUsd) / 10 ** 18 && (
              <div className="p-6 w-full pt-1 space-y-2">
                <div className="flex flex-col text-sm border rounded-md p-1 border border-slate-600 p-2 text-gray-300 space-y-1">
                  <p>Note:</p>
                  <p>
                    {token.tokenName} balance in the reserve is {reserveBalance}{" "}
                    {token.tokenName}. The transaction is likely to fail if you
                    try to borrow anything more than that.
                  </p>
                </div>
              </div>
            )}

          <div className="p-6 w-full pt-1 space-y-2">
            <p className="text-sm ssm:text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Transaction Overview
            </p>
            <div className="flex flex-col items-center border rounded-md px-2 py-3 border-slate-700 space-y-5">
              <div className=" px-2 flex w-full justify-between items-center">
                <p className="text-sm sm:text-base">Borrow APY</p>
                <p className="text-sm sm:text-base">
                  {Number(token.borrowStableRate) / 100}%
                </p>
              </div>

              <div className=" px-2 flex w-full justify-between items-center">
                <p className="text-sm sm:text-base">Health Factor</p>
                <div className="flex text-sm space-x-2 items-center font-medium">
                  <p className={`text-sm sm:text-base ${healthFactorColor}`}>
                    {formattedHealthFactor > 0 ? (
                      formattedHealthFactor.toFixed(2)
                    ) : (
                      <IoMdInfinite className="text-green-700 text-xl" />
                    )}
                  </p>
                  {latestHealthFactor > 0 && latestHealthFactor < 100000 && (
                    <div
                      className={`flex items-center space-x-1 ${latestHealthFactorColor}`}
                    >
                      <BsArrowRight />
                      <p>{latestHealthFactor.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* {supplyError && (
            <div className="text-red-600 text-sm mt-5 bg-red-200 border overflow-auto scrollbar-hide rounded-md p-2 border-red-200 font-medium">
              {supplyError.message}
            </div>
          )} */}

            {/* <!-- Modal footer --> */}
          </div>

          <div className="pb-8 mx-3 flex flex-col justify-center items-center space-y-2 rounded-b border-gray-200 dark:border-gray-600">
            <button
              disabled={isBorrowing}
              onClick={borrowToken}
              data-modal-toggle="small-modal"
              type="button"
              className={`${
                isBorrowing
                  ? "bg-gray-600 cursor-wait"
                  : "bg-gray-700 hover:bg-gray-700 "
              } w-full mx-4 text-white hover:text-white rounded-md p-2`}
            >
              {isBorrowing ? (
                <div className="flex w-full justify-center space-x-4 items-center">
                  <ClipLoader color="#fff" loading={true} size={30} />
                  <p className="ml-2">{borrowText}</p>
                </div>
              ) : (
                <div className="flex w-full items-center">
                  <p className="w-full">{borrowText}</p>
                </div>
              )}
              {/*  */}
            </button>
          </div>
        </div>
      )}
    </BorderLayout>
  );
}
