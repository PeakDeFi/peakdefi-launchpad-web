import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { useEffect, useState } from "react";
import V2Table from "../V2Table/V2Table";
import { useFetchReferralRewardsInfo } from "./api/client";
import classes from "./ReferralRewardsInfo.module.scss";
import history_icon from "./images/history-icon.svg";

const ReferralRewardsInfo = () => {
  const { accounts } = useMergedProvidersState();

  const walletAddress = accounts[0] ?? "";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    { name: "amount", title: "Amount" },
    { name: "wallet", title: "Nickname" },
    { name: "time", title: "Created on" },
    { name: "level", title: "Level" },
  ];

  const { data: remoteReferralRewardsInfo } = useFetchReferralRewardsInfo(
    walletAddress,
    currentPage,
    pageSize
  );

  const [referralRewardsData, setReferralRewardsData] = useState([]);

  useEffect(() => {
    if (!remoteReferralRewardsInfo) return;

    setReferralRewardsData(
      remoteReferralRewardsInfo.data.referral_rewards.map((e, index) => {
        return {
          amount: e.amount + " PEAK",
          wallet: e.referral.slice(0, 7) + "..." + e.referral.slice(-5),
          time: new Date(e.timestamp * 1000).toISOString().slice(0, 10),
          level: <b>{e.level}</b>,
        };
      })
    );
  }, [remoteReferralRewardsInfo]);

  return (
    <>
      <div className={classes.Leaderboard}>
        {referralRewardsData.length > 0 && (
          <>
            <header>
              <img src={history_icon} />
              <h1>Referal transaction history</h1>
            </header>
            <main>
              <div className={classes.table}>
                <V2Table
                  columns={columns}
                  data={referralRewardsData}
                  page={currentPage}
                  setPage={setCurrentPage}
                  size={pageSize}
                  setSize={setPageSize}
                  totalPages={remoteReferralRewardsInfo.data.total}
                />
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default ReferralRewardsInfo;
