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
import { useDispatch, useSelector } from 'react-redux';

import { useState, useEffect } from 'react'
import InfoDialog from './components/InfoDialog/InfoDialog';
import { setBalance } from '../../features/stakingSlice';
import { toast } from 'react-toastify';
import { getPrice } from './API/staking';
import { RpcProvider } from '../../consts/rpc';
import InfoIcon from '@mui/icons-material/Info';

const AllocationStaking = () => {
    const [showInfoDialog, setShowInfoDialog] = useState(false);

    const dispatch = useDispatch();
    const decimals = useSelector(state => state.userWallet.decimal);

    const mainText = "Stake PEAK to get allocation and 20% APY";
    const [totalValueLocked, setTotalValueLocked] = useState(0);
    const [price, setPrice] = useState(0);
    const [stakeBalance, setStakeBalance] = useState(0);
    const [stakingContract, setStakingContract] = useState();
    const address = useSelector(state => state.userWallet.address);
    const [stakingStats, setStakingStats] = useState([
        {
            title: 'Current APY',
            value: undefined,
            append: '%',
            info: 'Current APY INFO'
        },

        {
            title: 'My staked PEAK',
            value: undefined,
            append: 'PEAK',
            info: 'MyStaked PEAK Info',
            subvalue: {
                value: undefined,
                append: '$'
            }
        },

        {
            title: 'My earned PEAK',
            value: undefined,
            append: 'PEAK',
            info: 'My Earned INfo',
            subvalue: {
                value: undefined,
                append: '$'
            }
        },


    ]);

    useEffect(() => {
        setTotalValueLocked(price * (stakeBalance / Math.pow(10, decimals)));
    }, [price, stakeBalance, decimals])
    const [totals, setTotals] = useState([
        {
            title: 'Total PEAK Staked',
            value: {
                value: 0
            },
            subvalue: {
                value: 0,
                prepend: '$'
            }
        },

        {
            title: 'Total Rewards Distributed',
            value: {
                value: 0
            },
            subvalue: {
                value: 0,
                prepend: '$'
            }
        }
    ]);
    

    const provider = new ethers.providers.JsonRpcProvider(RpcProvider);

    async function getInfo() {
        const localStakingContract = new ethers.Contract(stakingContractAddress, abi, provider);
        setStakingContract(localStakingContract);
        const { ethereum } = window;
        if (ethereum && localStakingContract !== undefined) {

            console.log(localStakingContract);
            const totalDepositsP = localStakingContract.totalDeposits().then(response => {
                let tempTotals = [...totals];
                tempTotals[0].value.value = parseInt(response.toString());
                tempTotals[0].subvalue.value = response * price;
                setTotals([...tempTotals]);
            });

            const totalRewardsP = localStakingContract.totalRewards().then(response => {
                let tempTotals = [...totals];
                tempTotals[1].value.value = response;
                tempTotals[1].subvalue.value = response * price;
                setTotals([...tempTotals]);
            });

            //My Earned PEAKDEFI(2) && My Staked PEAKDEFI(1)
            const userInfoP = localStakingContract.userInfo(address).then(response => {
                let tempStakingStats = [...stakingStats];

                tempStakingStats[1].value = response.amount;
                tempStakingStats[1].subvalue.value = response.amount * price;

                setStakingStats([...tempStakingStats]);

                setStakeBalance(parseInt(response.amount.toString()));

                //updating staking balance globally
                dispatch(setBalance(parseInt(response.amount.toString())));
            });



            //current APY
            const stakingPercentP = localStakingContract.stakingPercent().then((response) => {
                let tempStakingStats = [...stakingStats];
                console.log("res", parseInt(response._hex))
                tempStakingStats[0].value = parseInt(response._hex);
                console.log("res1", tempStakingStats)
                // tempTotals[0].subvalue.value = (response.totalDeposits/Math.pow(10, decimals) * price);
                setStakingStats([...tempStakingStats]);
            })

            const lprovider = new ethers.providers.Web3Provider(ethereum)
            const signer = lprovider.getSigner();
            const tstakingContract = new ethers.Contract(stakingContractAddress, abi, signer)
            const pendingP = tstakingContract.pending().then(response => {
                let tempStakingStats = [...stakingStats];
                tempStakingStats[2].value = parseInt(response.toString());
                tempStakingStats[2].subvalue.value = (response * price);
                setStakingStats([...tempStakingStats]);
            });

            return Promise.all([totalDepositsP, totalRewardsP, userInfoP, stakingPercentP, pendingP])
        }
    }

    async function getPartialInfo() {
        const localStakingContract = new ethers.Contract(stakingContractAddress, abi, provider);
        //setStakingContract(localStakingContract);
        const { ethereum } = window;
        if (ethereum && localStakingContract !== undefined) {

            console.log(localStakingContract);
            const totalDepositsP = localStakingContract.totalDeposits().then(response => {
                let tempTotals = [...totals];
                tempTotals[0].value.value = parseInt(response.toString());
                tempTotals[0].subvalue.value = response * price;
                setTotals([...totals]);
            });

            const totalRewardsP = localStakingContract.totalRewards().then(response => {
                let tempTotals = [...totals];
                tempTotals[1].value.value = response;
                tempTotals[1].subvalue.value = response * price;
                setTotals([...totals]);
            });


            return Promise.all([totalDepositsP, totalRewardsP])
        }
    }

    useEffect(() => {
        getPrice().then(response => setPrice(response.data.price));
        getPartialInfo();
        getInfo();
        if (address) {
            toast.promise(
                getInfo(),
                {
                    pending: 'Fetching data, please wait...',
                    success: {
                        render() {
                            return "Data updated"
                        },
                        autoClose: 1
                    }
                }
            );
        }
    }, [address]);


    useEffect(() => {
        setInterval(() => {
            const { ethereum } = window;
            const lprovider = new ethers.providers.Web3Provider(ethereum)
            const signer = lprovider.getSigner();
            const tstakingContract = new ethers.Contract(stakingContractAddress, abi, signer)
            tstakingContract.pending().then(response => {
                let tempStakingStats = [...stakingStats];
                tempStakingStats[2].value = response;
                tempStakingStats[2].subvalue.value = response * price;
                setStakingStats([...tempStakingStats]);
            });
        }, 30000)
    }, []);



    return (
        <div className={classes.allocationStaking}>

            <div className={classes.pageTitle}>
                <div className={classes.mainText}>
                    <div><span>{mainText}</span><InfoIcon onClick={()=>{
                        setShowInfoDialog(true);
                    }}/></div>
                </div>

                {/*<div className={classes.infoButton} onClick={() => { setShowInfoDialog(true); }}>
                    Info
                </div>*/}
            </div>
            <div className={classes.vpCard}>
                <ValuePriceCard totalValueLocked={totalValueLocked} price={price} />
            </div>

            <div className={classes.pageContent}>

                <div className={classes.stakingCards}>
                    <StakeCard price={price} update={getInfo} />
                    <WithdrawCard balance={stakeBalance} price={price} decimals={decimals} update={getInfo} />
                </div>

                <div className={classes.infoCards}>
                    <StakingStats content={stakingStats} />
                    <TotalsSection content={totals} />
                </div>

            </div>
            <InfoDialog show={showInfoDialog} setShow={setShowInfoDialog} />
        </div>
    );
}

export default AllocationStaking;