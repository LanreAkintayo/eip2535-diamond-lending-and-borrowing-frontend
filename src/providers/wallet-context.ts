import {BigNumberish, ethers } from "ethers";
import React from "react";

interface IWalletContext {
  signerAddress: string;
  chainId: number;
  loadSignerAddress: () => Promise<any> | null;
  loadChainId: () => Promise<any> | null;
  switchToAppNetwork: (chainIdHex: string) => void;
}

const WalletContext = React.createContext<IWalletContext>({
  signerAddress: "",
  chainId: 0,
  loadSignerAddress: () => null,
  loadChainId: () => null,
  switchToAppNetwork: (chainIdHex: string) => {},
});

export default WalletContext;
