import classes from './TierPage.module.scss'

import Soil from './resources/soil.svg';
import Seed from './resources/seed.svg';
import Sapling from './resources/sapling.svg';
import Tree from './resources/tree.svg';
import Oak from './resources/oak.svg';
import Zero from './resources/zero.svg'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShort } from '../../features/bgSlice';

const TierPage = () => {
    const dispatch = useDispatch();

    const [tiers, setTiers] = useState([
        {
            text: 'Tier 0',
            image: Zero,
            subtext: '(Winners get randomly selected!)',
            value: 1000,
            pool_weight: 12
        },

        {
            text: 'Tier 1',
            image: Soil,
            value: 10000,
            pool_weight: 22
        },

        {
            text: 'Tier 2',
            image: Seed,
            value: 50000,
            pool_weight: 24
        },

        {
            text: 'Tier 3',
            image: Sapling,
            value: 100000,
            pool_weight: 26
        },

        {
            text: 'Tier 4',
            image: Tree,
            value: 250000,
            pool_weight: 28
        },

        {
            text: 'Tier 5',
            subtext: '+VIP Bonuses',
            image: Oak,
            value: 1000000, 
            pool_weight: 30 
        }
    ]);

    useEffect(()=>{
        dispatch(setShort(true));

        return ()=>{
            dispatch(setShort(false));
        }
    }, [])

    return (<div className={classes.TierPage}>
        <header>
            <h1>Tier System</h1>
            <p>6 Tier Levels for fair Token Allocations</p>
        </header>
        <main>

            <section>
                <p>
                    As we at PEAKDEFI Launchpad stand for fair project launches, we 
                    created a tier system that enables everyone to get the right portion 
                    of each pools’ allocation.
                </p>
            </section>

            <section>
                <div className={classes.tierTableWrapper}>
                    <div className={classes.tierTable}>
                        <h1>Our Tier System</h1>
                        <table>
                            <tr>
                                <th className={classes.picth}>Tier</th>
                                <th>Staked PEAK Tokens</th>
                                <th>Pool Weight</th>
                            </tr>
                            {
                                tiers.map(tier => {
                                    return (<tr>
                                        <td className={classes.pictd}>
                                            <div className={classes.tierName}>
                                                <img src={tier.image} />
                                                <p>{tier.text}</p>
                                                {!!tier.subtext && <p className={classes.subText}>{tier.subtext}</p>}
                                            </div>
                                        </td>
                                        <td>
                                            {tier.value}
                                        </td>
                                        <td>
                                            {tier.pool_weight}
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>


                <p>
                    We at PEAKDEFI Launchpad want to democratize access to high-quality projects and
                    thus offer fair project launches to our community. We created a tier system that enables
                    everyone to get the right portion of each pools’ allocation.
                    <p></p>
                    Our tier system covers 6 different tier levels in total. We have five normal tier levels,
                    where each user receives a guaranteed allocation for their IDO. And we have a tier 0
                    level, which is based on a lottery system.
                    <p></p>

                    Once an IDO pool is opened, the pool stays open until all tickets are sold out or the pool
                    reaches the time limit. If an allocation gets not sold out, the remaining tokens will be
                    split between all other tiers according to their pool weights.
                    <p></p>

                    Tier 0 is an allocation lottery system, where a user must win the lottery to receive
                    an allocation for their desired IDO. If a user wants to participate in our Tier 0
                    lottery, he only needs to stake 1,000 PEAK tokens. Our integrated Chainlink
                    Variable Random Function (VRF) selects the winning users on-chain.
                </p>
            </section>


        </main>
    </div>);
}

export default TierPage;