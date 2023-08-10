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

  console.log("We are now here");

  const loadSignerHandler = async () => {
    const account = getAccount();
    const signerAddress = account.address;
    dispatchWalletAction({
      type: "SIGNER_ADDRESS",
      signerAddress: signerAddress,
    });
    return signerAddress;
  };

  const loadChainIdHandler = async () => {
    const { chain, chains } = getNetwork();

    const chainId = chain && chain.id;

    // console.log('Chain Id:::::::::::: ', chainId);

    dispatchWalletAction({ type: "CHAIN_ID", chainId: chainId });
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

      dispatchWalletAction({ type: "CHAIN_ID", chainId: chainIdValue });

      // window.location.reload();
    } catch (error) {
      console.log("An error occured while trying to switch network");
    }
  };

  const addToken = async (token: any) => {

    const tokenAddress = token.tokenAddress;
    const tokenSymbol = token.tokenName;
    const tokenDecimals = token.tokenDecimals;
    const tokenImage = token.tokenImage;

    let hasAdded = false;

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        hasAdded = true;
      } else {
        hasAdded = false;
      }
    } catch (error) {
      console.log(error);
      hasAdded = false;
    }

    return hasAdded
  };

  const walletContext = {
    signerAddress: walletState.signerAddress,
    chainId: walletState.chainId,
    loadSignerAddress: loadSignerHandler,
    loadChainId: loadChainIdHandler,
    switchToAppNetwork,
    addToken
  };

  return (
    <WalletContext.Provider value={walletContext}>
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
