import { useState } from 'react';

import classes from './BuyPeak.module.scss';
import PancakeLogo from './resources/pancakeswap.svg';
import AppSushiLogo from './resources/appsushi.png';
import HitBtc from './resources/hitbtc.png';
import UniswapLogo from './resources/uniswap.svg';
import OneInchLogo from './resources/oneinch.svg';
import BalancerLogo from './resources/balancer.svg';
import ProbitLogo from './resources/probit.svg';
import BiBoxLogo from './resources/bibox.svg'
import CoinMarketCapLogo from './resources/company-logo-coinmarketcap.svg'

const BuyPeak = () => {
    const [exchanges, setExchanges] = useState([
        {
            link: 'https://www.bibox.com/zh/exchange/basic/PEAK_USDT',
            icon: BiBoxLogo
        },

        {
            link: 'https://www.probit.com/app/exchange/PEAK-USDT',
            icon: ProbitLogo
        },

        {
            link: 'https://balancer.exchange/#/swap',
            icon: BalancerLogo
        },

        {
            link: 'https://1inch.exchange/', 
            icon: OneInchLogo
        },

        {
            link: 'https://pancakeswap.finance/swap',
            icon: PancakeLogo
        },

        {
            link: 'https://app.uniswap.org/#/swap?outputCurrency=0x633eE3fbE5ffc05bD44Ecd8240732fF9ef9Dee1d&chain=mainnet',
            icon: UniswapLogo
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
                <a href='https://coinmarketcap.com/currencies/peakdefi/'><img src={CoinMarketCapLogo}></img></a>
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