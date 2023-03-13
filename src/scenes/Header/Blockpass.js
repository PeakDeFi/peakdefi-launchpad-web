import React, { useEffect, useState } from "react";
import classes from "./Header.module.scss";
import { useWeb3React } from "@web3-react/core";
import CloseIcon from "@mui/icons-material/Close";
import { getUserDataKYC } from "./API/blockpass";
import { useSelector } from "react-redux";
import useMainTour from "../../hooks/useMainTour/useMainTour";

export function Blockpass(props) {
  const { unblockPropagation } = useMainTour();
  const [showVerify, setShowVerify] = useState(false); //change to false
  const [isPending, setIsPending] = useState(false);

  const stakingBalance = useSelector((state) => state.staking.balance);
  const decimals = useSelector((state) => state.userWallet.decimal);

  const { activate, deactivate, account, error } = useWeb3React();

  const loadBlockpassWidget = () => {
    const blockpass = new window.BlockpassKYCConnect(
      "peakdefi_launchpad_c0f15", // service client_id from the admin console
      {
        env: "prod",
        refId: account,
      }
    );

    blockpass.startKYCConnect();
  };

  useEffect(() => {
    if (account) {
      return loadBlockpassWidget();
    }
  }, [account]);

  useEffect(async () => {
    if (account === undefined) return;

    if (stakingBalance / 10 ** decimals < 10000) {
      //if balance is lower than 1000 PEAK do not let user pass KYC verification
      setShowVerify(false);
      return;
    }

    try {
      await getUserDataKYC(account)
        .then((response) => {
          if (response.data.data.status === "approved") {
            setShowVerify(false);
          } else {
            setIsPending(true);
            setShowVerify(true);
          }
        })
        .catch((error) => {
          setIsPending(false);
          setShowVerify(true);
        });
    } catch (error) {
      setShowVerify(true);
    }
  }, [account, stakingBalance]);

  return (
    <div
      className={account ? classes.kyc : classes.hide}
      style={{ display: showVerify ? "" : "none" }}
    >
      <div
        className={classes.text}
        style={{ display: isPending ? "none" : "" }}
      >
        <div>
          {" "}
          You need to verify yourself before you can participate in IDOs.{" "}
        </div>
        <button id="blockpass-kyc-connect" onClick={unblockPropagation}>
          Start the KYC process.
        </button>
      </div>

      {isPending && (
        <div className={classes.greentext}>
          {" "}
          Blockpass verification pending. Once it's complete you can participate
          in sales{" "}
        </div>
      )}

      <button
        className={classes.closeButton}
        onClick={() => {
          setShowVerify(false);
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}
