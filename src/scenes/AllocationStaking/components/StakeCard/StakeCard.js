import React, { useState, useEffect } from 'react';
import classes from './StakeCard.module.scss';
import StakeIcon from './images/StakeIcon.svg';
import { abi, stakingContractAddress } from './../../services/consts';
import { abi as tokenAbi, tokenContractAddress } from './services/consts';
import { BigNumber, ethers } from 'ethers';
import Slider from '@mui/material/Slider';
import { useSelector } from 'react-redux';
import { selectAddress } from './../../../../features/userWalletSlice'

import { styled } from '@mui/material/styles';

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


const IOSSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
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
        fontWeight: 'normal',
        top: 27,
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
        height: 3
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        height: 10,
        width: 2,
        '&.MuiSlider-markActive': {
            opacity: 0.8,
            backgroundColor: 'currentColor',
        },
    },
}));

const StakeCard = ({ price, decimals, setDecimals }) => {

    const [amount, setAmount] = useState(0);
    let contract;
    const [balance, setBalance] = useState(0);
    const walletAddress = useSelector(selectAddress);

    useEffect(async () => {
        const { ethereum } = window;
        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);
            let tdecimals = await contract.decimals();

            await setDecimals(() => tdecimals);


        }
    }, [walletAddress]);

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            contract = new ethers.Contract(tokenContractAddress, tokenAbi, signer);

            contract.balanceOf(walletAddress).then(response => {
                setBalance(response / Math.pow(10, decimals));
            });
        }
    }, [decimals])

    const stakeFunction = async () => {
        const { ethereum } = window;
        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            contract = new ethers.Contract(stakingContractAddress, abi, signer);
        
            let bigAmount = BigNumber.from(Math.round(amount*100)).mul(BigNumber.from(10).pow(decimals-2));
            await contract.deposit(0, bigAmount);
        }
    }

    return (
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
                        <div className={classes.headerBalance}> Balance: <b>{balance.toFixed(2)}</b> (~${(balance * price).toFixed(2)})</div>
                        <button className={classes.headerMax} onClick={() => setAmount(balance)}>MAX</button>
                    </div>
                    <div className={classes.inputFields}>
                        <input type="number" value={amount} className={classes.inputField} onChange={(e) => {
                            setAmount(parseFloat(e.target.value));
                        }} />
                        <input className={classes.inputFieldPostpend} type="text" value={"PEAK"} disabled />
                    </div>
                    <IOSSlider
                        className={classes.percentSlider}
                        value={Math.round(amount / balance * 100)}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        onChange={(e, value) => {
                            setAmount(parseFloat((balance / 100 * value).toFixed(2)))
                        }}
                        marks={[{ value: 0 }, { value: 100 }]}
                        valueLabelFormat={(value) => value + '%'}
                    />
                </div>



                <div className={classes.confirmationButton}>
                    <button className={classes.stakeButton} onClick={stakeFunction}> Stake PEAKDEFI</button>
                </div>
            </div>
        </div>
    );
}

export default StakeCard;