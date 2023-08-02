import { BigNumberish, ethers } from "ethers";
import React from "react";
import { SuppliedToken } from "../types";

interface IDefiContext {
  userSupplies: SuppliedToken[];
  loadUserSupplies: (signerAddress: string) => Promise<SuppliedToken[]>;
}

const DefiContext = React.createContext<IDefiContext>({
    userSupplies: [],
    loadUserSupplies: (signerAddress) => Promise.resolve([]) 
});

export default DefiContext;
