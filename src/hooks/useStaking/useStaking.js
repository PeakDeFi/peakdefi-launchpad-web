import { ethers } from "ethers";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { useReferrer } from "hooks/useReferrer/useReferrer";
import { useSelectStakingVersion } from "hooks/useSelectStakingVersion/useSelectStakingVersion";
import useStakingContract from "hooks/useStakingContract/useStakingContract";
import useTokenContract from "hooks/useTokenContract/useTokenContract";
import { useEffect } from "react";
import { useState } from "react";

export const useStaking = () => {
  const { stakingContract } = useStakingContract();
  const { tokenContract } = useTokenContract();

  const { stakingVersion } = useSelectStakingVersion();
  const { referrer } = useReferrer();

  const { accounts } = useMergedProvidersState();

  const account = accounts?.length > 0 ? accounts[0] : null;

  const [allowance, setAllowance] = useState(0);

  useEffect(() => {
    if (stakingContract?.address && tokenContract && account) {
      tokenContract
        .allowance(account, stakingContract?.address)
        .then((response) => {
          setAllowance(parseInt(response.toString()));
        });
    }
  }, [stakingContract, tokenContract, account]);

  const deposit = async (amount) => {
    if (stakingVersion === 1) {
      return await stakingContract.deposit(amount);
    } else {
      return await stakingContract.deposit(amount, referrer);
    }
  };

  const approve = async () => {
    const approvalTransaction = await tokenContract.approve(
      stakingContract.address,
      ethers.constants.MaxUint256
    );

    approvalTransaction.wait().then((transaction) => {
      setAllowance(ethers.constants.MaxUint256);
    });

    return approvalTransaction;
  };

  const withdraw = async (amount) => {
    return await stakingContract.withdraw(amount);
  };

  const harvest = async () => {
    return await stakingContract.withdraw(0);
  };

  return { stakingContract, allowance, deposit, approve, withdraw, harvest };
};
