import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { RpcProvider } from "../../../consts/rpc";

export const [metaMask, hooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);
export const [walletConnect, walletConnectHooks] = initializeConnector(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        projectId: "2e23d1f33aa1cdaabcfbff7168090b36",
        chains: process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",").map((e) =>
          parseInt(e)
        ),
        showQrModal: true,
      },
    })
);
