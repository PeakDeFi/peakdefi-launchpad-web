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

    useEffect(()=>{
        async function callback(){
            if (ethereum) {

                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                let contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
                let tdecimals = await contract.decimals();
                let tbalance = await contract.balanceOf(account);
                store.dispatch(setDecimal(tdecimals));
                store.dispatch(setBalance(tbalance/Math.pow(10, tdecimals)));
            }

        }
        callback();
    }, [account]);

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
                            <span><b>{balance.toFixed(2)}</b>   PEAK</span> 
                        </div>

                        <div className={classes.splitter}>
                        </div>

                        <div
                            className={classes.addressDiv}
                            onClick={() => {
                                setDialog(true);
                            }}
                        >
                            {account.substring(0, 8) + "..."}
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


class Header extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showMobileMenu: true //TODO change to false
        }
    }

    transfer() {
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



    render() {

        return (
            <>
                <div className={classes.Header}>
                    <BG />
                    <div className={classes.logo}>
                        <img src={Logo} alt="PeakDefi Logo" />
                    </div>

                    <div className={classes.button}>
                        <div className={classes.buttonWeb}>
                            <ButtonWeb />
                        </div>
                    </div>

                    <div className={classes.buttonMobile}>
                        <img onClick={(ev) => { this.setState({ showMobileMenu: !this.state.showMobileMenu }) }} src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/000000/external-horizontal-separated-bars-representing-hamburger-menu-layout-grid-color-tal-revivo.png" />
                        {/* <img onClick={(ev) => { this.setState({ showMobileMenu: !this.state.showMobileMenu }) }} src={Img} /> */}
                    </div>

                    <div className={this.state.showMobileMenu ? classes.showMobileMenu : classes.hideMenu}>
                        <MobileMenu
                            closeMenu={(ev) => { this.setState({ showMobileMenu: !this.state.showMobileMenu }) }}
                        />
                    </div>

                </div>
            </>
        )
    }
}

export default Header
