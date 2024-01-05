import React from "react";
import classes from './QnA.module.scss';
import Collapsible from 'react-collapsible';
import {BiPlusCircle} from 'react-icons/bi'


function QnA(){

    const questionsAndAnswers = [
        {
            q: "How can I participate in the staking program?",
            a: "You only have to connect your Metamask wallet. Make sure that your wallet is charged with PEAK tokens and some BNB for transactions and connected with the Binance Smart Chain."
        },

        {
            q: "How much PEAK tokens can I stake?",
            a: "The number of PEAK tokens you can stake is not limited. But for participating in our Sales, you must stake a minimum of 1,000 PEAK tokens."
        },

        {
            q: "What does the penalty fee exactly mean?",
            a: "You can unstake your tokens at any given time, but in order to incentive people to stake PEAK tokens continuously, we charge a penalty fee. The fee equals 0% after a period of 8 weeks."
        },

        // {
        //     q: 'What is the referral commission?',
        //     a: "As commission, you will get 10% of the PEAK that your referrer will stake."
        // },

        // {
        //     q: "How are the commissions paid out?",
        //     a: "The commissions are always paid in PEAK tokens."
        // },

        // {
        //     q: "How often gets the claimable number of PEAK tokens refreshed?",
        //     a: "Due to our smart contract logic, your claimable number of PEAK tokens gets refreshed every 4 hours. Please be aware that before a minimum of 4 hours, you won’t see any referrals."
        // },

        {
            q: "Is there a referral programme?",
            a: "There was a referral programme which expired at the end of July 2023. Currently, the Peakdefi team is developing an improved programme which will come in Q4 2023."
        },

    ]

    return (<section className={classes.QnA}>
        <div className={classes.innerQnA}>
            <h1>FAQ</h1>
            <div className={classes.questions}>
                {
                    questionsAndAnswers.map((e) => {
                        return (
                            <Collapsible
                                trigger={<div className={classes.innerTrigger}><div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}><BiPlusCircle className={classes.icon}/></div><div>{e.q}</div></div>}
                                className={classes.collapsible}
                                openedClassName={classes.collapsible}
                                triggerClassName={classes.trigger}
                                triggerOpenedClassName={classes.trigger}

                                contentInnerClassName={classes.answer}
                            >
                                <div>{e.a}</div>
                            </Collapsible>
                        )
                    })
                }
            </div>
        </div>

    </section>);
}

export default QnA;