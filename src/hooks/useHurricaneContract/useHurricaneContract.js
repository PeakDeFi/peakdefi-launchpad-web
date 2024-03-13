import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ABI_HURRICANE } from "../useHurricaneContract/consts";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

const useHurricaneContract = (sale_hurricane_contract_address) => {
  const { accounts, chainId } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;

  const provider = useProviderHook();
  const [hurricaneContract, setHurricaneContract] = useState(null);

  const updateHurricaneContract = () => {
    const signer = provider?.getSigner();
    setHurricaneContract(
      new ethers.Contract(sale_hurricane_contract_address, ABI_HURRICANE, signer)
    );
  };

  useEffect(() => {
    if (sale_hurricane_contract_address && account) {
      updateHurricaneContract();
    }
  }, [sale_hurricane_contract_address, account, chainId]);

  return { hurricaneContract, updateHurricaneContract };
};

export default useHurricaneContract;
