import React, { useEffect, useState } from "react";
import classes from "./AllocationsInfo.module.scss";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { SALE_ABI, FAKE_CONTRACT } from "../../../../consts/abi";
import { ControlButton } from "../DetailTable/components/ControlButton/ControlButton";

import Table from "../Table/Table";
import { toast } from "react-toastify";

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { useSelector } from "react-redux";
import { RpcProvider } from "../../../../consts/rpc";
import { rpcWalletConnectProvider } from "../../../../consts/walletConnect";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import WithdrawElement from "scenes/AllocationStaking/components/WithdrawElement/WithdrawElement";
import { useParams } from "react-router-dom";
import { shouldShowTable } from "scenes/IdoDetail/helpers/helperFunctions";
import { contractAddressFetcher } from "./helpers";

export function AllocationsInfo({ ido }) {
  const { name } = useParams();

  const [showTable, setShowTable] = useState(
    shouldShowTable(name?.toLocaleLowerCase())
  );

  useEffect(() => {
    if (name) {
      setShowTable(shouldShowTable(name?.toLocaleLowerCase()));
    }
  }, [name]);

  const provider = useProviderHook();
  const { activate, deactivate, account, error } = useWeb3React();
  const { accounts } = useMergedProvidersState();
  const userWalletAddress = accounts[0] ?? "";
  const claimAllAvailablePortions = async (ids) => {
    try {
      const { ethereum } = window;
      if (ethereum && !!account) {
        const signer = provider?.getSigner();
        const saleContract = new ethers.Contract(
          ido.contract_address,
          SALE_ABI,
          signer
        );
        let result = await saleContract.withdrawMultiplePortions([0, 1, 2]);
        const transaction = result.wait();

        toast.promise(transaction, {
          pending: "Transaction pending",
          success: "Claim request completed",
          error: "Transaction failed",
        });
      } else if (!!account) {
        const web3Provider = new providers.Web3Provider(
          rpcWalletConnectProvider
        );
        const signer = web3Provider.getSigner();

        const saleContract = new ethers.Contract(
          ido.contract_address,
          SALE_ABI,
          signer
        );
        let result = await saleContract.withdrawMultiplePortions([0, 1, 2]);
        const transaction = result.wait();

        toast.promise(transaction, {
          pending: "Transaction pending",
          success: "Claim request completed",
          error: "Transaction failed",
        });
      }
    } catch (error) {
      toast.error("Execution reverted");
    }
  };

  const claimPortion = async (id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const signer = provider?.getSigner();
        const mainOne = new ethers.Contract(
          ido.contract_address,
          SALE_ABI,
          signer
        );
        const sumToWithdraw = await mainOne
          .calculateAmountWithdrawingPortionPub(userWalletAddress, 40)
          .then((response) => {
            return response;
          });
        const saleContract = new ethers.Contract(
          "0x47a398a8374FAEE8634173F2a949f981822e58C4",
          FAKE_CONTRACT,
          signer
        );
        let result = await saleContract.withdrawTokensFirstPortion(
          id,
          sumToWithdraw
        );
        const transaction = result.wait();

        toast.promise(transaction, {
          pending: "Transaction pending",
          success: "Claim request completed",
          error: "Transaction failed",
        });
      } else if (!!account) {
        const web3Provider = new providers.Web3Provider(
          rpcWalletConnectProvider
        );
        const signer = web3Provider.getSigner();
        const mainOne = new ethers.Contract(
          ido.contract_address,
          SALE_ABI,
          signer
        );
        const sumToWithdraw = await mainOne
          .calculateAmountWithdrawingPortionPub(userWalletAddress, 40)
          .then((response) => {
            return response;
          });
        const saleContract = new ethers.Contract(
          "0x47a398a8374FAEE8634173F2a949f981822e58C4",
          FAKE_CONTRACT,
          signer
        );
        let result = await saleContract.withdrawTokensFirstPortion(
          id,
          sumToWithdraw
        );
        const transaction = result.wait();

        toast.promise(transaction, {
          pending: "Transaction pending",
          success: "Claim request completed",
          error: "Transaction failed",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={classes.allocationsInfo} data-tut={"allocations-table"}>
      {/* <ControlButton onClick={() => { claimAllAvailablePortions() }} text="Claim all portions" /> */}
      {/* TODO: !!!!!!!!!!!!added API!!!!!!!!!*/}
      {!showTable && (
        <WithdrawElement
          contractAddress={contractAddressFetcher(name ?? "")}
          type={"Daily"}
          tokenName={ido.title}
          tokenImg={ido.token.logo_url}
          tokenSmallName={ido.token.symbol}
        />
      )}
      {showTable && (
        <Table
          onClick={(id) => {
            claimPortion(id);
          }}
          mainIdo={ido}
        />
      )}
    </div>
  );
}
