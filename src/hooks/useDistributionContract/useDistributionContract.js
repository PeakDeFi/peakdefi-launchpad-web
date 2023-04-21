import { useWeb3React } from "@web3-react/core";
import { ethers, BigNumber, providers } from "ethers";
import { useEffect, useState } from "react";
import { SALE_ABI } from "../../consts/abi";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import {
  distribution_contract_address,
  abi,
} from "../useDepositSaleTokens/consts";

const useDistributionContract = (sale_distribution_contract_address) => {
  const { account, chainId } = useWeb3React();
  const { ethereum } = window;

  const [distributionContract, setDistributionContract] = useState(null);

  const updateDistributionContract = () => {
    if (ethereum && !!account) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      setDistributionContract(
        new ethers.Contract(sale_distribution_contract_address, abi, signer)
      );
    } else if (!!account) {
      const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
      const signer = web3Provider.getSigner();
      setDistributionContract(
        new ethers.Contract(sale_distribution_contract_address, abi, signer)
      );
    }
  };

  useEffect(() => {
    if (sale_distribution_contract_address && account) {
      updateDistributionContract();
    }
  }, [sale_distribution_contract_address, account, chainId]);

  return { distributionContract, updateDistributionContract };
};

export default useDistributionContract;
