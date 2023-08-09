import correct from "@assets/correct.png";
import { useEffect, useState } from "react";
import BorderLayout from "./BorderLayout";
import { DetailedSuppliedToken, TokenData } from "../types";
import { GiCheckMark } from "react-icons/gi";
import {
  getLatestHealthFactor,
  getWithdrawalHealthFactor,
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

interface IModalWithdraw {
  token: DetailedSuppliedToken;
  closeModal: any;
}

export default function ModalWithdraw({ token, closeModal }: IModalWithdraw) {
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
    healthFactor,
    userSupplies,
    userTotalCollateralInUsd,
    userTotalBorrowedInUsd,
    liquidationThresholdWeighted,
    loadLiquidationThresholdWeighted,
    maxLTV,
  } = useDefi();

  const [isLoading, setIsLoading] = useState(false);

  const [isApproving, setIsApproving] = useState(false);
  const [approveText, setApproveText] = useState(
    `Approve ${token.tokenName} to continue`
  );
  const [hasApproved, setHasApproved] = useState(true);

  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawText, setWithdrawText] = useState(
    `Withdraw ${token.tokenName}`
  );

  const [isSuccess, setIsSuccess] = useState(false);

  const formattedHealthFactor = healthFactor ? Number(healthFactor) / 10000 : 0;
  const [latestHealthFactor, setLatestHealthFactor] = useState(0);

  // health factor color
  let healthFactorColor;
  let latestHealthFactorColor;
  if (healthFactor) {
    healthFactorColor =
      formattedHealthFactor > 10
        ? "text-green-600"
        : formattedHealthFactor > 2
        ? "text-orange-300"
        : "text-red-500";
  }

  if (latestHealthFactor > 0) {
    latestHealthFactorColor =
      latestHealthFactor > 10
        ? "text-green-600"
        : latestHealthFactor > 2
        ? "text-orange-300"
        : "text-red-500";
  }

  const addLAR = (token: TokenData) => {
    alert("Add LAR token");
  };

  useEffect(() => {
    console.log(
      "UserTotalCollateralInUsd in the modal: ",
      userTotalCollateralInUsd
    );
    console.log(
      "UserTotalBorrowedInUsd in the modal: ",
      userTotalBorrowedInUsd
    );
    console.log(
      "liquidationThresholdWeited in the modal: ",
      liquidationThresholdWeighted
    );

    console.log("Health factor: ", healthFactor);
  }, [
    userTotalCollateralInUsd,
    userTotalBorrowedInUsd,
    liquidationThresholdWeighted,
    healthFactor,
  ]);
  const updateSupply = async () => {
    await loadHealthFactor(signerAddress);
    await loadSupplyAssets(signerAddress);
    await loadUserSupplies(signerAddress);
    await loadUserTotalCollateralInUsd(signerAddress);
    await loadLiquidationThresholdWeighted(signerAddress);
  };

  const withdrawToken = async () => {
    setIsWithdrawing(true);
    setWithdrawText(`Withdrawing ${token.tokenName}`);
    const parsedValue = BigInt(Number(value) * 10 ** token.decimals);

    try {
      const withdrawRequest = await prepareWriteContract({
        address: diamondAddress as `0x${string}`,
        abi: diamondAbi,
        functionName: "withdraw",
        args: [token.tokenAddress, parsedValue],
      });

      const { hash } = await writeContract(withdrawRequest);
      setTransactionHash(hash);

      const withdrawReceipt = await waitForTransaction({
        hash,
      });

      console.log("Receipt: ", withdrawReceipt);
      if (withdrawReceipt.status == "success") {
        console.log("Supplied");
        setIsSuccess(true);
        await updateSupply();
      } else {
        console.log("Failure");
        console.log("Failed to withdraw");
      }

      setIsWithdrawing(false);
      setWithdrawText(`Withdraw ${token.tokenName}`);
    } catch (error) {
      console.log("Error: ", error);
      displayToast("failure", `Failed to withdraw ${value} ${token.tokenName}`);
      setIsWithdrawing(false);
      setWithdrawText(`Withdraw ${token.tokenName}`);
    }
  };

  return (
    <BorderLayout>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-t">
          <h3 className="text-xl font-medium text-white">
            {isSuccess ? `Sucessful` : `Withdraw ${token.tokenName}`}
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
              You withdrew {value} {token?.tokenName}
            </p>

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
                    // // setHasApproved(false);
                    // debugger;
                    const amountSupplied =
                      Number(token.amountSupplied) / 10 ** token.decimals;
                    const amountSuppliedInUsd = inCurrencyFormat(
                      Number(token.amountSuppliedInUsd) / 10 ** token.decimals
                    );
                    const { value } = event.target;
                    if (isNaN(Number(value))) {
                      return;
                    }

                    // debugger;
                    const latestHealthFactor = getWithdrawalHealthFactor(
                      userSupplies,
                      token,
                      Number(value),
                      userTotalCollateralInUsd,
                      userTotalBorrowedInUsd,
                      liquidationThresholdWeighted
                    );
                    setLatestHealthFactor(latestHealthFactor);

                    let maxAvailableToWithdrawInUsd;
                    let maxAvailableToWithdraw;

                    const usableUserTotalCollateralInUsd =
                      Number(userTotalCollateralInUsd) / 10 ** 18;
                    const usableTotalBorrowedInUsd =
                      Number(userTotalBorrowedInUsd) / 10 ** 18;
                    const usableWalletBalance =
                      Number(token.walletBalance) / 10 ** token.decimals;
                    const usableWalletBalanceInUsd =
                      Number(token.walletBalanceInUsd) / 10 ** token.decimals;
                    const usablemaxLTV = Number(maxLTV) / 10000;
                    const usableOraclePrice =
                      Number(token.oraclePrice) / 10 ** token.decimals;
                    const usableAmountSupplied =
                      Number(token.amountSupplied) / 10 ** token.decimals;
                    const usableAmountSuppliedInUsd =
                      Number(token.amountSuppliedInUsd) / 10 ** token.decimals;

                    const availableToWithdrawInUsd =
                      usableUserTotalCollateralInUsd -
                      usableTotalBorrowedInUsd / usablemaxLTV;

                    if (availableToWithdrawInUsd >= usableAmountSuppliedInUsd) {
                      maxAvailableToWithdrawInUsd = usableAmountSuppliedInUsd;
                      maxAvailableToWithdraw = usableAmountSupplied;
                    } else {
                      maxAvailableToWithdrawInUsd =
                        0.99 * availableToWithdrawInUsd;
                      maxAvailableToWithdraw =
                        maxAvailableToWithdrawInUsd / usableOraclePrice;
                    }

                    if (Number(value) >= maxAvailableToWithdraw) {
                      setValue(maxAvailableToWithdraw.toString());
                      setValueInUsd(
                        inCurrencyFormat(maxAvailableToWithdrawInUsd)
                      );
                      return;
                    }
                    let usableValue = "0.00";
                    if (value) {
                      usableValue = inCurrencyFormat(
                        parseFloat(value) *
                          (Number(token.oraclePrice) / 10 ** token.decimals)
                      );
                    }
                    setValueInUsd(usableValue);
                    setValue(value);
                  }}
                  value={value}
                  type="text"
                  name="text"
                  id="text"
                  placeholder="0.00"
                  className="bg-slate-800 w-80 block pl-2 p-1 font-medium sm:text-lg focus:outline-none rounded-md"
                />

                <img
                  src={token.tokenImage}
                  width={30}
                  height={30}
                  // layout="fixed"
                  className="ml-2 card-img-top"
                  alt="coinimage"
                />

                <p className="font-medium text-lg ml-2">{token.tokenName}</p>
              </div>

              <div className="w-full justify-between flex items-center">
                <p className="pl-2 pt-0 mt-0 font-medium text-sm text-gray-400">
                  ${valueInUsd}
                </p>
                <div className="flex items-center">
                  <p className="font-bold text-sm text-gray-500 ">
                    Supply Balance:{" "}
                    {inCurrencyFormat(
                      Number(token.amountSupplied) / 10 ** token.decimals
                    )}
                  </p>
                  <button
                    onClick={() => {
                      console.log("We are here");
                      const usableUserTotalCollateralInUsd =
                        Number(userTotalCollateralInUsd) / 10 ** 18;
                      const usableTotalBorrowedInUsd =
                        Number(userTotalBorrowedInUsd) / 10 ** 18;
                      const usableWalletBalance =
                        Number(token.walletBalance) / 10 ** token.decimals;
                      const usableWalletBalanceInUsd =
                        Number(token.walletBalanceInUsd) / 10 ** token.decimals;
                      const usablemaxLTV = Number(maxLTV) / 10000;
                      const usableOraclePrice =
                        Number(token.oraclePrice) / 10 ** token.decimals;
                      const usableAmountSupplied =
                        Number(token.amountSupplied) / 10 ** token.decimals;
                      const usableAmountSuppliedInUsd =
                        Number(token.amountSuppliedInUsd) /
                        10 ** token.decimals;

                      const availableToWithdrawInUsd =
                        usableUserTotalCollateralInUsd -
                        usableTotalBorrowedInUsd / usablemaxLTV;

                      let maxAvailableToWithdrawInUsd;
                      let maxAvailableToWithdraw;

                      console.log(
                        "Available to withdraw in USD: ",
                        availableToWithdrawInUsd
                      );
                      console.log(
                        "Amount supplied in usd: ",
                        usableAmountSuppliedInUsd
                      );

                      if (
                        availableToWithdrawInUsd >= usableAmountSuppliedInUsd
                      ) {
                        maxAvailableToWithdrawInUsd = usableAmountSuppliedInUsd;
                        maxAvailableToWithdraw = usableAmountSupplied;
                      } else {
                        maxAvailableToWithdrawInUsd =
                          0.99 * availableToWithdrawInUsd;
                        maxAvailableToWithdraw =
                          maxAvailableToWithdrawInUsd / usableOraclePrice;
                      }

                      const latestHealthFactor = getWithdrawalHealthFactor(
                        userSupplies,
                        token,
                        maxAvailableToWithdraw,
                        userTotalCollateralInUsd,
                        userTotalBorrowedInUsd,
                        liquidationThresholdWeighted
                      );

                      setLatestHealthFactor(latestHealthFactor);
                      setValue(maxAvailableToWithdraw.toString());
                      setValueInUsd(
                        inCurrencyFormat(maxAvailableToWithdrawInUsd)
                      );
                    }}
                    className="font-medium ml-2 text-gray-6 00 text-sm"
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
          <div className="p-6 w-full pt-1 space-y-2">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Transaction Overview
            </p>
            <div className="flex flex-col items-center border rounded-md px-2 py-3 border-slate-700 space-y-5">
              <div className=" px-2 flex w-full justify-between items-center">
                <p>Remaining Supply</p>
                <p className="text-white">
                  {inCurrencyFormat(
                    Number(token.amountSupplied) / 10 ** token.decimals -
                      Number(value)
                  )}{" "}
                  {token.tokenName}
                </p>
              </div>
              <div className=" px-2 flex w-full justify-between items-center">
                <p>Health Factor</p>
                <div className="flex text-sm space-x-2 items-center font-medium">
                  <p className={`${healthFactorColor}`}>
                    {formattedHealthFactor.toFixed(2)}
                  </p>
                  {latestHealthFactor > 0 && (
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
              disabled={isWithdrawing}
              onClick={withdrawToken}
              data-modal-toggle="small-modal"
              type="button"
              className={`${
                isWithdrawing
                  ? "bg-gray-600 cursor-wait"
                  : "bg-gray-700 hover:bg-gray-700 "
              } w-full mx-4 text-white hover:text-white rounded-md p-2`}
            >
              {isWithdrawing ? (
                <div className="flex w-full justify-center space-x-4 items-center">
                  <ClipLoader color="#fff" loading={true} size={30} />
                  <p className="ml-2">{withdrawText}</p>
                </div>
              ) : (
                <div className="flex w-full items-center">
                  <p className="w-full">{withdrawText}</p>
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
