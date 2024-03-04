import React from "react";
import { ethers, BigNumber } from "ethers";

import classes from "./AllocationStaking.module.scss";
import StakeCard from "./components/StakeCard/StakeCard";
import StakingStats from "./components/StakingStats/StakingStats";
import TotalsSection from "./components/TotalsSection/TotalsSection";
import ValuePriceCard from "./components/ValuePriceCard/ValuePriceCard";
import WithdrawCard from "./components/WithdrawCard/WithdrawCard";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as TooltipRecharts,
} from "recharts";

import { selectAddress, setDecimal } from "./../../features/userWalletSlice";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import InfoDialog from "./components/InfoDialog/InfoDialog";

import { getPrice, getStakeStatistic } from "./API/staking";

import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

import { useCookies } from "react-cookie";
import { useLocation, useSearchParams } from "react-router-dom";
import ReferralsCard from "./components/ReferralsCard/ReferralsCard";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import RefereesTable from "./components/RefereesList/RefereesTable";
import QnA from "../QnA/QnA";
import ReferralsSection from "./components/ReferralsSection/ReferralsSection";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import useJSONContract from "hooks/useJSONContract/useJSONContract";
import { useSelectStakingVersion } from "hooks/useSelectStakingVersion/useSelectStakingVersion";
import StakingVersionSwitch from "./components/StakingVersionSwitch/StakingVersionSwitch";
import { useJSONStakingContract } from "hooks/useJSONStakingContract/useJSONStakingContract";
import useStakingContract from "hooks/useStakingContract/useStakingContract";
import useTokenContract from "hooks/useTokenContract/useTokenContract";
import V2StakingLeaderboard from "./components/V2StakingLeaderboard/V2StakingLeaderboard";
import DepositsInfo from "./components/DepositsInfo/DepositsInfo";
import ReferralRewardsInfo from "./components/ReferralRewardsInfo/ReferralRewardsInfo";
import {
  useFetchDecimals,
  useFetchMyStakingStats,
  useFetchTotalStakingStats,
} from "./API/hooks";
import { useMemo } from "react";
import { useFetchPrice } from "./API/client";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import FundCard from "./components/FundCard/FundCard";
import NetworkSwitcher from "./components/NetworkSwitcher/NetworkSwitcher";

const AllocationStaking = ({ externalStakingVersion = 1 }) => {
  const showPrice =
    process.env.REACT_APP_API_URL === "https://api-dev.peakdefi.com/"
      ? false
      : true;
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  const location = useLocation();

  const { stakingVersion, switchToStakingV1, switchToStakingV2 } =
    useSelectStakingVersion();

  const dispatch = useDispatch();
  const { accounts } = useMergedProvidersState();
  const walletAddress = accounts[0];

  const [
    { data: userInfo, refetch: refetchUserInfo },
    { data: stakingPercent, refetch: refetchStakingPercent },
    { data: pending, refetch: refetchPending },
  ] = useFetchMyStakingStats();

  const mainText = `Stake PEAK to get Sale allocations and earn ${parseInt(
    stakingPercent?._hex ?? 20
  )}% APY`;
  const [totalValueLocked, setTotalValueLocked] = useState(0);
  const [stakeBalance, setStakeBalance] = useState(0);
  const [graphData, setGraphData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(["referrer_wallet_address"]);

  const [
    { data: totalDeposits, refetch: refetchTotalDeposits },
    { data: paidOut, refetch: refetchPaidOut },
  ] = useFetchTotalStakingStats();

  const completeRefresh = () => {
    refetchUserInfo();
    refetchStakingPercent();
    refetchPending();
    refetchTotalDeposits();
    refetchPaidOut();
  };

  const { data: decimals } = useFetchDecimals();

  const { tokenContract } = useTokenContract();

  //TODO: remove this once all global store references to decimals
  //are replaced with the correspinding hook
  useEffect(() => {
    dispatch(setDecimal(decimals));
  }, [decimals]);

  const { data: price } = useFetchPrice();

  const memoStakingStats = useMemo(() => {
    return [
      {
        title: "Current APY",
        value: parseInt(stakingPercent?._hex ?? 0),
        append: "%",
        info:
          "We offer a guaranteed fixed APY of " +
          parseInt(stakingPercent?._hex ?? 0) +
          "%",
      },

      {
        title: "My staked PEAK",
        value: userInfo?.amount,
        append: "PEAK",
        info: "The total number of your PEAK tokens that are currently locked in our staking pool",
        subvalue: {
          value: userInfo?.amount * price,
          append: "$",
        },
      },

      {
        title: "My earned PEAK",
        value: pending,
        append: "PEAK",
        info: "The total number of PEAK tokens you have earned through the staking process",
        subvalue: {
          value: pending * price,
          append: "$",
        },
      },
    ];
  }, [userInfo, stakingPercent, pending, price]);

  const memoTotals = useMemo(() => {
    setTotalValueLocked(price * (totalDeposits / Math.pow(10, decimals)));

    return [
      {
        title: "Total PEAK staked",
        info: "The total amount of PEAK tokens that are staked on our launchpad",
        value: {
          value: parseInt(totalDeposits?.toString() ?? 0),
        },
        subvalue: {
          value: totalDeposits * price,
          prepend: "$",
        },
      },

      {
        title: "Total Rewards distributed",
        info: "The total amount of PEAK token rewards we distributed to all stakers on our launchpad since launch.",
        value: {
          value: paidOut,
        },
        subvalue: {
          value: paidOut * price,
          prepend: "$",
        },
      },
    ];
  }, [totalDeposits, paidOut, price, decimals]);

  const saveReferrerWallet = () => {
    if (
      !cookies.referrer_wallet_address &&
      searchParams.get("referrer_wallet_address")
    ) {
      setCookie(
        "referrer_wallet_address",
        searchParams.get("referrer_wallet_address"),
        {
          expires: new Date(Date.now() + 48 * 60 * 60 * 1000),
        }
      );
    }
  };

  //listeners
  useEffect(() => {
    getStakeStatistic().then((response) => {
      setGraphData(response.data.data);
    });
    saveReferrerWallet();
  }, []);

  useEffect(() => {
    if (externalStakingVersion === 2) {
      switchToStakingV2();
    } else {
      switchToStakingV1();
    }
  }, [externalStakingVersion]);

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 200, pv: 2400, amt: 2400 },
  ];

  return (
    <div className={classes.allocationStaking}>
      <div className={classes.pageTitle}>
        <div className={classes.mainText}>
          <div>
            <span>{mainText}</span>
            <Tooltip
              title={`Simply stake your PEAK tokens to earn ${parseInt(
                stakingPercent?._hex ?? 10
              )}% APY and receive Sale pool allocations for our upcoming projects.`}
              enterTouchDelay={0}
              leaveTouchDelay={6000}
            >
              <InfoIcon />
            </Tooltip>
          </div>
        </div>
        {/* <ReferralsCard /> */}

        {/*<div className={classes.infoButton} onClick={() => { setShowInfoDialog(true); }}>
                    Info
                </div>*/}
      </div>

      <div className={classes.vpCard}>
        {showPrice && (
          <ValuePriceCard totalValueLocked={totalValueLocked} price={price} />
        )}
      </div>
      {graphData.length > 0 && (
        <>
          <div>
            <div className={classes.chatTitle}> PEAK Staking Amount </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <LineChart
                width={1000}
                height={300}
                data={graphData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="label" />
                <YAxis width={100} />
                <Line
                  type="monotone"
                  dataKey="peak_amount"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="peak_price" stroke="#82ca9d" />
                <Line
                  type="monotone"
                  dataKey="stake_amount_usd"
                  stroke="#82ca9d"
                />
                <TooltipRecharts />
              </LineChart>
            </div>
          </div>
          <div>
            <div className={classes.chatTitle}> PEAK TVL </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <LineChart
                width={1000}
                height={300}
                data={graphData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="label" />
                <YAxis width={100} />
                <Line type="monotone" dataKey="peak_price" stroke="#82ca9d" />
                <Line
                  type="monotone"
                  dataKey="stake_amount_usd"
                  stroke="#82ca9d"
                />
                <TooltipRecharts />
              </LineChart>
            </div>
          </div>
          <div>
            <div className={classes.chatTitle}> PEAK Price </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <LineChart
                width={1000}
                height={300}
                data={graphData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="label" />
                <YAxis width={100} />
                <Line type="monotone" dataKey="peak_price" stroke="#82ca9d" />
                <TooltipRecharts />
              </LineChart>
            </div>
          </div>
        </>
      )}

      <div className={classes.switcherContainer}>
        <StakingVersionSwitch />
      </div>

      {walletAddress === "0xf868b39dE670fc4384CF8c290883A8139aF3296c" && (
        <div className={classes.pageContent}>
          <div className={classes.column}>
            <FundCard price={price} update={completeRefresh} />
          </div>
          <div className={classes.column}></div>
        </div>
      )}

      <div className={classes.pageContent}>
        <div className={classes.column}>
          <StakeCard price={price} update={completeRefresh} />
          {window.innerWidth > 900 && (
            <StakingStats content={memoStakingStats} />
          )}
          {window.innerWidth <= 900 && (
            <WithdrawCard
              updateInfo={completeRefresh}
              balance={stakeBalance}
              price={price}
              decimals={decimals}
              update={completeRefresh}
            />
          )}
        </div>

        <div className={classes.column}>
          {window.innerWidth > 900 && (
            <WithdrawCard
              updateInfo={completeRefresh}
              balance={stakeBalance}
              price={price}
              decimals={decimals}
              update={completeRefresh}
            />
          )}
          {window.innerWidth <= 900 && (
            <StakingStats content={memoStakingStats} />
          )}
          <TotalsSection content={memoTotals} />
        </div>
      </div>
      {/* {stakingVersion === 2 && <ReferralsSection />} */}

      <RefereesTable />
      {/* {stakingVersion === 2 && <ReferralRewardsInfo />} */}
      {/* {stakingVersion === 2 ? <V2StakingLeaderboard /> : <Leaderboard />} */}
      {stakingVersion === 2 && <DepositsInfo />}

      <QnA />

      <InfoDialog show={showInfoDialog} setShow={setShowInfoDialog} />
      <NetworkSwitcher />
    </div>
  );
};

export default AllocationStaking;
