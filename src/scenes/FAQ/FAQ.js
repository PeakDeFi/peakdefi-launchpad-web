import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setShort } from '../../features/bgSlice';
import classes from './FAQ.module.scss'

const FAQ = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setShort(true));

        return ()=>{
            dispatch(setShort(false));
        }
    }, [])

    return (<div className={classes.FAQ}>
        <header>
            <h1>Frequently asked questions</h1>
        </header>
        <main>
            <section>
                <h2>
                    #1 What are the steps of an IDO?
                </h2>

                <p>
                    1. IDO whitelisting: The beginning of the IDO whitelisting can vary, so please visit the IDO 
                    details page for further information.
                </p>

                <p>
                    2. Calculation of base allocation: The alIocation depends on the number of participants 
                    and ensures that there are enough tokens for a guaranteed allocation for every investor.
                </p>

                <p>
                    3. IDO sale: Registered participants with guaranteed allocation are allowed to fund their 
                    allocations in the pool.
                </p>

                <p>
                    4. Token distribution: Once the sale is finished, we collect the allocations data. The token 
                    distribution and listing information can be found on the PeakDefi Announcements Telegram channel 
                    or in the IDO details page.
                </p>

            </section>

            <section>

                <h2>#2 Do I need to unstake/restake for each IDO?</h2>

                <p>
                    No. You are eligible for any IDOs as long as your PEAK remains staked 
                    for the current IDO you want to whitelist for. The amount staked will be matched 
                    to the current tier system.
                </p>

            </section>

            <section>
                <h2>#3 Can I unstake after each IDO?</h2>
                <p>
                    Once you stake your tokens, they are locked. The lock period is 13 weeks. 
                    You can still unstake early, but with a penalty fee depending on the time when you 
                    want to unstake:
                </p>

                <ul>
                    <li>2 weeks - 30%</li>
                    <li>4 weeks - 20%</li>
                    <li>6 weeks - 10%</li>
                    <li>8 weeks - 5%</li>
                    <li>Else - 0%</li>
                </ul>
                <p>
                    If some tokens were not sold, sale owner can withdraw his token
                </p>
            </section>

            <section>
                <h2>#4 Do I have to stake my PEAK for 15 days to qualify for IDO?</h2>
                <p>No, PEAKDEFI Launchpad does not implement a pre-IDO staking policy.</p>
            </section>

            <section>
                <h2>#5 What is the difference between guaranteed allocation and lottery tiers?</h2>
                <p>
                    Lottery TIERS only give you a chance to win in a lottery for each IDO. Guaranteed 
                    levels guarantee you the allocation calculated based on the TIER level. PEAKDEFI 
                    Launchpad always guaranties an IDO allocation from TIER 1. 
                </p>
            </section>

            <section>
                <h2>
                    #6 I have registered for an upcoming IDO with a certain amount of PEAK already staked. 
                    If I purchase more PEAK and stake them after registering, will my level be upgraded?
                </h2>
                <p>
                    Upping your tier level won't affect the sales you already registered for. 
                </p>
            </section>

            <section>
                <h2>#7 Do I have to register for each IDO?</h2>
                <p>
                    Yes. This way we can ensure only stakers who want to participate are considered for 
                    base allocation calculation. This gives a better, bigger allocation for participants.
                </p>
            </section>

            <section>
                <h2>
                    #8 For IDO registration purposes, is there any benefit to stake an amount slightly over 
                    the tier requirement? (e.g. 10002 PEAK for Tier 1).
                </h2>

                <p>
                    No, any amount between the predetermined number of PEAK in the level system will be 
                    rounded down. So, 10000 to 49999 PEAK will only qualify you for TIER 1 without additional benefits.
                </p>
            </section>

            <section>
                <h2>#9 When will I find out about my allocation?</h2>
                <p>
                    Allocations will only be calculated and released shortly after the whitelisting 
                    period ends. The amount you will receive depends on the number of participants and 
                    the amount raised by the pool originator.
                </p>
            </section>

            <section>
                <h2>#10 How long do I have to fund my IDO allocation?</h2>
                <p>
                    The time can vary in each IDO. You can see the timeline for whitelisting 
                    start/end and sale start/end on the IDO details page or our PEAKDEFI twitter channel.
                </p>
            </section>

            <section>
                <h2>#11 What can I fund my allocation with?</h2>
                <p>
                    Most of the time it's BNB. Please visit the ido details page for further information.
                </p>
            </section>

            <section>
                <h2>#12 How do I find the token address for the project I just invested in?</h2>
                <p>
                    Generally, the official address will be shared by the respective projects. 
                    Also, you can see it on the IDO details page (you might need to refresh the page), 
                    as soon as the PEAKDEFI team receives this information.
                </p>
            </section>



        </main>
    </div>);
}
 
export default FAQ;