import { BigNumberish, ethers } from "ethers";
import React from "react";
import { DetailedBorrowedToken, DetailedSuppliedToken, SupplyAsset, TokenData } from "../types";

interface IDefiContext {
  userSupplies: DetailedSuppliedToken[];
  userBorrows: DetailedBorrowedToken[];
  supplyAssets: SupplyAsset[] | null;
  healthFactor: bigint | null;
  userTotalCollateralInUsd: bigint | null;
  userTotalBorrowedInUsd: bigint | null;
  borrowPower: bigint | null;
  maxLTV: bigint | null;
  currentLTV: bigint | null;
  liquidationThresholdWeighted: bigint | null;
  loadUserSupplies: (signerAddress: string) => Promise<DetailedSuppliedToken[]>;
  loadUserBorrows: (signerAddress: string) => Promise<DetailedBorrowedToken[]>;
  loadSupplyAssets: (signerAddress: string) => Promise<SupplyAsset[]> | null;
  loadHealthFactor: (signerAddress: string) => Promise<bigint> | null;
  loadUserTotalCollateralInUsd: (signerAddress: string) => Promise<bigint> | null;
  loadUserTotalBorrowedInUsd: (signerAddress: string) => Promise<bigint> | null;
  loadBorrowPower: (signerAddress: string) => Promise<bigint> | null;
  loadMaxLTV: (signerAddress: string) => Promise<bigint> | null;
  loadCurrentLTV: (signerAddress: string) => Promise<bigint> | null;
  loadLiquidationThresholdWeighted: (
    signerAddress: string
  ) => Promise<bigint> | null;
  getTokenData: (signerAddress: string, tokenAddress: string) => Promise<TokenData> | null;
}

const DefiContext = React.createContext<IDefiContext>({
  userSupplies: [],
  userBorrows: [],
  supplyAssets: null,
  healthFactor: null,
  userTotalCollateralInUsd: null,
  userTotalBorrowedInUsd: null,
  borrowPower: null,
  maxLTV: null,
  currentLTV: null,
  liquidationThresholdWeighted: null,
  loadUserSupplies: (signerAddress) => Promise.resolve([]),
  loadUserBorrows: (signerAddress) => Promise.resolve([]),
  loadSupplyAssets: (signerAddress) => null,
  loadHealthFactor: (signerAddress: string) => null,
  loadUserTotalCollateralInUsd: (signerAddress: string) => null,
  loadUserTotalBorrowedInUsd: (signerAddress: string) => null,
  loadBorrowPower: (signerAddress: string) => null,
  loadMaxLTV: (signerAddress: string) => null,
  loadCurrentLTV: (signerAddress: string) => null,
  loadLiquidationThresholdWeighted: (signerAddress: string) => null,
  getTokenData: (signerAddress: string, tokenAddress: string) => null,
});

export default DefiContext;
