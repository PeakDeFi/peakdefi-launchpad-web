import { ethers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";

import {
  abi,
  abiV2,
  stakingContractAddress,
  stakingContractAddressV2,
} from "../../../../../scenes/AllocationStaking/services/consts";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

const useStakingContract = ({ stakingVersion }) => {
  const { accounts } = useMergedProvidersState();

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
