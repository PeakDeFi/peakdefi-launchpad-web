import React, { useState, useEffect } from "react";
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

import classes from "./IdoBlock.module.scss"
import ConfimrationDialog from "../../../ConfirmationDialog/ConfirmationDialog";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeToDate(time) {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

function timeLeft(seconds) {

    let timeString = '';
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    if (d > 0) {
        return d + ' days, ' + h + ' h, ' + m + ' mins'
    }
    else if (h > 0) {
        return h + ' hours ' + m + ' minutes';
    }
    else if (m > 0 || s > 0) {
        return m + ":" + s;
    } else {
        return 'Launched';
    }

}

function priceToFormatedPrice(price) {
    return "$" + price
}

const tokenContractAddress = "0x0e457F76280AC83cB41389a2c9fc99e366b41f2b";

const IdoBlock = ({ idoInfo, ido, media }) => {

    const [isRegistered, setIsRegistered] = useState(false);



    const { activate, deactivate, account, error } = useWeb3React();
    const [saleContract, setSaleContract] = useState();
    const [tokenContract, setTokenContract] = useState();

    const [amount, setAmount] = useState(0);
    const userWalletAddress = useSelector((state) => state.userWallet.address);
    const decimals = useSelector(state => state.userWallet.decimal);
    const [allowance, setAllowance] = useState(0);
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

    const [showConfirm, setShowConfirm] = useState(false);
    const [callback, setCallback] = useState();
    const [confirmMessage, setConfirmMessage] = useState('')

    useEffect(async () => {
        const { ethereum } = window;
        if (userWalletAddress && ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            let signer = await provider.getSigner();

            const lsaleContract = new ethers.Contract(ido.contract_address, SALE_ABI, signer);
            setSaleContract(lsaleContract);
            isRegisteredCheck(lsaleContract);

            lsaleContract.isParticipated(userWalletAddress).then(response => {
                setIsParticipated(response);
            }).catch(error => {
                console.log("ERROR IN CONTRACT METHOD: isParticipated. Most likely to be invalid contract address")
            })

            lsaleContract.userToParticipation(userWalletAddress).then(response => {
                setDepositedAmount(Math.round(response.amountPaid / (10 ** 18)));
            }).catch(error => {
                console.log("ERROR IN CONTRACT METHOD: UserToParticipation. Most likely to be invalid contract address")
            });

            lsaleContract.sale().then(response => {
                setTotalBUSDRaised(response.totalBUSDRaised / (10 ** 18));
            }).catch(error => {
                console.log("ERROR IN CONTRACT METHOD: sale. Most likely to be invalid contract address")
            })

            const ltokenContract = new ethers.Contract(tokenContractAddress, TOKEN_ABI, signer);
            setTokenContract(ltokenContract);


            ltokenContract.allowance(userWalletAddress, ido.contract_address).then((response) => {
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

            const lsaleContract = new ethers.Contract(ido.contract_address, SALE_ABI, signer);

            lsaleContract.isParticipated(userWalletAddress).then(response => {
                setIsParticipated(response);
            }).catch(error => {
                console.log("ERROR IN CONTRACT METHOD: isParticipated. Most likely to be invalid contract address")

            })

            lsaleContract.userToParticipation(userWalletAddress).then(response => {
                setDepositedAmount(Math.round(response.amountPaid / (10 ** 18)));
            }).catch(error=>{
                console.log("ERROR IN CONTRACT METHOD: userToParticipation. Most likely to be invalid contract address")
            });

            lsaleContract.sale().then(response => {
                setTotalBUSDRaised(response.totalBUSDRaised / (10 ** 18));
            }).catch(error => {
                console.log("ERROR IN CONTRACT METHOD: sale. Most likely to be invalid contract address")
            })


            setSaleContract(lsaleContract);
            isRegisteredCheck(lsaleContract);


            const ltokenContract = new ethers.Contract(tokenContractAddress, TOKEN_ABI, signer);
            setTokenContract(ltokenContract);

            ltokenContract.allowance(userWalletAddress, ido.contract_address).then((response) => {
                setAllowance(parseInt(response.toString()));
            }).catch((erorr) => {
                console.log(error);
            });
        }

    }, [userWalletAddress, ido.contract_address])

    const isRegisteredCheck = (lSaleContract) => {
        if (lSaleContract === undefined)
            return

        lSaleContract.isWhitelisted().then(res => {
            setIsRegistered(res);
        }).catch(error => {
            console.log("IS WHITE LISTED REQUEST FAILED");
        });
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

    const actualSaleRequest = async () => {

        const roundedAmount = 2 * Math.floor(amount / 2);
        let bigAmount = BigNumber.from(Math.round(roundedAmount * 100)).mul(BigNumber.from(10).pow(ido.token.decimals - 2));
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
                <code>{error?.error?.message}</code>
            </>)
        })
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

                setShowConfirm(true);
                setConfirmMessage("Confirm token purchase");
                setCallback(() => actualSaleRequest());
            }

        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    const approve = async () => {
        try {
            tokenContract.approve(ido.contract_address, ethers.constants.MaxUint256).then((response) => {
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

    if (ido === undefined)
        return (<></>)

    console.log(idoInfo)
    return (
        <div className={classes.IdoBlock}>
            <div className={classes.tokenBlock}>
                <div className={classes.token}>
                    <img className={classes.tokenLogo} alt={idoInfo.token.name} src={idoInfo.token.img} />
                    <div className={classes.text}>
                        <div className={classes.name}> {idoInfo.token.name} </div>
                        <div className={classes.symbol}>{idoInfo.token.symbol}</div>
                        <div className={classes.media}>
                            {media.map((media, id) => {
                                return <a key={id} href={media.link} target="_blank"> <img alt="" src={media.imgMobile} /> </a>
                            })}
                        </div>
                    </div>
                </div>

                {priceDetail(idoInfo.token)}
            </div>

            <div className={classes.saleInfo}>
                <div className={classes.line} ></div>
                <RoundDetail time_left={ido.current_round === 'Preparing for sale' ? ido.time_until_launch : ido.time_left_in_current_round} current_round={ido.current_round} />
                {progressBar(idoInfo.saleInfo)}
                {launchDetaid(idoInfo.saleInfo)}
            </div>

            <div className={classes.actions}>
                <div className={classes.line} ></div>
                <div className={classes.actionBlock}>
                    {
                        (
                            (ido.timeline.sale_end > Date.now() / 1000 &&
                                ido.timeline.registration_start < Date.now() / 1000 &&
                                (!isRegistered || ido.timeline.sale_start > Date.now() / 1000))
                            ||
                            (ido.timeline.sale_start < Date.now() / 1000 &&
                                ido.timeline.sale_end > Date.now() / 1000 &&
                                isRegistered)
                        )
                        &&

                        <div className={classes.buttonBlock}>

                            {ido.timeline.sale_end > Date.now() / 1000
                                && ido.timeline.registration_start < Date.now() / 1000
                                && (!isRegistered || ido.timeline.sale_start > Date.now() / 1000)
                                && <button
                                    disabled={isRegistered}
                                    onClick={() => {
                                        if (!isRegistered)
                                            registerForSale()
                                    }}
                                >
                                    {isRegistered ? 'Whitelisted' : 'Get Whitelisted'}
                                </button>}
                            {ido.timeline.sale_start < Date.now() / 1000 && ido.timeline.sale_end > Date.now() / 1000 && isRegistered &&
                                <div className={classes.inputs}>


                                    {ido.timeline.sale_start < Date.now() / 1000 && ido.timeline.sale_end > Date.now() / 1000 &&

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
                                                    {isParticipated ? "Your Allocation" : "Buy Tokens"}
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

                </div>

            </div>

            <ErrorDialog show={showError} setError={setShowError} customMessage={errorMessage} />
            <DialogBase show={showMessage} setShow={setShowMessage} message={message} icon={messageIcon} buttonText={"OK"} />
            <ConfimrationDialog show={showConfirm} setError={setShowConfirm} callback={callback} message={confirmMessage} />
        </div>

    )
}

export default IdoBlock;


function priceDetail(props) {
    return (
        <div className={classes.priceDetail}>
            <div className={classes.text}> Price </div>
            <div className={classes.price}> ${props.price} </div>
        </div>
    );
}


function textToShow(text, value) {
    return (
        <div className={classes.textToShow}>
            <div className={classes.text}>{text}</div>
            <div className={classes.value}>{value}</div>
        </div>
    )
}

function progressBar(props) {
    return (<div className={classes.progressBarWrapper}>
        <div className={classes.progressBar} >
            <div className={classes.backPart} ></div>
            <div style={{ width: `${100}%` }} className={classes.topPart} ></div>
        </div>

        <div style={{ marginLeft: `calc(${Math.min(100, 100)}% - 1.15em` }}>
            <p>{Math.round(100)}% Sale</p>
        </div>
    </div>
    )
}

function RoundDetail({ time_left, current_round }) {
    let timer;
    const [iTimeLeft, setITimeLeft] = useState(time_left);

    const updateCount = () => {
        timer = !timer && setInterval(() => {
            setITimeLeft(prevCount => prevCount - 1) // new
        }, 1000)
    }

    useEffect(() => {
        updateCount()

        return () => clearInterval(timer)
    }, [])


    return (
        <div className={classes.roundDetail}>
            <div className={classes.block}>
                <div className={classes.text}> Round</div>
                <div className={classes.text}> Time Left </div>
            </div>
            <div className={classes.block}>
                <div className={classes.roundInfo}> {current_round} </div>
                <div className={classes.timeInfo}> {timeLeft(iTimeLeft)} </div>
            </div>
        </div>
    )
}

function launchDetaid(props) {

    return (
        <div className={classes.roundDetail}>
            <div className={classes.block}>
                <div className={classes.text}> Tokens for sale </div>
                <div className={classes.text}> Total Raised </div>
            </div>
            <div className={classes.block}>
                <div className={classes.roundInfo}> {numberWithCommas(props.info.token_distribution)} </div>
                <div className={classes.roundInfo}> ${numberWithCommas(200000)} </div>
            </div>
        </div>
    )
}