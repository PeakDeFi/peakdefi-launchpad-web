import { useState } from 'react';

import classes from './BuyPeak.module.scss';
import PancakeLogo from './resources/pancake.png';
import AppSushiLogo from './resources/appsushi.png';
import HitBtc from './resources/hitbtc.png';
import UniswapLogo from './resources/uniswap.png';

const BuyPeak = () => {
    const [exchanges, setExchanges] = useState([
        {
            link: 'https://pancakeswap.finance/swap',
            icon: PancakeLogo
        },

        {
            link: 'https://app.uniswap.org/#/swap?outputCurrency=0x633eE3fbE5ffc05bD44Ecd8240732fF9ef9Dee1d&chain=mainnet',
            icon: UniswapLogo
        },

        {
            link: 'https://app.sushi.com/swap',
            icon: AppSushiLogo
        },

        {
            link: 'https://hitbtc.com/peak-to-btc', 
            icon: HitBtc
        }
    ])
    
    return (<div className={classes.BuyPeak}>
        <h3>Buy Peak:</h3>
        <div className={classes.links}>
            {exchanges.map(e=>
                <a href={e.link}><img src={e.icon}/></a>
            )}
        </div>
    </div>);
}
 
export default BuyPeak;