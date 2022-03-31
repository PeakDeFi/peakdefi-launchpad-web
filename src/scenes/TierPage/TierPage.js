import classes from './TierPage.module.scss'

import Soil from './resources/soil.svg';
import Seed from './resources/seed.svg';
import Sapling from './resources/sapling.svg';
import Tree from './resources/tree.svg';
import Oak from './resources/oak.svg';
import { useState } from 'react';

const TierPage = () => {

    const [tiers, setTiers] = useState([
        {
            text: 'Tier 1',
            image: Soil,
            value: 10000
        },

        {
            text: 'Tier 2',
            image: Seed,
            value: 50000
        },

        {
            text: 'Tier 3',
            image: Sapling,
            value: 100000
        },

        {
            text: 'Tier 4',
            image: Tree,
            value: 250000
        },

        {
            text: 'Tier 5',
            image: Oak,
            value: 1000000
        }
    ])

    return (<div className={classes.TierPage}>
        <header>
            <h1>Tier system</h1>
            <p>5 tier levels with guaranteed token allocations</p>
        </header>
        <main>

            <section>
                <p>
                    As we at PEAKDEFI Launchpad stand for fair project launches, we created
                    a tier system that enables everyone to get the right portion of each pools’ allocation.
                </p>
                <p>
                    Once a pool is opened, the pool will be open until all tickets are sold after 
                    the first come, first served principles.
                </p>
            </section>

            <section>
                <div className={classes.tierTableWrapper}>
                    <div className={classes.tierTable}>
                        <h1>Our Tier System</h1>
                        <table>
                            <tr>
                                <th className={classes.picth}>Tier</th>
                                <th>PEAK tokens staking amount</th>
                            </tr>
                            {
                                tiers.map(tier => {
                                    return (<tr>
                                        <td className={classes.pictd}>
                                            <div className={classes.tierName}>
                                                <img src={tier.image} />
                                                <p>{tier.text}</p>
                                            </div>
                                        </td>
                                        <td>
                                            {tier.value}
                                        </td>
                                    </tr>)
                                })
                            }
                        </table>
                    </div>
                </div>


                <p>
                    Our tier system covers 5 different tiers in total, with tiers 1 - 4 being the 
                    public sale tiers and tier 5 the private sale tier. The private sale tier comes 
                    with a different token price and other vesting conditions, compared with the public sales tiers.
                </p>
                <p>
                    Our tiers have the following weights: Tier 1: 4, Tier 2: 10, Tier 3: 20, Tier 4: 38, 
                    Tier 5: 70. If an allocation gets not sold out, the remaining tokens will be split between 
                    all other tiers according to their pool weights. 
                </p>
            </section>


        </main>
    </div>);
}

export default TierPage;