import { useState, useRef, useEffect } from 'react';
import WithdrawIcon from './images/WithdrawIcon.svg'
import classes from './WithdrawCard.module.scss'
import { abi, stakingContractAddress } from './../../services/consts'
import { ethers, BigNumber, providers } from 'ethers';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { tokenContractAddress, abi as tokenAbi } from './../StakeCard/services/consts';
import { setBalance, setDecimal, selectAddress } from './../../../../features/userWalletSlice'
import { RpcProvider } from '../../../../consts/rpc';
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { rpcWalletConnectProvider } from '../../../../consts/walletConnect';
//import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';

import InfoIcon from './../StakingStats/images/InfoIcon.svg';
import Check from './images/Check.svg';
import ConfirmationDialog from '../ReferralsCard/components/ConfirmationDialog/ConfirmationDialog';


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

const WithdrawCard = ({ updateInfo, price, decimals, update }) => {
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0);
  const [earned, setEarned] = useState(0);

  const [currentWeek, setCurrentWeek] = useState();
  const comissions = ['30%', '30%', '20%', '20%', '10%', '10%', '5%', '5%']

  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);


  let contract;
  const balance = useSelector(state => state.staking.balance);
  const walletAddress = useSelector(state => state.userWallet.address);

  const dispatch = useDispatch();

  useEffect(() => {

    const { ethereum } = window;
    if (ethereum && walletAddress) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      let scontract = new ethers.Contract(stakingContractAddress, abi, signer);
      scontract.userInfo(walletAddress).then(response => {
        setCurrentWeek(parseInt((Date.now() - response.stakingStart * 1000) / (24 * 3600 * 1000 * 7)) + 1)
      })

      scontract.pending().then(response => {
        setEarned((response / (10 ** decimals)).toFixed(2));
      })
    }
    else if (walletAddress) {
      const provider = new ethers.providers.Web3Provider(rpcWalletConnectProvider);
      const signer = provider.getSigner();
      let scontract = new ethers.Contract(stakingContractAddress, abi, signer);
      scontract.userInfo(walletAddress).then(response => {
        setCurrentWeek(parseInt((Date.now() - response.stakingStart * 1000) / (24 * 3600 * 1000 * 7)) + 1)
      })

      scontract.pending().then(response => {
        setEarned((response / (10 ** decimals)).toFixed(2));
      })
    }

  }, [walletAddress, decimals]);


  useEffect(() => {
    if (amount !== 0 && !isNaN(amount)) {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        let scontract = new ethers.Contract(stakingContractAddress, abi, signer);
        scontract.getWithdrawFee(walletAddress, BigNumber.from(Math.round(amount * 100)).mul(BigNumber.from(10).pow(decimals - 2))).then((response) => {
          setFee(parseFloat(response.toString()));
        })
      }
      else if (walletAddress) {
        const provider = new ethers.providers.Web3Provider(rpcWalletConnectProvider);
        const signer = provider.getSigner();
        let scontract = new ethers.Contract(stakingContractAddress, abi, signer);



        scontract.getWithdrawFee(walletAddress, BigNumber.from(Math.round(amount * 100)).mul(BigNumber.from(10).pow(decimals - 2))).then((response) => {
          setFee(parseFloat(response.toString()));
        })
      }
    }
  }, [amount])

  const updateBalance = async () => {
    const { ethereum } = window;
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

  const withdrawFunction = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      contract = new ethers.Contract(stakingContractAddress, abi, signer);

      let bigAmount = BigNumber.from(Math.round(amount * 100)).mul(BigNumber.from(10).pow(decimals - 2));

      const res = await contract.withdraw(bigAmount);
      const transaction = res.wait().then(async () => {

        const promise = new Promise(async (resolve, reject) => {
          setAmount(0);
          await update();
          await updateBalance();
          resolve(1);
        })

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
        transaction,
        {
          pending: 'Transaction pending',
          success: 'Withdraw request completed',
          error: 'Transaction failed'
        }
      )
    } else if (walletAddress) {

      const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
      const signer = web3Provider.getSigner();
      contract = new ethers.Contract(stakingContractAddress, abi, signer);

      let bigAmount = BigNumber.from(Math.round(amount * 100)).mul(BigNumber.from(10).pow(decimals - 2));

      const res = await contract.withdraw(bigAmount);
      const transaction = res.wait().then(async () => {

        const promise = new Promise(async (resolve, reject) => {
          setAmount(0);
          await update();
          await updateBalance();
          resolve(1);
        })

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
        transaction,
        {
          pending: 'Transaction pending',
          success: 'Withdraw request completed',
          error: 'Transaction failed'
        }
      )
    }
  }

  const harverstFucntion = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      contract = new ethers.Contract(stakingContractAddress, abi, signer);
      const request = await contract.withdraw(0);
      setShowConfirmationWindow(false);
      const transaction = request.wait().then(() => {
        updateInfo();
        setCurrentWeek(0);
      });
      toast.promise(
        transaction,
        {
          pending: 'Transaction pending',
          success: 'Claim request completed',
          error: 'Transaction failed'
        }
      )
    } else if (walletAddress) {
      const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
      const signer = web3Provider.getSigner();
      contract = new ethers.Contract(stakingContractAddress, abi, signer);
      const request = await contract.withdraw(0);
      const transaction = request.wait().then(() => {
        updateInfo();
        setCurrentWeek(0);
      });
      toast.promise(
        transaction,
        {
          pending: 'Transaction pending',
          success: 'Claim request completed',
          error: 'Transaction failed'
        }
      )
    }
  }

  const withdrawAllFunction = async () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner();
      contract = new ethers.Contract(stakingContractAddress, abi, signer);

      let bigAmount = BigNumber.from(Math.round((balance / Math.pow(10, decimals)) * 100)).mul(BigNumber.from(10).pow(decimals - 2));

      const res = await contract.withdraw(BigNumber.from(bigAmount));
      const transaction = res.wait().then(async () => {
        const harvestRes = await contract.withdraw(0);
        
        //after request has been completed we wait for the transaction
        //inside we wait till the transaction is completed
        //so we could send a request to update data and show responding toasts
        const harvestTransaction = harvestRes.wait().then(() => {
          const promise = new Promise(async (resolve, reject) => {
            setAmount(0);
            await update();
            await updateBalance();
            resolve(1);
          })

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
          harvestTransaction,
          {
            pending: 'Claiming your rewards, please wait',
            success: 'Rewards successfully claimed',
            error: 'Transaction failed'
          }
        )

      });

      toast.promise(
        transaction,
        {
          pending: 'Withdrawing your funds, please wait',
          success: 'Withdraw request completed',
          error: 'Transaction failed'
        }
      )
    } else if (walletAddress) {

      const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
      const signer = web3Provider.getSigner();
      contract = new ethers.Contract(stakingContractAddress, abi, signer);
      let bigAmount = BigNumber.from(Math.round((balance / Math.pow(10, decimals)) * 100)).mul(BigNumber.from(10).pow(decimals - 2));

      const res = await contract.withdraw(BigNumber.from(bigAmount));
      const transaction = res.wait().then(async () => {
        const harvestRes = await contract.withdraw(0);
        
        //after request has been completed we wait for the transaction
        //inside we wait till the transaction is completed
        //so we could send a request to update data and show responding toasts
        const harvestTransaction = harvestRes.wait().then(() => {
          const promise = new Promise(async (resolve, reject) => {
            setAmount(0);
            await update();
            await updateBalance();
            resolve(1);
          })

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
          harvestTransaction,
          {
            pending: 'Claiming your rewards, please wait',
            success: 'Rewards successfully claimed',
            error: 'Transaction failed'
          }
        )

      });

      toast.promise(
        transaction,
        {
          pending: 'Withdrawing your funds, please wait',
          success: 'Withdraw request completed',
          error: 'Transaction failed'
        }
      )
    }
  }

  return (<div className={classes.withdrawCard}>


    <div className={classes.cardContent}>
      <div className={classes.cardHeader}>
        <img className={classes.headerIcon} src={WithdrawIcon} />
        <div className={classes.headerText}>
          Withdraw PEAK
          <Tooltip
            enterTouchDelay={0}
            leaveTouchDelay={6000}
            title={<div>
              <div><b>Penalty fees:</b></div>
              <div>2 weeks - 30%</div>
              <div>4 weeks - 20%</div>
              <div>6 weeks - 10%</div>
              <div>8 weeks -5%</div>
              <div>else - 0%</div>
            </div>}
          >
            <img src={InfoIcon} className={classes.headerInfoIcon} />
          </Tooltip>
        </div>
      </div>


      <div className={classes.input}>
        <div className={classes.inputHeader}>
          <div className={classes.headerBalance}> Balance: <b>{numberWithCommas(balance / Math.pow(10, decimals))}</b> (~${numberWithCommas((balance / Math.pow(10, decimals)) * price)})</div>
          <button className={classes.headerMax} onClick={() => setAmount((balance / Math.pow(10, decimals)))}>MAX</button>
        </div>
        <div className={classes.inputFields}>
          <input type="number" value={amount} className={classes.inputField} min={0} max={balance / Math.pow(10, decimals)} onChange={(e) => {
            setAmount(parseFloat(e.target.value));
          }}
            disabled={balance === 0}
          />
          <input className={classes.inputFieldPostpend} type="text" value={"PEAK"} disabled />
        </div>
        {amount > 0 && <div style={currentWeek >= 8 ? { color: "green" } : { color: "red" }} className={classes.fee}>
          <p>Penalty Fee: {(fee / Math.pow(10, decimals)).toFixed(4)} PEAK</p>
        </div>}

        <IOSSlider
          valueLabelDisplay="on"
          className={classes.percentSlider}
          value={Math.round(amount / (balance / Math.pow(10, decimals)) * 100)}
          aria-label="Default"
          onChange={(e, value) => {
            setAmount(parseFloat(((balance / Math.pow(10, decimals)) / 100 * value).toFixed(2)))
          }}
          marks={[{ value: 0 }, { value: 100 }]}
          valueLabelFormat={(value) => isNaN(value) ? '' : value + '%'}
        />
      </div>


      <div className={classes.comissionSection}>
        <div className={classes.numericValues}>
          <div>Current Penalty Fee: <b>{currentWeek <= 8 ? comissions[currentWeek - 1] : 0}</b></div>
          <div>Week: <b>{currentWeek} of 8</b></div>
        </div>
        <div className={classes.timeline}>
          <ul>
            {
              comissions.map((e, index) => {

                //if it's week 9+ all points should be checked
                //if week point is behind current week then add checkmark
                if (index + 1 < currentWeek || currentWeek > comissions.length) {
                  return <>
                    <li key={index}><img src={Check} /></li>
                    {index + 1 < comissions.length && <div className={classes.bar}></div>}
                  </>
                }

                //either print current week with a big dot or upcoming week with disabled dot
                if (index + 1 !== comissions.length) {
                  return <>
                    <li key={index} className={index + 1 === currentWeek ? classes.bigDot : index + 1 > currentWeek ? classes.dotDisabled : null}>
                      {index + 1 === currentWeek ? <b>{e}</b> : <>{e}</>}
                    </li>
                    <div className={index + 1 < currentWeek ? classes.bar : classes.barDisabled}></div>
                  </>
                }

                //print upcoming week
                return <li key={index} className={index + 1 === currentWeek ? classes.bigDot : index + 1 > currentWeek ? classes.dotDisabled : null}>
                  {index + 1 === currentWeek ? <b>{e}</b> : <>{e}</>}
                </li>
              })
            }
          </ul>
        </div>
      </div>



      <div className={classes.confirmationButton}>
        <button className={classes.withdrawButton} onClick={withdrawFunction} disabled={balance === 0}> Withdraw PEAK</button>
        <button className={classes.harvestButton} onClick={() => setShowConfirmationWindow(true)} disabled={balance === 0}><div className={classes.whiter}><span className={classes.gradientText}>Claim rewards</span></div></button>
        <button className={classes.withdrawAllButton} onClick={withdrawAllFunction} disabled={balance === 0}>Withdraw all PEAK</button>
      </div>
    </div>

    <ConfirmationDialog open={showConfirmationWindow} setOpen={setShowConfirmationWindow} callback={harverstFucntion} amount={earned} />
  </div>);
}

export default WithdrawCard;