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
    debugger;
    if (stakingVersion === 1) {
      return await stakingContract.deposit(amount);
    } else {
      return await stakingContract.deposit(amount, referrer);
    }
  };

  const fund = async (amount) => {
    if (stakingVersion === 1) {
      return await stakingContract.fund(amount);
    } else {
      throw Error("Wrong staking contract version is used");
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
    debugger;
    return await stakingContract.withdraw(amount);
  };

  const harvest = async () => {
    return await stakingContract.withdraw(0);
  };

  const claimReferralReward = async () => {
    if (stakingVersion === 1) {
      throw new Error("Referral system is not available for staking V1");
    }

    return await stakingContract.claimReferralRewards();
  };

  const depositReferralRewardToStakingBalance = async () => {
    if (stakingVersion === 1) {
      throw new Error("Referral system is not available for staking V1");
    }

    return await stakingContract.referralRewardsToStake();
  };

  return {
    stakingContract,
    allowance,
    deposit,
    approve,
    withdraw,
    harvest,
    fund,
    claimReferralReward,
    depositReferralRewardToStakingBalance,
  };
};
