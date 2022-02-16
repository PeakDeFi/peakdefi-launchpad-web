import React, { useEffect, useState } from 'react'
import classes from "./Header.module.scss"
import { useWeb3React } from '@web3-react/core'
import CloseIcon from '@mui/icons-material/Close';
import { getUserDataKYC } from './API/blockpass';



export function Blockpass(props) {
    const [showVerify, setShowVerify] = useState(false); //change to false

    const { activate, deactivate, account, error } = useWeb3React();
    useEffect(() => {
        loadBlockpassWidget()
    })

    const loadBlockpassWidget = () => {
        const blockpass = new window.BlockpassKYCConnect(
            'peak_5e82c', // service client_id from the admin console
            {
                env: 'prod',
                refId: account
            }
        )
        
        blockpass.startKYCConnect()

        
    }

    useEffect(async () => {
        try {
            await getUserDataKYC(account).then(response => {
                if (response.data.data.status === "approved") {
                    setShowVerify(false);
                } else {
                    setShowVerify(true);
                }
            }).catch(error => {
                 setShowVerify(true);
            } )
        } catch (error) {
            setShowVerify(true);
        }
    }, [account])

    return (
        <div className={account ? classes.kyc : classes.hide} style={{display: showVerify ? '': 'none'}}>
            <div className={classes.text}>
                <div> You need to verify your KYC before participate sale </div>
                <button id="blockpass-kyc-connect">
                    Verify with Blockpass
                </button>
            </div>
            <button className={classes.closeButton} onClick={() => { setShowVerify(false) }}><CloseIcon /></button>
        </div>
    )
}