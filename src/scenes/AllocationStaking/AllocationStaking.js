import React from 'react';
import { ethers, BigNumber } from 'ethers';

import classes from './AllocationStaking.module.scss'
import StakeCard from './components/StakeCard/StakeCard';
import StakingStats from './components/StakingStats/StakingStats';
import TotalsSection from './components/TotalsSection/TotalsSection';
import ValuePriceCard from './components/ValuePriceCard/ValuePriceCard';
import WithdrawCard from './components/WithdrawCard/WithdrawCard';

import Button from '@mui/material/Button';

import { abi, stakingContractAddress } from './services/consts';
import { abi as tokenAbi, tokenContractAddress } from './components/StakeCard/services/consts';

import { selectAddress } from './../../features/userWalletSlice';
import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react'
import InfoDialog from './components/InfoDialog/InfoDialog';

const AllocationStaking = () => {
    const [showInfoDialog, setShowInfoDialog] = useState(false);

    const mainText = "PEAKDEFI IDO Allocation Staking";
    const [totalValueLocked, setTotalValueLocked] = useState(0);
    const [price, setPrice] = useState(0);
    const [stakeBalance, setStakeBalance] = useState(0);
    const [stakingContract, setStakingContract] = useState();
    const address = useSelector(state => state.userWallet.address);
    const [stakingStats, setStakingStats] = useState([
        {
            title: 'Current APY',
            value: 0,
            append: '%'
        },

        {
            title: 'My staked PEAKDEFI',
            value: 0,
            append: 'PEAK',
            subvalue: {
                value: 0,
                append: '$'
            }
        },

        {
            title: 'My earned PEAKDEFI',
            value: 0,
            append: 'PEAK',
            subvalue: {
                value: 0,
                append: '$'
            }
        },


    ]);
    const [totals, setTotals] = useState([
        {
            title: 'Total PEAK Staked',
            value: {
                value: 14141895.73
            },
            subvalue: {
                value: 152873.81,
                prepend: '$'
            }
        },

        {
            title: 'Total Rewards Redistributed',
            value: {
                value: 695545.91
            },
            subvalue: {
                value: 7518851.29,
                prepend: '$'
            }
        }
    ]);
    const [decimals, setDecimals] = useState(1);

    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

    useEffect(() => {
        async function getInfo() {

            await setStakingContract(new ethers.Contract(stakingContractAddress, abi, provider));
            const { ethereum } = window;
            if (ethereum) {

                console.log(stakingContract);
                stakingContract.totalDeposits().then(response => {
                    let tempTotals = [...totals];
                    tempTotals[1].value.value = response / Math.pow(10, decimals);
                    tempTotals[1].subvalue.value = response / Math.pow(10, decimals) * price;
                    setTotals([...totals]);
                });

                stakingContract.totalRewards().then(response => {
                    let tempTotals = [...totals];
                    tempTotals[2].value.value = response;
                    tempTotals[2].subvalue.value = response * price;
                    setTotals([...totals]);
                });

                //My Earned PEAKDEFI(2) && My Staked PEAKDEFI(1)
                stakingContract.userInfo(address).then(response => {
                    let tempStakingStats = [...stakingStats];

                    tempStakingStats[1].value = (response.amount / Math.pow(10, decimals)).toFixed(2);
                    tempStakingStats[1].subvalue.value = (response.amount / Math.pow(10, decimals) * price).toFixed(2);

                    setStakingStats([...tempStakingStats]);
                    setStakeBalance(parseInt(response.amount.toString()) / Math.pow(10, decimals));

                });

                

                //current APY
                stakingContract.stakingPercent().then((response) => {
                    let tempStakingStats = [...stakingStats];
                    console.log("res", parseInt(response._hex))
                    tempStakingStats[0].value = parseInt(response._hex).toFixed(2);
                    console.log("res1", tempStakingStats)
                    // tempTotals[0].subvalue.value = (response.totalDeposits/Math.pow(10, decimals) * price);
                    setStakingStats([...tempStakingStats]);
                })

            }
        }

        getInfo();
    }, [address, decimals]);

    useEffect(()=>{
        setInterval(()=>{
            console.log("REQUEST SENT");
            const tstakingContract = new ethers.Contract(stakingContractAddress, abi, provider)
            tstakingContract.pending().then(response => {
                let tempStakingStats = [...stakingStats];
                tempStakingStats[2].value = (response / Math.pow(10, decimals)).toFixed(4);
                tempStakingStats[2].subvalue.value = ((response * price) / Math.pow(10, decimals)).toFixed(2);
                setStakingStats([...tempStakingStats]);
            });
        }, 30000)
    }, []);



    return (
        <div className={classes.allocationStaking}>

            <div className={classes.pageTitle}>
                <div className={classes.mainText}>
                    <div>{mainText}</div>
                </div>

                <div className={classes.infoButton} onClick={() => { setShowInfoDialog(true);}}>
                    Info
                </div>
            </div>
            <div className={classes.vpCard}>
                <ValuePriceCard totalValueLocked={totalValueLocked} price={price} />
            </div>

            <div className={classes.pageContent}>

                <div className={classes.stakingCards}>
                    <StakeCard price={price} decimals={decimals} setDecimals={setDecimals} />
                    <WithdrawCard balance={stakeBalance} price={price} decimals={decimals} />
                </div>

                <div className={classes.infoCards}>
                    <StakingStats content={stakingStats} />
                </div>

            </div>

            <div className={classes.totalsSection}>
                <TotalsSection content={totals} />
            </div>

            
            <InfoDialog show={showInfoDialog} setShow={setShowInfoDialog}/>    
        </div>
    );
}

export default AllocationStaking;