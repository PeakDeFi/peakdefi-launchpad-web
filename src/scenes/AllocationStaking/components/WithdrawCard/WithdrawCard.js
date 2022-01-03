
import WithdrawIcon from './images/WithdrawIcon.svg'
import classes from './WithdrawCard.module.scss'


const WithdrawCard = () => {
    return (<div className={classes.withdrawCard}>
        <div className={classes.cardHeader}>
            <img className={classes.headerIcon} src={WithdrawIcon}/>
            <div className={classes.headerText}>
                Withdraw PEAKDEFI
            </div>
        </div>

        <div className={classes.cardContent}>
            <div className={classes.input}>
                <div className={classes.inputHeader}>
                    <div className={classes.headerBalance}> Balance: 123243</div>
                    <button className={classes.headerMax}>MAX</button>
                </div>
                <input type="number" className={classes.inputField} onChange={(e) => {

                }} />
                <input className={classes.inputFieldPostpend} type="text" value="PEAKDEFI" disabled />
            </div>
            <div className={classes.confirmationButton}>
                <button className={classes.withdrawButton}> Withdraw PEAKDEFI</button>
                <button className={classes.harvestButton}><span className={classes.gradientText}>Harverst PEAKDEFI</span></button>
            </div>
        </div>
    </div>);
}

export default WithdrawCard;