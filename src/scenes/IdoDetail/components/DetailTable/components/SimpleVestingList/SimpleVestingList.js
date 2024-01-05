import classes from './SimpleVestingList.module.scss'
import VestingImg from '../../../../img/vesting.png'

const SimpleVestingList = () => {
    return (<div className={classes.SimpleVestingList}>
        All Sale participants got a 3,3+ NFT airdropped on Polygon to their wallet, which represents and includes the number of tokens purchased. A 25x multiplier will be applied to the unvested token quantity with four-year locking schedule. 

        <ul>
                <li> Example: A 20 USDT investment will produce a 3,3+ NFT with 10 TNGBL tokens (Sale token price was $2).
                </li>
                Those tokens will multiply to a total of 250 over the course of four years.
                <li>In general you will have your purchased token ammount vested by approximately the 9th month, at which point you can liquidate your position, claiming those tokens but
                forfeiting all future multipliers.</li>
        </ul>

        Sample 3,3+ NFT of a $20 investment. 10 TNGBL with a 25x multiplier over four years. Bonding
        curve indicates the free-claimable and restricted-claimable tokens over that time frame. Price is
        a reflection of current market price for TNGBL at the time of this screenshot.Б

        <img src={VestingImg} />

        To make your NFT visible, visit opensea.io and connect your wallet. Then go to 'Account' in the top right corner and choose 'Profile' from the drop down menu. In the profile section you will be able to see your 3.3+ NFT. 
        <br />
        <br />
        To view all other information about your NFT, bonding curve, and your USDC Rewards, visit tangible.store and connect your wallet. Select 'My collection' in the top right corner and then filter for '3.3+ NFT' on the left side of the page. Your 3.3+ NFT will appear and clicking on it will open a page with all information. 

    </div>);
}

export default SimpleVestingList;