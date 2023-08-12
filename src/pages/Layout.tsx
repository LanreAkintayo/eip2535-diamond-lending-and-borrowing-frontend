// import useWallet from "./hooks/useWallet";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import useWallet from "../hooks/useWallet";
import Header from "../components/Header";
import useDefi from "../hooks/useDefi";
import { watchNetwork, watchAccount } from "@wagmi/core";
import { useLocation, Link, NavLink } from "react-router-dom";

interface LayoutProps {}

export default function Layout({
  children,
}: React.PropsWithChildren<LayoutProps>) {
  const { signerAddress, loadChainId, loadSignerAddress, chainId } =
    useWallet();

  const {
    loadUserSupplies,
    loadUserBorrows,
    loadHealthFactor,
    loadUserTotalCollateralInUsd,
    loadUserTotalBorrowedInUsd,
    loadBorrowPower,
    loadMaxLTV,
    loadCurrentLTV,
    loadLiquidationThresholdWeighted,
    loadSupplyAssets,
    loadBorrowAssets,
  } = useDefi();

  const location = useLocation();

  // console.log("Location: ", location)

  const currentUrl = location.pathname;

  const { isConnected } = useAccount();

  useEffect(() => {
    async function getChainId() {
      try {
        console.log("We are here... ");
        const chainId = await loadChainId();

        console.log("Chain Id: ", chainId);

        await loadSignerAddress();

        // setChainId(chainId);
      } catch (err) {
        console.log("Error::", err);
      }
    }

    getChainId();
  }, []);

  useEffect(() => {
    const calclateInitialSettings = async () => {
      try {
        const unwatchAccount = watchAccount(async (account) => {
          console.log("Account has changed......", account);
          const newAccountAddress = account && account.address;
          try {
            const signerAddress = await loadSignerAddress();

            console.log("Signer address: ", signerAddress);
          } catch (err) {
            console.log("No account is detected");
          }
        });

        const unwatchNetwork = watchNetwork(async (network) => {
          console.log("Network has changed:.......... ", network);

          const chainId = await loadChainId();
          console.log("Chain Id: ", chainId);
        });
      } catch (err) {
        console.log("Error::: ", err);
      }
    };
    calclateInitialSettings();
  }, []);

  useEffect(() => {
    const loadDefi = async () => {
      if (signerAddress) {
        await loadUserBorrows(signerAddress);

        await loadHealthFactor(signerAddress);
        await loadUserTotalCollateralInUsd(signerAddress);
        await loadUserTotalBorrowedInUsd(signerAddress);
        await loadBorrowPower(signerAddress);
        await loadMaxLTV(signerAddress);
        await loadCurrentLTV(signerAddress);
        await loadLiquidationThresholdWeighted(signerAddress);
      }
    };

    loadDefi();
  }, [signerAddress]);

  useEffect(() => {
    const loadDefi = async () => {
      if (signerAddress) {
        await loadUserSupplies(signerAddress);
      }
    };

    loadDefi();
  }, [signerAddress]);

  useEffect(() => {
    const loadDefi = async () => {
      if (signerAddress) {
        await loadBorrowAssets(signerAddress);
      }
    };

    loadDefi();
  }, [signerAddress]);

  useEffect(() => {
    const loadDefi = async () => {
      if (signerAddress) {
        await loadSupplyAssets(signerAddress);
      }
    };

    loadDefi();
  }, [signerAddress]);

  return (
    <div className="bg-gray-800 h-full dark:bg-dark-100 flex min-h-screen flex-col">
      <div className="">
        <Header
          className={`${
            currentUrl == "/"
              ? "bg-transparent"
              : "bg-gradient-to-tr from-slate-900 to-gray-900 "
          }`}
        />
      </div>
      <Outlet />
    </div>
  );
}
