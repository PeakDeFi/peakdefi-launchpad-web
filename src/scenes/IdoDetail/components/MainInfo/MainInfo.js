import React, { useState, useEffect } from 'react';
import classes from "./MainInfo.module.scss"
import { useWeb3React } from '@web3-react/core'
import { BigNumber, ethers } from 'ethers';

import { SALE_ABI, TOKEN_ABI } from '../../../../consts/abi'
import { useSelector } from 'react-redux'
import { tokenContractAddress } from '../../../AllocationStaking/components/StakeCard/services/consts';


export function MainInfo(props) {
    const { activate, deactivate, account, error } = useWeb3React();

    const { ethereum } = window;
    const provider = ethereum ? new ethers.providers.Web3Provider(ethereum) : null;;
    const signer = provider ? provider.getSigner() :null ;
    const [saleContract, setSaleContract] = useState();
    const tokenContract = signer ? new ethers.Contract('0x62901188464265C93406D1b5948Ca886632Fb181', TOKEN_ABI, signer) : null;
    const [amount, setAmount] = useState(0);
    const userWalletAddress = useSelector((state) => state.userWallet.address)
    const [allowance, setAllowance] = useState(0);
    const [isRegistered, setIsRegistered] = useState(false);

    const { id } = props.ido ?? 0;

    useEffect(async () => {
        if (userWalletAddress) {
            setSaleContract(new ethers.Contract(props.ido.contract_address, SALE_ABI, signer));


            tokenContract.allowance(userWalletAddress, props.ido.contract_address).then((response) => {
                setAllowance(parseInt(response.toString()));
            })
                .catch((erorr) => {
                    console.log(error);
                });
        }

    }, [userWalletAddress])

    useEffect(() => {
        if (saleContract === undefined)
            return;

        isRegisteredCheck();
    }, [saleContract])


    const registerForSale = async () => {
        try {
            let result = await saleContract.registerForSale()
            setIsRegistered(true);
            //alert("Hash " + result.hash)
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    const isRegisteredCheck = async () => {
        let isRegisteredUser = await saleContract.isWhitelisted()
        setIsRegistered(isRegisteredUser);

        return isRegisteredUser
    }

    const participateSale = async () => {
        try {

            let bigAmount = BigNumber.from(Math.round(amount * 100)).mul(BigNumber.from(10).pow(18 - 2));
            let participate = await saleContract.participate(bigAmount)
            console.log(participate);
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    const approve = async () => {
        try {
            let participate = await tokenContract.approve(props.ido.contract_address, ethers.constants.MaxUint256).then(() => setAllowance(ethers.constants.MaxUint256));
            console.log(participate)
        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    if (props.ido === undefined)
        return (<></>)

    return (

        <div className={classes.mainInfo}>
            <div className={classes.textBlock}>
                <div className={classes.title}> {props.title} </div>
                <div className={classes.text}> {props.text} </div>
                <div className={classes.media}>
                    {props.media.map((media, id) => {
                        return <a key={id} href={media.link}> <img alt="" src={media.img} /> </a>
                    })}
                </div>

                <div className={classes.actionBlock}>
                    <div className={classes.buttonBlock}>

                        {props.ido.timeline.registration_end > Date.now() / 1000 && props.ido.timeline.registration_start < Date.now() / 1000 && <button disabled={isRegistered} onClick={() => {
                            if (!isRegistered)
                                registerForSale()
                        }}>
                            {isRegistered ? 'Registration complete' : 'Register'}
                        </button>}
                        {props.ido.timeline.sale_start < Date.now() / 1000 && props.ido.timeline.sale_end > Date.now() / 1000 &&
                            <div className={classes.inputs}>

                                {props.ido.timeline.sale_start < Date.now() / 1000 && props.ido.timeline.sale_end > Date.now() / 1000 &&
                                    <input type="number" value={amount} className={classes.inputField} onChange={(e) => {
                                        setAmount(parseFloat(e.target.value));
                                    }} />}


                                {allowance >= amount && <button onClick={() => { participateSale() }}>
                                    Buy Tokens
                                </button>}

                                {allowance < amount && <button onClick={() => { approve() }}>
                                    Approve
                                </button>}
                            </div>}
                    </div>

                    <div className={classes.mediaMobile}>
                        {props.media.map((media, id) => {
                            return <a key={id} href={media.link}> <img alt="" src={media.imgMobile} /> </a>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
