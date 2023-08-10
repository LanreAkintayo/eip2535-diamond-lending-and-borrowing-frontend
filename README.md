# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).





What's left for me to do.
switch on and off collateral.
Make sure it checks if you are connected, if you are on a different chain, if you change account and all those stuffs
Deal with the responsiveness
Clean the code up
Write a README.md
Write an article.




















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
    borrowPower
  } = useDefi();

  const {signerAddress, chainId} = useWallet()

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

  console.log("Signer: ", signerAddress)
  console.log("Chain ID: ", chainId)
  


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
                        {(userTotalCollateralInUsd &&
                          userTotalCollateralInUsd) ||
                        (Number(userTotalCollateralInUsd) >= 0 &&
                          Number(userTotalCollateralInUsd) >= 0) ? (
                          <p className="text-white text-2xl font-bold">
                            ${netWorth}
                          </p>
                        ) : (
                          <div className="text-base bg-gray-700 animate-pulse w-12 h-8 rounded-md"></div>
                        )}
                      </div>
                      {formattedHealthFactor && formattedHealthFactor > 0 && (
                        <div className="ml-6">
                          <p className="text-gray-300 text-[13px]">
                            Health Factor
                          </p>
                          <div className="flex space-x-2">
                            {(userTotalCollateralInUsd &&
                              userTotalCollateralInUsd) ||
                            (Number(userTotalCollateralInUsd) >= 0 &&
                              Number(userTotalCollateralInUsd) >= 0) ? (
                              <p
                                className={`${healthFactorColor} text-2xl font-bold`}
                              >
                                {Number(healthFactor) > 0
                                  ? formattedHealthFactor.toFixed(2)
                                  : "--"}
                              </p>
                            ) : (
                              <div className="text-base bg-gray-700 animate-pulse w-15 h-8 rounded-md"></div>
                            )}
                            <button
                              className="text-white px-2 bg-gray-700 rounded-md text-sm hover:bg-gray-600"
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
                      <BorrowAssets tokens={borrowAssets!} />
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
        {openRiskDetails && <ModalScale closeModal={handleRiskDetails} />}
      </div>
    </div>
  );
}
