import { BigNumberish, ethers } from "ethers";
import React from "react";
import { BorrowedToken, SuppliedToken } from "../types";

interface IDefiContext {
  userSupplies: SuppliedToken[];
  userBorrows: BorrowedToken[];
  healthFactor: bigint | null;
  userTotalCollateralInUsd: bigint | null;
  userTotalBorrowedInUsd: bigint | null;
  borrowPower: bigint | null;
  maxLTV: bigint | null;
  currentLTV: bigint | null;
  liquidationThresholdWeighted: bigint | null;
  loadUserSupplies: (signerAddress: string) => Promise<SuppliedToken[]>;
  loadUserBorrows: (signerAddress: string) => Promise<BorrowedToken[]>;
  loadHealthFactor: (signerAddress: string) => Promise<bigint> | null;
  loadUserTotalCollateralInUsd: (signerAddress: string) => Promise<bigint> | null;
  loadUserTotalBorrowedInUsd: (signerAddress: string) => Promise<bigint> | null;
  loadBorrowPower: (signerAddress: string) => Promise<bigint> | null;
  loadMaxLTV: (signerAddress: string) => Promise<bigint> | null;
  loadCurrentLTV: (signerAddress: string) => Promise<bigint> | null;
  loadLiquidationThresholdWeighted: (
    signerAddress: string
  ) => Promise<bigint> | null;
}

const DefiContext = React.createContext<IDefiContext>({
  userSupplies: [],
  userBorrows: [],
  healthFactor: null,
  userTotalCollateralInUsd: null,
  userTotalBorrowedInUsd: null,
  borrowPower: null,
  maxLTV: null,
  currentLTV: null,
  liquidationThresholdWeighted: null,
  loadUserSupplies: (signerAddress) => Promise.resolve([]),
  loadUserBorrows: (signerAddress) => Promise.resolve([]),
  loadHealthFactor: (signerAddress: string) => null,
  loadUserTotalCollateralInUsd: (signerAddress: string) => null,
  loadUserTotalBorrowedInUsd: (signerAddress: string) => null,
  loadBorrowPower: (signerAddress: string) => null,
  loadMaxLTV: (signerAddress: string) => null,
  loadCurrentLTV: (signerAddress: string) => null,
  loadLiquidationThresholdWeighted: (signerAddress: string) => null,
});

export default DefiContext;
