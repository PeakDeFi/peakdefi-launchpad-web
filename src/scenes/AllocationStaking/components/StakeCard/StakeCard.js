import React, { useState } from 'react';
import classes from './StakeCard.module.scss';
import StakeIcon from './images/StakeIcon.svg';
import { abi, stakingContractAddress } from './../../services/consts';
import { ethers } from 'ethers';
import Switch from '@mui/material/Switch';

const StakeCard = ({ balance }) => {

    const [amount, setAmount] = useState();
    let contract;
    const [units, setUnits] = useState(false);


    const stakeFunction = async () => {
        const { ethereum } = window;

        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            contract = new ethers.Contract(stakingContractAddress, abi, signer);
            await contract.deposit(0, units ? amount/100 * balance : amount);
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
                        <div className={classes.headerBalance}> Balance: <b>{balance}</b> (~${(balance * 3.5).toFixed(2)})</div>
                        <button className={classes.headerMax} onClick={() => setAmount(balance)}>MAX</button>
                    </div>
                    <div className={classes.inputFields}>
                        <input type="number" value={amount} className={classes.inputField} onChange={(e) => {
                            setAmount(parseFloat(e.target.value));
                        }} />
                        <input className={classes.inputFieldPostpend} type="text" value={units ? "%" : "PEAK"} disabled />
                    </div>

                </div>

                <div className={classes.unitsToggle}>
                    <div>PEAK</div>
                    <Switch value={units} onChange={(e, value)=>setUnits(value)}/>
                    <div>%</div>
                </div>

                <div className={classes.confirmationButton}>
                    <button className={classes.stakeButton} onClick={stakeFunction}> Stake PEAKDEFI</button>
                </div>
            </div>
        </div>
    );
}

export default StakeCard;