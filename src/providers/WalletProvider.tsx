import React, { useReducer } from "react";
import { BigNumberish, ethers } from "ethers";

import WalletContext from "./wallet-context";
// import {
//   getWalletModal,
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
// import { appSettings } from "@/constants/settings";


const defaultWalletState = {
  signerAddress: null,
  chainId: null,
};

const walletReducer = (
  state: any,
  action: {
    type: string;
    signerAddress?: any;
    chainId?: any;
  }
) => {
  if (action.type === "SIGNER_ADDRESS") {
    // console.log('action.signerAddress: ', action.signerAddress);

    return {
      ...state,
      signerAddress: action.signerAddress,
    };
  }

  if (action.type === "CHAIN_ID") {
    // console.log('action.chainId: ', action.chainId);
    return {
      ...state,
      chainId: action.chainId,
    };
  }

  return defaultWalletState;
};

const WalletProvider = (props: any) => {
  const [walletState, dispatchWalletAction] = useReducer(
    walletReducer,
    defaultWalletState
    ); 

    console.log("We are now here")

  const loadSignerHandler = async () => {
    const account = getAccount();
    const signerAddress = account.address;
    dispatchWalletAction({ type: "SIGNER_ADDRESS", signerAddress: signerAddress });
    return signerAddress;
  };

  const loadChainIdHandler = async () => {
    const { chain, chains } = getNetwork();

    const chainId = chain && chain.id;

    // console.log('Chain Id:::::::::::: ', chainId);

    dispatchWalletAction({ type: "CHAINID", chainId: chainId });
    return chainId;
  };

  const switchToAppNetwork = async (chainIdHex: string) => {
    // console.log('Inside switchToAppNetwork: ', chainIdHex);

    try {
      const network = await switchNetwork({
        chainId: appSettings.chainId,
      });

      // console.log('Request succesfful ', chainIdHex);

      const chainIdValue = BigInt(chainIdHex);

      dispatchWalletAction({ type: "CHAINID", chainId: chainIdValue });

      // window.location.reload();
    } catch (error) {
      console.log("An error occured while trying to switch network");
    }
  };


  const walletContext = {
    signerAddress: walletState.signerAddress,
    chainId: walletState.chainId,   
    loadSignerAddress: loadSignerHandler,
    loadChainId: loadChainIdHandler,
    switchToAppNetwork,
  };

  return (
    <WalletContext.Provider value={walletContext}>
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
