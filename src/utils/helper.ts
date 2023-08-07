import { ethers } from "ethers";
import { DetailedSuppliedToken, TokenData } from "../types";
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

export const getLatestHealthFactor = async (
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
      ethers.formatUnits(Number(amountSupplied).toString(), 18)
    );
    const usableLiquidationThreshold =
      Number(currentTokenToSupply.liquidationThreshold) / 10000;

    const numerator = parsedTotalCollateralInUsd * parsedLiquidationThresholdWeighted -
      usableAmountSuppliedInUsd * usableLiquidationThreshold +
      (usableAmountSuppliedInUsd + parsedTokenAmountInUsd) *
      usableLiquidationThreshold;
    
    const corr = numerator / latestTotalCollateralInUsd
    
    console.log("Correct liquidation threshold weighted: ", corr
    
    )
    healthFactor =
      (latestTotalCollateralInUsd * corr) /
      parsedTotalBorrowedInUsd;

    // let numerator = 0;
    // for (const eachSupply of usersTokenSupplied) {
    //   if (eachSupply.tokenAddress == currentTokenToSupply.tokenAddress) {
    //     const currentTotalCollateralInUsd =
    //       Number(
    //         ethers.formatUnits(eachSupply.amountSuppliedInUsd.toString(), 18)
    //       ) +
    //       (tokenAmount * Number(oraclePrice)) /
    //       10 ** currentTokenToSupply.decimals;

    //     console.log("Current total collateral in usd: ", currentTotalCollateralInUsd)
    //     const currentLiquidationThreshold =
    //       Number(eachSupply.liquidationThreshold) / 10000;

    //     console.log("Current liquidation threshold: ", currentLiquidationThreshold)
    //     const currentNumerator =
    //       currentTotalCollateralInUsd * currentLiquidationThreshold;

    //     numerator += currentNumerator;
    //   } else {
    //     const currentNumerator =
    //       Number(
    //         ethers.formatUnits(eachSupply.amountSuppliedInUsd.toString(), 18)
    //       ) +
    //       Number(eachSupply.liquidationThreshold) / 10000;

    //     numerator += currentNumerator
    //   }
    // }

    // const correctLiquidationThresholdWeighted =
    //   numerator / latestTotalCollateralInUsd;

    // console.log("Correct liquidation threshold weighted: ", correctLiquidationThresholdWeighted)
    // console.log("Latest Collateral in usd: ", latestTotalCollateralInUsd)

    // healthFactor =
    //   (latestTotalCollateralInUsd * correctLiquidationThresholdWeighted) /
    //   parsedTotalBorrowedInUsd;

    console.log("Health factor in helper", healthFactor);
  } else {
    // Compute the new liquidation threshold weighted
    console.log("It is not included");

    const newLiquidationThresholdWeighted =
      parsedTotalCollateralInUsd * parsedLiquidationThresholdWeighted +
      (parsedTokenAmountInUsd * parsedLiquidationThreshold) /
        parsedTotalCollateralInUsd +
      parsedTokenAmountInUsd;

    const latestTotalCollateral =
      parsedTotalCollateralInUsd + parsedTokenAmountInUsd;

    healthFactor =
      (latestTotalCollateral * newLiquidationThresholdWeighted) /
      parsedTotalBorrowedInUsd;
  }
  return healthFactor;
};
