import correct from "@assets/correct.png";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import BorderLayout from "./BorderLayout";
import { DetailedBorrowedToken, TokenData } from "../types";
import { GiCheckMark } from "react-icons/gi";
import {
  getLatestHealthFactor,
  getRepayHealthFactor,
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
import Popup from "reactjs-popup";
import { FaCheck } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdInfinite } from "react-icons/io";

import "reactjs-popup/dist/index.css";

interface IModalRepay {
  token: DetailedBorrowedToken;
  closeModal: any;
}

export default function ModalRepay({ token, closeModal }: IModalRepay) {
  const [value, setValue] = useState("");
  const [valueInUsd, setValueInUsd] = useState("0.00");
  const [deadline, setDeadline] = useState(0);
  const [sig, setSig] = useState<Signature>();
  const [parsedValue, setParsedValue] = useState<bigint>();
  const [transactionHash, setTransactionHash] = useState("");

  const [openApproval, setOpenApproval] = useState(false);
  const [approvalOption, setApprovalOption] = useState(0);

  const { signerAddress, chainId, addToken } = useWallet();
  const {
    loadHealthFactor,
    loadSupplyAssets,
    loadUserSupplies,
    loadUserBorrows,
    loadUserTotalBorrowedInUsd,
    loadUserTotalCollateralInUsd,
    healthFactor,
    userSupplies,
    userTotalCollateralInUsd,
    userTotalBorrowedInUsd,
    liquidationThresholdWeighted,
    loadLiquidationThresholdWeighted,
  } = useDefi();

  const [isLoading, setIsLoading] = useState(false);

  const [isApproving, setIsApproving] = useState(false);
  const [approveText, setApproveText] = useState(
    `Approve ${token.tokenName} to continue`
  );
  const [hasApproved, setHasApproved] = useState(true);

  const [isRepaying, setIsRepaying] = useState(false);
  const [repayText, setRepayText] = useState(`Repay ${token.tokenName}`);

  const [isSuccess, setIsSuccess] = useState(false);

  const formattedHealthFactor = healthFactor ? Number(healthFactor) / 10000 : 0;
  const [latestHealthFactor, setLatestHealthFactor] = useState(0);

  const [debtAfterInToken, setDebtAfterInToken] = useState("");
  const [debtAfterInUsd, setDebtAfterInUsd] = useState("");

  // health factor color
  let healthFactorColor;
  let latestHealthFactorColor;
  if (healthFactor) {
    healthFactorColor =
      formattedHealthFactor > 10
        ? "text-green-600"
        : formattedHealthFactor > 2
        ? "text-orange-300"
        : "text-red-200";
  }

  if (latestHealthFactor > 0) {
    latestHealthFactorColor =
      latestHealthFactor > 10
        ? "text-green-600"
        : latestHealthFactor > 2
        ? "text-orange-300"
        : "text-red-200";
  }

  useEffect(() => {
    const oraclePrice = Number(
      ethers.formatUnits(token.oraclePrice.toString(), token.decimals)
    );

    const debtAfterInToken =
      Number(token.amountBorrowed) / 10 ** token.decimals - Number(value) <= 0
        ? 0
        : Number(token.amountBorrowed) / 10 ** token.decimals - Number(value);

    const debtAfterInUsd = inCurrencyFormat(debtAfterInToken * oraclePrice);

    setDebtAfterInUsd(debtAfterInUsd);
    setDebtAfterInToken(inCurrencyFormat(debtAfterInToken));
  }, [value]);
  const updateRepay = async () => {
    await loadHealthFactor(signerAddress);
    await loadSupplyAssets(signerAddress);
    await loadUserBorrows(signerAddress);
    await loadUserTotalBorrowedInUsd(signerAddress);
    await loadLiquidationThresholdWeighted(signerAddress);
  };

  const approveToken = async () => {
    setIsApproving(true);
    setApproveText(`Approving ${token.tokenName}`);

    const { totalToRepay, totalInterest } = getAmountToRepay(Number(value));
    const parsedValue = BigInt(
      (totalToRepay * 10 ** token.decimals)
        // totalInterest * 10 ** token.decimals
        .toFixed(0)
    );

    setParsedValue(parsedValue);

    // console.log("Parsed value in the approval: ", parsedValue);
    try {
      const nonce = (await readContract({
        address: token.tokenAddress as `0x${string}`,
        abi: erc20PermitAbi,
        functionName: "nonces",
        args: [signerAddress],
      })) as bigint;

      // console.log("Nonce: ", nonce);

      const domain = {
        name: token.tokenName,
        version: "1",
        chainId: 80001,
        verifyingContract: token.tokenAddress as `0x${string}`,
      };

      // Expire after 60 minutes
      const deadline = Math.floor(Date.now() / 1000) + 3600;
      setDeadline(deadline);
      // const value = ethers.parseUnits("5", 18);

      const message = {
        owner: signerAddress,
        spender: diamondAddress,
        value: parsedValue,
        nonce: nonce,
        deadline,
      };

      const signature = await signTypedData({
        domain,
        message,
        primaryType: "Permit",
        types,
      });

      console.log("Signature: ", signature);

      const sig = ethers.Signature.from(signature);
      console.log("Splitted signature: ", sig);
      setSig(sig);

      const recovered = ethers.verifyTypedData(domain, types, message, sig);

      console.log("Recovered: ", recovered);
      setIsApproving(false);
      setApproveText(`Approve ${token.tokenName}`);
      setHasApproved(true);
    } catch (error) {
      setIsApproving(false);
      setApproveText(`Approve ${token.tokenName}`);
      console.log("Failed to approve");
      displayToast(
        "failure",
        `Try the other approving option . Approval by signed message is not supported for this token`
      );
    }
  };
  const approveByTransaction = async () => {
    setIsApproving(true);
    setApproveText(`Approving ${token.tokenName}`);

    const { totalToRepay, totalInterest } = getAmountToRepay(Number(value));
    const parsedValue = BigInt(
      (totalToRepay * 10 ** token.decimals)
        // totalInterest * 10 ** token.decimals
        .toFixed(0)
    );

    setParsedValue(parsedValue);

    console.log("Parsed value in the approval: ", parsedValue);
    try {
      const approveRequest = await prepareWriteContract({
        address: token.tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "approve",
        args: [diamondAddress, parsedValue],
      });

      const { hash } = await writeContract(approveRequest);
      setTransactionHash(hash);

      const approveReceipt = await waitForTransaction({
        hash,
      });

      console.log("Receipt: ", approveReceipt);
      if (approveReceipt.status == "success") {
        console.log("Approved");
        displayToast("success", `${token.tokenName} has been approved`);
      } else {
        console.log("Failure");
        displayToast("failure", `Failed to approve ${token.tokenName}`);
      }

      setIsApproving(false);
      setApproveText(`Approve ${token.tokenName}`);
      setHasApproved(true);
    } catch (error) {
      setIsApproving(false);
      setApproveText(`Approve ${token.tokenName}`);
      console.log("Failed to approve");
      displayToast("failure", `Failed to approve ${token.tokenName}`);
    }
  };

  const repayTokenWithTransaction = async () => {
    console.log("We are here");

    setIsRepaying(true);
    setRepayText(`Repaying ${token.tokenName}`);

    const amountBorrowed = Number(token.amountBorrowed) / 10 ** token.decimals;
    let usableValue =
      amountBorrowed >= Number(value) ? Number(value) : amountBorrowed;

    // const { totalToRepay } = getAmountToRepay(Number(value));
    const tokenAmount = BigInt((usableValue * 10 ** token.decimals).toFixed());
    try {
      const repayRequest = await prepareWriteContract({
        address: diamondAddress as `0x${string}`,
        abi: diamondAbi,
        functionName: "repay",
        args: [token.tokenAddress, tokenAmount],
      });

      const { hash } = await writeContract(repayRequest);
      setTransactionHash(hash);

      const repayReceipt = await waitForTransaction({
        hash,
      });

      console.log("Receipt: ", repayReceipt);
      if (repayReceipt.status == "success") {
        console.log("Repayed");
        setIsSuccess(true);
        await updateRepay();
      } else {
        console.log("Failure");
        console.log("Failed to repay");
      }

      setIsRepaying(false);
      setRepayText(`Repay ${token.tokenName}`);
    } catch (error) {
      console.log("Error: ", error);
      displayToast("failure", "Failed to repay");
      setIsRepaying(false);
      setRepayText(`Repay ${token.tokenName}`);
    }
  };
  const repayTokenWithPermit = async () => {
    console.log("We are here");

    if (!sig) {
      console.log("Approve the token first");
    } else {
      setIsRepaying(true);
      setRepayText(`Repaying ${token.tokenName}`);

      const amountBorrowed =
        Number(token.amountBorrowed) / 10 ** token.decimals;
      let usableValue =
        amountBorrowed >= Number(value) ? Number(value) : amountBorrowed;

      // const { totalToRepay } = getAmountToRepay(Number(value));
      const tokenAmount = BigInt(
        (usableValue * 10 ** token.decimals).toFixed()
      );

      try {
        const repayRequest = await prepareWriteContract({
          address: diamondAddress as `0x${string}`,
          abi: diamondAbi,
          functionName: "repayWithPermit",
          args: [
            token.tokenAddress,
            tokenAmount,
            parsedValue,
            deadline,
            sig?.v,
            sig?.r,
            sig?.s,
          ],
        });

        const { hash } = await writeContract(repayRequest);
        setTransactionHash(hash);

        const repayReceipt = await waitForTransaction({
          hash,
        });

        console.log("Receipt: ", repayReceipt);
        if (repayReceipt.status == "success") {
          console.log("Repayed");
          setIsSuccess(true);
          await updateRepay();
        } else {
          console.log("Failure");
          console.log("Failed to repay");
        }

        setIsRepaying(false);
        setRepayText(`Repay ${token.tokenName}`);
      } catch (error) {
        console.log("Error: ", error);
        displayToast("failure", "Failed to repay");
        setIsRepaying(false);
        setRepayText(`Repay ${token.tokenName}`);
      }
    }
  };

  const getAmountToRepay = (getAmountToRepay: number) => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const startAccumulatingDay = Number(token.startAccumulatingDay);
    const borrowStableRate = Number(token.borrowStableRate) / 10000;
    const amountBorrowed = Number(token.amountBorrowed) / 10 ** token.decimals;
    const oraclePrice = Number(token.oraclePrice) / 10 ** token.decimals;

    const noOfDays = (currentTimeInSeconds - startAccumulatingDay) / 86400;

    // console.log("No of days :", noOfDays);

    const totalInterest = borrowStableRate * amountBorrowed;

    // console.log("total interest: ", totalInterest);

    const accumulatedInterest = (noOfDays * totalInterest) / 365;

    // console.log("Accumulated interest: ", accumulatedInterest);

    const totalToRepay = accumulatedInterest + getAmountToRepay;
    const totalToRepayInUsd = totalToRepay * oraclePrice;

    return { totalToRepay, totalToRepayInUsd, totalInterest };
  };

  return (
    <BorderLayout>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-t">
          <h3 className="text-xl font-medium text-white">
            {isSuccess ? `Sucessful` : `Repay ${token.tokenName}`}
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
              You Repayed {value} {token?.tokenName}
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
                    setHasApproved(false);
                    const walletBalance =
                      Number(token.walletBalance) / 10 ** token.decimals;
                    const walletBalanceInUsd = inCurrencyFormat(
                      Number(token.walletBalanceInUsd) / 10 ** token.decimals
                    );
                    const amountBorrowed =
                      Number(token.amountBorrowed) / 10 ** token.decimals;
                    const amountBorrowedInUsd = inCurrencyFormat(
                      Number(token.amountBorrowedInUsd) / 10 ** token.decimals
                    );

                    const { value } = event.target;
                    if (isNaN(Number(value))) {
                      return;
                    }

                    // console.log("Latest Health factor: ", latestHealthFactor);

                    console.log("Value: ", Number(value));
                    // console.log("Wallet balance: ", walletBalance);

                    // console.log("Token.walletBalance: ", token.walletBalance);

                    if (Number(value) >= amountBorrowed) {
                      const { totalToRepay, totalToRepayInUsd } =
                        getAmountToRepay(amountBorrowed);
                      if (totalToRepay >= walletBalance) {
                        const latestHealthFactor = getRepayHealthFactor(
                          token,
                          Number(walletBalance),
                          userTotalCollateralInUsd,
                          userTotalBorrowedInUsd,
                          liquidationThresholdWeighted
                        );

                        setLatestHealthFactor(latestHealthFactor);

                        setValue(walletBalance.toString());
                        setValueInUsd(walletBalanceInUsd);
                      } else {
                        const latestHealthFactor = getRepayHealthFactor(
                          token,
                          Number(amountBorrowed),
                          userTotalCollateralInUsd,
                          userTotalBorrowedInUsd,
                          liquidationThresholdWeighted
                        );

                        setLatestHealthFactor(latestHealthFactor);

                        setValue(totalToRepay.toString());
                        setValueInUsd(inCurrencyFormat(totalToRepayInUsd));
                      }

                      return;
                    } else {
                      let usableValue = "0.00";

                      if (value) {
                        usableValue = inCurrencyFormat(
                          parseFloat(value) *
                            (Number(token.oraclePrice) / 10 ** token.decimals)
                        );
                      }

                      const latestHealthFactor = getRepayHealthFactor(
                        token,
                        Number(value),
                        userTotalCollateralInUsd,
                        userTotalBorrowedInUsd,
                        liquidationThresholdWeighted
                      );

                      setLatestHealthFactor(latestHealthFactor);

                      setValueInUsd(usableValue);
                      setValue(value);
                    }
                  }}
                  value={value}
                  type="text"
                  name="text"
                  id="text"
                  placeholder="0.00"
                  className="w-full pr-8 bg-slate-800  block pl-2 p-1 font-medium sm:text-lg focus:outline-none rounded-md"
                />

                <div className="w-auto flex items-center space-x-3 justify-end">
                  <img
                    src={token.tokenImage}
                    width={30}
                    height={30}
                    // layout="fixed"
                    className="ml-2  w-[24px] ssm:w-[30px]"
                    alt="coinimage"
                  />

                  <p className="font-medium text-base ssm:text-lg ml-2">{token.tokenName}</p>
                </div>
              </div>

              <div className="w-full justify-between flex items-center">
                <p className="pl-2 pt-0 mt-0 font-medium text-sm text-gray-400">
                  ${valueInUsd}
                </p>
                <div className="flex items-center">
                  <p className="font-bold text-[12px] ssm:text-sm text-gray-500 ">
                    Wallet Balance:{" "}
                    {inCurrencyFormat(
                      Number(token.walletBalance) / 10 ** token.decimals
                    )}
                  </p>
                  <button
                    onClick={() => {
                      setHasApproved(false);
                      const walletBalance =
                        Number(token.walletBalance) / 10 ** token.decimals;
                      const walletBalanceInUsd = inCurrencyFormat(
                        Number(token.walletBalanceInUsd) / 10 ** token.decimals
                      );
                      const amountBorrowed =
                        Number(token.amountBorrowed) / 10 ** token.decimals;
                      const amountBorrowedInUsd = inCurrencyFormat(
                        Number(token.amountBorrowedInUsd) / 10 ** token.decimals
                      );

                      const { totalToRepay, totalToRepayInUsd } =
                        getAmountToRepay(amountBorrowed);

                      console.log(
                        "Total to repay: ",
                        totalToRepay,
                        totalToRepayInUsd
                      );
                      if (totalToRepay >= walletBalance) {
                        const latestHealthFactor = getRepayHealthFactor(
                          token,
                          Number(walletBalance),
                          userTotalCollateralInUsd,
                          userTotalBorrowedInUsd,
                          liquidationThresholdWeighted
                        );

                        setLatestHealthFactor(latestHealthFactor);

                        setValue(walletBalance.toString());
                        setValueInUsd(walletBalanceInUsd);
                      } else {
                        const latestHealthFactor = getRepayHealthFactor(
                          token,
                          Number(amountBorrowed),
                          userTotalCollateralInUsd,
                          userTotalBorrowedInUsd,
                          liquidationThresholdWeighted
                        );

                        setLatestHealthFactor(latestHealthFactor);

                        setValue(totalToRepay.toString());
                        setValueInUsd(inCurrencyFormat(totalToRepayInUsd));
                      }

                      // const formattedValueInUsd = inCurrencyFormat(
                      //   Number(token.walletBalanceInUsd) / 10 ** token.decimals
                      // );
                      // setValue(
                      //   (
                      //     Number(token.walletBalance) /
                      //     10 ** token.decimals
                      //   ).toString()
                      // );
                      // setValueInUsd(formattedValueInUsd);
                    }}
                    className="font-medium ml-2 text-gray-6 00 text-sm"
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 w-full pt-1 space-y-2">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Transaction Overview
            </p>
            <div className="flex flex-col items-center border rounded-md px-2 py-3 border-slate-700 space-y-5">
              <div className=" ssm:px-2 flex w-full justify-between items-center">
                <p className="text-sm sm:text-base">Remaining Debt</p>
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-1 text-sm">
                    <p className={`text-[12px] ssm:text-sm`}>
                      {inCurrencyFormat(
                        Number(token.amountBorrowed) / 10 ** token.decimals
                      )}{" "}
                      {token.tokenName}
                    </p>

                    <div className={`flex items-center space-x-1`}>
                      <BsArrowRight />
                      <p>
                        {debtAfterInToken} {token.tokenName}
                      </p>
                    </div>
                  </div>
                  <div className="self-end flex items-center space-x-1 text-[10px]">
                    <p className={``}>
                      ${" "}
                      {inCurrencyFormat(
                        (Number(
                          ethers.formatUnits(
                            token.oraclePrice.toString(),
                            token.decimals
                          )
                        ) *
                          Number(token.amountBorrowed)) /
                          10 ** token.decimals
                      )}
                    </p>

                    <div className={`flex items-center space-x-1`}>
                      <BsArrowRight />
                      <p>$ {debtAfterInUsd}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" ssm:px-2 flex w-full justify-between items-center">
                <p className="text-sm sm:text-base">Health Factor</p>
                <div className="flex text-sm space-x-2 items-center font-medium">
                  <p className={`${healthFactorColor}`}>
                    {formattedHealthFactor.toFixed(2)}
                  </p>

                  <div
                    className={`flex items-center space-x-1 ${latestHealthFactorColor}`}
                  >
                    <BsArrowRight />
                    <p>
                      {latestHealthFactor > 0 ? (
                        latestHealthFactor.toFixed(2)
                      ) : (
                        <IoMdInfinite className="text-green-600 text-xl " />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-8 mx-3 flex flex-col justify-center items-center space-y-2 rounded-b border-gray-200 dark:border-gray-600">
            {!hasApproved && (
              <div className="mx-4 w-full flex flex-col">
                <Popup
                  trigger={
                    <button
                      className="self-end"
                      onClick={() => setOpenApproval(true)}
                    >
                      <div className="text-[12px] py-1 flex items-center space-x-2">
                        <p>
                          Approve with{" "}
                          <span className="text-blue-400">{`${
                            approvalOption == 0
                              ? "Signed Message"
                              : "Transaction"
                          }`}</span>{" "}
                        </p>
                        <FiSettings className="text-blue-400" />
                      </div>
                    </button>
                  }
                  position="bottom left"
                  on="click"
                  open={openApproval}
                  closeOnDocumentClick
                  mouseLeaveDelay={300}
                  mouseEnterDelay={0}
                  contentStyle={{
                    padding: "0px",
                    border: "1px solid #29293d",
                    background: "#29293d",
                  }}
                  arrow={false}
                >
                  <div className="font-medium text-lg text-white my-2">
                    <button
                      className={`hover:bg-gray-600 p-3 w-full text-left flex items-center justify-between ${
                        approvalOption == 0 && "bg-gray-700"
                      }`}
                      onClick={() => {
                        setApprovalOption(0);
                        setOpenApproval(false);
                      }}
                    >
                      <p>Signed Message</p>
                      {approvalOption == 0 && <FaCheck />}
                    </button>
                    <button
                      className={`hover:bg-gray-600 p-3 w-full text-left flex items-center justify-between ${
                        approvalOption == 1 && "bg-gray-700"
                      }`}
                      onClick={() => {
                        setApprovalOption(1);
                        setOpenApproval(false);
                      }}
                    >
                      <p>Transaction</p>
                      {approvalOption == 1 && <FaCheck />}
                    </button>
                  </div>
                </Popup>
                <button
                  // disabled={!!!value}
                  onClick={
                    approvalOption == 0 ? approveToken : approveByTransaction
                  }
                  data-modal-toggle="small-modal"
                  type="button"
                  className={`${
                    isApproving
                      ? "bg-gray-600 cursor-wait"
                      : "bg-gray-600 hover:bg-gray-600 "
                  } text-white hover:text-white rounded-md p-2`}
                >
                  {isApproving ? (
                    <div className="flex w-full justify-center space-x-4 items-center">
                      <ClipLoader color="#fff" loading={true} size={30} />
                      <p className="ml-2">{approveText}</p>
                    </div>
                  ) : (
                    <div className="flex w-full items-center">
                      <p className="w-full">{approveText}</p>
                    </div>
                  )}
                  {/*  */}
                </button>
              </div>
            )}
            <button
              disabled={isRepaying || !hasApproved}
              onClick={
                approvalOption == 0
                  ? repayTokenWithPermit
                  : repayTokenWithTransaction
              }
              data-modal-toggle="small-modal"
              type="button"
              className={`${
                isRepaying
                  ? "bg-gray-600 cursor-wait"
                  : "bg-gray-700 hover:bg-gray-700 "
              } w-full mx-4 text-white hover:text-white rounded-md p-2`}
            >
              {isRepaying ? (
                <div className="flex w-full justify-center space-x-4 items-center">
                  <ClipLoader color="#fff" loading={true} size={30} />
                  <p className="ml-2">{repayText}</p>
                </div>
              ) : (
                <div className="flex w-full items-center">
                  <p className="w-full">{repayText}</p>
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
