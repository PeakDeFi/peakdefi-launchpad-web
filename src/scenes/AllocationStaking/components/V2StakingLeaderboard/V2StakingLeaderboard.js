import classes from "./V2StakingLeaderboard.module.scss";
import { useState, useEffect } from "react";
import StarIcon from "./images/StarIcon.svg";
import Table from "../Table/Table";
import { useV2LeaderboardData } from "./api/client";
import V2Table from "../V2Table/V2Table";

const V2StakingLeaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    { name: "no", title: "#" },
    { name: "wallet", title: "Nickname" },
    { name: "number_of_rewards", title: "Rewards Amount" },
    { name: "number_of_referrals", title: "Referrals" },
  ];

  const { data: leaderboardData2 } = useV2LeaderboardData(currentPage);

  const [leaderBoardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    if (!leaderboardData2) return;

    setLeaderboardData(
      leaderboardData2.data.leaders.map((e, index) => {
        return {
          no: e[0],
          wallet: e[1],
          number_of_referrals: e[2],
          number_of_rewards: e[3],
        };
      })
    );
  }, [leaderboardData2]);

  return (
    <div className={classes.Leaderboard}>
      {leaderBoardData.length > 0 && (
        <>
          <header>
            <img src={StarIcon} />
            <h1>Leaderboard</h1>
          </header>
          <main>
            <div className={classes.table}>
              <V2Table
                columns={columns}
                data={leaderBoardData}
                page={currentPage}
                setPage={setCurrentPage}
                size={pageSize}
                setSize={setPageSize}
                totalPages={leaderboardData2.data.total}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default V2StakingLeaderboard;
