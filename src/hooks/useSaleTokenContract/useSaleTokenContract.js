import { useWeb3React } from "@web3-react/core";
import { ethers, providers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import {
  tokenContractAddress,
  abi as tokenAbi,
} from "../../scenes/AllocationStaking/components/StakeCard/services/consts";

const useSaleTokenContract = (sale_token_contract_address) => {
  const { account, chainId } = useWeb3React();
  const [tokenContract, setTokenContract] = useState(null);
  const { ethereum } = window;

  useEffect(() => {
    if (!sale_token_contract_address) {
      return;
    }

    if (ethereum && account) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      setTokenContract(
        new ethers.Contract(sale_token_contract_address, tokenAbi, signer)
      );
    } else if (account) {
      const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
      const signer = web3Provider.getSigner();

      setTokenContract(
        new ethers.Contract(sale_token_contract_address, tokenAbi, signer)
      );
    }
  }, [ethereum, account, sale_token_contract_address, chainId]);

  return {
    tokenContract,
  };
};

export default useSaleTokenContract;
