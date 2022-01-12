import React from "react";
import classes from "./MainInfo.module.scss"
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers';

import { SALE_ABI, TOKEN_ABI } from '../../../../consts/abi'

export function MainInfo(props) {
    const { activate, deactivate, account, error } = useWeb3React();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const saleContract = new ethers.Contract("0x1Be9023051f097d49663d886b1cc7D7563DB3Dc9", SALE_ABI, signer)
    
    
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
            let participate = await saleContract.participate(100)
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
                <div className={classes.buttonBlock}>
                    
                            <button onClick={() => { registerForSale() }}>
                                Register
                            </button>
                            <button onClick={() => {participateSale()}}>
                                Buy Tokens
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
