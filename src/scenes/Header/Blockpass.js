import React, { useEffect, useState } from 'react'
import classes from "./Header.module.scss"
import { useWeb3React } from '@web3-react/core'
import CloseIcon from '@mui/icons-material/Close';



export function Blockpass(props) {
    const [showVerify, setShowVerify] = useState(true);

    const { activate, deactivate, account, error } = useWeb3React();
    useEffect(() => {
        loadBlockpassWidget()
    })

    const loadBlockpassWidget = () => {
        const blockpass = new window.BlockpassKYCConnect(
            'peak_16051', // service client_id from the admin console
            {
                env: 'prod',
                refId: account
            }
        )

        blockpass.startKYCConnect()

        blockpass.on('KYCConnectSuccess', (user) => {
            console.log("connetcted", user)
        })
    }

    useEffect(() => {
        setShowVerify(true);
    }, [account])

    return (
        <div className={account ? classes.kyc : classes.hide} style={{display: showVerify ? '': 'none'}}>
            <div className={classes.text}>
                <div> You need verify your KYC before participate sale: </div>
                <button id="blockpass-kyc-connect">
                    Verify with Blockpass
                </button>
            </div>
            <button className={classes.closeButton} onClick={() => { setShowVerify(false) }}><CloseIcon /></button>
        </div>
    )
}