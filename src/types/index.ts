// amountSupplied: 100000000000000000000n;
// isCollateral: true;
// startAccumulatingDay: 0n;
// supplierAddress: "0xec2B1547294a4dd62C0aE651aEb01493f8e4cD74";
// supplyInterest: 0n;
// supplyStableRate: 1000n;
// tokenAddress: "0xF14f9596430931E177469715c591513308244e8F";
// //

export type SuppliedToken = {
    amountSupplied: bigint;
    isCollateral: boolean;
    startAccumulatingDay: bigint;
    supplierAddress: string;
    supplyInterest: bigint;
    supplyStableRate: bigint;
    tokenAddress: string;
} 