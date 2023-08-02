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
import { polygonMumbai } from "wagmi/chains";
import { ToastContainer } from 'react-toastify';

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.REACT_APP_PROJECT_ID) {
  throw new Error("You need to provide REACT_APP_PROJECT_ID env variable");
}

const projectId = process.env.REACT_APP_PROJECT_ID;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

 // 2. Configure wagmi client
  const chains = [polygonMumbai];

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ chains, projectId }),
    publicClient,
  });

  // 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains);
  

root.render(
  <React.StrictMode>
    <WalletProvider>
      <WagmiConfig config={wagmiConfig}>
        <App />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <ToastContainer />
    </WalletProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
