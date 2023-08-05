import ReserveStatus from "../components/ReserveStatus";
import TokenInfo from "../components/TokenInfo";
import { useParams, useLocation } from "react-router-dom";
import useDefi from "../hooks/useDefi";
import useWallet from "../hooks/useWallet";
import { useEffect, useState } from "react";
import { TokenData } from "../types";

export default function ReserveOverview() {
  const { slug: tokenAddress } = useParams();

  // const {signerAddress}
  const { signerAddress } = useWallet();
  const { getTokenData } = useDefi();

  const [token, setToken] = useState<TokenData>();

  useEffect(() => {
    const loadTokenData = async () => {
      if (signerAddress && tokenAddress) {
        const tokenData = await getTokenData(signerAddress, tokenAddress);
        if (tokenData) {
          setToken(tokenData!);
        }
      }
      };
      
      loadTokenData()
  }, [signerAddress, tokenAddress]);

  console.log("Token data: ", token);

  // const {getTok}
  const yourSupplies = {};
  const yourBorrows = {};

  // const {}

//   const token = {};
  const web3 = {};
  const contract = {};
  const account = "";

  let actualAvailable;
  let actualAvailableInDollars;

  //   let userTotalAmountAvailableForBorrowInDollars =
  //     token.userTotalAmountAvailableForBorrowInDollars;

  //   const tokenEquivalent =
  //     0.999 *
  //     (userTotalAmountAvailableForBorrowInDollars /
  //       parseFloat(token.oneTokenToDollar));

  //   const tokenAvailableInContract = parseFloat(
  //     token.availableAmountInContract.amount
  //   );
  //   const tokenAvailableInContractInDollars = convertToDollar(
  //     token,
  //     tokenAvailableInContract
  //   );

  //   if (tokenAvailableInContract >= tokenEquivalent) {
  //     actualAvailable = tokenEquivalent;
  //     actualAvailableInDollars = convertToDollar(token, actualAvailable);
  //   } else {
  //     actualAvailable = tokenAvailableInContract;
  //     actualAvailableInDollars = tokenAvailableInContractInDollars;
  //   }

  return (
    <div className="">
      {token && (
        <div className="bg-gradient-to-tr from-slate-900 to-gray-900 h-[320px]">
          <div className="relative md:pt-32 pb-32 pt-12">
            <div className="md:px-10 mx-auto w-full">
              <div>
                {/* Card stats */}
                <div className="flex flex-wrap">
                  <div className="w-full px-2">
                    <div className="relative flex sm:flex-row sm:mt-0 mt-6 flex-col xl:w-5/12 min-w-0 p-3 rounded mb-6 xl:mb-0 ">
                      <div className="flex items-center">
                        {true && (
                          <img
                            src={token.tokenImage}
                            width={40}
                            height={40}
                            //   layout="fixed"
                            className="card-img-top"
                            alt="coinimage"
                          />
                          // <div>This is the image</div>
                        )}

                        <div className="text-2xl sm:text-4xl text- ml-2 text-white font-bold">
                          {token.tokenName}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex pt-2 sm:ml-6 items-center">
                          <div className=" h-9">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-910"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="white"
                              strokeWidth={1}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                          <div className=" ml-2">
                            <div className="text-sm text-white">
                              Reserve Size:{" "}
                              <div className="font-bold text-xl">$50,000</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex pt-2 ml-6 items-center">
                          <div className=" h-9">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-9 w-9"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="white"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                              />
                            </svg>
                          </div>
                          <div className=" ml-2">
                            <div className="text-sm text-white">
                              Available Liquidity:{" "}
                              <div className="font-bold text-xl">$20,000</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-2 md:px-10 mx-auto w-full -m-24">
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
      )}

      {/* <ModalBorrow /> */}
    </div>
  );
}
