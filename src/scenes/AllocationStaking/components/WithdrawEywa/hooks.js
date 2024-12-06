import { useQuery } from "@tanstack/react-query";

import useTokenContract from "hooks/useTokenContract/useTokenContract";

export const useFetchavToParticipationInfo = (
  walletAddress,
  hurricaneContract
) => {
  const { tokenContract } = useTokenContract();

  return useQuery({
    queryKey: [
      "available-tokens-withdraw-element",
      tokenContract?.address,
      walletAddress,
      hurricaneContract?.address,
    ],
    queryFn: () => {
      return hurricaneContract.userToParticipation(walletAddress);
    },
    enabled: !!hurricaneContract && !!walletAddress,
    initialData: [
      {
        _hex: "0x00",
        _isBigNumber: true,
      },
      {
        _hex: "0x00",
        _isBigNumber: true,
      },
      {
        _hex: "0x00",
        _isBigNumber: true,
      },
    ],
  });
};