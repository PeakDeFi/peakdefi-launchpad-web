import React from 'react';
import { ethers } from 'ethers';

import classes from './AllocationStaking.module.scss'
import StakeCard from './components/StakeCard/StakeCard';
import StakingStats from './components/StakingStats/StakingStats';
import TotalsSection from './components/TotalsSection/TotalsSection';
import ValuePriceCard from './components/ValuePriceCard/ValuePriceCard';
import WithdrawCard from './components/WithdrawCard/WithdrawCard';
import { abi, stakingContractAddress } from './services/consts';

import {selectAddress} from './../../features/userWalletSlice';
import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react'

const AllocationStaking = () => {
    const [mainText, setMainText] = useState("PEAKDEFI IDO Allocation Staking");
    const [totalValueLocked, setTotalValueLocked] = useState(45);
    const [price, setPrice] = useState(10.6);
    const [stakeBalance, setStakeBalance] = useState(145.85);
    const [stakingContract, setStakingContract] = useState();
    const [address, setAddress] = useState(useSelector(selectAddress));
    const [stakingStats, setStakingStats] = useState([
        {
            title: 'Current APY',
            value: 6.31,
            append: '%'
        },

        {
            title: 'My staked PEAKDEFI',
            value: 145.85,
            append: 'PEAK',
            subvalue: {
                value: 164087,
                append: '$'
            }
        },

        {
            title: 'My earned PEAKDEFI',
            value: 0.3,
            append: 'PEAK',
            subvalue: {
                value: 3.33,
                append: '$'
            }
        },

        {
            title: 'Compound PEAKDEFI',
            action: {
                buttonText: 'Connect walet to compound',
                buttonActive: false,
                buttonCallback: () => { alert("HELLO") }
            }
        }
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
        },

        {
            title: 'Reward Unlock Rate',
            value: {
                value: 0.01,
                append: 'XAVA',
                subappend: '/Second'
            },
            subvalue: {
                value: 152873.81,
                prepend: '$'
            }
        }
    ]);
    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

    useEffect(()=>{
        
        setStakingContract(new ethers.Contract(stakingContractAddress, abi, provider));
    }, [])

    useEffect( async () => {
        const { ethereum } = window;
        if (ethereum) {

            console.log(stakingContract);
            stakingContract.totalPEAKRedistributed().then(response => {
                let tempTotals = [...totals];
                tempTotals[1].value.value = response;
                tempTotals[1].subvalue.value = response * price;
                setTotals([...totals]);
            });

            stakingContract.rewardPerSecond().then(response => {
                let tempTotals = [...totals];
                tempTotals[2].value.value = response;
                tempTotals[2].subvalue.value = response * price;
                setTotals([...totals]);
            });

            stakingContract.userInfo(0, address).then(response => {

                let tempStakingStats = [...stakingStats];
                tempStakingStats[2].value = response.rewardDebt;
                tempStakingStats[2].subvalue.value = response.rewardDebt * price;

                tempStakingStats[1].value = response.amount;
                tempStakingStats[1].subvalue.value = response.amount * price;

                if (response.amount == 0) {
                    tempStakingStats[0].value = '0';
                }
                else {
                    tempStakingStats[0].value = ((totals[2].value.value * 31556926) / response.amount * 100).toString();
                }

                setStakingStats([...tempStakingStats]);
                setStakeBalance(response.amount.toString());

            });

            stakingContract.poolInfo(0).then((response) => {
                let tempTotals = [...totals];
                tempTotals[0].value.value = response.totalDeposits;
                tempTotals[0].subvalue.value = response.totalDeposits * price;
                setTotals([...tempTotals]);
            })

        }
    }, [stakingContract, address]);


    return (
        <div className={classes.allocationStaking}>

            <div className={classes.pageTitle}>
                <div className={classes.mainText}>
                    <div>{mainText}</div>
                </div>

                <div className={classes.infoButton}>
                    Info
                </div>
            </div>
            <div className={classes.vpCard}>
                <ValuePriceCard totalValueLocked={totalValueLocked} price={price} />
            </div>

            <div className={classes.pageContent}>

                <div className={classes.stakingCards}>
                    <StakeCard balance={stakeBalance} />
                    <WithdrawCard balance={stakeBalance} />
                </div>

                <div className={classes.infoCards}>
                    <StakingStats content={stakingStats} />
                </div>

            </div>

            <div className={classes.totalsSection}>
                <TotalsSection content={totals} />
            </div>

        </div>);
}

export default AllocationStaking;