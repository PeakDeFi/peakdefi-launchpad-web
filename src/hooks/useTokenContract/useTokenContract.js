import { useWeb3React } from "@web3-react/core";
import { ethers, providers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import {
  tokenContractAddress,
  abi as tokenAbi,
} from "../../scenes/AllocationStaking/components/StakeCard/services/consts";
import { hooks, metaMask } from "../../scenes/Header/ProviderDialog/Metamask";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

const useTokenContract = () => {
  const { accounts, provider } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;
  const [tokenContract, setTokenContract] = useState(null);
  const { ethereum } = window;

  useEffect(() => {
    if (account && provider) {
      const signer = provider?.getSigner();

      setTokenContract(
        new ethers.Contract(tokenContractAddress, tokenAbi, signer)
      );
    }
  }, [ethereum, account, provider]);

  return {
    tokenContract,
  };
};

export default useTokenContract;
