import React, { useState, useEffect } from 'react';
import classes from './StakeCard.module.scss';
import StakeIcon from './images/StakeIcon.svg';
import { abi, stakingContractAddress } from './../../services/consts';
import { abi as tokenAbi, tokenContractAddress } from './services/consts';
import { BigNumber, ethers } from 'ethers';
import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import {setBalance, setDecimal, selectAddress} from './../../../../features/userWalletSlice'

import { styled } from '@mui/material/styles';
import {toast} from 'react-toastify';

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


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


const StakeCard = ({ price, update}) => {

    const [amount, setAmount] = useState(0);
    let contract;
    const balance = useSelector(state => state.userWallet.balance);
    const decimals = useSelector(state => state.userWallet.decimal);
    const walletAddress = useSelector(selectAddress);
    const [allowance, setAllowance] = useState(0);

    const dispatch = useDispatch();
    const {ethereum} = window;
    
    const updateBalance = async ()=>{
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            let contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
            let tdecimals = await contract.decimals();
            let tbalance = await contract.balanceOf(walletAddress);
            dispatch(setDecimal(tdecimals));
            dispatch(setBalance(parseInt(tbalance.toString())));
        }
    }

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);

            contract.allowance(walletAddress, stakingContractAddress).then(response => {
                setAllowance(parseInt(response.toString()));
            })
        }
    }, [decimals, walletAddress])

    const stakeFunction = async () => {
        if (amount * (10**decimals) < allowance) {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                contract = new ethers.Contract(stakingContractAddress, abi, signer);

                let bigAmount = BigNumber.from(Math.round(amount * 100)).mul(BigNumber.from(10).pow(decimals - 2));
                const res = await contract.deposit(bigAmount);
                
                const a = res.wait().then(()=>{
                    const promise = new Promise(async (resolve, reject)=>{
                        setAmount(0);
                        await update();
                        await updateBalance();
                        resolve(1);
                      })
                      
                      toast.promise(
                        promise, 
                        {
                          pending: 'Updating information, please wait...',
                          success:  {
                            render(){
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
        }
        else {
            const { ethereum } = window;
            if (ethereum) {
                const { ethereum } = window;
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
                tokenContract.approve(stakingContractAddress, ethers.constants.MaxUint256).then((res)=>{
                    
                    let tran = res.wait().then((transaction)=>{
                        setAllowance(ethers.constants.MaxUint256);
                    });

                    toast.promise(
                        tran,
                        {
                            pending: 'Approval pending',
                            success: 'Approval successful',
                            error: 'Approval ailed'
                        }
                    );
                });
            }
        }
    }

    return (<>
        <div className={classes.stakeCard}>
            <div className={classes.cardHeader}>
                <img className={classes.headerIcon} src={StakeIcon} />
                <div className={classes.headerText}>
                    Stake PEAKDEFI
                </div>
            </div>

            <div className={classes.cardContent}>
                <div className={classes.input}>
                    <div className={classes.inputHeader}>
                        <div className={classes.headerBalance}> Balance: <b>{(balance / Math.pow(10, decimals)).toFixed(2)}</b> (~${((balance / Math.pow(10, decimals)) * price).toFixed(2)})</div>
                        <button className={classes.headerMax} onClick={() => setAmount((balance / Math.pow(10, decimals)))}>MAX</button>
                    </div>
                    <div className={classes.inputFields}>
                        <input type="number" value={amount} className={classes.inputField} onChange={(e) => {
                            setAmount(parseFloat(e.target.value));
                        }} />
                        <input className={classes.inputFieldPostpend} type="text" value={"PEAK"} disabled />
                    </div>
                    <IOSSlider
                        className={classes.percentSlider}
                        value={Math.round(amount / (balance / Math.pow(10, decimals)) * 100)}
                        aria-label="Default"
                        valueLabelDisplay="on"
                        onChange={(e, value) => {
                            setAmount(parseFloat(((balance / Math.pow(10, decimals)) / 100 * value).toFixed(2)))
                        }}
                        marks={[{ value: 0 }, { value: 100 }]}
                        valueLabelFormat={(value) => isNaN(value) ? '':value + '%'}
                    />
                </div>



                <div className={classes.confirmationButton}>
                    <button className={classes.stakeButton} onClick={stakeFunction}> {amount * (10**decimals)  < allowance ? 'Stake PEAKDEFI' : 'Approve'}</button>
                </div>
            </div>
        </div>
        
    </>
    );
}

export default StakeCard;