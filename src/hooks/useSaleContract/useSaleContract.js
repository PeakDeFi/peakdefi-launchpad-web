import { useWeb3React } from "@web3-react/core";
import { ethers, BigNumber, providers } from "ethers";
import { useEffect, useState } from "react";
import { SALE_ABI } from "../../consts/abi";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";

export const useSaleContract = (contract_address) => {
  const { account } = useWeb3React();
  const { ethereum } = window;

  const [saleContract, setSaleContract] = useState(null);

  useEffect(() => {
    if (!contract_address) return;

    if (ethereum && !!account) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      setSaleContract(new ethers.Contract(contract_address, SALE_ABI, signer));
    } else if (!!account) {
      const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
      const signer = web3Provider.getSigner();
      setSaleContract(new ethers.Contract(contract_address, SALE_ABI, signer));
    }
  }, [ethereum, account, contract_address]);

  return saleContract;
};
