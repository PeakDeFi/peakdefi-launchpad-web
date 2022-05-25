import React, { useState, useEffect } from 'react';
import classes from "./MainInfo.module.scss"
import { useWeb3React } from '@web3-react/core'
import { BigNumber, ethers } from 'ethers';

import { SALE_ABI, TOKEN_ABI } from '../../../../consts/abi';

import { useSelector } from 'react-redux'
import { getUserDataKYC } from '../../../Header/API/blockpass';
import { toast } from 'react-toastify';

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import { RpcProvider } from "../../../../consts/rpc";
import Tooltip from '@mui/material/Tooltip';
import ErrorDialog from '../../../ErrorDialog/ErrorDialog';
import Confetti from '../../../../resources/confetti.png'
import DialogBase from '../../../DialogBase/DialogBase';

const tokenContractAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

export function MainInfo(props) {
    const { activate, deactivate, account, error } = useWeb3React();
    const [saleContract, setSaleContract] = useState();
    const [tokenContract, setTokenContract] = useState();

    const [amount, setAmount] = useState(0);
    const userWalletAddress = useSelector((state) => state.userWallet.address);
    const decimals = useSelector(state => state.userWallet.decimal);
    const [allowance, setAllowance] = useState(0);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showVerify, setShowVerify] = useState(false);
    const [maxAmount, setMaxAmount] = useState(2500);
    const [isParticipated, setIsParticipated] = useState(false);
    const [depositedAmount, setDepositedAmount] = useState(200000);
    const [totalBUSDRaised, setTotalBUSDRaised] = useState(200000);
    const [inputWarning, setInputWarning] = useState(false);


    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [messageIcon, setMessageIcon] = useState(Confetti);

    const { id } = props.ido ?? 0;

    useEffect(() => {
        console.log("USER IS REGISTERED: " + isRegistered)
    }, [isRegistered]);

 

   

    if (props.ido === undefined)
        return (<></>)
    return (

        <div className={classes.mainInfo}>
            <div className={classes.textBlock}>

                {window.innerWidth <= 1000 &&
                    <div className={classes.mobileLogoDiv}>
                        <img src={props.ido.logo_url} className={classes.mobileLogo} />
                    </div>
                }

                <div className={classes.title}> {props.title} </div>

                {window.innerWidth <= 1000 &&
                    <div className={classes.actionBlock}>
                        <div className={classes.mediaMobile}>
                            {props.media.map((media, id) => {
                                return <a key={id} href={media.link} target="_blank"> <img alt="" src={media.imgMobile} /> </a>
                            })}
                        </div>
                    </div>
                }


                <div className={classes.media}>
                    {props.media.map((media, id) => {
                        return <a key={id} href={media.link} target="_blank"> <img alt="" src={media.img} /> </a>
                    })}
                </div>
                {false ?
                    <div className={classes.actionBlock}>
                        <div style={{ color: "white", marginRight: '1em' }} className={classes.text}>
                            <div> You need to complete KYC process before participating in a sale </div>
                        </div>

                        {window.innerWidth > 1000 &&
                            <div className={classes.mediaMobile}>
                                {props.media.map((media, id) => {
                                    return <a key={id} href={media.link} target="_blank"> <img alt="" src={media.imgMobile} /> </a>
                                })}
                            </div>
                        }

                    </div>
                    :
                    <div className={classes.actionBlock}>

                        {
                            ((props.ido.timeline.sale_end > Date.now() / 1000 &&
                                props.ido.timeline.registration_start < Date.now() / 1000 &&
                                (!isRegistered || props.ido.timeline.sale_start > Date.now() / 1000))
                                ||
                                (props.ido.timeline.sale_start < Date.now() / 1000 &&
                                    props.ido.timeline.sale_end > Date.now() / 1000 &&
                                    isRegistered))
                            &&

                            <div className={classes.buttonBlock}>

                                {/* {props.ido.timeline.sale_end > Date.now() / 1000
                                    && props.ido.timeline.registration_start < Date.now() / 1000
                                    && (!isRegistered || props.ido.timeline.sale_start > Date.now() / 1000)
                                    && <button
                                        disabled={isRegistered}
                                        onClick={() => {
                                            if (!isRegistered)
                                                registerForSale()
                                        }}
                                    >
                                        {isRegistered ? 'Whitelisted' : 'Get Whitelisted'}
                                    </button>}  */}
                                {/* {props.ido.timeline.sale_start < Date.now() / 1000 && props.ido.timeline.sale_end > Date.now() / 1000 && isRegistered && */}
                                <div className={classes.inputs}>


                                    {props.ido.timeline.sale_start < Date.now() / 1000 && props.ido.timeline.sale_end > Date.now() / 1000 &&

                                        <div className={classes.inputFieldWrapper}>
                                            {false && <div className={classes.max} onClick={() => setAmount(maxAmount)}>MAX</div>}

                                            <Tooltip
                                                disableHoverListener
                                                open={inputWarning}
                                                title={"Keep in mind: You can only deposit once!"}
                                                componentsProps={{
                                                    tooltip: {
                                                        sx: {
                                                            bgcolor: 'rbga(0, 0, 0, 0.7)',
                                                            '& .MuiTooltip-arrow': {
                                                                color: 'rbga(0, 0, 0, 0.7)',
                                                            },
                                                            color: 'rgb(255, 250, 250)',
                                                            fontSize: '10pt',
                                                            fontFamily: 'Montserrat',
                                                            fontWeight: '600'
                                                        },
                                                    },
                                                }}
                                            >
                                                <input
                                                    type="number"
                                                    value={isParticipated ? depositedAmount : amount}
                                                    disabled={isParticipated}
                                                    min={0}
                                                    className={classes.inputField}
                                                    onChange={(e) => {
                                                        setAmount(parseFloat(e.target.value));
                                                    }}
                                                    onFocus={() => {
                                                        setInputWarning(true);
                                                    }}

                                                    onBlur={() => {
                                                        setInputWarning(false);
                                                    }}

                                                />
                                            </Tooltip>
                                            <label>BUSD</label>
                                        </div>


                                    }

                                    {allowance >= amount &&
                                        <>
                                            <Tooltip
                                                title="Warning! You can deposit your funds only once"
                                                enterTouchDelay={0}
                                                leaveTouchDelay={6000}
                                            >
                                                <button 
                                                    style={{
                                                        backgroundColor: isParticipated? '#bfff80':'#ffd24d',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {isParticipated ? "Your deposit" : "Buy Tokens"}
                                                </button>
                                            </Tooltip>
                                        </>
                                    }

                                    {(allowance < amount || isNaN(amount)) &&
                                        <button
                                            style={{backgroundColor: '#ffd24d'}}
                                        >
                                            Approve
                                        </button>
                                    }
                                </div>

                            </div>}

                        {window.innerWidth > 1000 &&
                            <div className={classes.mediaMobile}>
                                {props.media.map((media, id) => {
                                    return <a key={id} href={media.link} target="_blank"> <img alt="" src={media.imgMobile} /> </a>
                                })}
                            </div>
                        }
                    </div>}
            </div>

            <ErrorDialog show={showError} setError={setShowError} customMessage={errorMessage} />
            <DialogBase show={showMessage} setShow={setShowMessage} message={message} icon={messageIcon} buttonText={"OK"}/>
        </div>
    )
}
