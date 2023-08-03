import { useWeb3Modal } from '@web3modal/react';
import { useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { getNetwork } from '@wagmi/core'


export default function ConnectButton() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
//   const { chainId } = useWeb3();
  const { chain, chains } = getNetwork()

  async function onOpen() {
    setLoading(true);
    try {
      await open();
    } catch (err) {
      console.log('Error: ', err);
    }
    setLoading(false);
  }

  function onClick() {
    try {
      if (isConnected) {
        disconnect();
      } else {
        onOpen();
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  return (
    <div className="flex items-center justify-center ">
      <button
        onClick={onClick}
        disabled={loading}
        className="rounded-full bg-indigo-900 text-white w-40 p-2 mr-3"
      >
        {loading ? "Loading..." : "Connect Wallet"}
      </button>
    </div>
  );
}
