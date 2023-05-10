import { Dialog } from "@material-ui/core";
import { DialogContent } from "@mui/material";
import { toast } from "react-toastify";
import web3 from "web3";
import classes from "./PolygonModal.module.scss";

const PolygonModal = ({ isOpen, onClose }) => {
  const onChangeNetwork = async (desiredNetworkID) => {
    if (window.ethereum.networkVersion !== desiredNetworkID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(desiredNetworkID) }],
        });
        onClose();
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          toast.error(
            "The Polygon network was not connected to your wallet provider. To continue please add Polygon network to your wallet provider"
          );
        }
      }
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={"sm"}
    >
      {/* <div className={classes.warningIconDiv}>
      <img src={ErrorIcon} />
  </div> */}

      <DialogContent>
        <p className={classes.customErrorMessage}>
          You are currently using Polygon network, to continute using our
          website please switch back to BNB Smart Chain.
        </p>
      </DialogContent>
      <div
        className={classes.buttonDiv}
        onClick={() => {
          onChangeNetwork(
            parseInt(process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[0])
          );
        }}
      >
        <button>Switch to BNB Smart Chain</button>
      </div>
    </Dialog>
  );
};

export default PolygonModal;
