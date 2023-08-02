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
import { SuppliedToken } from "../types";
// import { appSettings } from "@/constants/settings";

const defaultDefiState = {
  userSupplies: null,
};

const defiReducer = (
  state: any,
  action: {
    type: string;
    userSupplies?: any;
  }
) => {
  if (action.type === "USER_SUPPLIES") {
    // console.log('action.signerAddress: ', action.signerAddress);

    return {
      ...state,
      userSupplies: action.userSupplies,
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

    console.log("User suppliessss: ", userSupplies);
    dispatchDefiAction({
      type: "USER_SUPPLIES",
      userSupplies: userSupplies,
    });
    return userSupplies;
  };

  const defiContext = {
    userSupplies: defiState.userSupplies,
    loadUserSupplies: loadUserSuppliesHandler,
  };

  return (
    <DefiContext.Provider value={defiContext}>
      {props.children}
    </DefiContext.Provider>
  );
};

export default DefiProvider;
