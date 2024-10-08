import { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import WalletIcon from "./images/WalletIcon.svg";
import TextField from "@mui/material/TextField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Snackbar from "@mui/material/Snackbar";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../../../../features/stakingSlice";
import {
  setAddress,
  setBalance as walletBalance,
} from "../../../../features/userWalletSlice";
import { metaMask, hooks } from "../../ProviderDialog/Metamask";

import classes from "./../accountDialog/AccountDialog.module.scss";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import {
  useFetchDecimals,
  useFetchWalletBalance,
} from "scenes/AllocationStaking/API/hooks";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

const AccountDialog = ({ show, setShow, address, disconnect }) => {
  const provider = useProviderHook();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [showSnack, setShowSnack] = useState({ show: false, message: "" });
  const [network, setNetwork] = useState({ name: "BSC" });

  const { accounts } = useMergedProvidersState();
  const { data: balance } = useFetchWalletBalance(accounts[0] ?? "");
  const { data: decimals } = useFetchDecimals();

  const copiedToClipboard = () =>
    toast.info("Address copied to clipboard", {
      icon: ({ theme, type }) => (
        <ContentCopyIcon style={{ color: "rgb(53, 150, 216)" }} />
      ),
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const walletDisconnected = () => {
    toast.success("Wallet successfully disconnected", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(setBalance(0));
    dispatch(walletBalance(0));
    dispatch(setAddress(null));
  };

  useEffect(async () => {
    if (!window.ethereum) return;

    console.log("provider", provider);
    const addresses = await provider?.listAccounts();
    const network = await provider?.getNetwork();
    setNetwork({ ...network, name: "BSC" });
  }, [address]);

  return (
    <>
      <Dialog
        onClose={() => {
          setShow(false);
        }}
        open={show}
        className={classes.dialog}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>
          <div className={classes.dialogHeader}>
            <div>Account</div>

            <CloseIcon
              className={classes.closeIcon}
              onClick={() => {
                setShow(false);
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          {
            <div className={classes.walletInfo}>
              <div className={classes.walletIconWrapper}>
                <AccountBalanceWalletIcon className={classes.walletIcon} />
              </div>
              <div className={classes.infoContainer}>
                <div className={classes.infoItem}>
                  <h3>Balance</h3>
                  <p>{(balance / Math.pow(10, decimals)).toFixed(4)} PEAK</p>
                </div>

                <div className={classes.infoItem}>
                  <h3>Network </h3>
                  <p>{network.name}</p>
                </div>

                <div className={classes.infoItem}>
                  <h3>Wallet</h3>
                  <p>{"Metamask"}</p>
                </div>
              </div>
            </div>
          }

          <div className={classes.addressField}>
            <TextField
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="filled"
              label="Wallet address"
              defaultValue={address}
            />
          </div>

          <div className={classes.actions}>
            <div
              className={classes.element}
              onClick={() => {
                navigator.clipboard.writeText(address);
                copiedToClipboard();
              }}
            >
              <ContentCopyIcon />
              <div>Copy Address</div>
            </div>

            {/* <div className={classes.element} onClick={() => {
                            console.log(Object.keys(metaMask.provider._events.disconnect))
                            metaMask.provider._events.disconnect()
                            // metaMask.deactivate();
                            setShow(false);  walletDisconnected();
                        }}>
                            <ExitToAppIcon />
                            <div>
                                Disconnect Wallet
                            </div>
                        </div> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountDialog;
