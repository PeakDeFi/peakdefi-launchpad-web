import React from 'react';
import classes from './StakeCard.module.scss';
import StakeIcon from './images/StakeIcon.svg';


const StakeCard = () => {

    return (
        <div className={classes.stakeCard}>
            <div className={classes.cardHeader}>
                <img className={classes.headerIcon} src={StakeIcon}/>
                <div className={classes.headerText}>
                    Stake PEAKDEFI
                </div>
            </div>

            <div className={classes.cardContent}>
                <div className={classes.input}>
                    <div className={classes.inputHeader}>
                        <div className={classes.headerBalance}> Balance: 123243</div>
                        <button className={classes.headerMax}>MAX</button>
                    </div>
                    <input type="number" className={classes.inputField} onChange={(e)=>{
                        
                    }} />
                    <input className={classes.inputFieldPostpend} type="text" value="PEAK" disabled/>
                </div>
                <div className={classes.confirmationButton}>
                    <button className={classes.stakeButton}> Stake PEAKDEFI</button>
                </div>
            </div>
        </div>
    );
}

export default StakeCard;