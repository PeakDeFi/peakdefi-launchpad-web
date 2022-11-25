import React, { useState, useEffect } from 'react';
import classes from './StakeCard.module.scss';
import StakeIcon from './images/StakeIcon.svg';
import { abi, stakingContractAddress } from './../../services/consts';
import { abi as tokenAbi, tokenContractAddress } from './services/consts';
import { BigNumber, ethers, providers } from 'ethers';
import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import { setBalance, setDecimal, selectAddress } from './../../../../features/userWalletSlice'
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { RpcProvider } from '../../../../consts/rpc';
import { useCookies } from 'react-cookie';

import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { rpcWalletConnectProvider } from '../../../../consts/walletConnect';
import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import InfoIcon from '../StakingStats/images/InfoIcon.svg';
import { useNavigate } from 'react-router-dom';
import {setStaking} from '../../../../features/thankYouSlice'
import { addReferrer } from '../../API/staking';
import { useSearchParams } from "react-router-dom";

import ConfirmationDialog from './components/ConfirmationDialog/ConfirmationDialog';

const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#0AA7F5' : '#0AA7F5',
    height: 6,
    padding: '15px 0',

    '& .MuiSlider-thumb': {
        backgroundColor: '#0AA7F5',
        border: '3px solid white',
        boxShadow: iOSBoxShadow,
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },

    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: '600',
        top: 41,
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
        height: 6
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        height: 10,
        width: 0,
        '&.MuiSlider-markActive': {
            opacity: 0.8,
            backgroundColor: 'currentColor',
        },
    },
}));

function numberWithCommas(x) {
    return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StakeCard = ({ price, update }) => {

    const [amount, setAmount] = useState(0);
    let contract;
    const balance = useSelector(state => state.userWallet.balance - 1);
    const StakingBalance = useSelector(state => state.staking.balance);
    const decimals = useSelector(state => state.userWallet.decimal);
    const walletAddress = useSelector(selectAddress);
    const [allowance, setAllowance] = useState(0);

    const [cookies, setCookie] = useCookies(['referrer_wallet_address']);
    const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ethereum } = window;

    const [stringularAmount, setStringularAmount] = useState('');

    const updateBalance = async () => {
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            let contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
            let tdecimals = await contract.decimals();
            let tbalance = await contract.balanceOf(walletAddress);
            dispatch(setDecimal(tdecimals));
            dispatch(setBalance(parseInt(tbalance.toString())));
        } else if (walletAddress) {

            const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
            const signer = web3Provider.getSigner();

            let contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
            let tdecimals = await contract.decimals();
            let tbalance = await contract.balanceOf(walletAddress);
            dispatch(setDecimal(tdecimals));
            dispatch(setBalance(parseInt(tbalance.toString())));
        }
    }

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum && walletAddress) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);

            contract.allowance(walletAddress, stakingContractAddress).then(response => {
                setAllowance(parseInt(response.toString()));
            })
        } else if (walletAddress) {


            const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
            const signer = web3Provider.getSigner();

            contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);

            contract.allowance(walletAddress, stakingContractAddress).then(response => {
                setAllowance(parseInt(response.toString()));
            })
        }
    }, [decimals, walletAddress])

    const stakeFunction = async () => {
        alert("Your referrer will be " + cookies.referrer_wallet_address)
        setShowConfirmationWindow(false);
        debugger;
        if (balance/(10 ** decimals)  - amount  < 0) {
            toast.error("The amount entered is greater than the balance")

        } else {
            if (amount * (10 ** decimals) < allowance) {
                const { ethereum } = window;
                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(ethereum)
                    const signer = provider.getSigner();

                    contract = new ethers.Contract(stakingContractAddress, abi, signer);
                    let bigAmount = 0
                    if (amount * (10 ** decimals) >= balance) {
                        bigAmount = BigNumber.from(Math.floor(parseFloat(amount.toString().slice(0, -1)))).mul(BigNumber.from(10).pow(decimals));
                    } else {
                        bigAmount = BigNumber.from(Math.round(amount * 100)).mul(BigNumber.from(10).pow(decimals - 2));
                    }
                    const res = await contract.deposit(bigAmount);

                    const a = res.wait().then(() => {
            
                        
                        const promise = new Promise(async (resolve, reject) => {
                            dispatch(setStaking(amount));
                            setAmount(0);
                            setStringularAmount('0');
                            await update();
                            await updateBalance();
                            navigate('/thank-you-stake')
                            resolve(1);
                        })
                        console.log("addReferrer", walletAddress, cookies.referrer_wallet_address)

                        if(!!cookies.referrer_wallet_address && cookies.referrer_wallet_address!==''){
                            addReferrer(walletAddress, cookies.referrer_wallet_address);
                        }

                        toast.promise(
                            promise,
                            {
                                pending: 'Updating information, please wait...',
                                success: {
                                    render() {
                                        return "Data updated"
                                    },
                                    autoClose: 1
                                }
                            }
                        );
                    });

                    toast.promise(
                        a,
                        {
                            pending: 'Transaction pending',
                            success: 'Transaction successful',
                            error: 'Transaction failed'
                        }
                    )
                }
                else if (walletAddress) {
                    const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
                    const signer = web3Provider.getSigner();
                    contract = new ethers.Contract(stakingContractAddress, abi, signer);

                    let bigAmount = 0
                    if (amount * (10 ** decimals) > balance) {
                        bigAmount = BigNumber.from(Math.floor(parseFloat(amount.toString().slice(0, -1)))).mul(BigNumber.from(10).pow(decimals));
                    } else {
                        bigAmount = BigNumber.from(Math.round(amount * 100)).mul(BigNumber.from(10).pow(decimals - 2));
                    }
                    const res = await contract.deposit(bigAmount);

                    const a = res.wait().then(() => {
                        const promise = new Promise(async (resolve, reject) => {
                            setAmount(0);
                            setStringularAmount('0');
                            await update();
                            await updateBalance();
                            resolve(1);
                        })
                        console.log("addReferrer", walletAddress, cookies.referrer_wallet_address)

                        if(!!cookies.referrer_wallet_address && cookies.referrer_wallet_address!==''){
                            addReferrer(walletAddress, cookies.referrer_wallet_address);
                        }

                        toast.promise(
                            promise,
                            {
                                pending: 'Updating information, please wait...',
                                success: {
                                    render() {
                                        return "Data updated"
                                    },
                                    autoClose: 1
                                }
                            }
                        );
                    });

                    toast.promise(
                        a,
                        {
                            pending: 'Staking transaction pending',
                            success: 'Staking transaction transaction successful',
                            error: 'Transaction failed'
                        }
                    )
                }
            }
            else {
                const { ethereum } = window;
                if (ethereum) {
                    const { ethereum } = window;
                    const provider = new ethers.providers.Web3Provider(ethereum)
                    const signer = provider.getSigner();
                    const tokenContract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
                    tokenContract.approve(stakingContractAddress, ethers.constants.MaxUint256).then((res) => {

                        let tran = res.wait().then((transaction) => {
                            setAllowance(ethers.constants.MaxUint256);
                        });

                        toast.promise(
                            tran,
                            {
                                pending: 'Staking transaction pending',
                                success: 'Staking transaction transaction successful',
                                error: 'Transaction failed'
                            }
                        );
                    });
                }
                else if (walletAddress) {

                    const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
                    const signer = web3Provider.getSigner();

                    const tokenContract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
                    tokenContract.approve(stakingContractAddress, ethers.constants.MaxUint256).then((res) => {

                        let tran = res.wait().then((transaction) => {
                            setAllowance(ethers.constants.MaxUint256);
                        });

                        toast.promise(
                            tran,
                            {
                                pending: 'Approval pending',
                                success: 'Approval successful',
                                error: 'Approval failed'
                            }
                        );
                    });
                }
            }
        }
    }

    return (<>
        <div className={classes.stakeCard}>

            <div className={classes.cardContent}>

                <div className={classes.cardHeader}>
                    <img className={classes.headerIcon} src={StakeIcon} />
                    <div className={classes.headerText}>
                        Stake PEAK
                        <Tooltip
                            enterTouchDelay={0}
                            leaveTouchDelay={6000}
                            title={<div>
                                <div>
                                    You need to stake at least 1000 PEAK to be able to start the KYC process
                                </div>
                            </div>}
                        >
                            <img src={InfoIcon} className={classes.headerInfoIcon} />
                        </Tooltip>
                    </div>
                </div>
                <div className={classes.input}>
                    <div className={classes.inputHeader}>
                        <div className={classes.headerBalance}>Wallet Balance: <b>{(numberWithCommas(Math.abs(balance) / Math.pow(10, decimals)))}</b> (~${numberWithCommas((balance / Math.pow(10, decimals)) * price)})</div>
                        <button className={classes.headerMax} onClick={() => {
                            setAmount((balance / Math.pow(10, decimals)))
                            setStringularAmount((balance / Math.pow(10, decimals)).toFixed(2).replace(',', '.'))
                        }}>MAX</button>
                    </div>
                    <div className={classes.inputFields}>
                        <input lang="eng" type="text" value={stringularAmount} min={0} max={balance / Math.pow(10, decimals)} className={classes.inputField} onChange={(e) => {
                            if(/^([0-9]+[\.]?[0-9]*)$/.test(e.target.value)){
                                setAmount(parseFloat(e.target.value));
                                setStringularAmount(e.target.value)
                            }else if(e.target.value===''){
                                setStringularAmount('');
                                setAmount(0);
                            }
                        }} />
                        <input className={classes.inputFieldPostpend} type="text" value={"PEAK"} disabled />
                    </div>
                    <IOSSlider
                        className={classes.percentSlider}
                        value={Math.floor(amount / (balance / Math.pow(10, decimals)) * 100)}
                        aria-label="Default"
                        valueLabelDisplay="on"
                        onChange={(e, value) => {
                            if (value === 100) {
                                setAmount(parseFloat(((balance / Math.pow(10, decimals)))))
                                setStringularAmount(parseFloat(((balance / Math.pow(10, decimals)))).toFixed(2).replace(',', ''));
                            } else {
                                setAmount(parseFloat(((balance / Math.pow(10, decimals)) / 100 * value).toFixed(2)))
                                setStringularAmount(((balance / Math.pow(10, decimals)) / 100 * value).toFixed(2).replace(',', '.'));
                            }
                        }}
                        marks={[{ value: 0 }, { value: 100 }]}
                        valueLabelFormat={(value) => isNaN(value) ? '' : value + '%'}
                    />
                </div>



                <div className={classes.confirmationButton}>
                    <button className={classes.stakeButton}
                        disabled={amount === 0}
                        // onClick={stakeFunction}
                        onClick={() => { StakingBalance == 0 ? stakeFunction() : setShowConfirmationWindow(true)}}
                    > {amount * (10 ** decimals) < allowance ? 'Stake PEAK' : 'Approve'}</button>
                </div>
            </div>
        </div>
    <ConfirmationDialog open={showConfirmationWindow} setOpen={setShowConfirmationWindow} callback={stakeFunction} amount={amount} />


    </>
    );
}

export default StakeCard;