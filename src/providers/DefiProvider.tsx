import React, { useReducer } from "react";
import { BigNumberish, ethers } from "ethers";

import DefiContext from "./defi-context";
// import {
//   getDefiModal,
//   idToIconUrl,
//   testnets,
//   wrappedTokenAddresses,
// } from "@/helpers/utils";
import {
  getAccount,
  getNetwork,
  switchNetwork,
  readContract,
  getContract,
  fetchBalance,
} from "@wagmi/core";

import { erc20ABI } from "wagmi";
import { appSettings } from "../constants/settings";
import { diamondAddress, getterAbi } from "../constants";
import { BorrowedToken, SuppliedToken } from "../types";
// import { appSettings } from "@/constants/settings";

const defaultDefiState = {
  userSupplies: null,
  userBorrows: null,
  healthFactor: null,
  userTotalCollateralInUsd: null,
  userTotalBorrowedInUsd: null,
  borrowPower: null,
  maxLTV: null,
  currentLTV: null,
  liquidationThresholdWeighted: null,
};

const defiReducer = (
  state: any,
  action: {
    type: string;
    userSupplies?: SuppliedToken[];
    userBorrows?: BorrowedToken[];
    healthFactor?: bigint;
    userTotalCollateralInUsd?: bigint;
    userTotalBorrowedInUsd?: bigint;
    borrowPower?: bigint;
    maxLTV?: bigint;
    currentLTV?: bigint;
    liquidationThresholdWeighted?: bigint;
  }
) => {
  if (action.type === "USER_SUPPLIES") {
    return {
      ...state,
      userSupplies: action.userSupplies,
    };
  }
  if (action.type === "USER_BORROWS") {
    return {
      ...state,
      userBorrows: action.userBorrows,
    };
  }

  if (action.type === "HEALTH_FACTOR") {
    return {
      ...state,
      healthFactor: action.healthFactor,
    };
  }
  if (action.type === "USER_TOTAL_COLLATERAL_IN_USD") {
    return {
      ...state,
      userTotalCollateralInUsd: action.userTotalCollateralInUsd,
    };
  }
  if (action.type === "USER_TOTAL_BORROWED_IN_USD") {
    return {
      ...state,
      userTotalBorrowedInUsd: action.userTotalBorrowedInUsd,
    };
  }
  if (action.type === "BORROW_POWER") {
    return {
      ...state,
      borrowPower: action.borrowPower,
    };
  }
  if (action.type === "MAX_LTV") {
    return {
      ...state,
      maxLTV: action.maxLTV,
    };
  }
  if (action.type === "CURRENT_LTV") {
    return {
      ...state,
      currentLTV: action.currentLTV,
    };
  }
  if (action.type === "LIQUIDATION_THRESHOLD_WEIGHTED") {
    return {
      ...state,
      liquidationThresholdWeighted: action.liquidationThresholdWeighted,
    };
  }

  return defaultDefiState;
};

const DefiProvider = (props: any) => {
  const [defiState, dispatchDefiAction] = useReducer(
    defiReducer,
    defaultDefiState
  );

  const loadUserSuppliesHandler = async (signerAddress: string) => {
    const userSupplies = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getAllSupplies",
      args: [signerAddress],
    })) as SuppliedToken[];

    dispatchDefiAction({
      type: "USER_SUPPLIES",
      userSupplies: userSupplies,
    });
    return userSupplies;
  };
  const loadUserBorrowsHandler = async (signerAddress: string) => {
    const userBorrows = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getAllBorrows",
      args: [signerAddress],
    })) as BorrowedToken[];
      
    //   console.log("User borrowssss::::::: ", userBorrows)

    dispatchDefiAction({
      type: "USER_BORROWS",
      userBorrows: userBorrows,
    });
    return userBorrows;
  };
  const loadHealthFactorHandler = async (signerAddress: string) => {
    const healthFactor = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getHealthFactor",
      args: [signerAddress],
    })) as bigint;

    dispatchDefiAction({
      type: "HEALTH_FACTOR",
      healthFactor: healthFactor,
    });
    return healthFactor;
  };
  const loadUserTotalCollateralInUsdHandler = async (signerAddress: string) => {
    const userTotalCollateralInUsd = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getUserTotalCollateralInUsd",
      args: [signerAddress],
    })) as bigint;

    dispatchDefiAction({
      type: "USER_TOTAL_COLLATERAL_IN_USD",
      userTotalCollateralInUsd: userTotalCollateralInUsd,
    });
    return userTotalCollateralInUsd;
  };
  const loadUserTotalBorrowedInUsdHandler = async (signerAddress: string) => {
    const userTotalBorrowedInUsd = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getUserTotalBorrowedInUsd",
      args: [signerAddress],
    })) as bigint;
      

    dispatchDefiAction({
      type: "USER_TOTAL_BORROWED_IN_USD",
      userTotalBorrowedInUsd: userTotalBorrowedInUsd,
    });
    return userTotalBorrowedInUsd;
  };
  const loadBorrowPowerHandler = async (signerAddress: string) => {
    const borrowPower = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getBorrowPower",
      args: [signerAddress],
    })) as bigint;

    dispatchDefiAction({
      type: "BORROW_POWER",
      borrowPower: borrowPower,
    });
    return borrowPower;
  };
  const loadMaxLTVHandler = async (signerAddress: string) => {
    const maxLTV = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getMaxLTV",
      args: [signerAddress],
    })) as bigint;

    dispatchDefiAction({
      type: "MAX_LTV",
      maxLTV: maxLTV,
    });
    return maxLTV;
  };
  const loadCurrentLTVHandler = async (signerAddress: string) => {
    const currentLTV = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getCurrentLTV",
      args: [signerAddress],
    })) as bigint;

    dispatchDefiAction({
      type: "CURRENT_LTV",
      currentLTV: currentLTV,
    });
    return currentLTV;
  };
  const loadLiquidationThresholdWeightedHandler = async (
    signerAddress: string
  ) => {
    const liquidationThresholdWeighted = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getLiquidationThreshold",
      args: [signerAddress],
    })) as bigint;

    dispatchDefiAction({
      type: "LIQUIDATION_THRESHOLD_WEIGHTED",
      liquidationThresholdWeighted: liquidationThresholdWeighted,
    });
    return liquidationThresholdWeighted;
  };

  const defiContext = {
    userSupplies: defiState.userSupplies,
    userBorrows: defiState.userBorrows,
    healthFactor: defiState.healthFactor,
    userTotalCollateralInUsd: defiState.userTotalCollateralInUsd,
    userTotalBorrowedInUsd: defiState.userTotalBorrowedInUsd,
    borrowPower: defiState.borrowPower,
    maxLTV: defiState.maxLTV,
    currentLTV: defiState.currentLTV,
    liquidationThresholdWeighted: defiState.liquidationThresholdWeighted,
    loadUserSupplies: loadUserSuppliesHandler,
    loadUserBorrows: loadUserBorrowsHandler,
    loadHealthFactor: loadHealthFactorHandler,
    loadUserTotalCollateralInUsd: loadUserTotalCollateralInUsdHandler,
    loadUserTotalBorrowedInUsd: loadUserTotalBorrowedInUsdHandler,
    loadBorrowPower: loadBorrowPowerHandler,
    loadMaxLTV: loadMaxLTVHandler,
    loadCurrentLTV: loadCurrentLTVHandler,
    loadLiquidationThresholdWeighted: loadLiquidationThresholdWeightedHandler,
  };

  return (
    <DefiContext.Provider value={defiContext}>
      {props.children}
    </DefiContext.Provider>
  );
};

export default DefiProvider;
