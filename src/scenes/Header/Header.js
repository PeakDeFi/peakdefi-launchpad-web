import React, { useState, useEffect } from "react";
import classes from "./Header.module.scss"
import Logo from '../../resources/new_logo_text.svg';
import NewLogo from '../../resources/logo_white.svg'
import Person from '../../resources/person.svg';
import BG from '../BG/BG'
import { useWeb3React } from '@web3-react/core'
import { injected, walletconnect } from '../../connector'
import Img from '../../logo.svg'
import { setAddress, setBalance, setDecimal, selectAddress } from './../../features/userWalletSlice';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import AccountIcon from './images/AccountIcon.svg'
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton, SwipeableDrawer } from "@mui/material";
import { tokenContractAddress, abi as tokenAbi } from "../AllocationStaking/components/StakeCard/services/consts";
import { ethers, providers } from "ethers";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

import store from "../../app/store";


import { Blockpass } from "./Blockpass";
import AccountDialog from "./components/accountDialog/AccountDialog";
import ErrorDialog from "../ErrorDialog/ErrorDialog";
import GiveAwayPanel from "./components/GiveawayPanel/GiveawayPanel";

import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import SocialsDrowdown from "./components/SocialsDropdown/SocialsDropdown";
import { rpcWalletConnectProvider } from "../../consts/walletConnect";


const { ethereum } = window;


function ButtonWeb({ dialog, setDialog }) {
    const { activate, deactivate, account, error } = useWeb3React();
    const [errorDialog, setErrorDialog] = useState({
        show: false,
        message: ''
    });

    const [customErrorMessage, setCustomErrorMessage] = useState('');

    store.dispatch(setAddress(account));

    const balance = useSelector(state => state.userWallet.balance);
    const decimals = useSelector(state => state.userWallet.decimal);

    useEffect(() => {
        if (error) {
            console.log("WALLET CONNECTION ERROR CAUGHT", error)
            console.log("ERROR NAME: ", error.name);
            console.log("ERROR MESSAGE: ", error.message);

            if (!error)
                return

            if (error.message.includes("processing eth_requestAccounts")) {
                setCustomErrorMessage("Please unlock your wallet before connecting it to Launchpad")
                setErrorDialog({
                    show: true,
                    message: undefined
                })
                return;
            }
            else if (error.message.includes("Unsupported chain id")) {
                setCustomErrorMessage('You are using wallet network that is not currently supported. Please switch to Binance Smart Chain network');
            }
            else if (error.message.includes("No Ethereum provider")) {
                setCustomErrorMessage("Wallet extention was not found. Please check if you have it installed in your browser");
            }

            setErrorDialog({
                show: true,
                message: error
            })


        }
    }, [error && error.name, error])

    useEffect(() => {
        async function callback() {
            if (ethereum && !!account) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                let contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
                let tdecimals = await contract.decimals();
                let tbalance = !account ? 0 : await contract.balanceOf(account);
                store.dispatch(setDecimal(tdecimals));
                store.dispatch(setBalance(parseInt(tbalance.toString())));
            }else if(!!account){
                const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider)
                const signer = web3Provider.getSigner();
                let contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
                let tdecimals = await contract.decimals();
                let tbalance = !account ? 0 : await contract.balanceOf(account);
                store.dispatch(setDecimal(tdecimals));
                store.dispatch(setBalance(parseInt(tbalance.toString())));
            }

        }
        callback();
    }, [account]);

    useEffect(() => {
        console.log("Initial wallet connect");
        activate(injected, () => {
            console.log("NON-CRITICAL: initial wallet connection failed")
        });
        //^added this in order to prevent alert dialogs from showing up if
        //user doesn't have an extention installed or doesn't use the correct network
        //on initial connection
    }, [])

    return (
        <>
            <div>

                {!account &&
                    <button
                        className={classes.connectButton}
                        onClick={() => {
                            activate(injected);
                        }}
                    >
                        Connect wallet
                    </button>
                }

                {account &&
                    <div className={classes.connectedButton}>

                        <div className={classes.balanceDiv}>
                            <span><b>{(balance / Math.pow(10, decimals)).toFixed(2)}</b>   PEAK</span>
                        </div>

                        <div className={classes.splitter}>
                        </div>

                        <div
                            className={classes.addressDiv}
                            onClick={() => {
                                setDialog(true);
                            }}
                        >
                            {"..." + account.substring(account.length - 8, account.length)}
                            <div className={classes.personIconDiv}>
                                <img src={Person} className={classes.personIcon} />
                            </div>
                        </div>

                    </div>
                }
            </div>
            <AccountDialog show={dialog} setShow={setDialog} address={account} disconnect={deactivate} />
            <ErrorDialog show={errorDialog.show} message={errorDialog.message} setError={setErrorDialog} customMessage={customErrorMessage} />
        </>
    );
}

function MobileAccount({ dialog, setDialog }) {
    const userAddress = useSelector(state => state.userWallet.address)
    const balance = useSelector(state => state.userWallet.balance / (10 ** state.userWallet.decimal));

    return (
        <div className={classes.mobileAccount}>
            <img src={AccountIcon} className={classes.accountIcon} />
            <div className={classes.userInfo} onClick={() => setDialog(true)}>
                <div>{"..." + userAddress.substring(userAddress.length - 8, userAddress.length)}</div>
                <div className={classes.balanceDiv}>{balance.toFixed(2)} PEAK</div>
            </div>
        </div>
    )
}

function MobileMenu(props) {
    const { activate, deactivate, account } = useWeb3React();

    const navigate = useNavigate();

    return (
        <div className={classes.mobileMenu}>



            <Drawer
                anchor={'top'}
                open={props.isOpen}
                onClose={() => props.closeMenu()}
                PaperProps={{ elevation: 0, style: { backgroundColor: "transparent", borderRadius: '0 0 0 100vw' } }}
                BackdropProps={{ style: { backgroundColor: 'rgba(0, 30, 255, 0.6)', transition: '1s' } }}
                SlideProps={{ direction: 'down', timeout: 800 }}
            >
                <div className={classes.drawerCloseIconDiv}>
                    <IconButton onClick={() => props.closeMenu()}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className={classes.MobileDrawer}>

                    <div className={classes.drawerContent}>
                        <h1 onClick={() => { navigate('/'); props.closeMenu(); }}>Home</h1>
                        <h1 onClick={() => { navigate('/sales'); props.closeMenu(); }}>Sales</h1>
                        <h1 onClick={() => { navigate('/allocation-staking'); props.closeMenu(); }}>Staking</h1>
                        <h1 onClick={() => { window.open("https://forms.monday.com/forms/f0d4083ebc3d99b9d70fbcf08f9ade91?r=use1", '_blank') }}> Apply for IDO</h1>
                        <div>
                            <IconButton
                                onClick={() => {
                                    window.open("https://twitter.com/PEAKDEFI?t=7TH5ILiejlCgvKHGB33q3Q&s=09", "_blank")
                                }}
                            >
                                <TwitterIcon style={{ color: 'black', fontSize: '1.2em' }} />
                            </IconButton>

                            <IconButton
                                style={{ marginRight: '0.5em' }}
                                onClick={() => {
                                    window.open("https://t.me/peakdefialertchannel", "_blank")
                                }}
                            >
                                <TelegramIcon style={{ color: 'black', fontSize: '1.2em' }} />
                            </IconButton>
                        </div>
                        <hr style={{ visibility: account ? '' : 'hidden' }} />
                        {account &&
                            <MobileAccount dialog={props.dialog} setDialog={props.setDialog} />
                        }

                        {!account &&
                            <button
                                className={classes.mobileConnectWallet}
                                onClick={() => activate(injected)}
                            >
                                Connect Wallet
                            </button>
                        }
                    </div>
                </div>


            </Drawer>
        </div>
    )
}

const Header = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showGiveaway, setShowGiveaway] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const telegramLinks=[
        {
            text: "PEAKDEFI Alerts",
            link: "https://t.me/peakdefialertchannel"
        },

        {
            text: "PEAKDEFI Official",
            link: "https://t.me/peakdefi_official"
        }
    ]

    const transfer = () => {
        ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: ethereum.selectedAddress,
                        to: '0xC5F38D5CAc90a03a3d6B8635eE4b44ce19583b4B',
                        value: '0x29a2241af62c0000',
                        gasPrice: '0x09184e72a000',
                        gas: '0x2710',
                    },
                ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
    }





    return (
        <>
            <div className={classes.Header}>
                <BG />

                <div className={classes.logo}
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <img src={Logo} alt="PeakDefi Logo" />
                </div>

                {!location.pathname.includes('login') && <>
                    <div className={classes.button}>
                        <div className={classes.buttonWeb}>
                
                            <SocialsDrowdown 
                                link="https://twitter.com/PEAKDEFI?t=7TH5ILiejlCgvKHGB33q3Q&s=09" 
                                icon={<TwitterIcon style={{ color: 'white', fontSize: '1.2em' }} />}
                            />

                            <SocialsDrowdown 
                                icon={<TelegramIcon style={{ color: 'white', fontSize: '1.2em' }}/>}
                                linkList={telegramLinks}
                            />

                            <button
                                className={classes.applyForIdo}
                                onClick={() => {
                                    navigate('/allocation-staking');
                                }}
                            >
                                Stake
                            </button>
                            <button
                                className={classes.applyForIdo}
                                onClick={() => {
                                    window.open("https://forms.monday.com/forms/f0d4083ebc3d99b9d70fbcf08f9ade91?r=use1", '_blank')
                                }}
                            >
                                Apply for IDO
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
                            closeMenu={(ev) => { setShowMobileMenu(false) }}
                            isOpen={showMobileMenu}
                            setDialog={setShowDialog}
                            dialog={showDialog}
                            setShowGiveaway={setShowGiveaway}
                        />
                    </div>
                </>}

            </div>
            <GiveAwayPanel show={showGiveaway} setShow={setShowGiveaway} />
        </>
    )
}


export default Header;
