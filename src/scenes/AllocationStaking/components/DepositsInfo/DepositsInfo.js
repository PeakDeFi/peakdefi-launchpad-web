import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { useEffect, useState } from "react";
import V2Table from "../V2Table/V2Table.js";
import { useFetchDepositsInfo } from "./api/client.js";
import classes from "./DepositsInfo.module.scss";
import deposits_icon from "./images/deposits_icon.svg";

const DepositsInfo = () => {
  const { accounts } = useMergedProvidersState();

  const walletAddress = accounts[0] ?? "";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    { name: "hash", title: "Transaction ID" },
    { name: "amount", title: "Amount" },
    { name: "wallet", title: "Nickname" },
    { name: "time", title: "Created on" },
    { name: "type", title: "Transaction type" },
  ];

  const { data: depositsInfo } = useFetchDepositsInfo(
    walletAddress,
    currentPage,
    pageSize
  );

  const [depositsData, setDepositsData] = useState([]);

  useEffect(() => {
    if (!depositsInfo) return;

    setDepositsData(
      depositsInfo.data.deposits.map((e, index) => {
        return {
          hash: "..." + e.hash.slice(-10),
          amount: e.amount,
          wallet: e.wallet.slice(0, 7) + "..." + e.wallet.slice(-5),
          time: new Date(e.timestamp * 1000).toISOString().slice(0, 10),
          type: <b>{e.type.toUpperCase()}</b>,
        };
      })
    );
  }, [depositsInfo]);

  return (
    <>
      <div className={classes.Leaderboard}>
        {depositsData.length > 0 && (
          <>
            <header>
              <img src={deposits_icon} />
              <h1>Your deposits history</h1>
            </header>
            <main>
              <div className={classes.table}>
                <V2Table
                  columns={columns}
                  data={depositsData}
                  page={currentPage}
                  setPage={setCurrentPage}
                  size={pageSize}
                  setSize={setPageSize}
                  totalPages={depositsInfo.data.total}
                />
              </div>
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default DepositsInfo;
