// import { CryptoCards, Button } from "@web3uikit/core";
// import { ConnectButton } from "web3uikit";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
// import NavigationDropdown from "./NavigationDropdown";
import { useEffect, useState, useCallback } from "react";
import WalletConnect from "./WalletConnect";
import { getAccount, getNetwork, switchNetwork } from "@wagmi/core";
import { supportedChainId } from "../constants";
import { createWalletClient, custom } from "viem";
import { mainnet, avalanche, polygonMumbai, zkSync } from "viem/chains";
import { displayToast } from "./Toast";
// import { useRouter } from 'next/router';
import { FaBars, FaTimes } from "react-icons/fa";
import useWallet from "../hooks/useWallet";
import { useLocation, Link, NavLink } from "react-router-dom";

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: { matches: any }) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener("change", updateTarget);
  }, []);

  return targetReached;
};

export default function Header() {
  const [collapsed, setCollapsed] = useState(true);
  const isBreakpoint = useMediaQuery(912);
  // const { isWeb3Enabled, chainId: chainIdHex, enableWeb3 } = useMoralis();
  // const { switchNetwork, chain, account } = useChain();

  // console.log(chainIdHex)
  // const chainId = parseInt(chainIdHex!);
  // console.log("Chain id", chainId)
  // console.log("Here am I:", chainId != 80001)
  // const { chain, chains } = getNetwork();

  // const chainId = chain?.id

  const { chainId } = useWallet();
  const location = useLocation();

  // console.log("Location: ", location)

  const currentUrl = location.pathname;

  // console.log("Current url: ", currentUrl);

  useEffect(() => {
    console.log("There is a change in the id", chainId);
  }, [chainId]);

  useEffect(() => {
    console.log("Collapsing: ", collapsed);
  }, [collapsed]);

  const handleSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <div
      className={`fixed z-50 bg-gradient-to-tr from-slate-900 to-gray-900 top-0 left-0 w-screen `}
    >
      {/* Navbar */}

      {!collapsed && isBreakpoint && (
        <div className={`z-50 h-screen ${!collapsed && "fixed  inset-0"}`}>
          <Sidebar collapsedWidth="0px" collapsed={collapsed}>
            <div
              className="px-4 pt-4 w-full flex justify-end cursor-pointer "
              onClick={handleSidebar}
            >
              <FaTimes />
            </div>
            <Menu className="">
              <div className="text-xl text-white hover:text-orange-600">
                <MenuItem>
                  component={<Link to="/" />}
                  <p
                    className={`text-[16px] text-white ${
                      currentUrl == "/" && "border-b-2 border-orange-600"
                    }`}
                  >
                    Home
                  </p>
                </MenuItem>
              </div>
              <MenuItem component={<Link to="/dashboard" />}>
                <p className="text-[16px]">Dashboard</p>
              </MenuItem>
            </Menu>
          </Sidebar>
        </div>
      )}

      <nav className="flex items-center flex-col ss:flex-row w-full justify-between ss:px-2 py-2 sm:px-4 sm:py-4 h-full">
        <p className="font-logo text-xl text-white sm:text-3xl self-start ss:self-auto">
          <span className="text-orange-700">{"<"}L</span>arry
          <span className="text-orange-700">C</span>odes
          <span className="text-orange-700">{"/>"}</span>
        </p>
        <div className="flex justify-center items-center w-80 rounded-full py-4">
          {!isBreakpoint && (
            <div className="flex">
              <Link
                to="/"
                className={`w-full text-white font-semibold ${
                  currentUrl == "/" &&
                  "border border-gray-400 px-5 rounded-full"
                } hover:text-orange-600`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`ml-3 text-white font-semibold ${
                  currentUrl == "/dashboard" && "border-b-2 border-orange-700"
                } hover:text-orange-600`}
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>
        <div className="flex mx-2 items-center">
          <div className=" text-white flex items-center w-full sc:py-10">
            <WalletConnect />
            {chainId && chainId != supportedChainId && (
              <button
                className="text-orange-600 text-sm my-2 cursor-pointer bg-orange-100 rounded-lg p-2 px-2"
                onClick={async () => {
                  try {
                    // const chainIds = await window.ethereum.request({ method: 'eth_chainId' });

                    // console.log("ChainID: ", chainIds)

                    // const walletClient = createWalletClient({
                    //   chain: polygonMumbai,
                    //   transport: custom(window.ethereum)
                    // })

                    // await walletClient.addChain({ chain: polygonMumbai })

                    await switchNetwork({
                      chainId: supportedChainId,
                    });
                  } catch (err) {
                    console.log("Error", err);

                    displayToast(
                      "failure",
                      "Make sure you add Polygon Mumbai testnet with a chain id of 80001"
                    );
                  }
                }}
              >
                Switch to Mumbai
              </button>
            )}
          </div>
          {isBreakpoint && (
            <div
              className="text-white rounded-full hover:text-orange-500 cursor-pointer"
              onClick={handleSidebar}
            >
              <FaBars className="ml-3 w-9 h-9 bg-orange-500 rounded-full text-black p-2" />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
