import classes from "./WithdrawLinear.module.scss";
import React, { useState, useEffect, useMemo } from "react";
import useWithdrawLinearContract from "hooks/useWithdrawLinearContractEywa/useWithdrawLinearContract";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useFetchavToParticipationInfo } from "./hooks";
import { BigNumber } from "ethers";
import web3 from "web3";
import useSaleContract from "hooks/useSaleContract/useSaleContract";
import { useFetchToParticipationInfoFromSale } from "../DistributionComponents/hooksSKO";

const WithdrawEywa = ({
  type,
  saleContractAddress,
  contractAddress,
  tokenName,
  tokenImg,
  tokenSmallName,
}) => {
  const { accounts, chainId } = useMergedProvidersState();
  const userAddress = accounts[0] ?? "";
  const { withdrawContract, updateWithdrawContract } =
    useWithdrawLinearContract(contractAddress);
  const decimals = Math.pow(10, 18);
  const { data: toParticipationInfo, refetch } = useFetchavToParticipationInfo(
    userAddress,
    withdrawContract
  );

  const { saleContract } = useSaleContract(saleContractAddress);

  const { data: saleToParticipationData } = useFetchToParticipationInfoFromSale(
    userAddress,
    saleContract
  );

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [vestingTimeEnd, setVestingTimeEnd] = useState(0);
  const [vestingTimeStart, setVestingTimeStart] = useState(0);
  const [claimStepDate1, setClaimStepDate1] = useState(0);
  const [update, setUpdate] = useState(true);
  const [date, setDate] = useState(0);
  const [claimableTokens, setClaimableTokens] = useState(0);
  const [tokensPerSecond, setTokensPerSecond] = useState(0);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const tgeInfoPresent = !toParticipationInfo.isTgeClaimed ? 0.85 : 1;

  useEffect(() => {
    const endDate = new Date(vestingTimeEnd * 1000);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = endDate - now;
      if (difference > 0) {
        const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const remainingMinutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);
        setDays(remainingDays);
        setHours(remainingHours);
        setMinutes(remainingMinutes);
        setSeconds(remainingSeconds);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [vestingTimeEnd]);

  useEffect(() => {
    getInfo();
    refetch();
  }, [withdrawContract]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getInfo();
      refetch();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalCallback = () => {
      const now = new Date();
      var time = now.getTime() / 1000 - claimStepDate1;
      if (toParticipationInfo.tokenClaimDate * 1 > claimStepDate1) {
        time = now.getTime() / 1000 - toParticipationInfo.tokenClaimDate * 1;
      }
      if (time > 0 && now.getTime() / 1000 < vestingTimeEnd) {
        setDate(time);
      }
      if (withdrawContract !== null) {
        const timestamp = new Date().getTime() / 1000;
        const tgePercent = 15;
        let tokensForSecond = 0;
        const userTokens = toParticipationInfo[0] * 1;
        tokensForSecond =
          (userTokens - (userTokens * tgePercent) / 100) /
          (vestingTimeEnd - claimStepDate1);
        setTokensPerSecond(tokensForSecond / decimals);

        const stepClaimed = toParticipationInfo.stepClaimed * 1;
        let claimableTokens = 0;
        if (timestamp > vestingTimeStart && stepClaimed < 1) {
          claimableTokens +=
            ((toParticipationInfo.userTokens / decimals) * 13) / 100;
        }
        setClaimableTokens(claimableTokens);
      }
    };

    const intervalId = setInterval(intervalCallback, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    userAddress,
    toParticipationInfo,
    withdrawContract,
    claimStepDate1,
    vestingTimeEnd,
  ]);

  const getInfo = () => {
    if (withdrawContract !== null) {
      withdrawContract.vestingTimeEnd().then((info) => {
        setVestingTimeEnd(info.toNumber());
      });
      withdrawContract.vestingTimeStart().then((info) => {
        setVestingTimeStart(info.toNumber());
      });
      withdrawContract.claimStepDate1().then((info) => {
        setClaimStepDate1(info.toNumber());
      });
    }
    setUpdate(false);
  };

  const claim = () => {
    setUpdate(true);
    const promise = withdrawContract.withdrawTokens();
    toast
      .promise(promise, {
        pending: "Transaction pending",
        success: "Transaction successful",
        error: "Transaction failed",
      })
      .then(() => {
        setTimeout(() => {
          getInfo();
          refetch();
        }, 15000);
      })
      .catch((error) => {
        setTimeout(() => {
          getInfo();
          refetch();
        }, 15000);
      });
  };

  const claimTge = () => {
    setUpdate(true);
    const promise = withdrawContract.withdrawTokensTGE();
    toast
      .promise(promise, {
        pending: "Transaction pending",
        success: "Transaction successful",
        error: "Transaction failed",
      })
      .then(() => {
        setTimeout(() => {
          getInfo();
          refetch();
        }, 15000);
      })
      .catch((error) => {
        setTimeout(() => {
          getInfo();
          refetch();
        }, 15000);
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
            "The Arbirum network was not connected to your wallet provider. To continue please add Polygon network to your wallet provider"
          );
        }
      }
    }
  };

  const tokenDecimals = useMemo(() => {
    if (tokenName?.toLowerCase() === "anote") {
      return 10 ** 9;
    }

    return 10 ** 18;
  }, [tokenName]);
  return (
    <div className={classes.withdrawElement}>
      {chainId != "42161" && (
        <div className={classes.polygonNetwork}>
          <button
            className={classes.switchNetworksButton}
            onClick={() => {
              onChangeNetwork(parseInt(42161));
              updateWithdrawContract();
            }}
          >
            Switch to Arbitrum Network
          </button>
        </div>
      )}

      {chainId == "42161" && (
        <div className={classes.withdrawElementContent}>
          <div className={classes.withdrawHeader}>
            <div className={classes.TokenInfoContainer}>
              <img
                className={classes.withdrawTokenLogo}
                alt=""
                src={tokenImg}
              />
              <div className={classes.TokenNames}>
                <div className={classes.TokenName}>{tokenName}</div>
                <div>{tokenSmallName}</div>
              </div>
            </div>
            <div className={classes.TimerContainer}>
              <div className={classes.TimerTitel}>Fully unvested in:</div>
              <div className={classes.Timer}>
                <div className={classes.TimerItemContainer}>
                  <div className={classes.TimerNumberContainer}>
                    <div className={classes.TimerItemNumber}>{days}</div>
                    <div
                      className={classes.TimerItemNumber}
                      style={{ marginLeft: "1em", marginRight: "1em" }}
                    >
                      :
                    </div>
                  </div>
                  <div className={classes.TimerItemText}>days</div>
                </div>
                <div className={classes.TimerItemContainer}>
                  <div className={classes.TimerNumberContainer}>
                    <div className={classes.TimerItemNumber}>{hours}</div>
                    <div
                      className={classes.TimerItemNumber}
                      style={{ marginLeft: "1em", marginRight: "1em" }}
                    >
                      :
                    </div>
                  </div>
                  <div className={classes.TimerItemText}>hrs</div>
                </div>
                <div className={classes.TimerItemContainer}>
                  <div className={classes.TimerNumberContainer}>
                    <div className={classes.TimerItemNumber}>{minutes}</div>
                    <div
                      className={classes.TimerItemNumber}
                      style={{ marginLeft: "1em", marginRight: "1em" }}
                    >
                      :
                    </div>
                  </div>
                  <div className={classes.TimerItemText}>mins</div>
                </div>
                <div className={classes.TimerItemContainer}>
                  <div className={classes.TimerNumberContainer}>
                    <div className={classes.TimerItemNumber}>{seconds}</div>
                  </div>
                  <div className={classes.TimerItemText}>secs</div>
                </div>
              </div>
              <Button
                className={classes.ButtonContainer}
                variant="contained"
                onClick={claim}
                onLoad={true}
              >
                {update && (
                  <CircularProgress
                    style={{
                      width: "1.25em",
                      height: "1.25em",
                    }}
                    color="inherit"
                  />
                )}
                {!update && "Claim"}
              </Button>

              {!toParticipationInfo.isTgeClaimed && (
                <Button className={classes.ButtonContainer2} onClick={claimTge}>
                  {update && (
                    <CircularProgress
                      style={{
                        width: "1.25em",
                        height: "1.25em",
                      }}
                      color="inherit"
                    />
                  )}
                  {!update && "Claim TGE Tokens"}
                </Button>
              )}
            </div>
          </div>
          <div className={classes.withdrawLine}></div>
          <div className={classes.FooterContainer}>
            <div className={classes.FooterItemContainer}>
              <div className={classes.FooterItemTitle}>Vesting Start Date</div>
              <div className={classes.FooterItemText}>
                {formatDate(vestingTimeStart)}
              </div>
            </div>
            <div className={classes.FooterItemContainer}>
              <div className={classes.FooterItemTitle}>Vesting End Date</div>
              <div className={classes.FooterItemText}>
                {formatDate(vestingTimeEnd)}
              </div>
            </div>

            <div className={classes.FooterItemContainer}>
              <div className={classes.FooterItemTitle}>
                Total investment in USD
              </div>
              <div className={classes.FooterItemText}>
                {saleToParticipationData?.[0]
                  ? (
                      BigNumber.from(saleToParticipationData[0]._hex) /
                      tokenDecimals
                    ).toString()
                  : 0}
              </div>
            </div>
            <div className={classes.FooterItemContainer}>
              <div className={classes.FooterItemTitle}>Allocation Granted</div>
              <div className={classes.FooterItemText}>
                {toParticipationInfo[0]
                  ? (
                      BigNumber.from(toParticipationInfo[0]._hex) /
                      tokenDecimals
                    ).toString()
                  : 0}
              </div>
            </div>
            <div className={classes.FooterItemContainer}>
              <div className={classes.FooterItemTitle}>Claimed Tokens</div>
              <div className={classes.FooterItemText}>
                {parseFloat(
                  (
                    (toParticipationInfo[2] * 1 + toParticipationInfo[4] * 1) /
                    tokenDecimals
                  ).toFixed(2)
                )}
              </div>
            </div>
            <div className={classes.FooterItemContainer}>
              <div className={classes.FooterItemTitle}>Claimable Tokens</div>
              <div className={classes.FooterItemText}>
                {new Date().getTime() / 1000 > vestingTimeEnd
                  ? parseFloat(
                      ((toParticipationInfo.userTokens * 1 -
                        toParticipationInfo[2] * 1) /
                        tokenDecimals) *
                        tgeInfoPresent
                    ).toFixed(5)
                  : parseFloat(
                      claimableTokens + tokensPerSecond * date
                    ).toFixed(5)}
              </div>
            </div>
            <div className={classes.FooterItemContainer}>
              <div className={classes.FooterItemTitle}>Vesting Type</div>
              <div className={classes.FooterItemText}>{type}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawEywa;
