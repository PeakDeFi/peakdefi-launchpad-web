import React from "react";
import classes from "./AllocationsInfo.module.scss"
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers';

import { SALE_ABI } from '../../../../consts/abi'
import { ControlButton } from "../DetailTable/components/ControlButton/ControlButton";

import Table from "../Table/Table";

export function AllocationsInfo(props) {
    const { activate, deactivate, account, error } = useWeb3React();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const saleContract = new ethers.Contract("0xE19C3c8F59648293d59145e786F6a38A2e8684F4", SALE_ABI, signer)

    const claimAllAvailablePortions = async (ids) => {
       try {
           let result = await saleContract.withdrawMultiplePortions([0, 1, 2])
           console.log("result",result)
       } catch (error) {
           alert(error.data.message.replace("execution reverted: ", ""))
       }
    }

    const claimPortion = async (id) => {
       try {
           let result = await saleContract.withdrawTokens(id)
           console.log("result",result)
       } catch (error) {
           alert(error.data.message.replace("execution reverted: ", ""))
       }
    }

    return (
        <div className={classes.allocationsInfo}>
            <ControlButton onClick={() => { claimAllAvailablePortions()}} text="Claim all portions" />
            <Table onClick={(id) => { claimPortion(id) } } />
        </div>
    )
}
