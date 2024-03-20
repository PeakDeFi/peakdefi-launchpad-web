import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ABI_WITHDRAW_V2 } from "./consts";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

const useWithdrawV2Contract = (sale_withdraw_contract_address) => {
  const { accounts, chainId } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;

  const provider = useProviderHook();
  const [withdrawContract, setWithdrawContract] = useState(null);

  const updateWithdrawContract = () => {
    const signer = provider?.getSigner();
    setWithdrawContract(
      new ethers.Contract(sale_withdraw_contract_address, ABI_WITHDRAW_V2, signer)
    );
  };

  useEffect(() => {
    if (sale_withdraw_contract_address && account) {
      updateWithdrawContract();
    }
  }, [sale_withdraw_contract_address, account, chainId]);

  return { withdrawContract, updateWithdrawContract };
};

export default useWithdrawV2Contract;
