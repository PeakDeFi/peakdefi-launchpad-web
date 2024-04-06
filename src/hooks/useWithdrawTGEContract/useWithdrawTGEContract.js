import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { ABI_WITHDRAW_TGE } from "./consts";

const useWithdrawTGEContract = (sale_withdraw_tge_contract_address) => {
  const { accounts, chainId } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;

  const provider = useProviderHook();
  const [withdrawTGEContract, setWithdrawTGEContract] = useState(null);

  const updateWithdrawTGEContract = () => {
    const signer = provider?.getSigner();
    setWithdrawTGEContract(
      new ethers.Contract(sale_withdraw_tge_contract_address, ABI_WITHDRAW_TGE, signer)
    );
  };

  useEffect(() => {
    if (sale_withdraw_tge_contract_address && account) {
      updateWithdrawTGEContract();
    }
  }, [sale_withdraw_tge_contract_address, account, chainId]);

  return { withdrawTGEContract, updateWithdrawTGEContract };
};

export default useWithdrawTGEContract;
