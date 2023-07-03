import { useWeb3React } from "@web3-react/core";
import { ethers, BigNumber, providers } from "ethers";
import { useEffect, useState } from "react";
import { SALE_ABI } from "../../consts/abi";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import {
  distribution_contract_address,
  abi,
} from "../useDepositSaleTokens/consts";
import { hooks, metaMask } from '../../scenes/Header/ProviderDialog/Metamask'
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";


const useDistributionContract = (sale_distribution_contract_address) => {
  const { useChainId, useAccounts, useIsActivating, useIsActive, useENSNames } = hooks
  const accounts = useAccounts();
  const account = accounts?.length > 0 ? accounts[0] : null
  const chainId = useChainId()
  const { ethereum } = window;
  const provider = useProviderHook();
  const [distributionContract, setDistributionContract] = useState(null);

  const updateDistributionContract = () => {
    const signer = provider?.getSigner();
    setDistributionContract(
      new ethers.Contract(sale_distribution_contract_address, abi, signer)
    );
  };

  useEffect(() => {
    if (sale_distribution_contract_address && account) {
      updateDistributionContract();
    }
  }, [sale_distribution_contract_address, account, chainId]);

  return { distributionContract, updateDistributionContract };
};

export default useDistributionContract;
