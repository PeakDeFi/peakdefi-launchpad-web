import { Dialog } from "@mui/material";
import classes from "./ProviderDialog.module.scss";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../../../connector";
import MetamaskLogo from "../../../resources/LogoMeta.svg";
import WalletConnectLogo from "../../../resources/Vector.svg";
import Pattern from "../../../resources/Pattern.svg";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../features/tourSlice";
import useMainTour from "../../../hooks/useMainTour/useMainTour";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import OtherWalletsDetected from "../components/OtherWalletsDetected/OtherWalletsDetected";
import { metaMask, hooks, walletConnect, walletConnectHooks } from "./Metamask";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";

const ProviderDialog = ({ show, setShow }) => {
  const { activate, deactivate, account } = useWeb3React();
  const { nextStepHandler } = useMainTour();

  const [isOWDDialogOpen, setIsOWDDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const connectWallet = async () => {
    const { ethereum } = window;
    if (ethereum.detected && ethereum.detected.some((e) => e.isMetaMask)) {
      //TELL THE USER YOU HAVE OTHER EXTENSIONS ENABLED
      setIsOWDDialogOpen(true);
    } else {
      activate(injected);
    }
  };

  return (
    <>
      <Dialog open={show} onClose={() => setShow(false)}>
        <div className={classes.ProviderDialog} data-tut={"select_provider"}>
          <div className={classes.title}>Select provider</div>
          <div className={classes.buttons}>
            <button
              className={classes.providerButton1}
              onClick={() => {
                if (window.ethereum) {
                  // connectWallet();
                  metaMask.activate(injected);
                  setShow(false);
                } else {
                  window.open(
                    "https://metamask.app.link/dapp/launchpad.peakdefi.com/"
                  );
                }
              }}
            >
              <img className={classes.inlineLogo} src={MetamaskLogo} />
            </button>

            <button
              className={classes.providerButton2}
              onClick={() => {
                setTimeout(() => {
                  walletConnect
                    .connectEagerly()
                    .then((data) => {
                      toast.success("Wallet connected successfully");
                    })
                    .catch((error) => {
                      walletConnect
                        .activate()
                        .then((data) => {
                          toast.success("Wallet connected successfully");
                        })
                        .catch((error) => {
                          toast.error(
                            "Your wallet app does not have supported chains"
                          );
                        });
                    });
                }, 500);
                setShow(false);
                nextStepHandler();
              }}
            >
              <img className={classes.inlineLogo} src={WalletConnectLogo} />
            </button>
          </div>
          <img alt="" src={Pattern} />
        </div>
      </Dialog>

      <OtherWalletsDetected
        isOpen={isOWDDialogOpen}
        onClose={() => setIsOWDDialogOpen(false)}
      />
    </>
  );
};

export default ProviderDialog;
