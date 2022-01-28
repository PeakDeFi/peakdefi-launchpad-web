import React, { useState, useEffect } from "react";
import classes from "./Header.module.scss"
import Logo from '../../resources/logo.svg'
import BG from '../BG/BG'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../../connector'
import Img from '../../logo.svg'
import { setAddress, setBalance, setDecimal, selectAddress } from './../../features/userWalletSlice';
import PersonIcon from '@mui/icons-material/Person';
import { tokenContractAddress, abi as tokenAbi } from "../AllocationStaking/components/StakeCard/services/consts";
import { ethers } from "ethers";
import { useSelector } from 'react-redux';
import { useNavigate} from "react-router-dom";

import store from "../../app/store";

import { Blockpass } from "./Blockpass";
import AccountDialog from "./components/accountDialog/AccountDialog";
const { ethereum } = window;


function ButtonWeb() {
    const { activate, deactivate, account, error } = useWeb3React();

    const [dialog, setDialog] = useState(false);

    if (error) {
        alert(error)
    }
    store.dispatch(setAddress(account));

    const balance = useSelector(state=>state.userWallet.balance);
    const decimals = useSelector(state=>state.userWallet.decimal);

    useEffect(()=>{
        async function callback(){
            if (ethereum) {

                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                let contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
                let tdecimals = await contract.decimals();
                let tbalance = await contract.balanceOf(account);
                store.dispatch(setDecimal(tdecimals));
                store.dispatch(setBalance(parseInt(tbalance.toString())));
            }

        }
        callback();
    }, [account]);

    useEffect(()=>{
        console.log("Initial wallet connect");
        activate(injected, ()=>{
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
                            <span><b>{(balance/Math.pow(10, decimals)).toFixed(2)}</b>   PEAK</span> 
                        </div>

                        <div className={classes.splitter}>
                        </div>

                        <div
                            className={classes.addressDiv}
                            onClick={() => {
                                setDialog(true);
                            }}
                        >
                            { "..." + account.substring(account.length-8, account.length)}
                            <PersonIcon />
                        </div>

                    </div>
                }
            </div>
            <AccountDialog show={dialog} setShow={setDialog} address={account} disconnect={deactivate} />
        </>
    );
}

function MobileMenu(props) {
    const { activate, deactivate, account } = useWeb3React();

    return (
        <div className={classes.mobileMenu}>

            <div onClick={(ev) => { props.closeMenu(ev) }} className={classes.menuBlank} />

            <div className={classes.menuElements}>
                <div className={classes.title}> Menu </div>
                <div onClick={() => { account ? deactivate() : activate(injected) }} className={classes.menuElement}>
                    {account
                        ? "Disconnect ..." + account.substr(account.length - 5)
                        : "Connect"
                    }
                </div>
            </div>
        </div>
    )
}

const Header = ()=>{
    const [showMobileMenu, setShowMobileMenu] = useState(true);

    const navigate = useNavigate();

    const transfer =()=> {
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

    return(
        <>
                <div className={classes.Header}>
                    <BG />
                    <div className={classes.logo} 
                        onClick={()=>{
                            navigate('/')
                        }}
                    >
                        <img src={Logo} alt="PeakDefi Logo" />
                    </div>

                    <div className={classes.button}>
                        <div className={classes.buttonWeb}>
                            <ButtonWeb />
                        </div>
                    </div>

                    <div className={classes.buttonMobile}>
                        <img onClick={(ev) => { setShowMobileMenu(!showMobileMenu)}} src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/000000/external-horizontal-separated-bars-representing-hamburger-menu-layout-grid-color-tal-revivo.png" />
                        {/* <img onClick={(ev) => { this.setState({ showMobileMenu: !this.state.showMobileMenu }) }} src={Img} /> */}
                    </div>

                    <div className={showMobileMenu ? classes.showMobileMenu : classes.hideMenu}>
                        <MobileMenu
                            closeMenu={(ev) => { setShowMobileMenu(!showMobileMenu) }}
                        />
                    </div>

                </div>
            </>
    )
}


export default Header;
