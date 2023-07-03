import { useWeb3React } from "@web3-react/core";
import { ethers, providers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import {
  tokenContractAddress,
  abi as tokenAbi,
} from "../../scenes/AllocationStaking/components/StakeCard/services/consts";
import { hooks, metaMask } from '../../scenes/Header/ProviderDialog/Metamask'
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";

const useSaleTokenContract = (sale_token_contract_address) => {
  const { useChainId, useAccounts, useIsActivating, useIsActive, useENSNames } = hooks
  const accounts = useAccounts();
  const account = accounts?.length > 0 ? accounts[0] : null
  const chainId = useChainId()
  const [tokenContract, setTokenContract] = useState(null);
  const { ethereum } = window;
  const provider = useProviderHook()

  useEffect(() => {
    if (!sale_token_contract_address) {
      return;
    }

    const signer = provider?.getSigner();
    setTokenContract(
      new ethers.Contract(sale_token_contract_address, tokenAbi, signer)
    );
  }, [ethereum, account, sale_token_contract_address, chainId]);

  return {
    tokenContract,
  };
};

export default useSaleTokenContract;
