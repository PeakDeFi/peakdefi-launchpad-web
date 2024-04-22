import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { ABI_WITHDRAW_SKO } from "./consts";

const useWithdrawSKOContract = (sale_withdraw_SKO_contract_address) => {
  const { accounts, chainId } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;

  const provider = useProviderHook();
  const [withdrawSKOContract, setWithdrawSKOContract] = useState(null);

  const updateWithdrawSKOContract = () => {
    const signer = provider?.getSigner();
    setWithdrawSKOContract(
      new ethers.Contract(sale_withdraw_SKO_contract_address, ABI_WITHDRAW_SKO, signer)
    );
  };

  useEffect(() => {
    if (sale_withdraw_SKO_contract_address && account) {
      updateWithdrawSKOContract();
    }
  }, [sale_withdraw_SKO_contract_address, account, chainId]);

  return { withdrawSKOContract, updateWithdrawSKOContract };
};

export default useWithdrawSKOContract;
