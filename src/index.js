import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./app/store";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import {
  metaMask,
  hooks,
  walletConnect,
  walletConnectHooks,
} from "./scenes/Header/ProviderDialog/Metamask";
import { walletconnect } from "connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const POLLING_INTERVAL = 12000;

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

const connectors = [
  [metaMask, hooks],
  [walletConnect, walletConnectHooks],
];

const queryClient = new QueryClient();

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Web3ReactProvider getLibrary={getLibrary} connectors={connectors}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Web3ReactProvider>
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
