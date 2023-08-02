// import useWallet from "./hooks/useWallet";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import useWallet from "../hooks/useWallet";
import Header from "../components/Header";
import useDefi from "../hooks/useDefi";

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
  } = useDefi();

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
    const loadDefi = async () => {
      if (signerAddress) {
        const userBorrows = await loadUserBorrows(signerAddress);
        await loadUserSupplies(signerAddress);

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

  return (
    <div className="bg-light-100 dark:bg-dark-100 flex min-h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
