import useJSONContract from "hooks/useJSONContract/useJSONContract";
import { useSelectStakingVersion } from "hooks/useSelectStakingVersion/useSelectStakingVersion";
import {
  stakingContractAddress,
  stakingContractAddressV2,
  abiV2,
  abi,
} from "scenes/AllocationStaking/services/consts";

export const useJSONStakingContract = () => {
  const { stakingVersion } = useSelectStakingVersion();

  const { contract, updateContract } = useJSONContract(
    stakingVersion === 1 ? stakingContractAddress : stakingContractAddressV2,
    stakingVersion === 1 ? abi : abiV2
  );

  return { updateContract, contract };
};
