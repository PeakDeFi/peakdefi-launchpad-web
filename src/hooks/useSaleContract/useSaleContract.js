import { useWeb3React } from "@web3-react/core";
import { ethers, BigNumber, providers } from "ethers";
import { useEffect, useState } from "react";
import { SALE_ABI } from "../../consts/abi";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import { hooks, metaMask } from "../../scenes/Header/ProviderDialog/Metamask";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

const useSaleContract = (contract_address) => {
  const { accounts } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;
  const { ethereum } = window;
  const provider = useProviderHook();
  const [saleContract, setSaleContract] = useState(null);

  const updateSaleContract = () => {
    const signer = provider?.getSigner();
    setSaleContract(new ethers.Contract(contract_address, SALE_ABI, signer));
  };

  useEffect(() => {
    if (!contract_address || contract_address === "0x") return;

    updateSaleContract();
  }, [ethereum, account, contract_address]);

  return { saleContract, updateSaleContract };
};

export default useSaleContract;
