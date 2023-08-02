export type SuppliedToken = {
  amountSupplied: bigint;
  isCollateral: boolean;
  startAccumulatingDay: bigint;
  supplierAddress: string;
  supplyInterest: bigint;
  supplyStableRate: bigint;
  tokenAddress: string;
};

export type BorrowedToken = {
  tokenAddress: string;
  borrowerAddress: string;
  amountBorrowed: bigint;
  startAccumulatingDay: bigint;
  borrowedInterest: bigint;
  stableRate: bigint;
};
