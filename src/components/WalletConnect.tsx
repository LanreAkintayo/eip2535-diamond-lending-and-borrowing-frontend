import { useState } from "react";

import { useAccount, useDisconnect } from "wagmi";
import { getAccount, getNetwork } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/react";
import ConnectButton from "./ConnectButton";
import { supportedChainId } from "../constants";

export default function WalletConnect() {
  const { open } = useWeb3Modal();
  const { isConnected, status } = useAccount();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(false);
  const label = isConnected ? "Disconnect" : "Connect Wallet";

  // console.log('Is it connected: ', isConnected);

  //   const { account?.address, chainId, switchToAppNetwork, loadBalance } = useWeb3();
  const account = getAccount();
  const { chain, chains } = getNetwork()

  // console.log("Chain: ", chain)

  // console.log("Is connected: ", isConnected);
  // console.log("Account: ", account?.address);

  // console.log('Provider: ', provider);
  // console.log('Chain ID: ', chainId);
  // console.log('Signer address: ', account?.address);

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  return (
    <>
      <div>{status == "connected"}</div>
      {status == "connected" && account.address ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          {isConnected ? (
            <div className="mr-5 px-3 bg-amber-600 py-2 rounded-md hover:bg-amber-800 hover:text-white ">
              <div
                className="flex cursor-pointer items-center gap-3 rounded-md py-1.5 px-2 text-sm font-medium text-white transition"
                onClick={() => {
                  disconnect();
                }}
              >
                <span className="grow uppercase">
                  {account?.address.slice(0, 6)}
                  {"...."}
                  {account?.address.slice(account?.address.length - 4)}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={onClick}
                disabled={loading}
                className="rounded-md border text-amber-100  p-1 px-2 hover:text-amber-800"
              >
                {loading ? "Loading..." : label}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <ConnectButton />
        </div>
      )}

      {/* {isConnected && chainId && chainId != appSettings.chainId && (
        <Button
          onClick={async () => {
            await switchToAppNetwork(toHex(appSettings.chainId));
            await loadBalance(account?.address as `0x${string}`);
          }}
          className="bg-red-600"
        >
          Switch To BNB
        </Button>
      )} */}
    </>
  );
}
