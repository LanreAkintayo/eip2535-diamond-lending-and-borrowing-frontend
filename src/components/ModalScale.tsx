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
import HealthFactorBar from "./HealthFactorBar";
import LTVBar from "./LTVBar";

interface IModalScale {
  closeModal: any;
}

export default function ModalScale({ closeModal }: IModalScale) {
  const { currentLTV, healthFactor } = useDefi();
  const fCurrentLTV = Number(currentLTV) / 100;
  const fHealthFactor = Number(healthFactor) / 10000;

  return (
    <BorderLayout>
      <div className="p-5">
        <div className="flex justify-between items-center rounded-t">
          <h3 className="text-xl font-medium text-white">
            Liquidation Risk Parameters
          </h3>
          <button
            placeholder="0.00"
            onClick={() => {
              closeModal();
            }}
            type="button"
            className="text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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

      <p className="text-white text-[12px] px-6 pb-2">
        Your health factor and loan to value determine the assurance of your
        collateral. To avoid liquidations you can supply more collateral or
        repay borrow positions.
      </p>

      <div>
        <div className="p-6 w-full pt-1 space-y-2">
          <div className="flex flex-col items-center border rounded-md px-2 py-3 border-slate-700 space-y-10">
            <div className="w-full flex items-center justify-between space-x-3 ">
              <div className="">
                <p className="text-white font-bold text-lg">Health Factor</p>
                <p className="text-gray-300 text-[12px]">
                  Safety of your deposited collateral against the borrowed
                  assets and its underlying value.
                </p>
              </div>
              <div className="">
                <div className="bg-orange-500 font-medium text-white text-[12px] text-center flex flex-col items-center justify-center rounded-full w-[50px] h-[50px] ssm:w-[60px] ssm:h-[60px]">
                  {fHealthFactor.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="relative w-11/12 mt-8">
              <HealthFactorBar />
            </div>
            <div className="">
              <p className="text-gray-300 text-[12px] mt-10">
                Safety of your deposited collateral against the borrowed assets
                and its underlying value.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 w-full pt-1 space-y-2">
          <div className="flex flex-col items-center border rounded-md px-2 py-3 border-slate-700 space-y-10">
            <div className="w-full flex items-center justify-between space-x-3 mb-3">
              <div className="">
                <p className="text-white font-bold text-lg">Current LTV</p>
                <p className="text-gray-300 text-[12px]">
                  Your current loan to value based on your collateral supplied.
                </p>
              </div>
              <div className="">
                <div className="bg-green-500 font-medium text-white text-[12px] text-center flex flex-col items-center justify-center rounded-full w-[50px] h-[50px] ssm:w-[60px] ssm:h-[60px]">
                  {fCurrentLTV.toFixed(2)}%
                </div>
              </div>
            </div>
            <div className="relative w-10/12 mt-8">
              <LTVBar />
            </div>
            <div className="">
              <p className="text-gray-300 text-[12px] mt-10">
                If your loan to value goes above the liquidation threshold your
                collateral supplied may be liquidated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BorderLayout>
  );
}
