import React, { useEffect } from 'react'
import classes from "./Header.module.scss"
import { useWeb3React } from '@web3-react/core'


    
export function Blockpass(props) {
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
    return (
        <div className={account ? classes.kyc : classes.hide}>
            <div className={classes.text}> You need verify your KYC before participate sale: </div>
             <button id="blockpass-kyc-connect">
                Verify with Blockpass
            </button>
        </div>
    )
}