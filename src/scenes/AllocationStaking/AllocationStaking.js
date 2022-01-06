import React from 'react';
import { ethers } from 'ethers';

import classes from './AllocationStaking.module.scss'
import StakeCard from './components/StakeCard/StakeCard';
import StakingStats from './components/StakingStats/StakingStats';
import TotalsSection from './components/TotalsSection/TotalsSection';
import ValuePriceCard from './components/ValuePriceCard/ValuePriceCard';
import WithdrawCard from './components/WithdrawCard/WithdrawCard';
import {abi} from './services/consts';


class AllocationStaking extends React.Component {
    constructor(props){
        super(props);
        this.state={
            mainText: "PEAKDEFI IDO Allocation Staking",
            totalValueLocked: 45,
            price: 10.6,
            stakeBalance: 145.85,
            stakingContract: undefined,
            address: '0xf87AC318CA1F048D178c1E6B4067786C54DbEf4f',

            stakingStats: [
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
                        buttonCallback: ()=>{alert("HELLO")}
                    }
                }
            ],

            totals: [
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
            ]
        }
    }

    async componentDidMount(){
        const {ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

            

            await this.setState({
                stakingContract: new ethers.Contract("0x610ba04246d8f5d95882262cc3E1975C1e87A6BE", abi, provider)
            });

  
            let tempTotals = [...this.state.totals];

            this.state.stakingContract.totalPEAKRedistributed().then(response=>{
                this.state.totals[1].value.value= response;
                this.state.totals[1].subvalue.value=response * this.state.price;
                this.forceUpdate();
            });

            this.state.stakingContract.rewardPerSecond().then(response=>{
                this.state.totals[2].value.value=response;
                this.state.totals[2].subvalue.value=response * this.state.price;
                this.forceUpdate();
            });
            
            this.state.stakingContract.userInfo(0, this.state.address).then(response=>{

                let tempStakingStats = [...this.state.stakingStats];
                tempStakingStats[2].value = response.rewardDebt;
                tempStakingStats[2].subvalue.value = response.rewardDebt * this.state.price;

                tempStakingStats[1].value = response.amount;
                tempStakingStats[1].subvalue.value = response.amount*this.state.price;

                if(response.amount==0){
                    tempStakingStats[0].value = '0';
                }
                else{
                    tempStakingStats[0].value = ((this.state.totals[2].value.value*31556926)/response.amount * 100).toString();
                }

                this.setState({
                    stakingStats: [...tempStakingStats],
                    stakeBalance: response.amount.toString()
                });

            });

        

            this.state.stakingContract.poolInfo(0).then((response)=>{
                
                this.state.totals[0].value.value=response.totalDeposits;
                this.state.totals[0].subvalue.value=response.totalDeposits*this.state.price;
                this.forceUpdate();
            })

            
        }
    }
    
    
    render() { 
        return(
        <div className={classes.allocationStaking}>
            
            <div className={classes.pageTitle}>
                <div className={classes.mainText}>
                    <div>{this.state.mainText}</div>
                </div>

                <div className={classes.infoButton}>
                    Info
                </div> 
            </div>
            <div className={classes.vpCard}>
                <ValuePriceCard totalValueLocked={this.state.totalValueLocked} price={this.state.price}/>
            </div>

            <div className={classes.pageContent}> 
                
                <div className={classes.stakingCards}>
                    <StakeCard balance={this.state.stakeBalance}/>
                    <WithdrawCard balance={this.state.stakeBalance}/>
                </div>

                <div className={classes.infoCards}>
                    <StakingStats content = {this.state.stakingStats}/>
                </div>

            </div>

            <div className={classes.totalsSection}>
                <TotalsSection content={this.state.totals}/>
            </div>
            
        </div>);
    }
}
 
export default AllocationStaking;