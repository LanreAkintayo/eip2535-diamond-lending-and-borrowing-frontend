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
import {
  addressToImage,
  diamondAddress,
  erc20Abi,
  getterAbi,
} from "../constants";
import {
  DetailedBorrowedToken,
  ContractSuppliedToken,
  DetailedSuppliedToken,
  ContractBorrowedToken,
  SupplyAsset,
  TokenDetails,
  TokenData,
  BorrowAsset,
} from "../types";
// import { appSettings } from "@/constants/settings";

const defaultDefiState = {
  userSupplies: null,
  userBorrows: null,
  supplyAssets: null,
  borrowAssets: null,
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
    userSupplies?: DetailedSuppliedToken[];
    userBorrows?: DetailedBorrowedToken[];
    supplyAssets?: TokenData[];
    borrowAssets?: BorrowAsset[];
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
  if (action.type === "SUPPLY_ASSETS") {
    return {
      ...state,
      supplyAssets: action.supplyAssets,
    };
  }
  if (action.type === "BORROW_ASSETS") {
    return {
      ...state,
      borrowAssets: action.borrowAssets,
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
    })) as ContractSuppliedToken[];

    const detailedSupplies = userSupplies.map(
      async (eachSupply: ContractSuppliedToken) => {
        const tokenAddress = eachSupply.tokenAddress;
        const tokenName = (await readContract({
          address: tokenAddress as `0x${string}`,
          abi: erc20ABI,
          functionName: "name",
        })) as string;

        const decimals = await readContract({
          address: tokenAddress as `0x${string}`,
          abi: erc20ABI,
          functionName: "decimals",
        });

        const amountSuppliedInUsd = (await readContract({
          address: diamondAddress as `0x${string}`,
          abi: getterAbi,
          functionName: "getUsdEquivalence",
          args: [eachSupply.tokenAddress, eachSupply.amountSupplied],
        })) as bigint;

        const oraclePrice = (await readContract({
          address: diamondAddress as `0x${string}`,
          abi: getterAbi,
          functionName: "getUsdEquivalence",
          args: [tokenAddress, 1 * 10 ** decimals],
        })) as bigint;

        const walletBalance = await readContract({
          address: tokenAddress as `0x${string}`,
          abi: erc20ABI,
          functionName: "balanceOf",
          args: [signerAddress as `0x${string}`],
        });

        const walletBalanceInUsd = (await readContract({
          address: diamondAddress as `0x${string}`,
          abi: getterAbi,
          functionName: "getUsdEquivalence",
          args: [tokenAddress, walletBalance],
        })) as bigint;

        const tokenImage = addressToImage[tokenAddress];

        const tokenDetails = (await readContract({
          address: diamondAddress as `0x${string}`,
          abi: getterAbi,
          functionName: "getTokenDetails",
          args: [tokenAddress],
        })) as TokenDetails;

        return {
          ...eachSupply,
          tokenName,
          tokenImage,
          decimals,
          amountSuppliedInUsd,
          liquidationThreshold: tokenDetails.liquidationThreshold,
          oraclePrice,
          walletBalance,
          walletBalanceInUsd,
        };
      }
    );

    const resolvedSupplies = (await Promise.all(
      detailedSupplies
    )) as DetailedSuppliedToken[];

    dispatchDefiAction({
      type: "USER_SUPPLIES",
      userSupplies: resolvedSupplies,
    });
    return resolvedSupplies;
  };
  const loadUserBorrowsHandler = async (signerAddress: string) => {
    const userBorrows = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getAllBorrows",
      args: [signerAddress],
    })) as ContractBorrowedToken[];

    const detailedBorrows = userBorrows.map(
      async (eachBorrow: ContractBorrowedToken) => {
        const tokenAddress = eachBorrow.tokenAddress;
        const tokenName = (await readContract({
          address: tokenAddress as `0x${string}`,
          abi: erc20ABI,
          functionName: "name",
        })) as string;

        const decimals = await readContract({
          address: tokenAddress as `0x${string}`,
          abi: erc20ABI,
          functionName: "decimals",
        });

        const amountBorrowedInUsd = (await readContract({
          address: diamondAddress as `0x${string}`,
          abi: getterAbi,
          functionName: "getUsdEquivalence",
          args: [eachBorrow.tokenAddress, eachBorrow.amountBorrowed],
        })) as bigint;

        const oraclePrice = (await readContract({
          address: diamondAddress as `0x${string}`,
          abi: getterAbi,
          functionName: "getUsdEquivalence",
          args: [eachBorrow.tokenAddress, 1 * 10 ** decimals],
        })) as bigint;

        const availableToBorrowInUsd = (await readContract({
          address: diamondAddress as `0x${string}`,
          abi: getterAbi,
          functionName: "getMaxAvailableToBorrowInUsd",
          args: [signerAddress],
        })) as bigint;

        const availableToBorrow = (await readContract({
          address: diamondAddress as `0x${string}`,
          abi: getterAbi,
          functionName: "convertUsdToToken",
          args: [tokenAddress, availableToBorrowInUsd],
        })) as bigint;

         const walletBalance = await readContract({
           address: tokenAddress as `0x${string}`,
           abi: erc20ABI,
           functionName: "balanceOf",
           args: [signerAddress as `0x${string}`],
         });

         const walletBalanceInUsd = (await readContract({
           address: diamondAddress as `0x${string}`,
           abi: getterAbi,
           functionName: "getUsdEquivalence",
           args: [tokenAddress, walletBalance],
         })) as bigint;
        
         const tokenDetails = (await readContract({
           address: diamondAddress as `0x${string}`,
           abi: getterAbi,
           functionName: "getTokenDetails",
           args: [tokenAddress],
         })) as TokenDetails;

        const tokenImage = addressToImage[tokenAddress];

        return {
          ...eachBorrow,
          tokenName,
          tokenImage,
          decimals,
          amountBorrowedInUsd,
          oraclePrice,
          availableToBorrow,
          availableToBorrowInUsd,
          walletBalance, 
          walletBalanceInUsd,
          borrowStableRate: tokenDetails.borrowStableRate
        };
      }
    );

    const resolvedBorrows = (await Promise.all(
      detailedBorrows
    )) as DetailedBorrowedToken[];

    dispatchDefiAction({
      type: "USER_BORROWS",
      userBorrows: resolvedBorrows,
    });
    return resolvedBorrows;
  };
  const loadSupplyAssetsHandler = async (signerAddress: string) => {
    // let supplyAssets;

    const supportedTokens = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "getAllSupportedTokens",
    })) as string[];

    const supplyAssets = supportedTokens.map(async (tokenAddress: string) => {
      const tokenName = await readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20ABI,
        functionName: "name",
      });

      const tokenImage = addressToImage[tokenAddress];

      const decimals = await readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20ABI,
        functionName: "decimals",
      });

      const oraclePrice = (await readContract({
        address: diamondAddress,
        abi: getterAbi,
        functionName: "getUsdEquivalence",
        args: [tokenAddress, 1 * 10 ** decimals],
      })) as bigint;

      const tokenDetails = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getTokenDetails",
        args: [tokenAddress],
      })) as TokenDetails;

      const walletBalance = await readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [signerAddress as `0x${string}`],
      });

      const walletBalanceInUsd = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getUsdEquivalence",
        args: [tokenAddress, walletBalance],
      })) as bigint;

      const availableToBorrowInUsd = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getMaxAvailableToBorrowInUsd",
        args: [signerAddress],
      })) as bigint;

      const availableToBorrow = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "convertUsdToToken",
        args: [tokenAddress, availableToBorrowInUsd],
      })) as bigint;

      const totalSupplied = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getTokenTotalSupplied",
        args: [tokenAddress],
      })) as bigint;

      const totalSuppliedInUsd = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getUsdEquivalence",
        args: [tokenAddress, totalSupplied],
      })) as bigint;

      const totalBorrowed = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getTokenTotalBorrowed",
        args: [tokenAddress],
      })) as bigint;

      const totalBorrowedInUsd = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getUsdEquivalence",
        args: [tokenAddress, totalBorrowed],
      })) as bigint;

      const availableLiquidity = totalSupplied - totalBorrowed;
      const availableLiquidityInUsd = totalSuppliedInUsd - totalBorrowedInUsd;

      const utilizationRate = (totalBorrowed * BigInt(10000)) / totalSupplied;

      return {
        tokenName,
        tokenAddress,
        tokenImage,
        decimals,
        oraclePrice,
        maxLTV: tokenDetails.loanToValue,
        liquidationThreshold: tokenDetails.liquidationThreshold,
        liquidationPenalty: tokenDetails.liquidationPenalty,
        supplyStableRate: tokenDetails.supplyStableRate,
        borrowStableRate: tokenDetails.borrowStableRate,
        walletBalance,
        walletBalanceInUsd,
        availableToBorrow,
        availableToBorrowInUsd,
        totalSupplied,
        totalSuppliedInUsd,
        totalBorrowed,
        totalBorrowedInUsd,
        availableLiquidity,
        availableLiquidityInUsd,
        utilizationRate,
      };
    });
    const resolvedSupplyAssets = (await Promise.all(
      supplyAssets
    )) as TokenData[];

    dispatchDefiAction({
      type: "SUPPLY_ASSETS",
      supplyAssets: resolvedSupplyAssets,
    });
    return resolvedSupplyAssets;
  };

  const loadBorrowAssetsHandler = async (signerAddress: string) => {
    const supportedTokens = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "getAllSupportedTokens",
    })) as string[];

    const borrowAssets = supportedTokens.map(async (tokenAddress: string) => {
      const tokenName = await readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20ABI,
        functionName: "name",
      });

      const tokenImage = addressToImage[tokenAddress];

      const decimals = await readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20ABI,
        functionName: "decimals",
      });

      const oraclePrice = (await readContract({
        address: diamondAddress,
        abi: getterAbi,
        functionName: "getUsdEquivalence",
        args: [tokenAddress, 1 * 10 ** decimals],
      })) as bigint;

      const tokenDetails = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getTokenDetails",
        args: [tokenAddress],
      })) as TokenDetails;

      const walletBalance = await readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20ABI,
        functionName: "balanceOf",
        args: [signerAddress as `0x${string}`],
      });

      const walletBalanceInUsd = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getUsdEquivalence",
        args: [tokenAddress, walletBalance],
      })) as bigint;

      const availableToBorrowInUsd = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getMaxAvailableToBorrowInUsd",
        args: [signerAddress],
      })) as bigint;

      const availableToBorrow = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "convertUsdToToken",
        args: [tokenAddress, availableToBorrowInUsd],
      })) as bigint;

      const totalSupplied = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getTokenTotalSupplied",
        args: [tokenAddress],
      })) as bigint;

      const totalSuppliedInUsd = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getUsdEquivalence",
        args: [tokenAddress, totalSupplied],
      })) as bigint;

      const totalBorrowed = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getTokenTotalBorrowed",
        args: [tokenAddress],
      })) as bigint;

      const totalBorrowedInUsd = (await readContract({
        address: diamondAddress as `0x${string}`,
        abi: getterAbi,
        functionName: "getUsdEquivalence",
        args: [tokenAddress, totalBorrowed],
      })) as bigint;

      const availableLiquidity = totalSupplied - totalBorrowed;
      const availableLiquidityInUsd = totalSuppliedInUsd - totalBorrowedInUsd;

      const utilizationRate = (totalBorrowed * BigInt(10000)) / totalSupplied;

      return {
        tokenName,
        tokenAddress,
        tokenImage,
        decimals,
        oraclePrice,
        maxLTV: tokenDetails.loanToValue,
        liquidationThreshold: tokenDetails.liquidationThreshold,
        liquidationPenalty: tokenDetails.liquidationPenalty,
        supplyStableRate: tokenDetails.supplyStableRate,
        borrowStableRate: tokenDetails.borrowStableRate,
        walletBalance,
        walletBalanceInUsd,
        availableToBorrow,
        availableToBorrowInUsd,
        totalSupplied,
        totalSuppliedInUsd,
        totalBorrowed,
        totalBorrowedInUsd,
        availableLiquidity,
        availableLiquidityInUsd,
        utilizationRate,
      };
    });

    const resolvedBorrowAssets = await Promise.all(borrowAssets);

    dispatchDefiAction({
      type: "BORROW_ASSETS",
      borrowAssets: resolvedBorrowAssets,
    });
    return resolvedBorrowAssets;
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

  const getTokenData = async (
    signerAddress: string,
    tokenAddress: string
  ): Promise<TokenData> => {
    const tokenName = await readContract({
      address: tokenAddress as `0x${string}`,
      abi: erc20ABI,
      functionName: "name",
    });

    const tokenImage = addressToImage[tokenAddress];

    const decimals = await readContract({
      address: tokenAddress as `0x${string}`,
      abi: erc20ABI,
      functionName: "decimals",
    });

    const oraclePrice = (await readContract({
      address: diamondAddress,
      abi: getterAbi,
      functionName: "getUsdEquivalence",
      args: [tokenAddress, 1 * 10 ** decimals],
    })) as bigint;

    const tokenDetails = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "getTokenDetails",
      args: [tokenAddress],
    })) as TokenDetails;

    const walletBalance = await readContract({
      address: tokenAddress as `0x${string}`,
      abi: erc20ABI,
      functionName: "balanceOf",
      args: [signerAddress as `0x${string}`],
    });

    const walletBalanceInUsd = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "getUsdEquivalence",
      args: [tokenAddress, walletBalance],
    })) as bigint;

    const availableToBorrowInUsd = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "getMaxAvailableToBorrowInUsd",
      args: [signerAddress],
    })) as bigint;

    const availableToBorrow = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "convertUsdToToken",
      args: [tokenAddress, availableToBorrowInUsd],
    })) as bigint;

    const totalSupplied = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "getTokenTotalSupplied",
      args: [tokenAddress],
    })) as bigint;

    const totalSuppliedInUsd = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "getUsdEquivalence",
      args: [tokenAddress, totalSupplied],
    })) as bigint;

    const totalBorrowed = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "getTokenTotalBorrowed",
      args: [tokenAddress],
    })) as bigint;

    const totalBorrowedInUsd = (await readContract({
      address: diamondAddress as `0x${string}`,
      abi: getterAbi,
      functionName: "getUsdEquivalence",
      args: [tokenAddress, totalBorrowed],
    })) as bigint;

    const availableLiquidity = totalSupplied - totalBorrowed;
    const availableLiquidityInUsd = totalSuppliedInUsd - totalBorrowedInUsd;

    const utilizationRate = (totalBorrowed * BigInt(10000)) / totalSupplied;

    return {
      tokenName,
      tokenAddress,
      tokenImage,
      decimals,
      oraclePrice,
      maxLTV: tokenDetails.loanToValue,
      liquidationThreshold: tokenDetails.liquidationThreshold,
      liquidationPenalty: tokenDetails.liquidationPenalty,
      supplyStableRate: tokenDetails.supplyStableRate,
      borrowStableRate: tokenDetails.borrowStableRate,
      walletBalance,
      walletBalanceInUsd,
      availableToBorrow,
      availableToBorrowInUsd,
      totalSupplied,
      totalSuppliedInUsd,
      totalBorrowed,
      totalBorrowedInUsd,
      availableLiquidity,
      availableLiquidityInUsd,
      utilizationRate,
    };
  };

  const defiContext = {
    userSupplies: defiState.userSupplies,
    userBorrows: defiState.userBorrows,
    supplyAssets: defiState.supplyAssets,
    borrowAssets: defiState.borrowAssets,
    healthFactor: defiState.healthFactor,
    userTotalCollateralInUsd: defiState.userTotalCollateralInUsd,
    userTotalBorrowedInUsd: defiState.userTotalBorrowedInUsd,
    borrowPower: defiState.borrowPower,
    maxLTV: defiState.maxLTV,
    currentLTV: defiState.currentLTV,
    liquidationThresholdWeighted: defiState.liquidationThresholdWeighted,
    loadUserSupplies: loadUserSuppliesHandler,
    loadUserBorrows: loadUserBorrowsHandler,
    loadSupplyAssets: loadSupplyAssetsHandler,
    loadBorrowAssets: loadBorrowAssetsHandler,
    loadHealthFactor: loadHealthFactorHandler,
    loadUserTotalCollateralInUsd: loadUserTotalCollateralInUsdHandler,
    loadUserTotalBorrowedInUsd: loadUserTotalBorrowedInUsdHandler,
    loadBorrowPower: loadBorrowPowerHandler,
    loadMaxLTV: loadMaxLTVHandler,
    loadCurrentLTV: loadCurrentLTVHandler,
    loadLiquidationThresholdWeighted: loadLiquidationThresholdWeightedHandler,
    getTokenData,
  };

  return (
    <DefiContext.Provider value={defiContext}>
      {props.children}
    </DefiContext.Provider>
  );
};

export default DefiProvider;
