import { useState } from 'react';
import WithdrawIcon from './images/WithdrawIcon.svg'
import classes from './WithdrawCard.module.scss'
import { abi, stakingContractAddress } from './../../services/consts'
import { ethers } from 'ethers';
import Switch from '@mui/material/Switch';


const WithdrawCard = ({ balance }) => {
    const [amount, setAmount] = useState();
    const [units, setUnits] = useState();
    let contract;

    const withdrawFunction = async () => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            debugger;
            contract = new ethers.Contract(stakingContractAddress, abi, signer);
            await contract.withrdaw(0, units ? units/100 * balance :amount);
        }
    }

    const harverstFucntion = async () => {
        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            debugger;
            contract = new ethers.Contract(stakingContractAddress, abi, signer);
            await contract.compound(0);
        }
    }

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
                <Switch value={units} onChange={(e, value) => setUnits(value)} />
                <div>%</div>
            </div>

            <div className={classes.confirmationButton}>
                <button className={classes.withdrawButton} onClick={withdrawFunction}> Withdraw PEAKDEFI</button>
                <button className={classes.harvestButton} onClick={harverstFucntion}><div className={classes.whiter}><span className={classes.gradientText}>Harverst PEAKDEFI</span></div></button>
            </div>
        </div>
    </div>);
}

export default WithdrawCard;