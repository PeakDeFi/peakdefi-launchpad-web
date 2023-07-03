import { useWeb3React } from "@web3-react/core";
import { ethers, providers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";

import { abi, stakingContractAddress } from "../../scenes/AllocationStaking/services/consts";
import { hooks, metaMask } from '../../scenes/Header/ProviderDialog/Metamask'
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";

const useStakingContract = () => {
  const { useChainId, useAccounts, useIsActivating, useIsActive, useENSNames } = hooks
  const accounts = useAccounts();
  const account = accounts?.length > 0 ? accounts[0] : null
  const [stakingContract, setStakingContract] = useState(null);
  const { ethereum } = window;
  const provider = useProviderHook()

  useEffect(() => {
    const signer = provider?.getSigner();
    setStakingContract(
      new ethers.Contract(stakingContractAddress, abi, signer)
    );
  }, [ethereum, account]);

  return {
    stakingContract,
  };
};

export default useStakingContract;
