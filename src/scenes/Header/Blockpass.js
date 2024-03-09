import React, { useEffect, useState } from "react";
import classes from "./Header.module.scss";
import { useWeb3React } from "@web3-react/core";
import CloseIcon from "@mui/icons-material/Close";
import { getUserDataKYC } from "./API/blockpass";
import { useSelector } from "react-redux";
import useMainTour from "../../hooks/useMainTour/useMainTour";
import { hooks, metaMask } from "./ProviderDialog/Metamask";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import {
  useFetchDecimals,
  useFetchMyStakingStats,
} from "scenes/AllocationStaking/API/hooks";
import { kycBypassers } from "consts/kyc";

export function Blockpass(props) {
  const { unblockPropagation } = useMainTour();
  const [showVerify, setShowVerify] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { data: decimals } = useFetchDecimals();

  const [{ data: userInfo }] = useFetchMyStakingStats();

  const stakingBalance = userInfo?.amount ?? 0;

  const { accounts } = useMergedProvidersState();
  const account = accounts?.length > 0 ? accounts[0] : null;

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

  useEffect(() => {
    const callBack = async () => {
      if (account === undefined) return;

      if (kycBypassers.includes(account)) {
        setShowVerify(false);
        return;
      }

      if (stakingBalance / (10 ** decimals) < 1000) {
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
    };

    callBack();
  }, [account, decimals, stakingBalance]);

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
          You need to verify yourself before you can participate in Sales.{" "}
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
