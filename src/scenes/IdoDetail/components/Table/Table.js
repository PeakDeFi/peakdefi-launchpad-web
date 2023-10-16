import React, { useEffect, useState } from "react";
import classes from "./Table.module.scss";
import { TableHeader } from "./components/TableHeader/TableHeader";
import TableRow from "./components/TableRow/TableRow";
import Img from "./test_img.svg";
import { ethers, BigNumber } from "ethers";
import { SALE_ABI } from "../../../../consts/abi";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { metaMask, hooks } from "../../../Header/ProviderDialog/Metamask";

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import { RpcProvider } from "../../../../consts/rpc";
import { rpcWalletConnectProvider } from "../../../../consts/walletConnect";
import { toast } from "react-toastify";
import useClaimTour from "../../../../hooks/useClaimTour/useClaimTour";
import useSaleContract from "../../../../hooks/useSaleContract/useSaleContract";
import { Tooltip } from "@mui/material";
import web3 from "web3";
import useDistributionContract from "../../../../hooks/useDistributionContract/useDistributionContract";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

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

function timeLeft(seconds) {
  let timeString = "";
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  if (d > 0) {
    return false;
  } else if (h > 0) {
    return false;
  } else if (m > 0 || s > 0) {
    return false;
  } else {
    return true;
  }
}

const Table = ({ onClick, mainIdo }) => {
  const { accounts, chainId } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;

  const claimTour = useClaimTour();

  const [isClaimable, setIsClaimable] = useState(true);
  const [claimableIds, setClaimableIds] = useState([]);
  const [info, setInfo] = useState([]);

  const { saleContract, updateSaleContract } = useSaleContract(
    mainIdo.contract_address
  );

  const { distributionContract } = useDistributionContract(
    "0x850aF92E4d26fB9e282De4B0065635dd69485bA0" //TO DO: replace with real values
  );

  const userWalletAddress = account;
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
      let data = [];
      let claimableData = [];
      try {
        data = await distributionContract.getClaimedInfo(userWalletAddress);
        console.log("data", data);
      } catch (error) {}

      let local_info = [];
      for (const [
        index,
        value,
      ] of mainIdo.project_detail.vesting_percent.entries()) {
        const isClaimed = !!data[index];

        let amount = "Calculating...";
        try {
          const rawPortionData =
            await distributionContract.calculateAmountWithdrawingPortionPub(
              userWalletAddress,
              value
            );
          amount = parseFloat(rawPortionData / 10 ** decimals).toFixed(2);
        } catch (error) {
          console.log("error", error);
        }

        if (
          !isClaimed &&
          timeLeft(
            mainIdo.project_detail.vesting_time[index] +
              55800 -
              Math.round(Date.now() / 1000)
          )
        )
          claimableData.push(index);

        local_info.push({
          id: index,
          vested: value + "%",
          amount: amount,
          claimed: !isClaimed,
          //TODO remove  + 55800
          portion: mainIdo.project_detail.vesting_time[index] + 55800,
          claimable: false,
        });
      }
      setClaimableIds(claimableData);
      setInfo(local_info);
    };

    handler();
  }, [mainIdo, distributionContract, account]);

  const claimAllAvailablePortions = async (ids) => {
    let result = await distributionContract.withdrawMultiplePortions(
      claimableIds
    );

    const transaction = result
      .wait()
      .then(() => {
        claimTour.goToStep(5);
      })
      .catch(() => {
        claimTour.goToStep(4);
      });

    toast.promise(transaction, {
      pending: "Transaction pending",
      success: {
        render() {
          let local_info = info.map((value, index) => {
          if (claimableIds.includes(index)) {
            value.claimed = false
          }
          return value
        })
        setInfo(local_info)
          return "Claim request completed";
        },
        autoClose: 1,
      },
      error: "Transaction failed",
    });

    
  };

  const onChangeNetwork = async (desiredNetworkID) => {
    if (window.ethereum.networkVersion !== desiredNetworkID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(desiredNetworkID) }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          toast.error(
            "The Polygon network was not connected to your wallet provider. To continue please add Polygon network to your wallet provider"
          );
        }
      }
    }
  };

  const isPolygonNetworkUsed =
    chainId ===
    parseInt(process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[1]);

  return (
    <>
      <div className={classes.Table}>
        {info.length > 1 && isClaimable && (
          <div className={classes.invisibleButtonRow}>
            <div className={classes.headerButtons}>
              {info.filter((e) => {
                return e.claimable;
              }).length > 0 && (
                <Tooltip
                  disableFocusListener
                  title={
                    isPolygonNetworkUsed
                      ? ""
                      : "Please switch to Polygon network in order to claim your allocations"
                  }
                  arrow
                >
                  <div
                    className={
                      isPolygonNetworkUsed
                        ? classes.claimAllButton
                        : classes.disabledClaimAllButton
                    }
                    onClick={claimAllAvailablePortions}
                    data-tut={"claim-all-portions"}
                    disabled={true}
                  >
                    Claim all available Allocations
                  </div>
                </Tooltip>
              )}
            </div>
          </div>
        )}
        <TableHeader claimAllAvailablePortions={claimAllAvailablePortions} />
        {!isPolygonNetworkUsed && (
          <div className={classes.polygonNetwork}>
            <button
              className={classes.switchNetworksButton}
              onClick={() => {
                onChangeNetwork(
                  parseInt(
                    process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[1]
                  )
                );
                updateSaleContract();
              }}
            >
              Switch to Polygon Network
            </button>
          </div>
        )}
        {isPolygonNetworkUsed && (
          <>
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
                You have not made any allocations yet.
              </h2>
            )}
            {!isClaimable && (
              <h2 className={classes.emptyMessage}>
                You don't have any claimable portions yet.
              </h2>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Table;
