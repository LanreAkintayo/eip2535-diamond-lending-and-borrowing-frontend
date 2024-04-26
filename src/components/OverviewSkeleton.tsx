import { GoArrowLeft } from "react-icons/go";
import { IMAGES } from "../constants";
import { Link } from "react-router-dom";

export default function OverviewSkeleton() {
  return (
    <div className="">
      <div className="">
        <div className="md:pt-28 bg-gradient-to-tr from-slate-900 to-gray-900 h-[320px] px-8">
          <div className="w-full flex flex-col justify-center">
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="mx-2 w-[100px] h-8 bg-slate-700 flex items-center text-white rounded-md justify-center hover:bg-gray-800"
              >
                <GoArrowLeft />
                <p className="ml-2">Go back</p>
              </Link>

              <div className="flex items-center justify-center">
                <img
                  src={IMAGES.WETH}
                  width={32}
                  height={28}
                  // layout="fixed"
                  className="card-img-top"
                  alt="coinimage"
                />
                <p className="text-2xl text-white ml-2">Sepolia Market</p>
              </div>
            </div>
            <div className="flex mt-4">
              <div className="flex items-center justify-center ">
                <div className="text-base bg-gray-700 animate-pulse w-9 h-9 rounded-full"></div>

                <div className="ml-2 text-base bg-gray-700 animate-pulse w-12 h-8 rounded-md"></div>
              </div>

              <div className="text-sm text-gray-400 ml-12">
                <p>Reserve Size</p>
                <div className="text-base bg-gray-700 animate-pulse w-14 h-8 rounded-md"></div>
              </div>
              <div className="ml-10 text-sm text-gray-400">
                <p>Available Liquidity</p>
                <div className="text-base bg-gray-700 animate-pulse w-14 h-8 rounded-md"></div>
              </div>
              <div className="ml-10 text-sm text-gray-400">
                <p>Utilization Rate</p>
                <div className="text-base bg-gray-700 animate-pulse w-14 h-8 rounded-md"></div>
              </div>
              <div className="ml-10 text-sm text-gray-400">
                <p>Oracle price</p>
                <div className="text-base bg-gray-700 animate-pulse w-14 h-8 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 md:px-10 mx-auto w-full -mt-20">
          <div className="flex flex-wrap mt-4">
            <div className="w-80 h-80 bg-gray-800 border border-slate-700 rounded-md xl:w-8/12 mb-5 xl:mb-0 px-2"></div>
            <div className="w-full xl:w-4/12 px-2">
              <div className="flex flex-col p-4 break-words px-4 border border-slate-700 text-white bg-gray-800  w-full mb-6 shadow-lg rounded">
                <p className="font-bold text-lg">Your Info</p>

                <div className="divide-y divide-slate-700">
                  <div className="mt-8 flex items-center">
                    <div className="text-base bg-gray-700 animate-pulse w-10 h-10 rounded-md"></div>

                    <div className="ml-3">
                      <div className="text-base bg-gray-700 animate-pulse w-20 h-3 rounded-md"></div>
                      <div className="mt-2 text-base bg-gray-700 animate-pulse w-20 h-3 rounded-md"></div>
                    </div>
                  </div>

                  <div className="my-5 py-5">
                    <div className="flex items-center">
                      <div className="w-9/12">
                        <div className="mt-2 text-base bg-gray-700 animate-pulse w-20 h-3 rounded-md"></div>
                        <div className="mt-2 text-base bg-gray-700 animate-pulse w-20 h-3 rounded-md"></div>
                        <div className="mt-2 text-base bg-gray-700 animate-pulse w-20 h-3 rounded-md"></div>
                      </div>
                      <div className="w-3/12">
                        <div className="mt-2 text-base bg-gray-700 animate-pulse w-20 h-10 rounded-md"></div>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center">
                      <div className="w-9/12">
                        <div className="mt-2 text-base bg-gray-700 animate-pulse w-20 h-3 rounded-md"></div>
                        <div className="mt-2 text-base bg-gray-700 animate-pulse w-20 h-3 rounded-md"></div>
                        <div className="mt-2 text-base bg-gray-700 animate-pulse w-20 h-3 rounded-md"></div>
                      </div>
                      <div className="w-3/12">
                        <div className="mt-2 text-base bg-gray-700 animate-pulse w-20 h-10 rounded-md"></div>
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
  );
}
