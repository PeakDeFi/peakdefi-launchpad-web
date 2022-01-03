import React, { useState } from 'react';
import classes from './StakeCard.module.scss';
import StakeIcon from './images/StakeIcon.svg';


const StakeCard = ({ balance }) => {

    const [amount, setAmount] = useState();

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
                        <button className={classes.headerMax}>MAX</button>
                    </div>
                    <div className={classes.inputFields}>
                        <input type="number" value={amount} className={classes.inputField} onChange={(e) => {
                            setAmount(parseFloat(e.target.value));
                        }} />
                        <input className={classes.inputFieldPostpend} type="text" value="PEAK" disabled />
                    </div>

                </div>
                <div className={classes.confirmationButton}>
                    <button className={classes.stakeButton}> Stake PEAKDEFI</button>
                </div>
            </div>
        </div>
    );
}

export default StakeCard;