import { useState } from "react";

import { useAccount, useDisconnect } from "wagmi";
import { getAccount, getNetwork, switchNetwork } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/react";
import ConnectButton from "./ConnectButton";
import { supportedChainId } from "../constants";
import useWallet from "../hooks/useWallet";
import { displayToast } from "./Toast";

export default function WalletConnect() {
  const { open } = useWeb3Modal();
  const { isConnected, status } = useAccount();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(false);
  const label = isConnected ? "Disconnect" : "Connect Wallet";
  const { chainId } = useWallet();

  // console.log('Is it connected: ', isConnected);

  //   const { account?.address, chainId, switchToAppNetwork, loadBalance } = useWeb3();
  const account = getAccount();
  const { chain, chains } = getNetwork();

  console.log("Chain: ",chain)


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
        chainId == 80001 ? (
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
            {isConnected ? (
              <div className="mr-5 px-3 bg-red-800 hover:bg-red-700  rounded-md hover:bg-amber-800 hover:text-white ">
                <div
                  className="flex cursor-pointer items-center gap-3 rounded-md py-1.5 px-2 text-[12px] sm:text-sm font-medium text-white transition"
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
            <button
              className="rounded-full bg-red-800 hover:bg-red-700 text-white w-40 p-2 mr-3"
              onClick={async () => {
                try {
                  await switchNetwork({
                    chainId: supportedChainId,
                  });
                } catch (error) {
                  displayToast(
                    "failure",
                    "Error encountered. If the error persists, you can try connecting to Mumbai manually."
                  );
                }
              }}
            >
              Switch to Mumbai
            </button>
          </div>
        )
      ) : (
        <div>
          <ConnectButton />
        </div>
      )}
    </>
  );
}
