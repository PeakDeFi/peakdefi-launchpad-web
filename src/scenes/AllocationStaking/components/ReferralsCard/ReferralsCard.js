import { useState } from 'react';

import classes from './ReferralsCard.module.scss'

const ReferralsCard = () => {

    const [invitedCount, setInvitedCount] = useState(0);
    const [receiveAmount, setReceiveAmount] = useState(0);

    return (<div className={classes.ReferralsCard}>
        <header>
            <h1>
                Referrals
            </h1>
        </header>

        <main>
            <div className={classes.infoRow}>
                <div className={classes.infoSubsection}>
                    <h2>Invited</h2>
                    <h1>{invitedCount}</h1>
                </div>

                <div className={classes.infoSubsection}>
                    <h2>You receive</h2>
                    <h1>${receiveAmount}</h1>
                </div>
            </div>
        </main>

        <footer>
            <button>Claim</button>
        </footer>
    </div>);
}

export default ReferralsCard;