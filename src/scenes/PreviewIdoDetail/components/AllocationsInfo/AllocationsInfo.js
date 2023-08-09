import React, { useEffect } from "react";
import classes from "./AllocationsInfo.module.scss";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import { SALE_ABI } from "../../../../consts/abi";
import { ControlButton } from "../DetailTable/components/ControlButton/ControlButton";

import Table from "../Table/Table";
import { toast } from "react-toastify";

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import { RpcProvider } from "../../../../consts/rpc";
import { rpcWalletConnectProvider } from "../../../../consts/walletConnect";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";

export function AllocationsInfo({ ido }) {
  const { activate, deactivate, account, error } = useWeb3React();
  const provider = useProviderHook();

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
      }
    } catch (error) {
      toast.error("Execution reverted");
    }
  };

  const claimPortion = async (id) => {
    try {
      const { ethereum } = window;

      if (ethereum && !!account) {
        const signer = provider?.getSigner();
        const saleContract = new ethers.Contract(
          ido.contract_address,
          SALE_ABI,
          signer
        );
        let result = await saleContract.withdrawTokens(id);
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
        let result = await saleContract.withdrawTokens(id);
      }
    } catch (error) {}
  };

  return (
    <div className={classes.allocationsInfo}>
      <ControlButton
        onClick={() => {
          claimAllAvailablePortions();
        }}
        text="Claim all portions"
      />
      <Table
        onClick={(id) => {
          claimPortion(id);
        }}
        mainIdo={ido}
      />
    </div>
  );
}
