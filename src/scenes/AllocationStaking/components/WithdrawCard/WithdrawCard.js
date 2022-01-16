import { useState } from 'react';
import WithdrawIcon from './images/WithdrawIcon.svg'
import classes from './WithdrawCard.module.scss'
import { abi, stakingContractAddress } from '../../services/stakingContract'
import { ethers, BigNumber } from 'ethers';
import Slider from '@mui/material/Slider';
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


const WithdrawCard = ({ balance, price, decimals}) => {
    const [amount, setAmount] = useState(0);
    let contract;

    const withdrawFunction = async () => {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner();
            contract = new ethers.Contract(stakingContractAddress, abi, signer);

            let bigAmount = BigNumber.from(Math.round(amount*100)).mul(BigNumber.from(10).pow(decimals-2));
          

            await contract.withdraw( bigAmount);
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
                    <div className={classes.headerBalance}> Balance: <b>{balance.toFixed(2)}</b> (~${(balance * price).toFixed(2)})</div>
                    <button className={classes.headerMax} onClick={() => setAmount(balance)}>MAX</button>
                </div>
                <div className={classes.inputFields}>
                    <input type="number" value={amount} className={classes.inputField} onChange={(e) => {
                        setAmount(parseFloat(e.target.value));
                    }} />
                    <input className={classes.inputFieldPostpend} type="text" value={ "PEAK"} disabled />
                </div>

            </div>

            <IOSSlider 
                valueLabelDisplay="on" 
                className={classes.percentSlider} 
                value={Math.round(amount/balance*100)} 
                aria-label="Default" 
                valueLabelDisplay="auto" 
                onChange={(e, value)=>{
                    setAmount(parseFloat((balance/100*value).toFixed(2)))
                }}
                marks={[{value: 0}, {value: 100}]}
                valueLabelFormat={(value)=>value+'%'}
            />

            <div className={classes.confirmationButton}>
                <button className={classes.withdrawButton} onClick={withdrawFunction}> Withdraw PEAKDEFI</button>
                <button className={classes.harvestButton} onClick={harverstFucntion}><div className={classes.whiter}><span className={classes.gradientText}>Harverst PEAKDEFI</span></div></button>
            </div>
        </div>
    </div>);
}

export default WithdrawCard;