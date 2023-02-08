import { Dialog } from "@mui/material";
import classes from "./ProviderDialog.module.scss";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../../../connector";
import MetamaskLogo from "../../../resources/LogoMeta.svg";
import WalletConnectLogo from "../../../resources/Vector.svg";
import Pattern from "../../../resources/Pattern.svg";

const ProviderDialog = ({ show, setShow }) => {
  const { activate, deactivate, account } = useWeb3React();

  return (
    <>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        className={classes.ProviderDialogContainer}
      >
        <div className={classes.ProviderDialog}>
          <div className={classes.title}>Select provider</div>
          <div className={classes.buttons}>
            <button
              className={classes.providerButton1}
              onClick={() => {
                const { ethereum } = window;
                if (ethereum) {
                  activate(injected);
                  setShow(false);
                } else {
                  window.open(
                    "https://metamask.app.link/dapp/launchpad.peakdefi.com/",
                    "_parent",

                  );
                }
              }}
            >
              <img className={classes.inlineLogo} src={MetamaskLogo} />
            </button>

            <button
              className={classes.providerButton2}
              onClick={() => {
                activate(walletconnect);
                setShow(false);
              }}
            >
              <img className={classes.inlineLogo} src={WalletConnectLogo} />
            </button>
          </div>
          <img alt="" src={Pattern} />
        </div>
      </Dialog>
    </>
  );
};

export default ProviderDialog;
