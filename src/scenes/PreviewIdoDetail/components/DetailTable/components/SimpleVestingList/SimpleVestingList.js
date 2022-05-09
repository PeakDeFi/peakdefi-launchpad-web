import classes from './SimpleVestingList.module.scss'

const SimpleVestingList = () => {
    return (<div className={classes.SimpleVestingList}>
        <h1>HOW TO VIEW YOUR 3,3+ NFT ON TANGIBLE.STORE</h1>
        <ol>
            <li>Visit <a href="https://tangible.store">https://tangible.store</a></li>
            <li>
                Use the wallet button in the upper right corner to connect your wallet. Be sure you’ve
                added the Polygon chain and are on the Polygon Mainnet in your wallet software.
            </li>
            <li>Once connected, click the profile button in the upper right corner and then select “My Collection”</li>
            <li>To list a 3,3+ NFT, you can click into the item and use the “sell” button</li>
            <li>
                To browse the 3,3+ NFTs in the marketplace, use the Tangible Token drop-down in the center,
                click “3,3+ NFT” and then “Explore”
            </li>
            <li>New 3,3+ can be minted using TNGBL from the Tangible Token drop-down at the top</li>
        </ol>
    </div>);
}

export default SimpleVestingList;