import React from 'react';

import classes from './AllocationStaking.module.scss'
import StakeCard from './components/StakeCard/StakeCard';
import StakingStats from './components/StakingStats/StakingStats';
import TotalsSection from './components/TotalsSection/TotalsSection';
import ValuePriceCard from './components/ValuePriceCard/ValuePriceCard';
import WithdrawCard from './components/WithdrawCard/WithdrawCard';

class AllocationStaking extends React.Component {
    constructor(props){
        super(props);
        this.state={
            mainText: "PEAKDEFI IDO Allocation Staking",
            totalValueLocked: 45,
            price: 10.6,
            stakeBalance: 145.85,

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