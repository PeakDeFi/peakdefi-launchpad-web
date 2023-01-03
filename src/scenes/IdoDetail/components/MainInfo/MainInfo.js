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
import { rpcWalletConnectProvider } from '../../../../consts/walletConnect';

const tokenContractAddress = "0x0e457F76280AC83cB41389a2c9fc99e366b41f2b";

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
            }).catch(error => {
                
            })

            lsaleContract.userToParticipation(userWalletAddress).then(response => {
                setDepositedAmount(Math.round(response.amountPaid / (10 ** 18)));
            }).catch(error => {
            });

            lsaleContract.sale().then(response => {
                setTotalBUSDRaised(response.totalBUSDRaised / (10 ** 18));
            }).catch((error) => {

            })

            const ltokenContract = new ethers.Contract(tokenContractAddress, TOKEN_ABI, signer);
            setTokenContract(ltokenContract);


            ltokenContract.allowance(userWalletAddress, props.ido.contract_address).then((response) => {
                setAllowance(parseInt(response.toString()));
            }).catch((erorr) => {
            });

        } else if (userWalletAddress) {
            const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
            const signer = web3Provider.getSigner();

            const lsaleContract = new ethers.Contract(props.ido.contract_address, SALE_ABI, signer);

            lsaleContract.isParticipated(userWalletAddress).then(response => {
                setIsParticipated(response);
            }).catch(error => {
            });

            lsaleContract.userToParticipation(userWalletAddress).then(response => {
                setDepositedAmount(Math.round(response.amountPaid / (10 ** 18)));
            }).catch(error => {
            });

            lsaleContract.sale().then(response => {
                setTotalBUSDRaised(response.totalBUSDRaised / (10 ** 18));
            }).catch(error => {
            })


            setSaleContract(lsaleContract);
            isRegisteredCheck(lsaleContract);


            const ltokenContract = new ethers.Contract(tokenContractAddress, TOKEN_ABI, signer);
            setTokenContract(ltokenContract);

            ltokenContract.allowance(userWalletAddress, props.ido.contract_address).then((response) => {
                setAllowance(parseInt(response.toString()));
            }).catch((erorr) => {
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
                        setShowMessage(true);
                        setMessage(`Congratulations! You have just made a deposit of ${roundedAmount} BUSD`);

                        setIsParticipated(true);
                        setDepositedAmount(roundedAmount);
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

                <div className={classes.media}>
                    {props.media.map((media, id) => {
                        return <a key={id} href={media.link} target="_blank"> <img alt="" src={media.img} /> </a>
                    })}
                </div>
                {/*false ?
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
                            (
                                (props.ido.timeline.sale_end > Date.now() / 1000 &&
                                    props.ido.timeline.registration_start < Date.now() / 1000 &&
                                    (!isRegistered || props.ido.timeline.sale_start > Date.now() / 1000))
                                ||
                                (props.ido.timeline.sale_start < Date.now() / 1000 &&
                                    props.ido.timeline.sale_end > Date.now() / 1000 &&
                                    isRegistered)
                            )
                            &&

                            <div className={classes.buttonBlock}>

                                {props.ido.timeline.sale_end > Date.now() / 1000
                                    && props.ido.timeline.registration_start < Date.now() / 1000
                                    && (!isRegistered || props.ido.timeline.sale_start > Date.now() / 1000)
                                    && <button
                                        disabled={isRegistered}
                                        onClick={() => {
                                            if (!isRegistered)
                                                registerForSale()
                                        }}
                                            style={ isRegistered ? {
                                                            backgroundColor:   '#ffd24d',
                                                            whiteSpace: 'nowrap'
                                                        } : {} }
                                    >
                                        {isRegistered ? 'Whitelisted' : 'Get Whitelisted'}
                                    </button>}
                                {props.ido.timeline.sale_start < Date.now() / 1000 && props.ido.timeline.sale_end > Date.now() / 1000 && isRegistered &&
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
                                                        onClick={() => { participateSale() }}
                                                        style={{
                                                            backgroundColor: isParticipated ? '#bfff80' : '#ffd24d',
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
                                                onClick={() => { approve() }}
                                                style={{ backgroundColor: '#ffd24d' }}
                                            >
                                                Approve
                                            </button>
                                        }
                                    </div>
                                }
                            </div>
                        }
                    </div>*/}
            </div>

            <ErrorDialog show={showError} setError={setShowError} customMessage={errorMessage} />
            <DialogBase show={showMessage} setShow={setShowMessage} message={message} icon={messageIcon} buttonText={"OK"} />
        </div>
    )
}
