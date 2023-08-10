import { ethers } from "ethers";
import {
  BorrowAsset,
  DetailedBorrowedToken,
  DetailedSuppliedToken,
  TokenData,
} from "../types";
import { readContract } from "@wagmi/core";
import { diamondAddress, getterAbi } from "../constants";
import { each } from "chart.js/dist/helpers/helpers.core";

export const todp = (amount: any, dp: number) => {
  return Number(amount).toFixed(dp);
};

export const convertToDollar = (token: any, value: any) => {
  return parseFloat(value) * token.oneTokenToDollar;
};

export const inCurrencyFormat = (value: number) => {
  const dollarUSLocale = Intl.NumberFormat("en-US");

  return dollarUSLocale.format(value);
};

export const replacer = (key: any, value: any) => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
};

const getAmountSupplied = (
  currentTokenToSupply: TokenData,
  usersTokenSupplied: DetailedSuppliedToken[]
) => {
  let amountSupplied;
  let amountSuppliedInUsd;
  for (const eachSupply of usersTokenSupplied) {
    if (eachSupply.tokenAddress == currentTokenToSupply.tokenAddress) {
      amountSupplied = eachSupply.amountSupplied;
      amountSuppliedInUsd = eachSupply.amountSuppliedInUsd;
      break;
    }
  }

  return {
    amountSupplied,
    amountSuppliedInUsd,
  };
};
export const getLatestHealthFactor = (
  usersTokenSupplied: DetailedSuppliedToken[],
  currentTokenToSupply: TokenData,
  tokenAmount: number,
  totalCollateralInUsd: any,
  totalBorrowedInUsd: any,
  liquidationThresholdWeighted: any
) => {
  // Check if the currentToken To supply is in the usersToken supplied
  const decimals = currentTokenToSupply.decimals;

  const oraclePrice = currentTokenToSupply.oraclePrice;

  const parsedLiquidationThresholdWeighted =
    Number(liquidationThresholdWeighted) / 10000;

  const parsedTotalCollateralInUsd = Number(
    ethers.formatUnits(totalCollateralInUsd.toString(), 18)
  );

  const parsedTotalBorrowedInUsd = Number(
    ethers.formatUnits(totalBorrowedInUsd.toString(), 18)
  );
  const parsedLiquidationThreshold =
    Number(currentTokenToSupply.liquidationThreshold) / 10000;

  const parsedTokenAmountInUsd =
    (tokenAmount * Number(oraclePrice)) / 10 ** currentTokenToSupply.decimals;

  console.log("Parsed token amount in usd: ", parsedTokenAmountInUsd);

  const tokenAddresses = usersTokenSupplied.map(
    (eachSupply) => eachSupply.tokenAddress
  );
  let healthFactor = 0;

  console.log("UserTotalCollateralInUsd in the helper: ", totalCollateralInUsd);
  console.log("UserTotalBorrowedInUsd in the helper: ", totalBorrowedInUsd);
  console.log(
    "liquidationThresholdWeited in the helper: ",
    liquidationThresholdWeighted
  );

  if (tokenAddresses.includes(currentTokenToSupply.tokenAddress)) {
    console.log("It is included");
    const latestTotalCollateralInUsd =
      parsedTotalCollateralInUsd + parsedTokenAmountInUsd;

    console.log(
      "Latest total collateral in usd in helper: ",
      latestTotalCollateralInUsd
    );
    console.log(
      "Parsed liquidation threshold weighted in helper: ",
      parsedLiquidationThresholdWeighted
    );
    console.log(
      "Parsed total borrowed in usd in helper: ",
      parsedTotalBorrowedInUsd
    );

    const { amountSupplied, amountSuppliedInUsd } = getAmountSupplied(
      currentTokenToSupply,
      usersTokenSupplied
    );

    const usableAmountSuppliedInUsd = Number(
      ethers.formatUnits(Number(amountSuppliedInUsd).toString(), 18)
    );
    const usableLiquidationThreshold =
      Number(currentTokenToSupply.liquidationThreshold) / 10000;

    const numerator =
      parsedTotalCollateralInUsd * parsedLiquidationThresholdWeighted -
      usableAmountSuppliedInUsd * usableLiquidationThreshold +
      (usableAmountSuppliedInUsd + parsedTokenAmountInUsd) *
        usableLiquidationThreshold;

    const corr = numerator / latestTotalCollateralInUsd;

    console.log("Correct liquidation threshold weighted: ", corr);
    healthFactor =
      parsedTotalBorrowedInUsd > 0
        ? (latestTotalCollateralInUsd * corr) / parsedTotalBorrowedInUsd
        : -1;

    console.log("Health factor in helper", healthFactor);
  } else {
    // Compute the new liquidation threshold weighted
    console.log("It is not included");

    const newLiquidationThresholdWeighted =
      (parsedTotalCollateralInUsd * parsedLiquidationThresholdWeighted +
        parsedTokenAmountInUsd * parsedLiquidationThreshold) /
      (parsedTotalCollateralInUsd + parsedTokenAmountInUsd);

    // debugger;

    console.log(
      "New liquidation threshold weighted: ",
      newLiquidationThresholdWeighted
    );

    const latestTotalCollateral =
      parsedTotalCollateralInUsd + parsedTokenAmountInUsd;

    healthFactor =
      parsedTotalBorrowedInUsd > 0
        ? (latestTotalCollateral * newLiquidationThresholdWeighted) /
          parsedTotalBorrowedInUsd
        : -1;
  }
  return healthFactor;
};

export const getWithdrawalHealthFactor = (
  usersTokenSupplied: DetailedSuppliedToken[],
  currentTokenToWithdraw: DetailedSuppliedToken,
  tokenAmount: number,
  totalCollateralInUsd: any,
  totalBorrowedInUsd: any,
  liquidationThresholdWeighted: any
) => {
  const decimals = currentTokenToWithdraw.decimals;

  const oraclePrice = currentTokenToWithdraw.oraclePrice;

  const parsedLiquidationThresholdWeighted =
    Number(liquidationThresholdWeighted) / 10000;

  const parsedTotalCollateralInUsd = Number(
    ethers.formatUnits(totalCollateralInUsd.toString(), 18)
  );

  const parsedTotalBorrowedInUsd = Number(
    ethers.formatUnits(totalBorrowedInUsd.toString(), 18)
  );
  const parsedLiquidationThreshold =
    Number(currentTokenToWithdraw.liquidationThreshold) / 10000;

  const parsedTokenAmountInUsd =
    (tokenAmount * Number(oraclePrice)) / 10 ** currentTokenToWithdraw.decimals;

  console.log("Parsed token amount in usd: ", parsedTokenAmountInUsd);

  const tokenAddresses = usersTokenSupplied.map(
    (eachSupply) => eachSupply.tokenAddress
  );
  let healthFactor = 0;

  console.log("UserTotalCollateralInUsd in the helper: ", totalCollateralInUsd);
  console.log("UserTotalBorrowedInUsd in the helper: ", totalBorrowedInUsd);
  console.log(
    "liquidationThresholdWeited in the helper: ",
    liquidationThresholdWeighted
  );

  console.log("It is included");
  const latestTotalCollateralInUsd =
    parsedTotalCollateralInUsd - parsedTokenAmountInUsd;

  console.log(
    "Latest total collateral in usd in helper: ",
    latestTotalCollateralInUsd
  );
  console.log(
    "Parsed liquidation threshold weighted in helper: ",
    parsedLiquidationThresholdWeighted
  );
  console.log(
    "Parsed total borrowed in usd in helper: ",
    parsedTotalBorrowedInUsd
  );

  //   const { amountSupplied, amountSuppliedInUsd } = getAmountSupplied(
  //     currentTokenToWithdraw,
  //     usersTokenSupplied
  // );
  console.log(
    "Parsed amount supplied: ",
    currentTokenToWithdraw.amountSupplied,
    decimals
  );

  const parsedAmountSupplied = Number(
    ethers.formatUnits(
      currentTokenToWithdraw.amountSupplied.toString(),
      decimals
    )
  );

  console.log(
    "Parsed amount supplied --->>>>>>>>>>>>>: ",
    parsedAmountSupplied
  );

  const parsedAmountSuppliedInUsd = Number(
    ethers.formatUnits(
      currentTokenToWithdraw.amountSuppliedInUsd.toString(),
      decimals
    )
  );

  console.log("Amount .....");

  // const usableAmountSuppliedInUsd = Number(
  //   ethers.formatUnits(Number(amountSupplied).toString(), 18)
  // );
  const usableLiquidationThreshold =
    Number(currentTokenToWithdraw.liquidationThreshold) / 10000;

  const numerator =
    parsedTotalCollateralInUsd * parsedLiquidationThresholdWeighted -
    parsedAmountSuppliedInUsd * usableLiquidationThreshold +
    (parsedAmountSuppliedInUsd - parsedTokenAmountInUsd) *
      usableLiquidationThreshold;

  const corr = numerator / latestTotalCollateralInUsd;

  console.log("Correct liquidation threshold weighted: ", corr);
  healthFactor =
    parsedTotalBorrowedInUsd > 0
      ? (latestTotalCollateralInUsd * corr) / parsedTotalBorrowedInUsd
      : -1;

  console.log("Health factor in helper", healthFactor);

  return healthFactor;
};

export const getBorrowHealthFactor = (
  tokenToBorrow: BorrowAsset,
  tokenAmount: number,
  totalCollateralInUsd: any,
  totalBorrowedInUsd: any,
  liquidationThresholdWeighted: any
) => {
  const oraclePrice =
    Number(tokenToBorrow.oraclePrice) / 10 ** tokenToBorrow.decimals;

  const tokenAmountInUsd = tokenAmount * oraclePrice;
  const parsedLiquidationThresholdWeighted =
    Number(liquidationThresholdWeighted) / 10000;

  const parsedTotalCollateralInUsd = Number(
    ethers.formatUnits(totalCollateralInUsd.toString(), 18)
  );

  const parsedTotalBorrowedInUsd = Number(
    ethers.formatUnits(totalBorrowedInUsd.toString(), 18)
  );

  const healthFactor =
    parsedTotalBorrowedInUsd + tokenAmountInUsd > 0
      ? (parsedTotalCollateralInUsd * parsedLiquidationThresholdWeighted) /
        (parsedTotalBorrowedInUsd + tokenAmountInUsd)
      : -1;

  return healthFactor;
};
export const getRepayHealthFactor = (
  tokenToBorrow: DetailedBorrowedToken,
  tokenAmount: number,
  totalCollateralInUsd: any,
  totalBorrowedInUsd: any,
  liquidationThresholdWeighted: any
) => {
  const oraclePrice =
    Number(tokenToBorrow.oraclePrice) / 10 ** tokenToBorrow.decimals;

  const tokenAmountInUsd = tokenAmount * oraclePrice;
  const parsedLiquidationThresholdWeighted =
    Number(liquidationThresholdWeighted) / 10000;

  const parsedTotalCollateralInUsd = Number(
    ethers.formatUnits(totalCollateralInUsd.toString(), 18)
  );

  const parsedTotalBorrowedInUsd = Number(
    ethers.formatUnits(totalBorrowedInUsd.toString(), 18)
  );

  console.log(
    "parsedTotalBorrowedInUsd - tokenAmountInUsd",
    parsedTotalBorrowedInUsd - tokenAmountInUsd
  );
  const healthFactor =
    parsedTotalBorrowedInUsd - tokenAmountInUsd > 0.0001
      ? (parsedTotalCollateralInUsd * parsedLiquidationThresholdWeighted) /
        (parsedTotalBorrowedInUsd - tokenAmountInUsd)
      : -1;

  return healthFactor;
};

export const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};
