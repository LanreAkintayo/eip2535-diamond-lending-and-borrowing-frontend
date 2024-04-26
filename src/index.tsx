import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WalletProvider from './providers/WalletProvider';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { ToastContainer } from 'react-toastify';
import DefiProvider from './providers/DefiProvider';
import { webSocket, createPublicClient, http } from "viem";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { publicProvider } from "wagmi/providers/public";


// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_PROJECT_ID) {
  throw new Error("You need to provide REACT_APP_PROJECT_ID env variable");
}

const projectId = process.env.REACT_APP_PROJECT_ID;
const rpcUrl = process.env.REACT_APP_RPC_URL;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//  // 2. Configure wagmi client
//   const chains = [sepolia];

//   const { publicClient } = configureChains(chains, [
//     w3mProvider({ projectId }),
//   ]);
//   const wagmiConfig = createConfig({
//     autoConnect: true,
//     connectors: w3mConnectors({ chains, projectId }),
//     publicClient,
//   });

//   // 3. Configure modal ethereum client
// const ethereumClient = new EthereumClient(wagmiConfig, chains);
  
//////////
const { chains } = configureChains([sepolia], [publicProvider()]);

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(rpcUrl),
});

const { connectors } = getDefaultWallets({
  appName: "Defi Lending and Borrowing",
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

///////////

root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains}>
        <WalletProvider>
          <DefiProvider>
            <App />

            <ToastContainer />
          </DefiProvider>
        </WalletProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
