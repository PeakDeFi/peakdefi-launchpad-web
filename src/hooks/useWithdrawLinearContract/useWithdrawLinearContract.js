import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ABI_WITHDRAW_LINEAR, ABI_WITHDRAW_LINEAR_NEW } from "./consts";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

const useWithdrawLinearContract = (
  sale_withdraw_contract_address,
  tokenName
) => {
  const { accounts, chainId } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;

  const provider = useProviderHook();
  const [withdrawContract, setWithdrawContract] = useState(null);

  const getAbi = () => {
    let abi;
    switch (tokenName) {
      case "octavia":
        abi = ABI_WITHDRAW_LINEAR;
        break;
      case "bit rivals":
        abi = ABI_WITHDRAW_LINEAR_NEW;
        break;

      default:
        abi = ABI_WITHDRAW_LINEAR;
    }
    return abi;
  };
  const updateWithdrawContract = () => {
    const abi = getAbi();
    const signer = provider?.getSigner();
    setWithdrawContract(
      new ethers.Contract(sale_withdraw_contract_address, abi, signer)
    );
  };

  useEffect(() => {
    if (sale_withdraw_contract_address && account) {
      updateWithdrawContract();
    }
  }, [sale_withdraw_contract_address, account, chainId, tokenName]);

  return { withdrawContract, updateWithdrawContract };
};

export default useWithdrawLinearContract;
