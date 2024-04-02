import classes from "./WithdrawElement.module.scss";
import React, { useState, useEffect } from "react";
import useWithdrawV2Contract from "../../../../hooks/useWithdrawV2Contract/useWithdrawV2Contract";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useFetchavToParticipationInfo } from "./hooks";
import { BigNumber } from "ethers";

const WithdrawElement = ({
  type,
  contractAddress,
  tokenName,
  tokenImg,
  tokenSmallName,
}) => {
  const { accounts } = useMergedProvidersState();
  const userAddress = accounts[0] ?? "";
  const { withdrawContract } = useWithdrawV2Contract(contractAddress);

  const {
    data: toParticipationInfo,
    error,
    refetch,
  } = useFetchavToParticipationInfo(userAddress, withdrawContract);
  const [days, setDays] = useState(10);
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(10);
  const [vestingTimeEnd, setVestingTimeEnd] = useState(0);
  const [vestingTimeStart, setVestingTimeStart] = useState(0);
  const [update, setUpdate] = useState(true);
  const [widthdrawPercent, setWithdrawPercent] = useState(0);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

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
  }, [withdrawContract]);

  const getInfo = () => {
    if (withdrawContract !== null) {
      withdrawContract.getWithdrawPercent(userAddress).then((data) => {
        setWithdrawPercent(parseFloat(data.toString()));
      });

      withdrawContract.vestingTimeEnd().then((info) => {
        setVestingTimeEnd(info.toNumber());
      });
      withdrawContract.vestingTimeStart().then((info) => {
        setVestingTimeStart(info.toNumber());
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
        getInfo();
      })
      .catch((error) => {
        getInfo();
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
        getInfo();
        refetch();
      })
      .catch((error) => {
        getInfo();
        refetch();
      });
  };

  return (
    <div className={classes.withdrawElement}>
      <div className={classes.withdrawElementContent}>
        <div className={classes.withdrawHeader}>
          <div className={classes.TokenInfoContainer}>
            <img className={classes.withdrawTokenLogo} alt="" src={tokenImg} />
            <div className={classes.TokenNames}>
              <div className={classes.TokenName}>{tokenName}</div>
              <div>{tokenSmallName}</div>
            </div>
          </div>
          <div className={classes.TimerContainer}>
            <div className={classes.TimerTitel}>Ends in:</div>
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
            <div className={classes.FooterItemTitle}>Start Date</div>
            <div className={classes.FooterItemText}>
              {formatDate(vestingTimeStart)}
            </div>
          </div>
          <div className={classes.FooterItemContainer}>
            <div className={classes.FooterItemTitle}>End Date</div>
            <div className={classes.FooterItemText}>
              {formatDate(vestingTimeEnd)}
            </div>
          </div>
          <div className={classes.FooterItemContainer}>
            <div className={classes.FooterItemTitle}>Available Tokens</div>
            <div className={classes.FooterItemText}>
              {toParticipationInfo[0]
                ? (
                    BigNumber.from(toParticipationInfo[0]._hex) /
                    10 ** 18
                  ).toString()
                : 0}
            </div>
          </div>
          <div className={classes.FooterItemContainer}>
            <div className={classes.FooterItemTitle}>Received Tokens</div>
            <div className={classes.FooterItemText}>
              {toParticipationInfo[2]
                ? (
                    BigNumber.from(toParticipationInfo[2]._hex) /
                    10 ** 18
                  ).toString()
                : 0}
            </div>
          </div>
          <div className={classes.FooterItemContainer}>
            <div className={classes.FooterItemTitle}>% of Opened Tokens</div>
            <div className={classes.FooterItemText}>{widthdrawPercent}</div>
          </div>
          <div className={classes.FooterItemContainer}>
            <div className={classes.FooterItemTitle}>Type</div>
            <div className={classes.FooterItemText}>{type}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawElement;
