import {
  hooks,
  metaMask,
  walletConnectHooks,
} from "../../scenes/Header/ProviderDialog/Metamask.js";

export const useMergedProvidersState = () => {
  const accounts = hooks.useAccounts();

  const walletConnectAccounts = walletConnectHooks.useAccounts();

  const chainId = hooks.useChainId();
  const walletConnectChainId = walletConnectHooks.useChainId();

  const provider = hooks.useProvider();

  const walletConnectProvider = walletConnectHooks.useProvider();

  return {
    accounts: accounts ?? walletConnectAccounts ?? [],
    chainId: chainId ?? walletConnectChainId,
    provider: provider ?? walletConnectProvider,
  };
};
