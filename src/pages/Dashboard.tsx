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

export default function Dashboard2() {
  // const { network } = useNetwork();
  // const { requireInstall, isLoading, connect, contract, web3 } = useWeb3();
  // const { account } = useAccount();
  // const { tokens } = useSupplyAssets();
  // const { tokensForBorrow } = useBorrowAssets();
  // const { yourSupplies } = useYourSupplies();
  // const { yourBorrows } = useYourBorrows();

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
  } = useDefi();

  console.log("Supply Assets: ", supplyAssets);

  const formattedHealthFactor = healthFactor ? Number(healthFactor) / 10000 : 0;
  let healthFactorColor = "text-white";
  if (formattedHealthFactor) {
    if (formattedHealthFactor > 10) {
      healthFactorColor = "text-green-700";
    } else if (formattedHealthFactor > 2) {
      healthFactorColor = "text-orange-300";
    } else {
      healthFactorColor = "text-red-800";
    }
  }

  // console.log("User total borrowed: ", userTotalBorrowedInUsd);
  // console.log("user total collateral in used: ", userTotalCollateralInUsd);
  const netWorth =
    userTotalCollateralInUsd && userTotalCollateralInUsd
      ? inCurrencyFormat(
          (Number(userTotalCollateralInUsd) - Number(userTotalBorrowedInUsd)) /
            10 ** 18
        )
      : 0;

  const NETWORK_ID = 42;

  const [selectedTokenToSupply, setSelectedTokenToSupply] = useState(null);
  const [selectedTokenToBorrow, setSelectedTokenToBorrow] = useState(null);
  const [selectedTokenToWithdraw, setSelectedTokenToWithdraw] = useState(null);
  const [selectedTokenToRepay, setSelectedTokenToRepay] = useState(null);

  const [transactionHash, setTransactionHash] = useState(null);
  const [newSupply, setNewSupply] = useState(true);

  const [supplyError, setSupplyError] = useState(null);
  const [supplyResult, setSupplyResult] = useState(null);

  const [borrowingError, setBorrowingError] = useState(null);
  const [borrowingResult, setBorrowingResult] = useState(null);

  const [WithdrawError, setWithdrawError] = useState(null);
  const [WithdrawResult, setWithdrawResult] = useState(null);

  const [repayError, setRepayError] = useState(null);
  const [repayResult, setRepayResult] = useState(null);

  //   const toWei = (value) => {
  //     return web3.utils.toWei(value.toString());
  //   };

  const handleCloseModal = () => {
    setSupplyError(null);
    setSupplyResult(null);
    setBorrowingError(null);
    setBorrowingResult(null);
    setWithdrawError(null);
    setWithdrawResult(null);
    setRepayError(null);
    setRepayResult(null);
    setSelectedTokenToSupply(null);
    setSelectedTokenToBorrow(null);
    setSelectedTokenToWithdraw(null);
    setSelectedTokenToRepay(null);
    setTransactionHash(null);
  };

  const supplyToken = async (token: any, value: any) => {
    console.log("Supply Token");
  };

  const borrowToken = async (token: any, value: any) => {
    console.log("Borrow Token");
  };

  const withdrawToken = async (token: any, value: any) => {
    console.log("Withdraw token: ");
  };

  const repayToken = async (token: any, value: any) => {
    console.log("Repay token");
  };

  const addBorrowedToken = async (token: any) => {
    console.log("Add borrowed Token");
  };

  const addTokenToMetamask = async (token: any) => {
    console.log("Add token to metamask");
  };

  const addLAR = async (token: any) => {
    console.log("Add LAR Token");
  };

  return (
    <div className="">
      {true ? (
        true ? (
          <>
            {false ? (
              <div>Page is Loading</div>
            ) : (
              <div>
                <div className="bg-gradient-to-tr from-slate-900 to-gray-900 h-[320px]">
                  <div className="w-full h-full flex flex-col justify-center px-10 ">
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
                        <p className="text-3xl text-white">Polygon Market</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-3">
                      <div className="w-9 h-8"></div>
                      <div>
                        <p className="text-gray-300 text-[13px]">Net worth</p>
                        <p className="text-white text-2xl font-bold">
                          ${netWorth}
                        </p>
                      </div>
                      <div className="ml-6">
                        <p className="text-gray-300 text-[13px]">
                          Health Factor
                        </p>
                        <p
                          className={`${healthFactorColor} text-2xl font-bold`}
                        >
                          {formattedHealthFactor}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-2 h-full md:px-10 mx-auto -mt-24">
                  <div className="flex flex-wrap mt-4">
                    <div className="w-full xl:w-6/12 xl:mb-0 px-2">
                      <YourSupply tokens={userSupplies} />
                    </div>
                    <div className="w-full xl:w-6/12 px-2">
                      <YourBorrows tokens={userBorrows} />
                    </div>
                  </div>

                  <div className="flex flex-wrap mt-4">
                    <div className="w-full xl:w-6/12  xl:mb-0 px-2">
                      <SupplyAssets tokens={supplyAssets!} />
                    </div>
                    <div className="w-full xl:w-6/12 px-2">
                      {/* <BorrowAssets tokens={tokensForBorrow.data}>
                          {(token) => {
                            return (
                              <RowBorrowAsset
                                token={token}
                                key={token.tokenAddress}
                                balance={yourSupplies.data?.yourBalance}
                                Borrow={() => {
                                  return (
                                    <button
                                      onClick={() => {
                                        setSelectedTokenToBorrow(token);
                                      }}
                                      className="bg-gray-700 text-base text-white p-2 rounded-md"
                                    >
                                      Borrow
                                    </button>
                                  );
                                }}
                                Details={() => {
                                  return (
                                    <Link
                                      href={{
                                        pathname: `/reserve-overview/${token.name}`,
                                        query: {
                                          ...token,
                                          availableAmountInContract:
                                            JSON.stringify(
                                              token.availableAmountInContract
                                            ),
                                          image: JSON.stringify(token.image),
                                          totalBorrowedInContract:
                                            JSON.stringify(
                                              token.totalBorrowedInContract
                                            ),
                                          totalSuppliedInContract:
                                            JSON.stringify(
                                              token.totalSuppliedInContract
                                            ),
                                          userTokenBorrowedAmount:
                                            JSON.stringify(
                                              token.userTokenBorrowedAmount
                                            ),
                                          userTokenLentAmount: JSON.stringify(
                                            token.userTokenLentAmount
                                          ),
                                          walletBalance: JSON.stringify(
                                            token.walletBalance
                                          ),
                                          userTotalSupplyBalance:
                                            yourSupplies.data?.yourBalance,
                                        },
                                        // the data
                                      }}
                                      as={`/reserve-overview/${token.name}`}
                                    >
                                      <a className="ml-2 border border-gray-400 text-base font-medium text-gray-800 p-2 rounded-md">
                                        {" "}
                                        Details
                                      </a>
                                    </Link>
                                  );
                                }}
                              />
                            );
                          }}
                        </BorrowAssets> */}
                    </div>
                  </div>

                  {/* <Footer /> */}
                </div>
              </div>
            )}

            <div className="flex text-center sm:block sm:p-0">
              {/* <ModalWithdraw /> */}
            </div>
          </>
        ) : false ? (
          <div className="w-full grid min-h-screen place-items-center bg-black text-white">
            <button
              onClick={() => {
                window.open("https://metamask.io/download/", "_blank");
              }}
              className="border border-white p-2 rounded-md"
            >
              Install metamask
            </button>
          </div>
        ) : (
          <div className="w-full grid min-h-screen place-items-center bg-black text-white">
            <button
              onClick={() => alert("connect to metamask")}
              className="border border-white p-2 rounded-md"
            >
              Connect to metamask with your browser
            </button>
          </div>
        )
      ) : (
        <div className="w-full grid min-h-screen place-items-center bg-black text-white">
          <div className="border border-white p-2 rounded-md">
            Connecting.... Please! Wait for a moment.
          </div>
        </div>
      )}

      <div className="flex justify-center text-center sm:block sm:p-0 mt-2">
        {/* {selectedTokenToSupply && (
          <ModalSupply
            token={selectedTokenToSupply}
            supplyError={supplyError}
            supplyResult={supplyResult}
            transactionHash={transactionHash}
            addLAR={addLAR}
            newSupply={newSupply}
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
            addBorrowedToken={addBorrowedToken}
          />
        )}

        {selectedTokenToWithdraw && (
          <ModalWithdraw
            token={selectedTokenToWithdraw}
            closeModal={handleCloseModal}
            onWithdraw={withdrawToken}
            withdrawError={WithdrawError}
            withdrawResult={WithdrawResult}
            addTokenToMetamask={addTokenToMetamask}
            contract={contract}
            web3={web3}
          />
        )}

        {selectedTokenToRepay && web3 && (
          <ModalRepay
            token={selectedTokenToRepay}
            closeModal={handleCloseModal}
            onRepay={repayToken}
            repayError={repayError}
            repayResult={repayResult}
            web3={web3}
          />
        )} */}
      </div>
    </div>
  );
}
