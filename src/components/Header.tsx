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
import { ImHome } from "react-icons/im";
import { MdDashboard } from "react-icons/md";

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

export default function Header({ className }: { className: string }) {
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

  // console.log("Curent url: ", currentUrl)

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
    <div className={`${className} fixed z-50 top-0 left-0 w-screen px-4 py-2 `}>
      {!collapsed && isBreakpoint && (
        <div className={`z-80 h-screen ${!collapsed && "fixed inset-0"}`}>
          <Sidebar
            className="h-screen"
            backgroundColor="#0f172a"
            collapsedWidth="10px"
            collapsed={collapsed}
          >
            <div
              className="px-4 pt-4 w-full flex justify-end cursor-pointer "
              onClick={handleSidebar}
            >
              <FaTimes className="text-white" />
            </div>
            <Menu className="">
              <div
                className={`mx-3 mb-4 text-xl flex items-center space-x-3 text-white font-semibold ${
                  currentUrl == "/" && "text-orange-800"
                } hover:text-orange-600`}
              >
                <ImHome />
                <Link to="/">Home</Link>
              </div>
              <div
                className={`mx-3 text-xl flex items-center space-x-3 text-white font-semibold ${
                  currentUrl == "/dashboard" && "text-orange-800"
                } hover:text-orange-600`}
              >
                <MdDashboard />
                <Link to="/dashboard">Dashboard</Link>
              </div>
            </Menu>
          </Sidebar>
        </div>
      )}

      <nav className="flex items-center flex-row w-full justify-between px-2 py-2 sm:px-4 h-full">
        <p className="font-logo hidden sc:block px-2 text-white text-2xl ssm:text-3xl self-start ss:self-auto">
          <span className="text-orange-700">{"<"}L</span>arry
          <span className="text-orange-700">C</span>odes
          <span className="text-orange-700">{"/>"}</span>
        </p>
        <div className="flex justify-center items-center w-80 rounded-full py-2">
          {!isBreakpoint && (
            <div className="flex">
              <Link
                to="/"
                className={`w-full text-white font-semibold ${
                  currentUrl == "/" && "border-b-2 border-orange-700"
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
        <div className="flex items-center justify-between">
          <div className=" text-white flex items-center ">
            <WalletConnect />
            {isBreakpoint && (
              <div
                className="text-white rounded-full hover:text-orange-500 cursor-pointer"
                onClick={handleSidebar}
              >
                <FaBars className="ml-3 w-9 h-9 border border-slate-600  rounded-full text-white p-2" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
