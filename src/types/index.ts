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
  isCollateral: boolean;
  startAccumulatingDay: bigint;
  supplierAddress: string;
  supplyInterest: bigint;
  supplyStableRate: bigint;
  tokenAddress: string;
  tokenName: string;
  tokenImage: string;
  decimals: number;
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
  oraclePrice: bigint;
  maxLTV: bigint;
  liquidationThreshold: bigint;
  liquidationPenalty: bigint;
  supplyStableRate: bigint;
  borrowStableRate: bigint;
  walletBalance: bigint;
  walletBalanceInUsd: bigint;
  availableToBorrowInUsd: bigint;
  availableToBorrow: bigint;
}
