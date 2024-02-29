import { useWeb3React } from "@web3-react/core";
import { ethers, providers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";

import {
  abi,
  abiV2,
  stakingContractAddress,
  stakingContractAddressV2,
} from "../../scenes/AllocationStaking/services/consts";
import { hooks, metaMask } from "../../scenes/Header/ProviderDialog/Metamask";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { useSelectStakingVersion } from "hooks/useSelectStakingVersion/useSelectStakingVersion";

const useStakingContract = () => {
  const { accounts } = useMergedProvidersState();
  const { stakingVersion } = useSelectStakingVersion();

  const account = accounts?.length > 0 ? accounts[0] : null;
  const [stakingContract, setStakingContract] = useState(null);
  const { ethereum } = window;
  const provider = useProviderHook();

  useEffect(() => {
    const signer = provider?.getSigner(account);

    setStakingContract(
      new ethers.Contract(
        stakingVersion === 1
          ? stakingContractAddress
          : stakingContractAddressV2,
        stakingVersion === 1 ? abi : abiV2,
        signer
      )
    );

    return () => {
      stakingContract?.removeAllListeners();
    };
  }, [ethereum, account, stakingVersion, provider]);

  return {
    stakingContract,
  };
};

export default useStakingContract;
