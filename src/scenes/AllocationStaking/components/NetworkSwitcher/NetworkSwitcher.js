import { Dialog } from "@material-ui/core";
import { DialogContent } from "@mui/material";
import { toast } from "react-toastify";
import web3 from "web3";
import classes from "./PolygonModal.module.scss";
import { useEffect, useState } from "react";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";

const NetworkSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { chainId } = useMergedProvidersState();
  const desiredChainId = parseInt(
    process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[0]
  );

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (chainId && chainId !== desiredChainId) {
      setIsOpen(true);
    } else if (chainId === desiredChainId) {
      setIsOpen(false);
    }
  }, [chainId, desiredChainId]);

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
          Currently you are not connected to BNB Smart Chain Network. Please
          switch in order to proceed with staking and deposit
        </p>
      </DialogContent>
      <div
        className={classes.buttonDiv}
        onClick={() => {
          onChangeNetwork(desiredChainId);
        }}
      >
        <button>Switch to BNB Smart Chain</button>
      </div>
    </Dialog>
  );
};

export default NetworkSwitcher;
