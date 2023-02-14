import { Dialog } from "@mui/material";
import classes from "./ProviderDialog.module.scss";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../../../connector";
import MetamaskLogo from "../../../resources/LogoMeta.svg";
import WalletConnectLogo from "../../../resources/Vector.svg";
import Pattern from "../../../resources/Pattern.svg";
import { useDispatch } from "react-redux";
import { nextStep } from "../../../features/tourSlice";

const ProviderDialog = ({ show, setShow }) => {
  const { activate, deactivate, account } = useWeb3React();
  
  const dispatch = useDispatch();
  return (
    <div>
      <Dialog open={show} onClose={() => setShow(false)}>
        <div className={classes.ProviderDialog} data-tut={"select_provider"}>
          <div className={classes.title}>Select provider</div>
          <div className={classes.buttons}>
            <button
              className={classes.providerButton1}
              onClick={() => {
                activate(injected);
                setShow(false);
              }}
            >
              <img className={classes.inlineLogo} src={MetamaskLogo} />
            </button>

            <button
              className={classes.providerButton2}
              onClick={() => {
                activate(walletconnect);
                setShow(false);
                dispatch(nextStep());
              }}
            >
              <img className={classes.inlineLogo} src={WalletConnectLogo} />
            </button>
          </div>
          <img alt="" src={Pattern} />
        </div>
      </Dialog>
    </div>
  );
};

export default ProviderDialog;
