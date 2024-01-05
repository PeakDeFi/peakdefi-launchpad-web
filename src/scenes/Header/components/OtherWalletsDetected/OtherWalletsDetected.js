import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./OtherWalletsDetected.module.scss";

const OtherWalletsDetected = ({ isOpen, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={classes.otherWalletsDetected}
      maxWidth={"40vw"}
    >
      <DialogTitle className={classes.dialogTitle}>
        <h1>Conflicting extensions detected</h1>
        <IconButton onClick={onClose}>
          <CloseIcon style={{ color: "black" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <p className={classes.infoMessage}>
          We detected other wallet extensions installed in your browser. Due to
          incompatibility between MetaMask and other wallet providers, you
          cannot connect your wallet.
        </p>
        <p>
          To connect your wallet go to your browser's extensions manager and
          disable other cryptocurrency wallets.
        </p>
        <div className={classes.buttonDiv} onClick={onClose}>
          <button>OK</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtherWalletsDetected;
