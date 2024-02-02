import web3 from "web3";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import { Dialog } from "@material-ui/core";
import { DialogContent } from "@mui/material";
import classes from "./WhitelistNetworkSwitcher.module.scss";

const WhitelistNetworkSwitcher = ({ isWhitelist }) => {
  const { chainId, accounts } = useMergedProvidersState();
  const [isOpen, setIsOpen] = useState(false);

  const onChangeNetwork = async (desiredNetworkID) => {
    if (window.ethereum.networkVersion !== desiredNetworkID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(desiredNetworkID) }],
        });

        setIsOpen(false);
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

  useEffect(() => {
    if (!chainId) {
      return;
    }
    if (
      accounts &&
      chainId !==
        parseInt(process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[0]) &&
      isWhitelist
    ) {
      //onChangeNetwork(process.env.REACT_APP_SUPPORTED_CHAIN_IDS.split(",")[0]);
      setIsOpen(true);
    }
  }, [chainId, isWhitelist]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogContent>
          <p className={classes.customErrorMessage}>
            You are not whitelisted for this project. If you intend to get
            whitelisted please switch to BNB Smart Chain Network
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
    </>
  );
};

export default WhitelistNetworkSwitcher;
