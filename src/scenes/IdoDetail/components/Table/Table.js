import React, { useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { TableHeader } from "./components/TableHeader/TableHeader";
import TableRow from "./components/TableRow/TableRow";
import Img from "./test_img.svg";
import { ethers, BigNumber } from "ethers";
import { SALE_ABI } from "../../../../consts/abi";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import { RpcProvider } from "../../../../consts/rpc";
import { rpcWalletConnectProvider } from "../../../../consts/walletConnect";
import { toast } from "react-toastify";
import { useSaleContract } from "../../../../hooks/useSaleContract/useSaleContract";

const decimalCount = (num) => {
  // Convert to String
  const numStr = String(num);
  // String Contains Decimal
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  // String Does Not Contain Decimal
  return 0;
};

const Table = ({ onClick, mainIdo }) => {
  const { activate, deactivate, account, error } = useWeb3React();

  const [activeType, setActiveType] = useState(0);
  const [rotateRate, setRotateRate] = useState(0);
  const [isClaimable, setIsClaimable] = useState(true);
  const [info, setInfo] = useState([]);

  const saleContract = useSaleContract(mainIdo.contract_address);

  const userWalletAddress = useSelector((state) => state.userWallet.address);
  const decimals = 18;

  useEffect(() => {
    if (mainIdo === undefined || !saleContract) return;

    const power =
      Math.max(
        ...mainIdo.project_detail.vesting_percent.map((e) => decimalCount(e))
      ) > 18
        ? 18
        : Math.max(
            ...mainIdo.project_detail.vesting_percent.map((e) =>
              decimalCount(e)
            )
          );

    const handler = async () => {
      let data;
      try {
        data = await saleContract.getClaimedInfo(account);
      } catch (error) {}

      let local_info = [];

      for (const [
        index,
        value,
      ] of mainIdo.project_detail.vesting_percent.entries()) {
        const isClaimed = !!data[index];
        const amount = "Calculating...";
        try {
          const rawPortionData =
            await saleContract.calculateAmountWithdrawingPortionPub(
              account,
              Math.floor(value * 10 ** power)
            );
          amount = parseFloat(rawPortionData / 10 ** decimals).toFixed(2);
        } catch (error) {}

        local_info.push({
          id: index,
          vested: value + "%",
          amount: amount,
          claimed: isClaimed,
          //TODO remove  + 55800
          portion: mainIdo.project_detail.vesting_time[index] + 55800,
          claimable: false,
        });
      }
      setInfo(local_info);
    };

    handler();
  }, [mainIdo, saleContract, account]);

  const claimAllAvailablePortions = async (ids) => {
    try {
      const { ethereum } = window;
      if (ethereum && !!account) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const saleContract = new ethers.Contract(
          mainIdo.contract_address,
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
          mainIdo.contract_address,
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

  return (
    <>
      <div className={classes.Table}>
        <TableHeader
          claimAllAvailablePortions={() => {
            claimAllAvailablePortions();
          }}
          className={classes.claimAllButton}
        />

        {isClaimable &&
          info.map((ido, index) => {
            ido.color =
              index % 2
                ? "linear-gradient(rgb(10, 167, 245, 0.1) 0%, rgb(60, 231, 255, 0.1) 100%)"
                : "#FFFFFF";
            return (
              <TableRow
                {...ido}
                onClick={(id) => {
                  onClick(id);
                }}
              />
            );
          })}

        {info.length === 0 && (
          <h2 className={classes.emptyMessage}>
            {" "}
            You have not made any allocations yet.
          </h2>
        )}

        {!isClaimable && (
          <h2 className={classes.emptyMessage}>
            You don't have any claimable tokens yet.
          </h2>
        )}
      </div>
    </>
  );
};

export default Table;
