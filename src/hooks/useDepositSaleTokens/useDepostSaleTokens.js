import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import useDistributionContract from "../useDistributionContract/useDistributionContract";
import useSaleContract from "../useSaleContract/useSaleContract";
import useSaleTokenContract from "../useSaleTokenContract/useSaleTokenContract";
import useTokenContract from "../useTokenContract/useTokenContract";

export const useDepositSaleTokens = (
  sale_token_address,
  sale_distribution_contract_address,
  isAdmin
) => {
  const { account, chainId } = useWeb3React();
  const [allowance, setAllowance] = useState(0);
  const [isTokensDeposited, setIsTokensDeposited] = useState(false);

  const { distributionContract, updateDistributionContract } =
    useDistributionContract(sale_distribution_contract_address);

  const { tokenContract } = useSaleTokenContract(sale_token_address);

  useEffect(() => {
    if (
      chainId !==
        parseInt(process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[1]) ||
      !account ||
      !tokenContract ||
      !account ||
      !sale_distribution_contract_address ||
      sale_distribution_contract_address === "" ||
      account === "" ||
      !isAdmin
    ) {
      return;
    }
    fetchIsTokensDeposited();

    tokenContract
      .allowance(account, sale_distribution_contract_address)
      .then((response) => {
        setAllowance(parseInt(response.toString()));
      });
  }, [
    chainId,
    account,
    tokenContract,
    sale_distribution_contract_address,
    isAdmin,
  ]);

  useEffect(() => {
    if (!distributionContract || !isAdmin) {
      return;
    }
    updateDistributionContract();
  }, [chainId, isAdmin]);

  const depositTokens = () => {
    distributionContract
      .depositTokens()
      .then((res) => {
        const transactipon = res.wait().then(() => {
          fetchIsTokensDeposited();
        });
        toast.promise(transactipon, {
          pending: "Deposit transaction pending",
          success: "Depost transaction successful",
          error: "Deposit transaction failed",
        });
      })
      .catch((error) => {
        toast.error(
          <>
            <b>{"Request failed: "}</b>
            <br />
            <code>{error?.data?.message}</code>
          </>
        );
      });
  };

  const allow = () => {
    tokenContract
      .approve(sale_distribution_contract_address, ethers.constants.MaxUint256)
      .then((res) => {
        let tran = res.wait().then((transaction) => {
          setAllowance(ethers.constants.MaxUint256);
        });

        toast.promise(tran, {
          pending: "Approval pending",
          success: "Approval successful",
          error: "Approval failed",
        });
      });
  };

  const fetchIsTokensDeposited = () => {
    distributionContract.tokensDeposited().then((res) => {
      setIsTokensDeposited(res);
    });
  };

  return {
    isTokensDeposited,
    distributionContract,
    allowance,
    allow,
    depositTokens,
  };
};
