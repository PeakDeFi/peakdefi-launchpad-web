import { useQueries, useQuery } from "@tanstack/react-query";
import { setDecimal } from "features/userWalletSlice";
import { useJSONStakingContract } from "hooks/useJSONStakingContract/useJSONStakingContract";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { useSelectStakingVersion } from "hooks/useSelectStakingVersion/useSelectStakingVersion";
import useStakingContract from "hooks/useStakingContract/useStakingContract";
import useTokenContract from "hooks/useTokenContract/useTokenContract";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useFetchMyStakingStats = () => {
  const { stakingContract } = useStakingContract();
  const { contract } = useJSONStakingContract();
  const { accounts } = useMergedProvidersState();
  const walletAddress = accounts[0];
  const { stakingVersion } = useSelectStakingVersion();

  return useQueries({
    queries: [
      {
        queryKey: [
          "web3-userInfo",
          stakingContract?.address,
          walletAddress,
          stakingVersion,
          accounts,
          contract,
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

export const useFetchTotalStakingStats = () => {
  const { contract } = useJSONStakingContract();

  return useQueries({
    queries: [
      {
        queryKey: ["web3-json-totalDeposits", contract?.address],
        queryFn: () => {
          return contract.totalDeposits();
        },
        enabled: !!contract,
      },
      {
        queryKey: ["web3-json-paidOut", contract?.address],
        queryFn: () => {
          return contract.paidOut();
        },
        enabled: !!contract,
      },
    ],
  });
};

export const useFetchDecimals = () => {
  const { tokenContract } = useTokenContract();
  const { chainId } = useMergedProvidersState();

  return useQuery({
    queryKey: ["web3-json-decimals", tokenContract?.address, chainId],
    queryFn: () => {
      return tokenContract?.decimals();
    },

    initialData: 5,
  });
};

export const useFetchWalletBalance = (walletAddress) => {
  const { tokenContract } = useTokenContract();

  return useQuery({
    queryKey: ["web3-json-ballanceOf", tokenContract?.address, walletAddress],
    queryFn: () => {
      console.log("REFETCH BALANCE");
      return tokenContract?.balanceOf(walletAddress);
    },
    enabled: !!tokenContract,
    initialData: 0,
  });
};
