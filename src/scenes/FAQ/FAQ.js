import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setShort } from '../../features/bgSlice';
import classes from './FAQ.module.scss'

const FAQ = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setShort(true));

        return () => {
            dispatch(setShort(false));
        }
    }, [])

    return (<div className={classes.FAQ}>
        <header>
            <h1>Launchpad FAQs:</h1>
        </header>
        <main>
            <section>
                <h2>
                   #1 How does an Sale proceed?
                </h2>

                <p>
                    1st. Phase: Sale Whitelisting: After all the necessary requirements, such as minimum amount of PEAK token have been staked and KYC have been fulfilled by the investor, he can participate in the whitelisting phase. The start of the respective Sale whitelisting phases will be communicated early on via our social media channels. If you want to make sure that you don't miss an Sale in the future, we advise you to subscribe to our email newsletter! All Sales that are currently in the whitelisting phase or in the sale phase can be found under the tab 'Ongoing sales' on our homepage. In the whitelisting phase you can click on the 'Ongoing sales' tab from the project you are interested in. On the Sale detail page you can click on 'Register' at the top to get whitelisted for the Sale (You will need a small amount of BNB to pay transaction fees!). That's it for the whitelisting process!
                </p>

                <p>
                    2nd. Phase: Sale Sale: When the whitelisting phase is finished and the sale phase has started (you can see it on the Sale detail page in the timeline), you can deposit the amount of USDT you want to use in the Sale sale on the Sale detail page. To do this, enter the amount in the gray field above and confirm your entry by clicking the ‘Deposit’ button. A window will open in your wallet where you have to confirm the transaction, for this you need a small amount in BNB in your wallet to be able to pay the transaction fees. Once the transaction has been completed, you need to confirm your token purchase by clicking the ‘Buy tokens’ button. Metamask will open again and you will have to confirm the transaction again. After this has been completed, your job is done and you can relax until the Sale is over!
                </p>

                <p>
                    3rd. Phase: Allocation calculation: After the sales phase has been completed, our smart contract calculates the respective allocation for each individual investor. This depends on the tier level the respective investor is in, how many investors participated in his tier level, how much USDT he has deposited and also how much other investors have deposited. By doing so the smart contract ensures that there are enough tokens for a guaranteed allocation for every investor.
                </p>

                <p>
                    4th. Phase: Token distribution: Once all calculations have been completed, all tokens will be distributed and will be available to you on the Project Detail Page under 'Your allocations'. The vesting conditions of the Sale have to be considered, i.e. usually only a part of the tokens is available and the tokens will be released over time. 
                </p>

            </section>

            <section>

                <h2>#2 Do I need to unstake/restake for each Sale?</h2>

                <p>
                    No, you are eligible for any Sales as long as your PEAK tokens remain staked. Depending on how many tokens you stake, you will be assigned to our tier level system. 
                </p>

            </section>

            <section>
                <h2>#3 Can I withdraw my PEAK tokens from the staking process at any time?</h2>
                <p>
                    Once you stake your tokens, a Cooldown period begins. Generally speaking the Cooldown period is 13 weeks. However, you have the option to withdraw earlier, but with a penalty fee depending on the time which has passed since you started staking:
                </p>

                <ul>
                    <li>2 weeks - 30%</li>
                    <li>4 weeks - 20%</li>
                    <li>6 weeks - 10%</li>
                    <li>8 weeks - 5%</li>
                    <li>Else - 0%</li>
                </ul>
                <p>
                    Additional info: When you claim your rewards only, the cooldown period starts over! 
                </p>
            </section>

            <section>
                <h2>#4 Is there a time window for how long you need to have your tokens staked to be qualified for an Sale?</h2>
                <p>No, PEAKDEFI Launchpad does not implement a pre-Sale staking policy.</p>
            </section>

            <section>
                <h2>#5 What is the difference between guaranteed tier levels and the lottery system?</h2>
                <p>
                    Lottery Tiers only give you the chance to be able to participate in an Sale, in this process, the investors are randomly selected. In contrast to that guaranteed tier levels guarantee you an allocation calculated based on your tier level. 
                </p>
            </section>

            <section>
                <h2>
                    #6 I already participated in an upcoming Sale with a certain amount of PEAK staked and it is still in the sale phase. If I would increase my staked PEAK token amount now and meet the requirements for the next higher tier level, would that affect my allocations in the Sale?
                </h2>
                <p>
                    Upping your tier level won't affect your Sale allocation. The tier level you have whitelisted with counts for the Sale and cannot be changed afterwards. 
                </p>
            </section>

            <section>
                <h2>#7 Do I have to register for each Sale?</h2>
                <p>
                    Yes. This way we can ensure only stakers who want to participate are considered for base allocation calculation. 
                </p>
            </section>

            <section>
                <h2>
                    #8 Do I have an additional benefit if I stake more than required for a specific tier level, but too little to move to the next higher tier level? (e.g. 10.500 PEAK for Tier 1 (Requirement for tier level 1: 10.000 PEAK, requirement for tier level 2: 50.000 PEAK)
                </h2>

                <p>
                   Generally speaking you will get higher rewards distributed from the staking process. However, in regards to the Sales this will make no difference. Only when you meet the minimum requirement of the next higher tier level, you can benefit in the Sale process. 
                </p>
            </section>

            <section>
                <h2>#9 When will I find out about my allocation?</h2>
                <p>
                    After the sale phase has ended, each investor can see how many tokens he was able to get on the Project Detail Page under 'Your allocations'. The amount of tokens each investor receives depends on his tier level, the number of participants in his tier level and the total amount deposited in all tier levels.
                </p>
            </section>

            <section>
                <h2>#10 How long do I have to fund my Sale allocation?</h2>
                <p>
                   The time can vary for each individual Sale. You can see the timeline for the whitelisting and sale phase on the Sale details page.
                </p>
            </section>

            <section>
                <h2>#11 What can I fund my allocation with?</h2>
                <p>
                    For now with USDT, but this might change in the future as we plan to go multi-chain.
                </p>
            </section>

            <section>
                <h2>#12 Where can I find the token address for the project I invested in?</h2>
                <p>
                    Generally, the official address will be shared by the respective projects. As soon as we get the information, we will also share it on the Sale details page. 
                </p>
            </section>

            <section>
                <h2>#13 How can I receive a tier 0 allocation?</h2>
                <p>
                    Tier 0 is different from our other Tier levels, where users receive a guaranteed
                    allocation based on their tier level. For Tier 0, each user must stake at least 1,000
                    PEAK tokens and follow the normal Sale process, including KYC and whitelisting.
                    In each Sale page overview, will be a notification for the winners and losers of the tier
                    0 lottery. Once the user wins the lottery, he will be able to deposit his USDT
                    allocation.

                </p>
            </section>
        </main>
    </div>);
}

export default FAQ;