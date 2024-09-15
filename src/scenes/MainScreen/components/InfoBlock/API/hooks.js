import { useQueries } from "@tanstack/react-query";
import { useJSONStakingContract } from "./useJSONStakingContract.js";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import useStakingContract from "./useStakingContract";

export const useFetchMyStakingStats = ({ stakingVersion }) => {
  const { stakingContract } = useStakingContract({ stakingVersion });
  const { contract } = useJSONStakingContract({ stakingVersion });
  const { accounts } = useMergedProvidersState();
  const walletAddress = accounts[0];
  return useQueries({
    queries: [
      {
        queryKey: [
          "web3-userInfo",
          stakingContract?.address,
          walletAddress,
          stakingVersion,
        ],
        queryFn: () => {
          return stakingContract?.userInfo(walletAddress);
        },
        enabled: !!stakingContract && !!walletAddress,
      },
      {
        queryKey: ["web3-stakingPercent", contract?.address, stakingVersion],
        queryFn: () => {
          if (stakingVersion === 2) {
            return contract.getStakingPercent();
          }
          return contract.stakingPercent();
        },
        enabled: !!contract,
      },
      {
        queryKey: ["web3-pending", stakingContract?.address],
        queryFn: () => {
          return stakingContract.pending();
        },
        enabled: !!stakingContract,
        refetchInterval: 30000,
      },
    ],
  });
};
