import { useWeb3React } from "@web3-react/core";
import { ethers, BigNumber, providers } from "ethers";
import { useEffect, useState } from "react";
import { SALE_ABI } from "../../consts/abi";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import {
  hooks,
  metaMask,
  walletConnect,
  walletConnectHooks,
} from "scenes/Header/ProviderDialog/Metamask";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

export const useProviderHook = () => {
  const { useProvider, useIsActive } = hooks;
  const { useProvider: useWalletConnectProvider } = walletConnectHooks;

  const isActive = useIsActive();

  const provider = useProvider();
  const walletConnectProvider = useWalletConnectProvider();

  const { accounts } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;
  const { ethereum } = window;

  if (isActive) {
    return provider;
  } else {
    return walletConnectProvider;
  }

  return null;
};