import { useWeb3React } from "@web3-react/core";
import { ethers, providers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import {
  tokenContractAddress,
  abi as tokenAbi,
} from "../../scenes/AllocationStaking/components/StakeCard/services/consts";
import { hooks, metaMask } from '../../scenes/Header/ProviderDialog/Metamask'
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";

const useTokenContract = () => {
  const { useChainId, useAccounts, useIsActivating, useIsActive, useENSNames } = hooks
  const accounts = useAccounts();
  const account = accounts?.length > 0 ? accounts[0] : null
  const [tokenContract, setTokenContract] = useState(null);
  const { ethereum } = window;
  const provider = useProviderHook()

  useEffect(() => {
    const signer = provider?.getSigner();
    setTokenContract(
      new ethers.Contract(tokenContractAddress, tokenAbi, signer)
    );
  }, [ethereum, account]);

  return {
    tokenContract,
  };
};

export default useTokenContract;
