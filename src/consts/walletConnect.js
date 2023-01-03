import { RpcProvider } from "./rpc";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

export const rpcWalletConnectProvider = new WalletConnectProvider({
    rpc: {
        97: RpcProvider
    },
});