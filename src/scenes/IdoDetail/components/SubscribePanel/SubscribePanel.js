import { useState } from 'react';

import classes from './SubscribePanel.module.scss'
import Letters from './images/letters.svg'
import Arrow from './images/blue_arrow.svg';
import IDOSubscribeDialog from './components/IDOSubscribeDialog/IDOSubscribeDialog';

const SubscribePanel = () => {

    const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);

    return (<div className={classes.SubscribePanel}>
        <div className={classes.subsection}>
            <h1>Subscribe</h1>
            <p>Get notified when registration opens.</p>
        </div>

        <div className={classes.subsection}>
            <img src={Letters} className={classes.letterImage} />
        </div>

        <div className={classes.subsection}>
            <button 
                className={classes.subscribeButton}
                onClick={()=>setShowSubscriptionDialog(true)}
            >
                Subscribe <span><img className={classes.arrowIco} src={Arrow} /></span>
            </button>
        </div>

        <IDOSubscribeDialog open={showSubscriptionDialog} setOpen={setShowSubscriptionDialog}/>
    </div>);
}

export default SubscribePanel;