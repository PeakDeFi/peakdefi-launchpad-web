import { useWeb3React } from "@web3-react/core";
import { ethers, BigNumber, providers } from "ethers";
import { useEffect, useState } from "react";
import { SALE_ABI } from "../../consts/abi";
import { RpcProvider } from "../../consts/rpc";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";

const useJSONContract = (contract_address, ABI) => {
  const { account } = useWeb3React();

  const [contract, setContract] = useState(null);

  const updateContract = () => {
    const jsonProvider = new ethers.providers.JsonRpcProvider(RpcProvider);
    const jsonSaleContract = new ethers.Contract(
      contract_address,
      ABI,
      jsonProvider
    );
    setContract(jsonSaleContract);
  };

  useEffect(() => {
    if (!contract_address) return;

    updateContract();
  }, [account, contract_address, ABI]);

  return { contract, updateContract };
};

export default useJSONContract;
