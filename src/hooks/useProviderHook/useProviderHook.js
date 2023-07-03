import { useWeb3React } from "@web3-react/core";
import { ethers, BigNumber, providers } from "ethers";
import { useEffect, useState } from "react";
import { SALE_ABI } from "../../consts/abi";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import { hooks, metaMask } from 'scenes/Header/ProviderDialog/Metamask'

export const useProviderHook = () => {
  const { useChainId, useAccounts, useIsActivating, useIsActive, useENSNames,  } = hooks
  const { useProvider } = hooks

  const provider = useProvider()
  const accounts = useAccounts();
  const account = accounts?.length > 0 ? accounts[0] : null
  const { ethereum } = window;
  
  if (ethereum) {
    return provider
  } else if (!!account) {
    return rpcWalletConnectProvider
  }

  return null;
};
