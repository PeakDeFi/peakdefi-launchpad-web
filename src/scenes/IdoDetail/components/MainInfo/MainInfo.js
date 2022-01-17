import React, { useState, useEffect } from 'react';
import classes from "./MainInfo.module.scss"
import { useWeb3React } from '@web3-react/core'
import { BigNumber, ethers } from 'ethers';

import { SALE_ABI, TOKEN_ABI } from '../../../../consts/abi'

export function MainInfo(props) {
    const { activate, deactivate, account, error } = useWeb3React();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const saleContract = new ethers.Contract("0xEe68C2113491C3E23D819eC2DA3B0444e45d1d39", SALE_ABI, signer)
    const tokenContract = new ethers.Contract("0x04f776d3370d3B1988e2334504Ff433007766517", TOKEN_ABI, signer)
    const [amount, setAmount] = useState(0);
    
    const registerForSale = async () => {
        try {
            let result = await saleContract.registerForSale()
            alert("Hash " + result.hash)
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    const isRegistered = async () => {
        let isRegisteredUser = await saleContract.isWhitelisted()
        return isRegisteredUser
    }

    const participateSale = async () => {
        try {
            let bigAmount = BigNumber.from(Math.round(amount*100)).mul(BigNumber.from(10).pow(18-2));
            let participate = await saleContract.participate(bigAmount)
            console.log(participate)
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    const approve = async () => {
        try {
            let bigAmount = BigNumber.from(Math.round(amount*100)).mul(BigNumber.from(10).pow(18-2));
            let participate = await tokenContract.approve("0xE19C3c8F59648293d59145e786F6a38A2e8684F4" ,bigAmount)
            console.log(participate)
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    return (
        <div className={classes.mainInfo}>
            <div className={classes.textBlock}>
                <div className={classes.title}> {props.title} </div>
                <div className={classes.text}> {props.text} </div>
                <div className={classes.media}>
                    {props.media.map((media, id) => {
                        return <a key={id} href={media.link}> <img alt="" src={media.img} /> </a>
                    } )}
                </div>
                <div>
                    <input type="number" value={amount} className={classes.inputField} onChange={(e) => {
                            setAmount(parseFloat(e.target.value));
                        }} />
                </div>
                <div className={classes.buttonBlock}>
                    
                            <button onClick={() => { registerForSale() }}>
                                Register
                            </button>
                            <button onClick={() => {participateSale()}}>
                                Buy Tokens
                            </button>
                            <button onClick={() => {approve()}}>
                                Approve
                            </button>
                </div>

                <div className={classes.mediaMobile}>
                    {props.media.map((media, id) => {
                        return <a key={id} href={media.link}> <img alt="" src={media.imgMobile} /> </a>
                    } )}
                </div>
            </div>
        </div>
    )
}
