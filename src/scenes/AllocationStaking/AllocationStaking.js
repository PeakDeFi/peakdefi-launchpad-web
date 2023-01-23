import React from 'react';
import { ethers, BigNumber } from 'ethers';

import classes from './AllocationStaking.module.scss'
import StakeCard from './components/StakeCard/StakeCard';
import StakingStats from './components/StakingStats/StakingStats';
import TotalsSection from './components/TotalsSection/TotalsSection';
import ValuePriceCard from './components/ValuePriceCard/ValuePriceCard';
import WithdrawCard from './components/WithdrawCard/WithdrawCard';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as TooltipRecharts } from 'recharts';
import Button from '@mui/material/Button';

import { abi, stakingContractAddress } from './services/consts';
import { abi as tokenAbi, tokenContractAddress } from './components/StakeCard/services/consts';

import { selectAddress, setDecimal } from './../../features/userWalletSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useState, useEffect } from 'react'
import InfoDialog from './components/InfoDialog/InfoDialog';
import { setBalance } from '../../features/stakingSlice';
import { toast } from 'react-toastify';
import { getPrice, getStakeStatistic } from './API/staking';
import { RpcProvider } from '../../consts/rpc';
import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { rpcWalletConnectProvider } from '../../consts/walletConnect';
import { useCookies } from 'react-cookie';
import { useSearchParams } from "react-router-dom";
import ReferralsCard from './components/ReferralsCard/ReferralsCard';
import Leaderboard from './components/Leaderboard/Leaderboard';
import RefereesTable from './components/RefereesList/RefereesTable';
import QnA from '../QnA/QnA';
import ReferralsSection from './components/ReferralsSection/ReferralsSection';

const AllocationStaking = () => {
    const showPrice = process.env.REACT_APP_API_URL === "https://api-dev.peakdefi.com/" ? false : true;
    const [showInfoDialog, setShowInfoDialog] = useState(false);

    const dispatch = useDispatch();
    const decimals = useSelector(state => state.userWallet.decimal);

    const mainText = "Stake PEAK to get IDO allocations and earn 20% APY";
    const [totalValueLocked, setTotalValueLocked] = useState(0);
    const [price, setPrice] = useState(0);
    const [stakeBalance, setStakeBalance] = useState(0);
    const [stakingContract, setStakingContract] = useState();
    const [graphData, setGraphData] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [cookies, setCookie] = useCookies(['referrer_wallet_address']);

    const address = useSelector(state => state.userWallet.address);
    const [stakingStats, setStakingStats] = useState([
        {
            title: 'Current APY',
            value: undefined,
            append: '%',
            info: 'We offer a guaranteed fixed APY of 20%'
        },

        {
            title: 'My staked PEAK',
            value: undefined,
            append: 'PEAK',
            info: 'The total number of your PEAK tokens that are currently locked in our staking pool',
            subvalue: {
                value: undefined,
                append: '$'
            }
        },

        {
            title: 'My earned PEAK',
            value: undefined,
            append: 'PEAK',
            info: 'The total number of PEAK tokens you have earned through the staking process',
            subvalue: {
                value: undefined,
                append: '$'
            }
        },


    ]);


    const [totals, setTotals] = useState([
        {
            title: 'Total PEAK staked',
            info: 'The total amount of PEAK tokens that are staked on our launchpad',
            value: {
                value: 0
            },
            subvalue: {
                value: 0,
                prepend: '$'
            }
        },

        {
            title: 'Total Rewards distributed',
            info: 'The total amount of PEAK token rewards we distributed to all stakers on our launchpad since launch.',
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
        const { ethereum } = window;
        let price = await getPrice().then(response => {return response.data.price});
        if (ethereum && address) {
            const localStakingContract = new ethers.Contract(stakingContractAddress, abi, provider);
            setStakingContract(localStakingContract);

            if (!localStakingContract)
                return

            const totalDepositsP = localStakingContract.totalDeposits().then(response => {
                let tempTotals = [...totals];
                tempTotals[0].value.value = parseInt(response.toString());
                tempTotals[0].subvalue.value = response * price;

                setTotalValueLocked(price * (response / Math.pow(10, decimals)))
                setTotals([...tempTotals]);
            });

            const paidOut = localStakingContract.paidOut().then(response => {
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
                tempStakingStats[0].value = parseInt(response._hex);
                // tempTotals[0].subvalue.value = (response.totalDeposits/Math.pow(10, decimals) * price);
                setStakingStats([...tempStakingStats]);
            })

            try {
                const lprovider = new ethers.providers.Web3Provider(ethereum)
                const signer = lprovider.getSigner();
                const tstakingContract = new ethers.Contract(stakingContractAddress, abi, signer)
                const pendingP = tstakingContract.pending().then(response => {
                    let tempStakingStats = [...stakingStats];
                    tempStakingStats[2].value = response;
                    tempStakingStats[2].subvalue.value = (response * price);
                    setStakingStats([...tempStakingStats]);
                });
                return Promise.all([totalDepositsP, paidOut, userInfoP, stakingPercentP, pendingP])
            } catch (error) {
                const lprovider = new ethers.providers.Web3Provider(ethereum)
                const signer = lprovider.getSigner();
                const tstakingContract = new ethers.Contract(stakingContractAddress, abi, signer)
                const pendingP = tstakingContract.pending().then(response => {
                    let tempStakingStats = [...stakingStats];
                    tempStakingStats[2].value = response;
                    tempStakingStats[2].subvalue.value = (response * price);
                    setStakingStats([...tempStakingStats]);
                });
                return Promise.all([totalDepositsP, paidOut, userInfoP, stakingPercentP, pendingP])
            }
           
            
        }
        //for mobile version(Wallet connect)
        else if (address) {
            const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);
            const signer = web3Provider.getSigner();

            const localStakingContract = new ethers.Contract(stakingContractAddress, abi, web3Provider);
            setStakingContract(localStakingContract);

            if (!localStakingContract)
                return

            const totalDepositsP = localStakingContract.totalDeposits().then(response => {
                let tempTotals = [...totals];
                tempTotals[0].value.value = parseInt(response.toString());
                tempTotals[0].subvalue.value = response * price;

                setTotalValueLocked(price * (response / Math.pow(10, decimals)))
                setTotals([...tempTotals]);
            });

            const paidOut = localStakingContract.paidOut().then(response => {
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
            })



            //current APY
            const stakingPercentP = localStakingContract.stakingPercent().then((response) => {
                let tempStakingStats = [...stakingStats];
                tempStakingStats[0].value = parseInt(response._hex);
                // tempTotals[0].subvalue.value = (response.totalDeposits/Math.pow(10, decimals) * price);
                setStakingStats([...tempStakingStats]);
            })



            try {
                const tstakingContract = new ethers.Contract(stakingContractAddress, abi, signer)
                const pendingP = tstakingContract.pending().then(response => {
                    let tempStakingStats = [...stakingStats];
                    tempStakingStats[2].value = response;
                    tempStakingStats[2].subvalue.value = (response * price);
                    setStakingStats([...tempStakingStats]);
                });
            return Promise.all([totalDepositsP, paidOut, userInfoP, stakingPercentP, pendingP])
            } catch (error) {
                
                const tstakingContract = new ethers.Contract(stakingContractAddress, abi, signer)
                const pendingP = tstakingContract.pending().then(response => {
                    let tempStakingStats = [...stakingStats];
                    tempStakingStats[2].value = response;
                    tempStakingStats[2].subvalue.value = (response * price);
                    setStakingStats([...tempStakingStats]);
            });
            return Promise.all([totalDepositsP, paidOut, userInfoP, stakingPercentP, pendingP])
            }
            
        }
        else if (!address) {
            const localStakingContract = new ethers.Contract(stakingContractAddress, abi, provider);
            setStakingContract(localStakingContract);

            if (!localStakingContract)
                return

            let tempStakingStats = [...stakingStats];

            tempStakingStats[1].value = undefined;
            tempStakingStats[1].subvalue.value = undefined;
            tempStakingStats[2].value = undefined;
            tempStakingStats[2].subvalue.value = undefined;
            setStakingStats([...tempStakingStats]);
            const totalDepositsP = localStakingContract.totalDeposits().then(response => {
                let tempTotals = [...totals];
                tempTotals[0].value.value = parseInt(response.toString());
                tempTotals[0].subvalue.value = response * price;

                setTotalValueLocked(price * (response / Math.pow(10, decimals)))
                setTotals([...tempTotals]);
            });

            const paidOut = localStakingContract.paidOut().then(response => {
                let tempTotals = [...totals];
                tempTotals[1].value.value = response;
                tempTotals[1].subvalue.value = response * price;
                setTotals([...tempTotals]);
            });
        }
    }

    async function getPartialInfo() {
        //setStakingContract(localStakingContract);
        const { ethereum } = window;
        if (ethereum) {
            const localStakingContract = new ethers.Contract(stakingContractAddress, abi, provider);

            if (!localStakingContract)
                return;

            const totalDepositsP = localStakingContract.totalDeposits().then(response => {
                let tempTotals = [...totals];
                tempTotals[0].value.value = response;
                tempTotals[0].subvalue.value = response * price;
                setTotals([...tempTotals]);
            });

            const paidOut = localStakingContract.paidOut().then(response => {
                let tempTotals = [...totals];
                tempTotals[1].value.value = response;
                tempTotals[1].subvalue.value = response * price;
                setTotals([...tempTotals]);
            });


            return Promise.all([totalDepositsP, paidOut])
        }
    }

    const saveReferrerWallet = () => {

        if (!cookies.referrer_wallet_address && searchParams.get("referrer_wallet_address")) {
            setCookie(
                'referrer_wallet_address',
                searchParams.get("referrer_wallet_address"),
                {
                    expires: new Date(new Date().setMonth(new Date().getMonth() + 1))
                }
            )

        }
    }

    //listeners
    useEffect(() => {
        getPrice().then(response => setPrice(response.data.price));
        
        getStakeStatistic().then(response => {
            setGraphData(response.data.data)
        })
        saveReferrerWallet();
    }, []);

    useEffect(() => {

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
    }, [address, decimals]);

    useEffect(() => {
        getPartialInfo();
        getInfo();
    }, [price, decimals])


    useEffect(() => {

        const { ethereum } = window;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            let contract = new ethers.Contract(tokenContractAddress, tokenAbi, provider);
            contract.decimals().then(response => {
                dispatch(setDecimal(response));
            }).catch(error => {
                
            })

        } else {
            const web3Provider = new providers.Web3Provider(rpcWalletConnectProvider);

            let contract = new ethers.Contract(tokenContractAddress, tokenAbi, web3Provider);
            contract.decimals().then(response => {
                dispatch(setDecimal(response));
            }).catch(error => {
                
            })
        }


        setInterval(() => {

            const { ethereum } = window;
            if (!ethereum)
                return;

            if (price === 0)
                return;
            
            try {
                const lprovider = new ethers.providers.Web3Provider(ethereum)
                const tstakingContract = new ethers.Contract(stakingContractAddress, abi, lprovider.getSigner())
                tstakingContract.pending().then(response => {
                    let tempStakingStats = [...stakingStats];
                    tempStakingStats[2].value = response;
                    tempStakingStats[2].subvalue.value = response * price;
                    setStakingStats([...tempStakingStats]);
                })
            } catch (error) {
                
                const lprovider = new ethers.providers.Web3Provider(ethereum)
                const tstakingContract = new ethers.Contract(stakingContractAddress, abi, lprovider.getSigner())
                tstakingContract.pending().then(response => {
                    let tempStakingStats = [...stakingStats];
                    tempStakingStats[2].value = response;
                    tempStakingStats[2].subvalue.value = response * price;
                    setStakingStats([...tempStakingStats]);
                })
            }           
            
        }, 30000)
    }, []);

    const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 300, pv: 2400, amt: 2400} , {name: 'Page C', uv: 200, pv: 2400, amt: 2400}];

    return (
        <div className={classes.allocationStaking}>

            <div className={classes.pageTitle}>
                <div className={classes.mainText}>
                    <div><span>{mainText}</span>
                        <Tooltip
                            title="Simply stake your PEAK tokens to earn 20% APY and receive IDO pool allocations for our upcoming projects."
                            enterTouchDelay={0}
                            leaveTouchDelay={6000}
                        >
                            <InfoIcon />
                        </Tooltip>
                    </div>
                </div>
                {/* <ReferralsCard /> */}


                {/*<div className={classes.infoButton} onClick={() => { setShowInfoDialog(true); }}>
                    Info
                </div>*/}
            </div>

            

            <div className={classes.vpCard}>
                {showPrice && <ValuePriceCard totalValueLocked={totalValueLocked} price={price} />}
            </div>
           { graphData.length > 0 && <><div>
                <div className={classes.chatTitle}> PEAK Staking Amount </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <LineChart width={1000} height={300} data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="label" />
                    <YAxis width={100}/>
                    <Line type="monotone" dataKey="peak_amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="peak_price" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="stake_amount_usd" stroke="#82ca9d" />
                    <TooltipRecharts />
                </LineChart>
            </div>
            </div>
            <div>
                <div className={classes.chatTitle}> PEAK TVL </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <LineChart width={1000} height={300} data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="label" />
                    <YAxis width={100}/>
                    <Line type="monotone" dataKey="peak_price" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="stake_amount_usd" stroke="#82ca9d" />
                    <TooltipRecharts />
                    </LineChart>
                </div>
            </div>
            <div>
                <div className={classes.chatTitle}> PEAK Price </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <LineChart width={1000} height={300} data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="label" />
                    <YAxis width={100}/>
                    <Line type="monotone" dataKey="peak_price" stroke="#82ca9d" />
                    <TooltipRecharts />
                </LineChart>
            </div>
            </div></>}
            <div className={classes.pageContent}>


                <div className={classes.column}>
                    <StakeCard price={price} update={getInfo} />
                    {window.innerWidth > 900 && <StakingStats content={stakingStats} />}
                    {window.innerWidth <= 900 && <WithdrawCard updateInfo={getInfo} balance={stakeBalance} price={price} decimals={decimals} update={getInfo} />}
                </div>

                <div className={classes.column}>
                    {window.innerWidth > 900 && <WithdrawCard updateInfo={getInfo} balance={stakeBalance} price={price} decimals={decimals} update={getInfo} />}
                    {window.innerWidth <= 900 && <StakingStats content={stakingStats} />}
                    <TotalsSection content={totals} />
                </div>
            </div>
            <ReferralsSection />
            <RefereesTable />

            <Leaderboard />

            <QnA />
            
            <InfoDialog show={showInfoDialog} setShow={setShowInfoDialog} />
        </div>
    );
}

export default AllocationStaking;
