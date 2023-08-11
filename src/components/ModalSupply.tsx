import correct from "@assets/correct.png";
import { useEffect, useState } from "react";
import BorderLayout from "./BorderLayout";
import { TokenData } from "../types";
import { GiCheckMark } from "react-icons/gi";
import { getLatestHealthFactor, inCurrencyFormat } from "../utils/helper";
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
import { FiSettings } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

import "reactjs-popup/dist/index.css";

interface IModalSupply {
  token: TokenData;
  closeModal: any;
}

export default function ModalSupply({ token, closeModal }: IModalSupply) {
  const [value, setValue] = useState("");
  const [valueInUsd, setValueInUsd] = useState("0.00");
  const [deadline, setDeadline] = useState(0);
  const [sig, setSig] = useState<Signature>();
  const [transactionHash, setTransactionHash] = useState("");

  const [openApproval, setOpenApproval] = useState(false);
  const [approvalOption, setApprovalOption] = useState(0);

  const { signerAddress, chainId, addToken } = useWallet();
  const {
    loadHealthFactor,
    loadSupplyAssets,
    loadBorrowAssets,
    loadUserSupplies,
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

  const [isSupplying, setIsSupplying] = useState(false);
  const [supplyText, setSupplyText] = useState(`Supply ${token.tokenName}`);

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
    await loadBorrowAssets(signerAddress);
    await loadUserSupplies(signerAddress);
    await loadUserTotalCollateralInUsd(signerAddress);
    await loadLiquidationThresholdWeighted(signerAddress);
  };

  const approveByTransaction = async () => {
    setIsApproving(true);
    setApproveText(`Approving ${token.tokenName}`);

    const parsedValue = (Number(value) * 10 ** token.decimals).toString();

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

  const approveToken = async () => {
    setIsApproving(true);
    setApproveText(`Approving ${token.tokenName}`);
    const parsedValue = (Number(value) * 10 ** token.decimals).toString();

    console.log("Parsed value: ", parsedValue);
    try {
      const nonce = (await readContract({
        address: token.tokenAddress as `0x${string}`,
        abi: erc20PermitAbi,
        functionName: "nonces",
        args: [signerAddress],
      })) as bigint;

      console.log("Nonce: ", nonce);

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
      displayToast("failure", "Failed to approve");
    }
  };

  const supplyTokenWithPermit = async () => {
    console.log("We are here");

    if (!sig) {
      console.log("Approve the token first");
    } else {
      setIsSupplying(true);
      setSupplyText(`Supplying ${token.tokenName}`);
      const parsedValue = (Number(value) * 10 ** token.decimals).toString();
      console.log("We are now here");
      console.log("We are inside try block");
      try {
        const supplyRequest = await prepareWriteContract({
          address: diamondAddress as `0x${string}`,
          abi: diamondAbi,
          functionName: "supplyWithPermit",
          args: [
            token.tokenAddress,
            parsedValue,
            deadline,
            sig?.v,
            sig?.r,
            sig?.s,
          ],
        });

        const { hash } = await writeContract(supplyRequest);
        setTransactionHash(hash);

        const supplyReceipt = await waitForTransaction({
          hash,
        });

        console.log("Receipt: ", supplyReceipt);
        if (supplyReceipt.status == "success") {
          console.log("Supplied");
          setIsSuccess(true);
          await updateSupply();

          // await
          // await loadAllWalletTokens(signerAddress)
        } else {
          console.log("Failure");
          console.log("Failed to Supply");
        }

        setIsSupplying(false);
        setSupplyText(`Supply ${token.tokenName}`);
      } catch (error) {
        console.log("Error: ", error);
        displayToast("failure", "Failed to supply");
        setIsSupplying(false);
        setSupplyText(`Supply ${token.tokenName}`);
      }
    }
  };

  const supplyTokenWithTransaction = async () => {
    setIsSupplying(true);
    setSupplyText(`Supplying ${token.tokenName}`);

    const parsedValue = BigInt(Number(value) * 10 ** token.decimals);

    try {
      const supplyRequest = await prepareWriteContract({
        address: diamondAddress as `0x${string}`,
        abi: diamondAbi,
        functionName: "supply",
        args: [token.tokenAddress, parsedValue],
      });

      const { hash } = await writeContract(supplyRequest);
      setTransactionHash(hash);

      const supplyReceipt = await waitForTransaction({
        hash,
      });

      console.log("Receipt: ", supplyReceipt);
      if (supplyReceipt.status == "success") {
        console.log("Supplied");
        setIsSuccess(true);
        await updateSupply();

        // await
        // await loadAllWalletTokens(signerAddress)
      } else {
        console.log("Failure");
        console.log("Failed to Supply");
      }

      setIsSupplying(false);
      setSupplyText(`Supply ${token.tokenName}`);
    } catch (error) {
      console.log("Error: ", error);
      displayToast("failure", "Failed to supply");
      setIsSupplying(false);
      setSupplyText(`Supply ${token.tokenName}`);
    }
  };

  return (
    <BorderLayout>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-t">
          <h3 className="text-xl font-medium text-white">
            {isSuccess ? `Sucessful` : `Supply ${token.tokenName}`}
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
      </div>

      {isSuccess ? (
        <div className="w-full max-w-md pt-1 space-y-3">
          <div className="flex flex-col justify-center items-center">
            <GiCheckMark className="w-10 h-10 rounded-full text-green-200 bg-green-800 p-2" />

            <div className="font-bold mt-4">All Done!</div>
            <p>
              You Supplied {value} {token?.tokenName}
            </p>
            <div className="p-4 border my-3 space-y-2 border-slate-700 rounded-md flex items-center justify-center flex-col">
              <img
                src={IMAGES.LAR}
                width={40}
                height={40}
                // layout="fixed"
                className="card-img-top"
                alt="coinimage"
              />
              <p>Add LAR to wallet to track your balance</p>
              <button
                onClick={async () => {
                  const tokenName = "LAR";
                  const tokenAddress = larAddress;
                  const tokenImage = IMAGES.LAR;
                  const tokenDecimals = 18;
                  const tokenSymbol = "LAR";

                  const token = {
                    tokenName,
                    tokenAddress,
                    tokenImage,
                    tokenDecimals,
                    tokenSymbol,
                  };

                  const hasAdded = await addToken(token);

                  if (hasAdded) {
                    displayToast(
                      "success",
                      "LAR has been added to your wallet"
                    );
                  } else {
                    displayToast("failure", "Failed to add LAR");
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
              <div className="w-full flex items-center justify-between mx-1 ">
                <input
                  onChange={async (event) => {
                    setHasApproved(false);
                    const walletBalance =
                      Number(token.walletBalance) / 10 ** token.decimals;
                    const walletBalanceInUsd = inCurrencyFormat(
                      Number(token.walletBalanceInUsd) / 10 ** token.decimals
                    );

                    const { value } = event.target;
                    // if (isNaN(value)) {
                    //   return;
                    // }

                    console.log("Latest Health factor: ", latestHealthFactor);

                    console.log("Value: ", Number(value));
                    // console.log("Wallet balance: ", walletBalance);

                    // console.log("Token.walletBalance: ", token.walletBalance);
                    if (Number(value) >= walletBalance) {
                      const latestHealthFactor = getLatestHealthFactor(
                        userSupplies,
                        token,
                        Number(walletBalance),
                        userTotalCollateralInUsd,
                        userTotalBorrowedInUsd,
                        liquidationThresholdWeighted
                      );

                      setLatestHealthFactor(latestHealthFactor);

                      setValue(walletBalance.toString());
                      setValueInUsd(walletBalanceInUsd);
                      return;
                    } else {
                      const latestHealthFactor = getLatestHealthFactor(
                        userSupplies,
                        token,
                        Number(value),
                        userTotalCollateralInUsd,
                        userTotalBorrowedInUsd,
                        liquidationThresholdWeighted
                      );

                      setLatestHealthFactor(latestHealthFactor);
                      let usableValue = "0.00";

                      if (value) {
                        usableValue = inCurrencyFormat(
                          parseFloat(value) *
                            (Number(token.oraclePrice) / 10 ** token.decimals)
                        );
                      }

                      setValueInUsd(usableValue);
                      setValue(value);
                    }
                  }}
                  value={value}
                  type="text"
                  name="text"
                  id="text"
                  placeholder="0.00"
                  className="bg-slate-800 w-full  block pl-2 p-1 font-medium sm:text-lg focus:outline-none rounded-md"
                />
                <div className="w-full justify-end flex space-x-3">
                  <img
                    src={token.tokenImage}
                    width={30}
                    height={30}
                    // layout="fixed"
                    className="ml-2 card-img-top"
                    alt="coinimage"
                  />

                  <p className="font-medium text-base sm:text-lg ml-2">
                    {token.tokenName}
                  </p>
                </div>
              </div>

              <div className="w-full justify-between flex items-center">
                <p className="pl-2 pt-0 mt-0 font-medium text-sm text-gray-400">
                  ${valueInUsd}
                </p>
                <div className="flex items-center">
                  <p className="font-bold text-sm text-gray-500 ">
                    Balance:{" "}
                    {inCurrencyFormat(
                      Number(token.walletBalance) / 10 ** token.decimals
                    )}
                  </p>
                  <button
                    onClick={() => {
                      const walletBalance =
                        Number(token.walletBalance) / 10 ** token.decimals;

                      const latestHealthFactor = getLatestHealthFactor(
                        userSupplies,
                        token,
                        Number(walletBalance),
                        userTotalCollateralInUsd,
                        userTotalBorrowedInUsd,
                        liquidationThresholdWeighted
                      );

                      setLatestHealthFactor(latestHealthFactor);

                      const formattedValueInUsd = inCurrencyFormat(
                        Number(token.walletBalanceInUsd) / 10 ** token.decimals
                      );
                      setValue(walletBalance.toString());
                      setValueInUsd(formattedValueInUsd);
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
                <p>Supply APY</p>
                <p>{Number(token.supplyStableRate) / 100}%</p>
              </div>
              <div className=" px-2 flex w-full justify-between items-center">
                <p>Collateralization</p>
                <p className="text-green-500">Enabled</p>
              </div>
              <div className=" px-2 flex w-full justify-between items-center">
                <p>Health Factor</p>
                <div className="flex text-sm space-x-2 items-center font-medium">
                  <p className={`${healthFactorColor}`}>
                    {formattedHealthFactor > 0
                      ? formattedHealthFactor.toFixed(2)
                      : "--"}
                  </p>
                  {latestHealthFactor > 0 && latestHealthFactor < 100000 && (
                    <div
                      className={`flex items-center space-x-1 ${latestHealthFactorColor}`}
                    >
                      <BsArrowRight />
                      <p>
                        {latestHealthFactor > 0
                          ? latestHealthFactor.toFixed(2)
                          : "--"}
                      </p>
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
                  } w-full text-white hover:text-white rounded-md p-2`}
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
              disabled={isSupplying || !hasApproved}
              onClick={
                approvalOption == 0
                  ? supplyTokenWithPermit
                  : supplyTokenWithTransaction
              }
              data-modal-toggle="small-modal"
              type="button"
              className={`${
                isSupplying
                  ? "bg-gray-600 cursor-wait"
                  : "bg-gray-700 hover:bg-gray-700 "
              } w-full mx-4 text-white hover:text-white rounded-md p-2`}
            >
              {isSupplying ? (
                <div className="flex w-full justify-center space-x-4 items-center">
                  <ClipLoader color="#fff" loading={true} size={30} />
                  <p className="ml-2">{supplyText}</p>
                </div>
              ) : (
                <div className="flex w-full items-center">
                  <p className="w-full">{supplyText}</p>
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
