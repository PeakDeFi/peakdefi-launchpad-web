import React, { useState, useEffect } from "react";
import classes from "./Header.module.scss";
import Logo from "../../resources/new_logo_text.svg";
import NewLogo from "../../resources/logo_white.svg";
import Person from "../../resources/person.svg";
import BG from "../BG/BG";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../../connector";
import Img from "../../logo.svg";
import {
  setAddress,
  setBalance,
  setDecimal,
  selectAddress,
} from "./../../features/userWalletSlice";
import { setBalance as setStakeBalance } from "./../../features/stakingSlice";
import {
  hooks,
  metaMask,
  walletConnect,
  walletConnectHooks,
} from "./ProviderDialog/Metamask";

import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import AccountIcon from "./images/AccountIcon.svg";
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, Popover, SwipeableDrawer } from "@mui/material";
import {
  tokenContractAddress,
  abi as tokenAbi,
} from "../AllocationStaking/components/StakeCard/services/consts";
import { ethers, providers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import store from "../../app/store";

import { Blockpass } from "./Blockpass";
import AccountDialog from "./components/accountDialog/AccountDialog";
import ErrorDialog from "../ErrorDialog/ErrorDialog";
import GiveAwayPanel from "./components/GiveawayPanel/GiveawayPanel";

import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import SocialsDrowdown from "./components/SocialsDropdown/SocialsDropdown";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";
import ProviderDialog from "./ProviderDialog/ProviderDialog";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import {
  abi,
  stakingContractAddress,
} from "../AllocationStaking/services/consts";
import { RpcProvider } from "../../consts/rpc";
import useMainTour from "../../hooks/useMainTour/useMainTour";
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
import { useMergedProvidersState } from "hooks/useMergedProvidersState/useMergedProvidersState";
import StakingButtonPopover from "./components/StakingButtonPopover/StakingButtonPopover";
import useTokenContract from "hooks/useTokenContract/useTokenContract";
import useStakingContract from "hooks/useStakingContract/useStakingContract";
import {
  useFetchDecimals,
  useFetchWalletBalance,
} from "scenes/AllocationStaking/API/hooks";

const { ethereum } = window;

function ButtonWeb({ dialog, setDialog }) {
  const { nextStepHandler } = useMainTour();
  const provider = useProviderHook();
  const { error } = useWeb3React();
  const { deactivate } = useWeb3React();
  const { tokenContract } = useTokenContract();
  const { stakingContract } = useStakingContract();

  const { accounts } = useMergedProvidersState();

  //const accounts = walletConnectHooks.useAccounts();

  const account = accounts?.length > 0 ? accounts[0] : null;
  const [errorDialog, setErrorDialog] = useState({
    show: false,
    message: "",
  });

  const [customErrorMessage, setCustomErrorMessage] = useState("");
  const [showProviderDialog, setShowProviderDialog] = useState(false);

  store.dispatch(setAddress(account));

  useEffect(() => {
    if (error) {
      if (!error) return;

      if (error.message?.includes("processing eth_requestAccounts")) {
        setCustomErrorMessage(
          "Please unlock your wallet before connecting it to Launchpad"
        );
        setErrorDialog({
          show: true,
          message: undefined,
        });
        return;
      } else if (error.message?.includes("Unsupported chain id")) {
        setCustomErrorMessage(
          "You are using wallet network that is not currently supported. Please switch to Binance Smart Chain network."
        );
        setErrorDialog({
          show: true,
          message: error,
        });
      } else if (error.message?.includes("No Ethereum provider")) {
        // setCustomErrorMessage("Wallet extention was not found. Please check if you have it installed in your browser");
      }
    }
  }, [error && error.name, error]);

  useEffect(() => {
    async function callback() {
      if (tokenContract && account && stakingContract) {
        console.log("ethereum", ethereum, account, ethereum && !!account);

        let tdecimals = await tokenContract?.decimals();
        let tbalance = !account ? 0 : await tokenContract?.balanceOf(account);

        const stakingInfo = await stakingContract?.userInfo(account);
        store.dispatch(
          setStakeBalance(parseInt(stakingInfo.amount.toString()))
        );

        store.dispatch(setDecimal(tdecimals));
        store.dispatch(setBalance(parseInt(tbalance.toString())));
      }
    }

    callback();
  }, [account, tokenContract, stakingContract]);

  useEffect(() => {
    try {
      metaMask?.activate(injected);
    } catch (error) {}
    //^added this in order to prevent alert dialogs from showing up if
    //user doesn't have an extention installed or doesn't use the correct network
    //on initial connection
  }, [metaMask]);

  const { data: walletBalance, refetch: refreshWalletBalance } =
    useFetchWalletBalance(account);

  const { data: decimals } = useFetchDecimals();

  return (
    <>
      <div style={{ overflow: "visible !important" }}>
        {!account && (
          <button
            className={classes.connectButton}
            data-tut={"connect_button"}
            onClick={() => {
              nextStepHandler();
              setShowProviderDialog(true);
            }}
          >
            Connect Wallet
          </button>
        )}

        {account && (
          <div
            className={classes.connectedButton}
            onClick={() => {
              setDialog(true);
            }}
          >
            <div className={classes.balanceDiv}>
              <span>
                <b>{(walletBalance / Math.pow(10, decimals)).toFixed(2)}</b>{" "}
                PEAK
              </span>
            </div>

            <div className={classes.splitter}></div>

            <div className={classes.addressDiv}>
              {account.slice(0, 4) +
                "..." +
                account.substring(account.length - 4, account.length)}
              <div className={classes.personIconDiv}>
                <img src={Person} className={classes.personIcon} />
              </div>
            </div>
          </div>
        )}
      </div>
      <AccountDialog
        show={dialog}
        setShow={setDialog}
        address={account}
        disconnect={deactivate}
      />
      <ErrorDialog
        show={errorDialog.show}
        message={errorDialog.message}
        setError={setErrorDialog}
        customMessage={customErrorMessage}
      />
      <ProviderDialog
        show={showProviderDialog}
        setShow={setShowProviderDialog}
      />
    </>
  );
}

function MobileAccount({ dialog, setDialog }) {
  const { accounts } = useMergedProvidersState();

  const userAddress = accounts[0] ?? "";
  const { data: decimals } = useFetchDecimals();

  const { data: walletBalance } = useFetchWalletBalance(userAddress);
  const balance = (walletBalance ?? 0) / 10 ** decimals;

  return (
    <div className={classes.mobileAccount}>
      <img src={AccountIcon} className={classes.accountIcon} />
      <div className={classes.userInfo} onClick={() => setDialog(true)}>
        <div>
          {"..." +
            userAddress.substring(userAddress.length - 8, userAddress.length)}
        </div>
        <div className={classes.balanceDiv}>{balance.toFixed(2)} PEAK</div>
      </div>
    </div>
  );
}

function MobileMenu(props) {
  const { activate, deactivate, account } = useWeb3React();
  const [showProviderDialog, setShowProviderDialog] = useState(false);

  const navigate = useNavigate();

  return (
    <div className={classes.mobileMenu}>
      <Drawer
        anchor={"top"}
        open={props.isOpen}
        onClose={() => props.closeMenu()}
        PaperProps={{
          elevation: 0,
          style: {
            backgroundColor: "transparent",
            borderRadius: "0 0 0 100vw",
          },
        }}
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 30, 255, 0.6)", transition: "1s" },
        }}
        SlideProps={{ direction: "down", timeout: 800 }}
      >
        <div className={classes.drawerCloseIconDiv}>
          <IconButton onClick={() => props.closeMenu()}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.MobileDrawer}>
          <div className={classes.drawerContent}>
            <h1
              onClick={() => {
                navigate("/");
                props.closeMenu();
              }}
            >
              Home
            </h1>
            <h1
              onClick={() => {
                navigate("/allocation-staking");
                props.closeMenu();
              }}
            >
              Staking
            </h1>
            <h1
              onClick={() => {
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSegvMul19PQnl5OE_QoUONKwlsGEOk6V_b_jLCrFaTaDDHwmQ/viewform?usp=sf_link",
                  "_blank"
                );
              }}
            >
              {" "}
              Apply for Sale
            </h1>
            <div>
              <IconButton
                onClick={() => {
                  window.open(
                    "https://twitter.com/PEAKDEFI?t=7TH5ILiejlCgvKHGB33q3Q&s=09",
                    "_blank"
                  );
                }}
              >
                <TwitterIcon style={{ color: "black", fontSize: "1.2em" }} />
              </IconButton>

              <IconButton
                style={{ marginRight: "0.5em" }}
                onClick={() => {
                  window.open("https://t.me/peakdefialertchannel", "_blank");
                }}
              >
                <TelegramIcon style={{ color: "black", fontSize: "1.2em" }} />
              </IconButton>
            </div>
            <hr style={{ visibility: account ? "" : "hidden" }} />
            {account && (
              <MobileAccount
                dialog={props.dialog}
                setDialog={props.setDialog}
              />
            )}

            {!account && (
              <button
                className={classes.mobileConnectWallet}
                onClick={() => {
                  setShowProviderDialog(true);
                }}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </Drawer>

      <ProviderDialog
        show={showProviderDialog}
        setShow={setShowProviderDialog}
      />
    </div>
  );
}

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showGiveaway, setShowGiveaway] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const telegramLinks = [
    {
      text: "PEAKDEFI Alerts",
      link: "https://t.me/peakdefialertchannel",
    },

    {
      text: "PEAKDEFI Official",
      link: "https://t.me/peakdefi_official",
    },
  ];

  const transfer = () => {
    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from: ethereum.selectedAddress,
            to: "0xC5F38D5CAc90a03a3d6B8635eE4b44ce19583b4B",
            value: "0x29a2241af62c0000",
            gasPrice: "0x09184e72a000",
            gas: "0x2710",
          },
        ],
      })
      .then((txHash) => {})
      .catch((error) => console.error);
  };

  return (
    <>
      <div className={classes.Header}>
        <BG />

        <div
          className={classes.logo}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={Logo} alt="PeakDefi Logo" />
        </div>

        {!location.pathname.includes("login") && (
          <>
            <div className={classes.button}>
              <div className={classes.buttonWeb}>
                <SocialsDrowdown
                  link="https://twitter.com/PEAKDEFI?t=7TH5ILiejlCgvKHGB33q3Q&s=09"
                  icon={
                    <TwitterIcon
                      style={{ color: "white", fontSize: "1.2em" }}
                    />
                  }
                />

                <SocialsDrowdown
                  icon={
                    <TelegramIcon
                      style={{ color: "white", fontSize: "1.2em" }}
                    />
                  }
                  linkList={telegramLinks}
                />

                {/* TODO: REMOVE THIS CONDITION ONCE V3 IS APPROVED FOR PROD */}

                <StakingButtonPopover>
                  <button
                    aria-describedby={id}
                    className={classes.applyForIdo}
                    onClick={handleClick}
                  >
                    Stake
                  </button>
                </StakingButtonPopover>

                {false && (
                  <button
                    aria-describedby={id}
                    className={classes.applyForIdo}
                    onClick={handleClick}
                  >
                    Stake
                  </button>
                )}

                <button
                  className={classes.applyForIdo}
                  onClick={() => {
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLSegvMul19PQnl5OE_QoUONKwlsGEOk6V_b_jLCrFaTaDDHwmQ/viewform?usp=sf_link",
                      "_blank"
                    );
                  }}
                >
                  Apply for Sale
                </button>
                <ButtonWeb setDialog={setShowDialog} dialog={showDialog} />
              </div>
            </div>

            <div className={classes.buttonMobile}>
              <IconButton onClick={() => setShowMobileMenu(true)}>
                <MenuIcon className={classes.iconMobile} />
              </IconButton>
              {/* <img onClick={(ev) => { this.setState({ showMobileMenu: !this.state.showMobileMenu }) }} src={Img} /> */}
            </div>

            <div className={classes.hideMenu}>
              <MobileMenu
                closeMenu={(ev) => {
                  setShowMobileMenu(false);
                }}
                isOpen={showMobileMenu}
                setDialog={setShowDialog}
                dialog={showDialog}
                setShowGiveaway={setShowGiveaway}
              />
            </div>
          </>
        )}
      </div>
      <GiveAwayPanel show={showGiveaway} setShow={setShowGiveaway} />
    </>
  );
};

export default Header;
