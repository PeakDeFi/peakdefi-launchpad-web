import React, { useState, useEffect } from "react";
import { useWeb3React } from '@web3-react/core'
import { BigNumber, ethers } from 'ethers';

import { SALE_ABI, TOKEN_ABI } from '../../../../consts/abi';

import { useSelector, useDispatch } from 'react-redux'
import { getUserDataKYC } from '../../../Header/API/blockpass';
import { toast } from 'react-toastify';

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import { RpcProvider } from "../../../../consts/rpc";
import Tooltip from '@mui/material/Tooltip';
import ErrorDialog from '../../../ErrorDialog/ErrorDialog';
import ErrorDialogStake from './ErrorDialog/ErrorDialog'
import Confetti from '../../../../resources/confetti.png'
import ErrorImg from './ErrorDialog/resources/warning.png'
import DialogBase from '../../../DialogBase/DialogBase';

import classes from "./IdoBlock.module.scss"
import ConfimrationDialog from "../../../ConfirmationDialog/ConfirmationDialog";

import { setDeposit, setRegister } from './../../../../features/thankYouSlice';

import InternetLogo from './images/internet_logo.png'

import { useNavigate } from 'react-router-dom'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowRight from './images/arrowRight.svg'
import { kycBypassers } from "../../../../consts/kyc";

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

const tokenContractAddress = process.env.REACT_APP_BUSD_TOKEN_ADDRESS;

const IdoBlock = ({ idoInfo, ido, media }) => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [depositedAmount, setDepositedAmount] = useState(0);
    const stakingBalance = useSelector(state => state.staking.balance);

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
    const [totalBUSDRaised, setTotalBUSDRaised] = useState(0);
    const [inputWarning, setInputWarning] = useState(false);
    const [userTier, setUserTier] = useState();
    const [isLotteryWinner, setIsLotteryWinner] = useState(false);


    const [showError, setShowError] = useState(false);
    const [showErrorStake, setShowErrorStake] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [messageIcon, setMessageIcon] = useState(Confetti);

    const [showConfirm, setShowConfirm] = useState(false);
    const [callback, setCallback] = useState();
    const [confirmMessage, setConfirmMessage] = useState('')

    const [sloganCollapsed, setSloganCollapsed] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!!saleContract && isRegistered) {
            saleContract.Whitelist(userWalletAddress).then(response => {
                setUserTier(parseInt(response.userTierId.toString()));
                if (response.userTierId == 0)
                    setIsLotteryWinner(parseInt(response.userAddress, 16) !== 0)
            })
        }
    }, [saleContract, isRegistered]);

    // useEffect(async () => {
    //     try {
    //         await getUserDataKYC(account).then(response => {
    //             if (response.data.data.status === "approved") {
    //                 setShowVerify(false);
    //             } else {
    //                 setShowVerify(true);
    //             }
    //         }).catch(error => {
    //             setShowVerify(true);
    //         })
    //     } catch (error) {
    //         setShowVerify(true);
    //     }
    // }, [account])


    useEffect(async () => {
        const { ethereum } = window;
        if (userWalletAddress && ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            let signer = await provider.getSigner();

            const lsaleContract = new ethers.Contract(ido.contract_address, SALE_ABI, signer);
            const usaleContract = new ethers.Contract(ido.contract_address, SALE_ABI, provider);
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

            usaleContract.sale().then(response => {
                setTotalBUSDRaised(response.totalBUSDRaised / (10 ** 18));
            }).catch(error => {
            })

            const ltokenContract = new ethers.Contract(tokenContractAddress, TOKEN_ABI, signer);
            setTokenContract(ltokenContract);


            ltokenContract.allowance(userWalletAddress, ido.contract_address).then((response) => {
                setAllowance(parseInt(response.toString()));
            }).catch((erorr) => {

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

            })

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

            ltokenContract.allowance(userWalletAddress, ido.contract_address).then((response) => {
                setAllowance(parseInt(response.toString()));
            }).catch((erorr) => {
            });
        }else if(ethereum) {
            const provider = new ethers.providers.JsonRpcProvider(RpcProvider);
        
            const usaleContract = new ethers.Contract(ido.contract_address, SALE_ABI, provider);

            usaleContract.sale().then(response => {
                setTotalBUSDRaised(response.totalBUSDRaised / (10 ** 18));
            }).catch(error => {
            })
        }
        else {
            const provider = new ethers.providers.JsonRpcProvider(RpcProvider);
            const usaleContract = new ethers.Contract(ido.contract_address, SALE_ABI, provider);

            usaleContract.sale().then(response => {
                setTotalBUSDRaised(response.totalBUSDRaised / (10 ** 18));
            }).catch(error => {
            })
        }

        if (ido.id == 13) {
            setShowMessage(true);
            setMessage(`<p> Due to bad actors (launchpads) that dumped the FRAG token during the TGE, we refunded all our investors.
                        On top of that, we negotiated with Fragmint that they will airdrop 20% of each investor's individual allocation of their re-launched version of the FRAG token.
                        </p>
                        <p>
                        In order to access your FRAG tokens, make sure to add their token to your wallet: 0x1a73308d8eeb3c1a2b771e9ace73508c52706b76
                        </p>
                        <p>The free Fragmint airdrops will be vested over 10 months. This means that 2% of the original IDO investment will be airdropped to the investor's wallet every month. The first airdrop was already made at the end of November 2022.</p>`);
            setMessageIcon(ErrorImg)
        }

    }, [userWalletAddress, ido.contract_address])


    const addToken = async () => {
        const { ethereum } = window;
        if (ido.token && ethereum) {
            try {
                // wasAdded is a boolean. Like any RPC method, an error may be thrown.
                const wasAdded = await ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20', // Initially only supports ERC20, but eventually more!
                        options: {
                            address: ido.token.token_address, // The address that the token is at.
                            symbol: ido.token.symbol, // A ticker symbol or shorthand, up to 5 chars.
                            decimals: ido.token.decimals, // The number of decimals in the token
                            image: ido.token.logo_url // A string url of the token logo
                        },
                    },
                });
            } catch (error) {
            }
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

    const registerForSale = async () => {
        try {
            saleContract.registerForSale().then(res => {

                const transaction = res.wait().then(tran => {
                    setIsRegistered(true);
                    dispatch(setRegister({ projectName: idoInfo.token.name }));
                    navigate('/thank-you-register');
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
                if (error?.data?.message.includes("Need to stake minimum")) {
                    setShowErrorStake(true);
                    setErrorMessage("You need to stake minimum amount of 1000 PEAK before registering for sale");
                }
            })

            //alert("Hash " + result.hash)
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    const actualSaleRequest = async () => {

        const roundedAmount = 2 * Math.floor(amount / 2);
        let bigAmount = BigNumber.from(Math.round(roundedAmount * 100)).mul(BigNumber.from(10).pow(16));
        console.log("bigAmount",bigAmount)
        saleContract.participate(bigAmount).then((res) => {
            const transactipon = res.wait().then((tran) => {
                setMessageIcon(Confetti)
                setShowMessage(true);
                setMessage(`Congratulations! You have just made a deposit of ${roundedAmount} BUSD`);

                setIsParticipated(true);
                setDepositedAmount(roundedAmount);

                dispatch(setDeposit({ projectName: idoInfo.token.name, amount: roundedAmount }));
                navigate('/thank-you-deposit');
            });

            toast.promise(
                transactipon,
                {
                    pending: 'Deposit transaction pending',
                    success: 'Depost transaction successful',
                    error: 'Approval transaction failed'
                }
            )
        }).catch((error) => {
            toast.error(<>
                <b>{"Request failed: "}</b>
                <br />
                <code>{error?.data?.message}</code>
            </>)
        })
    }

    const participateSale = async () => {

        if (isParticipated) {
            return;
        }

        try {

            if (amount < 50) {
                setShowError(true)
                setErrorMessage("You cannot deposit less than 50 BUSD tokens on this sale");
            } else {


                const roundedAmount = 2 * Math.floor(amount / 2);
                if (roundedAmount !== amount) {
                    setAmount(roundedAmount);

                    setShowError(true)
                    setErrorMessage("You cannot buy an odd amount of tokens. Your deposit was lowered to the nearest even amount.");
                } else {
                    actualSaleRequest()
                }
                //TODO change to BUSD decimals

                // setCallback(() => actualSaleRequest());
                // setConfirmMessage("Confirm token purchase");
                // setShowConfirm(true);
            }

        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    const approve = async () => {
        try {
            tokenContract.approve(ido.contract_address, ethers.constants.MaxUint256).then((response) => {
                let transaction = response.wait().then(tran => {
                    setAllowance(ethers.constants.MaxUint256)
                })

                toast.promise(
                    transaction,
                    {
                        pending: 'Approval transaction pending',
                        success: 'Approval transaction successfull',
                        error: 'Approval transaction failed'
                    }
                )
            });
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    if (ido === undefined)
        return (<></>)

    return (
        <div className={classes.IdoBlock}>
            <div className={classes.privateSaleFlag}>{ido.is_private_sale ? 'Private Sale': 'Public Sale'}</div>
            <div className={classes.tokenBlock}>
                <div className={classes.token}>
                    <img className={classes.tokenLogo} alt={idoInfo.token.name} src={idoInfo.token.img} />
                    <div className={classes.text}>
                        <div className={classes.name}> {idoInfo.token.name} </div>
                        <div className={classes.symbol}>{idoInfo.token.symbol}</div>
                        <div className={classes.media}>
                            <a key={-1} href={ido.website_url} target="_blank"><img src={InternetLogo} /></a>
                            {media.map((media, id) => {
                                return <a key={id} href={media.link} target="_blank"> <img alt="" src={media.imgMobile} /> </a>
                            })}
                        </div>
                    </div>
                </div>

                {priceDetail(idoInfo.token)}
            </div>
            <div className={sloganCollapsed ? classes.slogan : classes.expandedSlogan}> {ido.heading_text+'.'}
                {ido.heading_text.length > 100 &&
                    <div className={classes.readMore} onClick={() => setSloganCollapsed(!sloganCollapsed)}>
                        {sloganCollapsed ? 'Read More' : 'Show less'} {sloganCollapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </div>}
            </div>
            <div className={classes.saleInfo}>
                <div className={classes.line} ></div>
                <RoundDetail time_left={ido.current_round === 'Preparing for sale' ? ido.time_until_launch : ido.time_left_in_current_round} current_round={ido.current_round} />
                {progressBar(idoInfo.saleInfo)}
                {launchDetaid(idoInfo.saleInfo, totalBUSDRaised)}
            </div>

            <div className={classes.actions}>
                {isLotteryWinner && depositedAmount === 0 &&
                    <div className={classes.lotteryWinner}>
                        <h2>Lottery Winner!</h2>
                    </div>
                }
                <div className={classes.actionBlock}>
                    {
                        (
                            (!showVerify || kycBypassers.some(e=>e===account)) &&
                            ((ido.timeline.sale_end > Date.now() / 1000 &&
                                ido.timeline.registration_start < Date.now() / 1000 &&
                                (!isRegistered || ido.timeline.sale_start > Date.now() / 1000))
                                ||
                                (ido.timeline.sale_start < Date.now() / 1000 &&
                                    ido.timeline.sale_end > Date.now() / 1000 &&
                                    isRegistered))
                            // && depositedAmount === 0
                        )
                        &&
                        <>
                            {/* <div className={classes.addToken}>
                                <button onClick={() => addToken()}>Add Token to Metamask</button>
                            </div> */}
                            <div className={classes.buttonBlock}>
                                {ido.timeline.sale_end > Date.now() / 1000
                                    && ido.timeline.registration_start < Date.now() / 1000
                                    && (ido.timeline.sale_start > Date.now() / 1000)
                                    && <button
                                        disabled={isRegistered}
                                        onClick={() => {
                                            if (!isRegistered)
                                                registerForSale()
                                        }}
                                    >
                                        {isRegistered ? 'Whitelisted' : 'Get Whitelisted'}
                                    </button>}
                                {
                                    ido.timeline.sale_start < Date.now() / 1000 && ido.timeline.sale_end > Date.now() / 1000 &&
                                    !isRegistered && <div className={classes.notWhitelisted}> You are not whitelisted for this IDO! </div>
                                }
                                {
                                    ido.timeline.sale_start < Date.now() / 1000 && ido.timeline.sale_end > Date.now() / 1000 &&
                                    isRegistered &&
                                    <div className={classes.inputs}>


                                            {
                                                ido.timeline.sale_start < Date.now() / 1000 && ido.timeline.sale_end > Date.now() / 1000 &&

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

                                                <button
                                                    onClick={() => { participateSale() }}
                                                    style={{
                                                        // backgroundColor: isParticipated ? '#bfff80' : '#ffd24d',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    {isParticipated ? "Your Deposit" : "Deposit Tokens"}
                                                </button>

                                            </>
                                        }

                                        {(allowance < amount || isNaN(amount)) &&
                                            <button
                                                onClick={() => { approve() }}
                                                // style={{ backgroundColor: '#ffd24d' }}
                                            >
                                                Approve
                                            </button>
                                        }
                                    </div>
                                }
                            </div>
                        </>

                    }

                    {
                        ((showVerify && !kycBypassers.some(e=>e===account))) && <div className={classes.kyc}>

                            {stakingBalance > 1000 ?
                                <p>Please complete the KYC verification process</p>
                                : <p>You have to stake at least a 1000 PEAK tokens in order to participate in sales. <a onClick={() => navigate('/allocation-staking')}>Go to staking</a></p>}
                        </div>
                    }



                </div>

                {/* {
                    <>
                        <div className={classes.line} ></div>

                        <div className={classes.tierInfo}>
                            <div className={classes.infoItem}>
                                <h1>Tier Level</h1>
                                <h2>{userTier}</h2>
                            </div>

                            {depositedAmount > 0 &&
                                <div className={classes.fancyInfoItem}>
                                    <h1>Your Allocation <img src={ArrowRight} /></h1>
                                    <h2>{depositedAmount}</h2>
                                </div>
                            }


                        </div>
                    </>
                } */}

            </div>

            <ErrorDialog show={showError} setError={setShowError} customMessage={errorMessage} />
            <ErrorDialogStake show={showErrorStake} setError={setShowErrorStake} customMessage={errorMessage} />
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
            <div style={{ width: `${props.info.sale_progres}%` }} className={classes.topPart} ></div>
        </div>

        <div style={{ marginLeft: `calc(${Math.min(props.info.sale_progres, 100)}% - 0.5em` }}>
            <p>Sale <b>{Math.min(Math.round(props.info.sale_progres), 100)}%</b></p>
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

    const roundNamesMapper = (roundName) => {
        if (roundName === 'Registration round') {
            return 'Whitelisting'
        } else if (roundName === 'Sale round') {
            return 'Sale'
        }

        return roundName;
    }

    useEffect(() => {
        updateCount()

        return () => clearInterval(timer)
    }, [])


    return (
        <div className={classes.roundDetail}>
            <div className={classes.block}>
                <div className={classes.text}></div>
                <div className={classes.text}> Time left </div>
            </div>
            <div className={classes.block}>
                <div className={classes.roundInfo}> {roundNamesMapper(current_round)} </div>
                <div className={classes.timeInfo}> {timeLeft(iTimeLeft)} </div>
            </div>
        </div>
    )
}

function launchDetaid(props, totalBUSDRaised) {
    return (
        <div className={classes.roundDetail}>
            <div className={classes.block}>
                <div className={classes.text}> Tokens for Sale </div>
                <div className={classes.text}> Total Raise </div>
            </div>
            <div className={classes.block}>
                <div className={classes.roundInfo}> {numberWithCommas(props.info.token_distribution)} </div>
                <div className={classes.roundInfo}> ${numberWithCommas(!props.totalRaised ? totalBUSDRaised : props.totalRaised.toFixed(2))} </div>
            </div>
        </div>
    )
}