import {useState} from 'react';
import WithdrawIcon from './images/WithdrawIcon.svg'
import classes from './WithdrawCard.module.scss'


const WithdrawCard = ({balance}) => {
    const [amount, setAmount] = useState();
    
    return (<div className={classes.withdrawCard}>
        <div className={classes.cardHeader}>
            <img className={classes.headerIcon} src={WithdrawIcon} />
            <div className={classes.headerText}>
                Withdraw PEAKDEFI
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
                <button className={classes.withdrawButton}> Withdraw PEAKDEFI</button>
                <button className={classes.harvestButton}><div className={classes.whiter}><span className={classes.gradientText}>Harverst PEAKDEFI</span></div></button>
            </div>
        </div>
    </div>);
}

export default WithdrawCard;