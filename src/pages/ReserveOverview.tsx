import ReserveStatus from "../components/ReserveStatus";
import TokenInfo from "../components/TokenInfo";
import { useParams, useLocation, Link } from "react-router-dom";
import useDefi from "../hooks/useDefi";
import useWallet from "../hooks/useWallet";
import { useEffect, useState } from "react";
import { TokenData } from "../types";
import { inCurrencyFormat } from "../utils/helper";
import { GoArrowLeft } from "react-icons/go";
import { IMAGES } from "../constants";
import OverviewSkeleton from "../components/OverviewSkeleton";

export default function ReserveOverview() {
  const { slug: tokenAddress } = useParams();
  const { state } = useLocation();
  // const { tokenData: tokenDataJson } = state;

  const { signerAddress } = useWallet();
  const { getTokenData } = useDefi();

  const [token, setToken] = useState<TokenData>();

  useEffect(() => {
    const loadTokenData = async () => {
      if (signerAddress && tokenAddress) {
        if (state.tokenData) {
          const parsedTokenData = JSON.parse(state.tokenData) as TokenData;
          setToken(parsedTokenData);
        } else {
          const tokenData = await getTokenData(signerAddress, tokenAddress);
          if (tokenData) {
            setToken(tokenData!);
          }
        }
      }
    };

    loadTokenData();
  }, [signerAddress, tokenAddress]);

  let fTotalSuppliedInUsd;
  let fAvailableLiquidityInUsd;
  let fUtilizationRate;
  let fOraclePrice;

  if (token) {
    fTotalSuppliedInUsd = inCurrencyFormat(
      Number(token.totalSuppliedInUsd) / 10 ** token.decimals
    );
    fAvailableLiquidityInUsd = inCurrencyFormat(
      Number(token.availableLiquidityInUsd) / 10 ** token.decimals
    );
    fUtilizationRate = Number(token.utilizationRate) / 100;

    fOraclePrice = inCurrencyFormat(
      Number(token.oraclePrice) / 10 ** token.decimals
    );
  }

  const yourSupplies = {};
  const yourBorrows = {};

  const web3 = {};
  const contract = {};
  const account = "";

  let actualAvailable;

  return (
    <div className="">
      {token ? (
        <div className="">
          <div className="pt-16 md:pt-28 ss:pt-20  bg-gradient-to-tr from-slate-900 to-gray-900 h-[340px] ssm:h-[320px] px-8">
            <div className="w-full flex flex-col justify-center space-y-4">
              <div className="flex flex-col ssm:flex-row ssm:items-center space-y-3 ssm:space-y-0 ">
                <Link
                  to="/dashboard"
                  className="ssm:mx-2 w-[100px] h-8 bg-slate-700 flex items-center text-white rounded-md justify-center hover:bg-gray-800"
                >
                  <GoArrowLeft />
                  <p className="ml-2 text-sm">Go back</p>
                </Link>

                <div className="flex items-center ssm:justify-center">
                  <img
                    src={IMAGES.WETH}
                    width={32}
                    height={28}
                    // layout="fixed"
                    className="w-[20px] h-[20px] ssm:w-[32px] ssm:h-[28px]"
                    alt="coinimage"
                  />
                  <p className="text-base ssm:text-2xl text-white ml-2">
                    Sepolia Market
                  </p>
                </div>
              </div>
              <div className="flex md:flex-row md:space-y-0 md:items-center flex-col items-start space-y-3">
                <div className="flex items-center justify-center ">
                  <img
                    src={token.tokenImage}
                    width={40}
                    height={40}
                    className="card-img-top w-[30px] h-[30px] ssm:w-[40px] ssm:h-[40px]"
                    alt="coinimage"
                  />

                  <p className="text-xl ssm:text-2xl  sm:text-4xl text- ml-2 text-white font-bold">
                    {token.tokenName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-8 ss:gap-x-16 sm:gap-x-0 gap-y-2 sm:flex items-center sm:space-x-8">
                  <div className="text-[12px] ss:text-sm text-gray-400 sm:ml-12">
                    <p>Reserve Size</p>
                    <div className="font-bold text-base ss:text-xl sm:text-2xl text-white">
                      ${fTotalSuppliedInUsd}
                    </div>
                  </div>
                  <div className="text-[12px] ss:text-sm text-gray-400">
                    <p>Available Liquidity</p>
                    <div className="font-bold text-base ss:text-xl sm:text-2xl text-white">
                      ${fAvailableLiquidityInUsd}
                    </div>
                  </div>
                  <div className="text-[12px] ss:text-sm  text-gray-400">
                    <p>Utilization Rate</p>
                    <div className="font-bold text-base ss:text-xl sm:text-2xl text-white">
                      {fUtilizationRate}%
                    </div>
                  </div>
                  <div className="text-[12px] ss:text-sm  text-gray-400">
                    <p>Oracle price</p>
                    <div className="font-bold text-base ss:text-xl sm:text-2xl text-white">
                      ${fOraclePrice}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 md:px-10 mx-auto w-full -mt-8 sm:-mt-20">
            <div className="flex flex-wrap mt-4">
              <div className="w-full xl:w-8/12 mb-5 xl:mb-0 px-2">
                <ReserveStatus token={token} />
              </div>
              <div className="w-full xl:w-4/12 px-2">
                {true && (
                  <TokenInfo
                    token={token}
                    actualAvailable={actualAvailable}
                    web3={web3}
                    contract={contract}
                    account={account}
                    yourSupplies={yourSupplies}
                    yourBorrows={yourBorrows}
                  />
                )}
              </div>
            </div>

            {/* <Footer /> */}
          </div>
        </div>
      ) : (
        <OverviewSkeleton />
      )}

      {/* <ModalBorrow /> */}
    </div>
  );
}
