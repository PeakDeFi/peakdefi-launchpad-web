import { InjectedConnector } from "@web3-react/injected-connector";

// Other possible connectors
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { RpcProvider } from "./consts/rpc";
// import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// import { LedgerConnector } from '@web3-react/ledger-connector';
// import { BscConnector } from '@binance-chain/bsc-connector';
import { WalletConnect } from "@web3-react/walletconnect-v2";

export const injected = new InjectedConnector({
  supportedChainIds: process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",").map(
    (e) => parseInt(e)
  ),
});

export const walletconnect = new WalletConnect({
  defaultChainId: parseInt(
    process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[0]
  ),
  options: {
    projectId: "2e23d1f33aa1cdaabcfbff7168090b36",
    chains: process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",").map((e) =>
      parseInt(e)
    ),
    optionalChains: process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",").map(
      (e) => parseInt(e)
    ),
    showQrModal: true,
  },
});

// refer to https://github.com/NoahZinsmeister/web3-react
// for all available connectors
