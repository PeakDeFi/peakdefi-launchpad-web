import React, { useState, useEffect } from "react";
import classes from "./StakeCard.module.scss";
import StakeIcon from "./images/StakeIcon.svg";
import { abi, stakingContractAddress } from "./../../services/consts";
import { abi as tokenAbi, tokenContractAddress } from "./services/consts";
import { BigNumber, ethers, providers } from "ethers";
import Slider from "@mui/material/Slider";
import {
  setBalance,
  setDecimal,
  selectAddress,
} from "./../../../../features/userWalletSlice";
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

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#0AA7F5" : "#0AA7F5",
  height: 6,
  padding: "15px 0",

  "& .MuiSlider-thumb": {
    backgroundColor: "#0AA7F5",
    border: "3px solid white",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },

  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "600",
    top: 41,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#000",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    height: 6,
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 10,
    width: 0,
    "&.MuiSlider-markActive": {
      opacity: 0.8,
      backgroundColor: "currentColor",
    },
  },
}));

function numberWithCommas(x) {
  return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StakeCard = ({ price, update }) => {
  const {
    blockPropagation,
    unblockPropagation,
    isNextStepBlocked,
    currentStep,
    nextStepHandler,
    isTourOpen,
    goToStep,
  } = useMainTour();
  const provider = useProviderHook();
  const { stakingContract } = useStakingContract();
  const { tokenContract } = useTokenContract();
  const dispatch = useDispatch();

  const { deposit, approve, allowance } = useStaking();
  const { stakingVersion } = useSelectStakingVersion();

  const [amount, setAmount] = useState(0);

  const [cookies, setCookie] = useCookies(["referrer_wallet_address"]);
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);

  const navigate = useNavigate();

  const [stringularAmount, setStringularAmount] = useState("");

  const { accounts } = useMergedProvidersState();

  const account = accounts[0];

  const walletAddress = account ?? "";

  const { data: decimals } = useFetchDecimals();
  const { data: balance, refetch: refetchWalletAddress } =
    useFetchWalletBalance(account);

  const [{ data: userInfo, refetch: refetchUserInfo }] =
    useFetchMyStakingStats();

  const StakingBalance = userInfo?.amount ?? 0;

  const updateBalance = async () => {
    refetchWalletAddress();
  };

  const stakeFunction = async () => {
    setShowConfirmationWindow(false);
    // if (balance/(10 ** decimals)  - amount  < 0) {
    if (false) {
      toast.error("The amount entered is greater than the balance");
    } else {
      if (amount * 10 ** decimals <= allowance) {
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
        nextStepHandler();
        const res = await deposit(bigAmount);

        const a = res
          .wait()
          .then(() => {
            const promise = new Promise(async (resolve, reject) => {
              //DO NOT REMOVE THIS OR THANK YOU PAGE WILL NOT WORK!!!
              dispatch(setStaking(amount));

              refetchUserInfo();

              setAmount(0);
              setStringularAmount("0");
              try {
                await update();
              } catch (error) {}
              try {
                await updateBalance();
              } catch (error) {}
              if (!isTourOpen) {
                navigate("/thank-you-stake");
              }
              resolve(1);
            });

            if (
              !!cookies.referrer_wallet_address &&
              cookies.referrer_wallet_address !== "" &&
              stakingVersion === 1
            ) {
              addReferrer(walletAddress, cookies.referrer_wallet_address);
            }

            promise.then(() => {
              goToStep(10);
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
          })
          .catch(() => {
            goToStep(9);
          });

        toast.promise(a, {
          pending: "Transaction pending",
          success: "Transaction successful",
          error: "Transaction failed",
        });
      } else {
        const approvalRequest = await approve();
        nextStepHandler();
        const approvalTransaction = approvalRequest
          .wait()
          .then((transaction) => {
            nextStepHandler();
          });

        toast.promise(approvalTransaction, {
          pending: "Approval transaction pending",
          success: "Approval transaction successful",
          error: "Transaction failed",
        });
      }
    }
  };

  useEffect(() => {
    if (currentStep === 3 && amount > 0) {
      unblockPropagation();
    }

    if (amount > 0) {
      unblockPropagation();
    }

    if (amount === 0 || !amount) {
      blockPropagation();
    }
  }, [amount, currentStep]);

  return (
    <>
      <div className={classes.stakeCard}>
        <div className={classes.cardContent}>
          <div className={classes.cardHeader}>
            <img className={classes.headerIcon} src={StakeIcon} />
            <div className={classes.headerText}>
              Stake PEAK
              <Tooltip
                enterTouchDelay={0}
                leaveTouchDelay={6000}
                title={
                  <div>
                    <div>
                      You need to stake at least 1000 PEAK to be able to start
                      the KYC process
                    </div>
                  </div>
                }
              >
                <img src={InfoIcon} className={classes.headerInfoIcon} />
              </Tooltip>
            </div>
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
            <IOSSlider
              className={classes.percentSlider}
              value={Math.floor(
                (amount / (balance / Math.pow(10, decimals))) * 100
              )}
              aria-label="Default"
              valueLabelDisplay="on"
              onChange={(e, value) => {
                if (value === 100) {
                  setAmount(parseFloat(balance / Math.pow(10, decimals)));
                  setStringularAmount(
                    parseFloat(balance / Math.pow(10, decimals))
                      .toFixed(2)
                      .replace(",", "")
                  );
                } else {
                  setAmount(
                    parseFloat(
                      (
                        (balance / Math.pow(10, decimals) / 100) *
                        value
                      ).toFixed(2)
                    )
                  );
                  setStringularAmount(
                    ((balance / Math.pow(10, decimals) / 100) * value)
                      .toFixed(2)
                      .replace(",", ".")
                  );
                }
              }}
              marks={[{ value: 0 }, { value: 100 }]}
              valueLabelFormat={(value) => (isNaN(value) ? "" : value + "%")}
            />
          </div>

          <div className={classes.confirmationButton}>
            <Tooltip
              title="You can deposit your funds only with Staking V3"
              disableHoverListener={stakingVersion === 2}
            >
              <button
                data-tut={"stake_card_button"}
                className={classes.stakeButton}
                disabled={amount === 0 || stakingVersion === 1}
                // onClick={stakeFunction}
                onClick={() => {
                  if (amount * 10 ** decimals <= allowance) {
                    if (StakingBalance == 0) {
                      nextStepHandler();
                      stakeFunction();
                    } else {
                      setShowConfirmationWindow(true);
                      nextStepHandler();
                    }
                  } else {
                    stakeFunction();
                  }
                }}
              >
                {amount * 10 ** decimals <= allowance
                  ? "Stake PEAK"
                  : "Approve"}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div>
        <ConfirmationDialog
          open={showConfirmationWindow}
          setOpen={setShowConfirmationWindow}
          callback={stakeFunction}
          amount={amount}
        />
      </div>
    </>
  );
};

export default StakeCard;
