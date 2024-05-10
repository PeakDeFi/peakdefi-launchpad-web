import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { ABI_WITHDRAW_DAILY } from "./consts";

const useWithdrawDailyContract = (sale_withdraw_daliy_contract_address) => {
  const { accounts, chainId } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;

  const provider = useProviderHook();
  const [withdrawDailyContract, setWithdrawDailyContract] = useState(null);

  const updateWithdrawDailyContract = () => {
    const signer = provider?.getSigner();
    setWithdrawDailyContract(
      new ethers.Contract(sale_withdraw_daliy_contract_address, ABI_WITHDRAW_DAILY, signer)
    );
  };

  useEffect(() => {
    if (sale_withdraw_daliy_contract_address && account) {
      updateWithdrawDailyContract();
    }
  }, [sale_withdraw_daliy_contract_address, account, chainId]);

  return { withdrawDailyContract, updateWithdrawDailyContract };
};

export default useWithdrawDailyContract;
