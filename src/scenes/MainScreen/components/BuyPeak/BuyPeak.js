import { useState } from 'react';

import classes from './BuyPeak.module.scss';
import PancakeLogo from './resources/pancake.png';
import AppSushiLogo from './resources/appsushi.png';
import HitBtc from './resources/hitbtc.png';
import UniswapLogo from './resources/uniswap.png';

const BuyPeak = () => {
    const [exchanges, setExchanges] = useState([
        {
            link: 'https://www.bibox.com/zh/exchange/basic/PEAK_USDT',
            icon: 'https://marketpeak.com/assets_current/4f5c827b/img/companies/bibox.svg'
        },

        {
            link: 'https://www.probit.com/app/exchange/PEAK-USDT',
            icon: 'https://marketpeak.com/assets_current/4f5c827b/img/companies/probit.svg'
        },

        {
            link: 'https://balancer.exchange/#/swap',
            icon: 'https://marketpeak.com/assets_current/4f5c827b/img/companies/balancer.svg'
        },

        {
            link: 'https://1inch.exchange/', 
            icon: 'https://marketpeak.com/assets_current/4f5c827b/img/companies/oneinch.svg'
        },

        {
            link: 'https://pancakeswap.finance/swap',
            icon: 'https://marketpeak.com/assets_current/4f5c827b/img/companies/pancakeswap.svg'
        },

        {
            link: 'https://app.uniswap.org/#/swap?outputCurrency=0x633eE3fbE5ffc05bD44Ecd8240732fF9ef9Dee1d&chain=mainnet',
            icon: 'https://marketpeak.com/assets_current/4f5c827b/img/companies/uniswap.svg'
        },

        {
            link: 'https://hitbtc.com/peak-to-btc',
            icon: HitBtc
        }
    ])
    
    return (<div className={classes.BuyPeak}>
        <h3>
            Tracked on 
            <span>
                <a href='https://coinmarketcap.com/currencies/peakdefi/'><img src="https://marketpeak.com/assets_current/4f5c827b/img/company-logo-coinmarketcap.svg"></img></a>
            </span> 
            and listed on the following exchanges:
        </h3>
        <div className={classes.links}>
            {exchanges.map(e=>
                <a href={e.link} target="_blank"><img src={e.icon}/></a>
            )}
        </div>
    </div>);
}
 
export default BuyPeak;