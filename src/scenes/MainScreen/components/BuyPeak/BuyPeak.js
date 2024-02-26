import { useState } from "react";

import classes from "./BuyPeak.module.scss";
import PancakeLogo from "./resources/pancakeswap.svg";
import AppSushiLogo from "./resources/appsushi.png";
import HitBtc from "./resources/pin.png";
import UniswapLogo from "./resources/uniswap.svg";
import OneInchLogo from "./resources/oneinch.svg";
import BalancerLogo from "./resources/balancer.svg";
import ProbitLogo from "./resources/probit.svg";
import BiBoxLogo from "./resources/bibox.svg";
import Mexc from "./resources/mexc1.png";
import CoinMarketCapLogo from "./resources/company-logo-coinmarketcap.svg";

const BuyPeak = () => {
  const [exchanges, setExchanges] = useState([
    {
      link: "https://www.mexc.com/exchange/PEAK_USDT",
      icon: Mexc,
    },

    // {
    //     link: 'https://www.bibox.com/zh/exchange/basic/PEAK_USDT',
    //     icon: BiBoxLogo
    // },
    // {
    //     link: 'https://balancer.exchange/#/swap',
    //     icon: BalancerLogo
    // },

    // {
    //     link: 'https://1inch.exchange/',
    //     icon: OneInchLogo
    // },

    {
      link: "https://pancakeswap.finance/swap",
      icon: PancakeLogo,
    },

    {
      link: "https://app.uniswap.org/#/swap?outputCurrency=0x633eE3fbE5ffc05bD44Ecd8240732fF9ef9Dee1d&chain=mainnet",
      icon: UniswapLogo,
    },

    {
      link: "https://hitbtc.com/peak-to-btc",
      icon: HitBtc,
    },
  ]);

  return (
    <div className={classes.BuyPeak}>
      <h3>Supported exchanges to buy PEAK:</h3>
      <div className={classes.links}>
        {exchanges.map((e) => (
          <a href={e.link} target="_blank" key={e.link}>
            <img src={e.icon} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default BuyPeak;
