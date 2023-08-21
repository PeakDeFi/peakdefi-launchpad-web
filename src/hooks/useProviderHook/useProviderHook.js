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
import {RpcProvider} from '../../consts/rpc'

export const useProviderHook = () => {
  const { useProvider, useIsActive } = hooks;
  const { useProvider: useWalletConnectProvider } = walletConnectHooks;

  const isActive = useIsActive();

  const provider = useProvider();
  const walletConnectProvider = useWalletConnectProvider();

  const { accounts } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;
  const { ethereum } = window;

  const defaultProvider = new ethers.providers.JsonRpcProvider(RpcProvider);

  console.log(provider,walletConnectProvider )
  if (isActive) {
    if(provider)
      return provider;
  } else {
    if(walletConnectProvider)
    return walletConnectProvider;
  }
  return defaultProvider

  return null;
};
