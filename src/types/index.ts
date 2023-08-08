export type ContractSuppliedToken = {
  amountSupplied: bigint;
  isCollateral: boolean;
  startAccumulatingDay: bigint;
  supplierAddress: string;
  supplyInterest: bigint;
  supplyStableRate: bigint;
  tokenAddress: string;
};

export type DetailedSuppliedToken = {
  amountSupplied: bigint;
  amountSuppliedInUsd: bigint;
  walletBalance: bigint | string;
  walletBalanceInUsd: bigint | string;
  isCollateral: boolean;
  startAccumulatingDay: bigint;
  supplierAddress: string;
  supplyInterest: bigint;
  supplyStableRate: bigint;
  tokenAddress: string;
  tokenName: string;
  tokenImage: string;
  decimals: number;
  liquidationThreshold: bigint | string;
  oraclePrice: bigint | string
};

export type ContractBorrowedToken = {
  tokenAddress: string;
  borrowerAddress: string;
  amountBorrowed: bigint;
  startAccumulatingDay: bigint;
  borrowedInterest: bigint;
  stableRate: bigint;
};

export type DetailedBorrowedToken = {
  amountBorrowed: bigint;
  amountBorrowedInUsd: bigint;
  startAccumulatingDay: bigint;
  borrowerAddress: string;
  borrowedInterest: bigint;
  stableRate: bigint;
  tokenAddress: string;
  tokenName: string;
  tokenImage: string;
  decimals: number;
};

export type SupplyAsset = {
  tokenName: string;
  tokenAddress: string;
  tokenImage: string;
  decimals: number;
  walletBalance: bigint;
  walletBalanceInUsd: bigint;
  supplyStableRate: bigint;
};

export type BorrowAsset = {
  tokenName: string;
  tokenAddress: string;
  tokenImage: string;
  decimals: number;
  oraclePrice: bigint | string;
  maxLTV: bigint | string;
  liquidationThreshold: bigint | string;
  liquidationPenalty: bigint | string;
  supplyStableRate: bigint | string;
  borrowStableRate: bigint | string;
  walletBalance: bigint | string;
  walletBalanceInUsd: bigint | string;
  availableToBorrowInUsd: bigint | string;
  availableToBorrow: bigint | string;
  totalSupplied: bigint | string;
  totalSuppliedInUsd: bigint | string;
  totalBorrowed: bigint | string;
  totalBorrowedInUsd: bigint | string;
  availableLiquidity: bigint | string;
  availableLiquidityInUsd: bigint | string;
  utilizationRate: bigint | string;
};

export type TokenDetails = {
  tokenAddress: string;
  liquidationThreshold: bigint;
  loanToValue: bigint;
  borrowStableRate: bigint;
  supplyStableRate: bigint;
  liquidationPenalty: bigint;
};

export type TokenData = {
  tokenName: string;
  tokenAddress: string;
  tokenImage: string;
  decimals: number;
  oraclePrice: bigint | string;
  maxLTV: bigint | string;
  liquidationThreshold: bigint | string;
  liquidationPenalty: bigint | string;
  supplyStableRate: bigint | string;
  borrowStableRate: bigint | string;
  walletBalance: bigint | string;
  walletBalanceInUsd: bigint | string;
  availableToBorrowInUsd: bigint | string;
  availableToBorrow: bigint | string;
  totalSupplied: bigint | string;
  totalSuppliedInUsd: bigint | string;
  totalBorrowed: bigint | string;
  totalBorrowedInUsd: bigint | string;
  availableLiquidity: bigint | string;
  availableLiquidityInUsd: bigint | string;
  utilizationRate: bigint | string;

}
