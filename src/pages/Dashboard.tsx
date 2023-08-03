import YourBorrows from "../components/YourBorrows";
import useDefi from "../hooks/useDefi";
import useWallet from "../hooks/useWallet";

export default function Dashboard() {
  const { signerAddress } = useWallet();
  const {
    userSupplies,
    userBorrows,
    userTotalBorrowedInUsd,
    healthFactor,
    userTotalCollateralInUsd,
    liquidationThresholdWeighted,
    maxLTV,
    currentLTV
  } = useDefi();

  // console.log("User supplies: ", userSupplies);
  // console.log("User Borrows: ", userBorrows);
  // console.log("Raw User Total borrowed in Usd: ", userTotalBorrowedInUsd);
  // console.log("Raw User Total Collateral in Usd: ", userTotalCollateralInUsd);
  // console.log("Health factor: ", healthFactor != null ? healthFactor /BigInt(10000) : null);
  // console.log("User Total Borrowed in USD: ", userTotalBorrowedInUsd != null ? Number(userTotalBorrowedInUsd) / 10**18 : null);
  // console.log("User Total Collateral: ", userTotalCollateralInUsd != null ? Number(userTotalCollateralInUsd) / 10**18 : null);
  // console.log("Liquidation threshold weighted : ", liquidationThresholdWeighted != null ? Number(liquidationThresholdWeighted) / 10000 : null);
  // console.log("Raw Liquidation threshold weighted: ", liquidationThresholdWeighted);
  // console.log("Max LTV: ", maxLTV);
  // console.log("Current LTV: ", currentLTV);


  // console.log("Signer address: ", signerAddress);

  return (
    <>
     <YourBorrows />
    </>
  );
}
