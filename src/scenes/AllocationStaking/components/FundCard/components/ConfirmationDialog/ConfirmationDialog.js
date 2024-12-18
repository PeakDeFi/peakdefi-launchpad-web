import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Waves from "./images/waves.svg";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./ConfirmationDialog.module.scss";
import { Checkbox } from "@mui/material";
import useMainTour from "../../../../../../hooks/useMainTour/useMainTour";

const ConfirmationDialog = ({ open, setOpen, callback, amount }) => {
  const { unblockPropagation } = useMainTour();
  const [agree, setAgree] = useState(false);

  return (
    <>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle className={classes.dialogTitle}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon style={{ color: "black" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.content} data-tut={"stake_dialog"}>
          <h1>Stake PEAK</h1>
          <p>
            Stake PEAK now, but please keep on mind that your penalty time will
            be reset after staking more PEAK tokens.
          </p>
          <p>
            Please check this box in order to agree to proceed.{" "}
            <span>
              <Checkbox
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
            </span>
          </p>

          <h2>Stake Amount</h2>
          <h3>{parseFloat(amount).toFixed(2)} PEAK</h3>

          <button
            disabled={!agree}
            className={classes.claimButton}
            onClick={() => {
              unblockPropagation();
              callback();
            }}
          >
            Stake PEAK
          </button>
        </DialogContent>
        <img src={Waves} className={classes.waves} />
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
