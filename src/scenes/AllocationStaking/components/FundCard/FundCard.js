import React, { useState, useEffect } from "react";
import classes from "./FundCard.module.scss";
import StakeIcon from "./images/StakeIcon.svg";
import { abi, stakingContractAddress } from "../../services/consts";
import { abi as tokenAbi, tokenContractAddress } from "./services/consts";
import { BigNumber, ethers, providers } from "ethers";
import Slider from "@mui/material/Slider";
import {
  setBalance,
  setDecimal,
  selectAddress,
} from "../../../../features/userWalletSlice";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { RpcProvider } from "../../../../consts/rpc";
import { useCookies } from "react-cookie";

import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { rpcWalletConnectProvider } from "../../../../consts/walletConnect";
import { CheckBoxOutlineBlankOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import InfoIcon from "../StakingStats/images/InfoIcon.svg";
import { useNavigate } from "react-router-dom";
import { setStaking } from "../../../../features/thankYouSlice";
import { addReferrer } from "../../API/staking";
import { useSearchParams } from "react-router-dom";

import ConfirmationDialog from "./components/ConfirmationDialog/ConfirmationDialog";
import useMainTour from "../../../../hooks/useMainTour/useMainTour";
import useStakingContract from "../../../../hooks/useStakingContract/useStakingContract";
import useTokenContract from "../../../../hooks/useTokenContract/useTokenContract";
import { metaMask } from "scenes/Header/ProviderDialog/Metamask";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useStaking } from "hooks/useStaking/useStaking";
import { useSelectStakingVersion } from "hooks/useSelectStakingVersion/useSelectStakingVersion";
import {
  useFetchDecimals,
  useFetchMyStakingStats,
  useFetchWalletBalance,
} from "scenes/AllocationStaking/API/hooks";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { useDispatch } from "react-redux";

function numberWithCommas(x) {
  return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const FundCard = ({ price, update }) => {
  const provider = useProviderHook();
  const { stakingContract } = useStakingContract();
  const { tokenContract } = useTokenContract();
  const dispatch = useDispatch();

  const { approve, allowance, fund } = useStaking();
  const { stakingVersion } = useSelectStakingVersion();

  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  const [stringularAmount, setStringularAmount] = useState("");

  const { accounts } = useMergedProvidersState();

  const account = accounts[0];

  const { data: decimals } = useFetchDecimals();
  const { data: balance, refetch: refetchWalletAddress } =
    useFetchWalletBalance(account);

  const [{ data: userInfo, refetch: refetchUserInfo }] =
    useFetchMyStakingStats();

  const updateBalance = async () => {
    refetchWalletAddress();
  };

  const fundFunction = async () => {
    // if (balance/(10 ** decimals)  - amount  < 0) {
    if (false) {
      toast.error("The amount entered is greater than the balance");
    } else {
      if (amount * 10 ** decimals < allowance) {
        let bigAmount = 0;
        if (amount * 10 ** decimals >= balance) {
          bigAmount = BigNumber.from(
            Math.floor(parseFloat(amount.toString().slice(0, -1)))
          ).mul(BigNumber.from(10).pow(decimals));
        } else {
          bigAmount = BigNumber.from(Math.round(amount * 100)).mul(
            BigNumber.from(10).pow(decimals - 2)
          );
        }

        try {
          const res = await fund(bigAmount);

          const a = res.wait().then(() => {
            const promise = new Promise(async (resolve, reject) => {
              refetchUserInfo();

              setAmount(0);
              setStringularAmount("0");
              updateBalance();

              resolve(1);
            });

            toast.promise(promise, {
              pending: "Updating information, please wait...",
              success: {
                render() {
                  return "Data updated";
                },
                autoClose: 1,
              },
            });
          });
          toast.promise(a, {
            pending: "Transaction pending",
            success: "Transaction successful",
            error: "Transaction failed",
          });
        } catch (error) {
          toast.error(
            "Contract call failed, please make sure you're using the admin wallet"
          );
        }
      } else {
        const approvalRequest = await approve();
        const approvalTransaction = approvalRequest.wait();

        toast.promise(approvalTransaction, {
          pending: "Approval transaction pending",
          success: "Approval transaction successful",
          error: "Transaction failed",
        });
      }
    }
  };

  return (
    <>
      <div className={classes.stakeCard}>
        <div className={classes.cardContent}>
          <div className={classes.cardHeader}>
            <img className={classes.headerIcon} src={StakeIcon} />
            <div className={classes.headerText}>Fund</div>
          </div>
          <div className={classes.input} data-tut={"staking__input"}>
            <div className={classes.inputHeader}>
              <div className={classes.headerBalance}>
                Wallet Balance:{" "}
                <b>
                  {numberWithCommas(Math.abs(balance) / Math.pow(10, decimals))}
                </b>{" "}
                (~$
                {numberWithCommas((balance / Math.pow(10, decimals)) * price)})
              </div>
              <button
                className={classes.headerMax}
                onClick={() => {
                  setAmount(balance / Math.pow(10, decimals));
                  setStringularAmount(
                    (balance / Math.pow(10, decimals))
                      .toFixed(2)
                      .replace(",", ".")
                  );
                }}
              >
                MAX
              </button>
            </div>
            <div className={classes.inputFields}>
              <input
                lang="eng"
                type="text"
                value={stringularAmount}
                min={0}
                max={balance / Math.pow(10, decimals)}
                className={classes.inputField}
                onChange={(e) => {
                  if (/^([0-9]+[\.]?[0-9]*)$/.test(e.target.value)) {
                    setAmount(parseFloat(e.target.value));
                    setStringularAmount(e.target.value);
                  } else if (e.target.value === "") {
                    setStringularAmount("");
                    setAmount(0);
                  }
                }}
              />
              <input
                className={classes.inputFieldPostpend}
                type="text"
                value={"PEAK"}
                disabled
              />
            </div>
          </div>

          <div className={classes.confirmationButton}>
            <button
              data-tut={"stake_card_button"}
              className={classes.stakeButton}
              disabled={amount === 0 || stakingVersion === 2}
              onClick={fundFunction}
            >
              {amount * 10 ** decimals < allowance ? "Fund PEAK" : "Approve"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FundCard;
