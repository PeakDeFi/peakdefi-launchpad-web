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
    const [depositedAmount, setDepositedAmount] = useState(0);
    const [totalBUSDRaised, setTotalBUSDRaised] = useState(0);
    const [inputWarning, setInputWarning] = useState(false);


    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { id } = props.ido ?? 0;

    useEffect(() => {
        console.log("USER IS REGISTERED: " + isRegistered)
    }, [isRegistered]);

    useEffect(async () => {
        const { ethereum } = window;
        if (userWalletAddress && ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            let signer = await provider.getSigner();

            const lsaleContract = new ethers.Contract(props.ido.contract_address, SALE_ABI, signer);
            setSaleContract(lsaleContract);
            isRegisteredCheck(lsaleContract);

            lsaleContract.isParticipated(userWalletAddress).then(response => {
                setIsParticipated(response);
            })

            lsaleContract.userToParticipation(userWalletAddress).then(response => {
                setDepositedAmount(Math.round(response.amountPaid / (10 ** 18)));
            });

            lsaleContract.sale().then(response => {
                setTotalBUSDRaised(response.totalBUSDRaised / (10 ** 18));
            })

            const ltokenContract = new ethers.Contract(tokenContractAddress, TOKEN_ABI, signer);
            setTokenContract(ltokenContract);


            ltokenContract.allowance(userWalletAddress, props.ido.contract_address).then((response) => {
                setAllowance(parseInt(response.toString()));
            }).catch((erorr) => {
                console.log(error);
            });

        } else if (userWalletAddress) {

            const providerr = new WalletConnectProvider({
                rpc: {
                    56: RpcProvider
                },
            });

            const web3Provider = new providers.Web3Provider(providerr);
            const signer = web3Provider.getSigner();

            const lsaleContract = new ethers.Contract(props.ido.contract_address, SALE_ABI, signer);

            lsaleContract.isParticipated(userWalletAddress).then(response => {
                setIsParticipated(response);
            });

            lsaleContract.userToParticipation(userWalletAddress).then(response => {
                setDepositedAmount(Math.round(response.amountPaid / (10 ** 18)));
            });

            lsaleContract.sale().then(response => {
                setTotalBUSDRaised(response.totalBUSDRaised / (10 ** 18));
            })


            setSaleContract(lsaleContract);
            isRegisteredCheck(lsaleContract);


            const ltokenContract = new ethers.Contract(tokenContractAddress, TOKEN_ABI, signer);
            setTokenContract(ltokenContract);

            ltokenContract.allowance(userWalletAddress, props.ido.contract_address).then((response) => {
                setAllowance(parseInt(response.toString()));
            }).catch((erorr) => {
                console.log(error);
            });
        }

    }, [userWalletAddress, props.ido.contract_address])



    useEffect(async () => {
        try {
            await getUserDataKYC(account).then(response => {
                if (response.data.data.status === "approved") {
                    setShowVerify(false);
                } else {
                    setShowVerify(true);
                }
            }).catch(error => {
                setShowVerify(true);
            })
        } catch (error) {
            setShowVerify(true);
        }
    }, [account])

    useEffect(() => {
        loadBlockpassWidget()
    })

    const loadBlockpassWidget = () => {
        const blockpass = new window.BlockpassKYCConnect(
            'peakdefi_launchpad_c0f15', // service client_id from the admin console
            {
                env: 'prod',
                refId: account
            }
        )
        blockpass.startKYCConnect()
    }

    const registerForSale = async () => {
        try {


            saleContract.registerForSale().then(res => {

                const transaction = res.wait().then(tran => {
                    setIsRegistered(true);
                });

                toast.promise(
                    transaction,
                    {
                        pending: "Registration pending",
                        success: 'Registration completed',
                        error: 'Registration failed'
                    }
                )
            }).catch(error => {
                if (error.data.message.includes("Need to stake minimum")) {
                    setShowError(true);
                    setErrorMessage("You need to stake minimum amount of 10000 PEAK before registering for sale");
                }
            })

            //alert("Hash " + result.hash)
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    const isRegisteredCheck = (lSaleContract) => {
        if (lSaleContract === undefined)
            return

        lSaleContract.isWhitelisted().then(res => {
            setIsRegistered(res);
        }).catch(error => {
            console.log("IS WHITE LISTED REQUEST FAILED");
        });
    }

    const participateSale = async () => {
        if (isParticipated) {
            return;
        }

        try {

            if (amount < 100) {
                setShowError(true)
                setErrorMessage("You cannot deposit less than 100 BUSD tokens on this sale");
            } else {


                const roundedAmount = 2 * Math.floor(amount / 2);
                if (roundedAmount !== amount) {
                    setAmount(roundedAmount);

                    setShowError(true)
                    setErrorMessage("You cannot buy an odd amount of tokens. Your deposit was lowered to the nearest even amount.");
                }
                //TODO change to BUSD decimals
                let bigAmount = BigNumber.from(Math.round(roundedAmount * 100)).mul(BigNumber.from(10).pow(props.ido.token.decimals - 2));
                saleContract.participate(bigAmount).then((res) => {
                    const transactipon = res.wait().then((tran) => {
                        saleContract.isParticipated(response => {
                            setIsParticipated(response);
                        })

                        saleContract.userToParticipation(userWalletAddress).then(response => {
                            setDepositedAmount(Math.round(response.amountPaid / (10 ** 18)));
                        });
                    });

                    toast.promise(
                        transactipon,
                        {
                            pending: 'Transaction pending',
                            success: 'Token purchase successful',
                            error: 'Transaction failed'
                        }
                    )
                }).catch((error) => {

                    toast.error(<>
                        <b>{"Request failed: "}</b>
                        <br />
                        <code>{error.error.message}</code>
                    </>)
                })
            }

        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    const approve = async () => {
        try {
            tokenContract.approve(props.ido.contract_address, ethers.constants.MaxUint256).then((response) => {
                debugger;
                let transaction = response.wait().then(tran => {
                    setAllowance(ethers.constants.MaxUint256)
                })

                toast.promise(
                    transaction,
                    {
                        pending: 'Approval request pending',
                        success: 'New amount approved',
                        error: 'Transaction failed'
                    }
                )
            });
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

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
                                        {isRegistered ? 'Registration completed' : 'Register'}
                                    </button>} */}
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
                                                        color: 'rgb(255, 230, 200)',
                                                        fontSize: '10pt',
                                                        fontFamily: 'Montserrat'
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
                                                    onFocus={()=>{
                                                        setInputWarning(true);
                                                    }}

                                                    onBlur={()=>{
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
                                                <button onClick={() => { participateSale() }}>
                                                    {isParticipated ? <>You have already<br /> participated</> : "Buy Tokens"}
                                                </button>
                                            </Tooltip>
                                        </>
                                    }

                                    {(allowance < amount || isNaN(amount)) && <button onClick={() => { approve() }}>
                                        Approve
                                    </button>}
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
        </div>
    )
}
