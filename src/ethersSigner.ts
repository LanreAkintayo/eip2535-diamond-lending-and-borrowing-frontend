import { useWalletClient } from "wagmi";
import {
  type WalletClient,
  type PublicClient,
  getWalletClient,
  getPublicClient,
} from "@wagmi/core";
import { BrowserProvider, JsonRpcSigner } from "ethers";

export function walletClientToSigner(
  walletClient: WalletClient,
  publicClient: PublicClient
) {
  const { account } = walletClient;
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient({ chainId });
  const publicClient = getPublicClient({ chainId });

  console.log("Wallet client:", walletClient);
  if (!walletClient) return undefined;
  return walletClientToSigner(walletClient, publicClient);
}
