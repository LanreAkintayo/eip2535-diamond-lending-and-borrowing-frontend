import { connect } from "http2";
// import Link from "next/link";

import { useEffect, useState } from "react";
import BorrowAssets from "../components/BorrowAssets";
import BorrowRow from "../components/BorrowRow";
import ModalBorrow from "../components/ModalBorrow";
import ModalRepay from "../components/ModalRepay";
import ModalSupply from "../components/ModalSupply";
import ModalWithdraw from "../components/ModalWithdraw";
import Navbar from "../components/Navbar";
import RowBorrowAsset from "../components/RowBorrowAsset";
import RowSupplyAsset from "../components/RowSupplyAsset";
import SupplyAsset from "../components/SupplyAssets";
import SupplyRow from "../components/SupplyRow";
import YourBorrows from "../components/YourBorrows";
import YourSupply from "../components/YourSupplies";
import { inCurrencyFormat, todp } from "../utils/helper";
import useDefi from "../hooks/useDefi";
import { IMAGES } from "../constants";
import SupplyAssets from "../components/SupplyAssets";
import HealthFactorBar from "../components/HealthFactorBar";
import LTVBar from "../components/LTVBar";
import ModalScale from "../components/ModalScale";
import useWallet from "../hooks/useWallet";
import { FaThumbsUp } from "react-icons/fa";
import WalletConnect from "../components/WalletConnect";
import YourSupplySmall from "../components/YourSupplySmall";
import YourBorrowsSmall from "../components/YourBorrowsSmall";
import SupplyAssetsSmall from "../components/SupplyAssetsSmall";
import BorrowAssetsSmall from "../components/BorrowAssetsSmall";

export default function Dashboard2() {
  const {
    userSupplies,
    userBorrows,
    userTotalBorrowedInUsd,
    healthFactor,
    userTotalCollateralInUsd,
    liquidationThresholdWeighted,
    maxLTV,
    currentLTV,
    supplyAssets,
    borrowAssets,
    borrowPower,
  } = useDefi();

  const { signerAddress, chainId } = useWallet();
  const [selectedButton, setSelectedButton] = useState(0);

  const formattedHealthFactor = healthFactor ? Number(healthFactor) / 10000 : 0;
  let healthFactorColor = "text-white";
  if (formattedHealthFactor) {
    if (formattedHealthFactor > 10) {
      healthFactorColor = "text-green-700";
    } else if (formattedHealthFactor > 2) {
      healthFactorColor = "text-orange-300";
    } else if (formattedHealthFactor > 0) {
      healthFactorColor = "text-red-800";
    } else {
      healthFactorColor = "text-white";
    }
  }

  const netWorth =
    userTotalCollateralInUsd && userTotalCollateralInUsd
      ? inCurrencyFormat(
          (Number(userTotalCollateralInUsd) - Number(userTotalBorrowedInUsd)) /
            10 ** 18
        )
      : 0;

  const [openRiskDetails, setOpenRiskDetails] = useState(false);

  const handleRiskDetails = () => {
    setOpenRiskDetails(false);
  };

  // console.log("Signer: ", signerAddress);
  // console.log("Chain ID: ", chainId);

  return (
    <div>
      {chainId == 80001 && signerAddress ? (
        <div>text-5xl sm:
          <div className="bg-gradient-to-tr from-slate-900 to-gray-900 h-[250px] sm:h-[320px]">
            <div className="w-full h-full flex flex-col justify-center px-5 sm:px-10 ">
              <div className="flex items-center">
                <div>
                  <img
                    src={IMAGES.MATIC}
                    width={35}
                    height={30}
                    // layout="fixed"
                    className="card-img-top"
                    alt="coinimage"
                  />
                </div>
                <div className="mx-2">
                  <p className="text-xl ssm:text-3xl text-white">
                    Polygon Market
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="sc:w-9 h-8"></div>
                <div>
                  <p className="text-gray-300 text-[13px]">Net worth</p>
                  {(userTotalCollateralInUsd && userTotalCollateralInUsd) ||
                  (Number(userTotalCollateralInUsd) >= 0 &&
                    Number(userTotalCollateralInUsd) >= 0) ? (
                    <p className="text-white text-lg sc:text-xl sm:text-2xl font-bold">
                      ${netWorth}
                    </p>
                  ) : (
                    <div className="text-base bg-gray-700 animate-pulse w-12 h-8 rounded-md"></div>
                  )}
                </div>
                {formattedHealthFactor && formattedHealthFactor > 0 && (
                  <div className="ml-6">
                    <p className="text-gray-300 text-[13px]">Health Factor</p>
                    <div className="flex space-x-2">
                      {(userTotalCollateralInUsd && userTotalCollateralInUsd) ||
                      (Number(userTotalCollateralInUsd) >= 0 &&
                        Number(userTotalCollateralInUsd) >= 0) ? (
                        <p
                          className={`${healthFactorColor} text-lg sc:text-xl sm:text-2xl font-bold`}
                        >
                          {Number(healthFactor) > 0
                            ? formattedHealthFactor.toFixed(2)
                            : "--"}
                        </p>
                      ) : (
                        <div className="text-base bg-gray-700 animate-pulse w-15 h-8 rounded-md"></div>
                      )}
                      <button
                        className="text-white text-[9px] sc:text-[11px] sm:text-[12px]  px-1 sm:px-2 bg-gray-700 rounded-md text-[10px] hover:bg-gray-600"
                        onClick={() => setOpenRiskDetails(true)}
                      >
                        Risk Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="px-2 h-full md:px-10 mx-auto -mt-16 sm:-mt-24">
            <div className="mt-4 p-1 border rounded-md border-slate-600 w-full text-white flex items-center justify-around bg-gray-800 space-x-4 sm:hidden block">
              <button
                onClick={() => setSelectedButton(0)}
                className={`${
                  selectedButton == 0
                    ? "rounded-md bg-gray-100 text-black"
                    : "bg-gray-800 hover:opacity-50"
                } py-2  w-full`}
              >
                Supply
              </button>
              <button
                onClick={() => setSelectedButton(1)}
                className={`${
                  selectedButton == 1
                    ? "rounded-md bg-gray-100 text-black"
                    : "bg-gray-800 hover:opacity-50"
                } py-2  w-full`}
              >
                Borrow
              </button>
            </div>
            <div className="sm:mt-4 flex flex-wrap">
              <div className="w-full xl:w-6/12 xl:mb-0 px-2 sm:block hidden">
                <YourSupply tokens={userSupplies} />
              </div>
              <div className="w-full xl:w-6/12 px-2 sm:block hidden">
                <YourBorrows tokens={userBorrows} />
              </div>
            </div>

            <div className="mt-4 space-y-8">
              {selectedButton == 0 && (
                <div className="w-full xl:mb-0 px-2 sm:hidden block">
                  <YourSupplySmall tokens={userSupplies} />
                </div>
              )}

              {selectedButton == 1 && (
                <div className="w-full px-2 sm:hidden block">
                  <YourBorrowsSmall tokens={userBorrows} />
                </div>
              )}
            </div>

            <div className="flex flex-wrap mt-4">
              <div className="w-full xl:w-6/12  xl:mb-0 px-2 sm:block hidden">
                <SupplyAssets tokens={supplyAssets!} />
              </div>
              <div className="w-full xl:w-6/12 px-2 sm:block hidden">
                <BorrowAssets tokens={borrowAssets!} />
              </div>
            </div>

            <div className="mt-4 space-y-8">
              {selectedButton == 0 && (
                <div className="w-full xl:mb-0 px-2 sm:hidden block">
                  <SupplyAssetsSmall tokens={supplyAssets!} />
                </div>
              )}

              {selectedButton == 1 && (
                <div className="w-full px-2 sm:hidden block">
                  <BorrowAssetsSmall tokens={borrowAssets!} />
                </div>
              )}
            </div>

            {/* <Footer /> */}
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-gradient-to-tr from-slate-900 to-gray-900 h-[250px] sm:h-[320px]">
            <div className="w-full h-full flex flex-col justify-center px-4 sm:px-10 ">
              <div className="flex items-center">
                <div>
                  <img
                    src={IMAGES.MATIC}
                    width={35}
                    height={30}
                    // layout="fixed"
                    className="card-img-top"
                    alt="coinimage"
                  />
                </div>
                <div className="mx-2">
                  <p className="text-xl sm:text-3xl text-white">
                    Polygon Market
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="w-9 h-8"></div>
                <div>
                  <p className="text-gray-300 text-[13px]">Net worth</p>
                  <p className="text-white">___</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 h-full md:px-10 mx-auto -mt-16 sm:-mt-24">
            <div className="w-full h-[400px] bg-gray-800 border border-slate-700 flex flex-col items-center justify-center space-y-2 text-gray-400 ">
              <div className="rounded-full p-6 bg-orange-800 ">
                <FaThumbsUp className="text-5xl sm:text-8xl text-white" />
              </div>
              <p className="font-medium text-lg sm:text-xl text-white">
                Please, connect your wallet{" "}
              </p>
              <p className="w-9/12 sm:w-7/12 text-sm sm:text-base text-center">
                Please, make sure you are connected to Polygon Mumbai testnet to
                see your supplies, borrowings and open positions
              </p>

              <WalletConnect />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center text-center sm:block sm:p-0 mt-2">
        {openRiskDetails && <ModalScale closeModal={handleRiskDetails} />}
      </div>
    </div>
  );
}
