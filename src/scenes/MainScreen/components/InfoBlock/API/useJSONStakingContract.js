import useJSONContract from "../../../../../hooks/useJSONContract/useJSONContract";
import {
  stakingContractAddress,
  stakingContractAddressV2,
  abiV2,
  abi,
} from "../../../../../scenes/AllocationStaking/services/consts"

export const useJSONStakingContract = ({ stakingVersion }) => {
  const { contract, updateContract } = useJSONContract(
    stakingVersion === 1 ? stakingContractAddress : stakingContractAddressV2,
    stakingVersion === 1 ? abi : abiV2
  );

  return { updateContract, contract };
};
