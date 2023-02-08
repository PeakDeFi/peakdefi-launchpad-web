import { useWeb3React } from "@web3-react/core";
import { ethers, providers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import {
  tokenContractAddress,
  abi as tokenAbi,
} from "../../scenes/AllocationStaking/components/StakeCard/services/consts";
import { stakingContractAddress } from "../../scenes/AllocationStaking/services/consts";

const useStakingContract = () => {
  const { account } = useWeb3React();
  const [stakingContract, setStakingContract] = useState(null);
  const { ethereum } = window;

  useEffect(() => {
    if (ethereum && account) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      setStakingContract(
        new ethers.Contract(tokenContractAddress, tokenAbi, signer)
      );
    } else if (account) {
      const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
      const signer = web3Provider.getSigner();

      setStakingContract(
        new ethers.Contract(tokenContractAddress, tokenAbi, signer)
      );
    }
  }, [ethereum, account]);

  return {
    stakingContract,
  };
};

export default useStakingContract;
