import React, { useEffect } from "react";
import classes from "./AllocationsInfo.module.scss"
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers';

import { SALE_ABI } from '../../../../consts/abi'
import { ControlButton } from "../DetailTable/components/ControlButton/ControlButton";

import Table from "../Table/Table";
import { toast } from "react-toastify";

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import { RpcProvider } from "../../../../consts/rpc";

export function AllocationsInfo({ ido }) {
    const { activate, deactivate, account, error } = useWeb3React();


    const claimAllAvailablePortions = async (ids) => {
        try {
            const { ethereum } = window;
            if (ethereum && !!account) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const saleContract = new ethers.Contract(ido.contract_address, SALE_ABI, signer);
                let result = await saleContract.withdrawMultiplePortions([0, 1, 2])
                const transaction = result.wait();

                toast.promise(
                    transaction,
                    {
                        pending: 'Transaction pending',
                        success: 'Claim request completed',
                        error: 'Transaction failed'
                    }
                )
            } else if (!!account) {
                const providerr = new WalletConnectProvider({
                    rpc: {
                        56: RpcProvider
                    },
                });

                const web3Provider = new providers.Web3Provider(providerr);
                const signer = web3Provider.getSigner();

                const saleContract = new ethers.Contract(ido.contract_address, SALE_ABI, signer);
                let result = await saleContract.withdrawMultiplePortions([0, 1, 2])
                const transaction = result.wait();

                toast.promise(
                    transaction,
                    {
                        pending: 'Transaction pending',
                        success: 'Claim request completed',
                        error: 'Transaction failed'
                    }
                )
               
            }

        } catch (error) {
            toast.error('Execution reverted');
        }
    }


    const claimPortion = async (id) => {
        try {
            const { ethereum } = window;

            if (ethereum && !!account) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const saleContract = new ethers.Contract(ido.contract_address, SALE_ABI, signer);
                let result = await saleContract.withdrawTokens(id)
                const transaction = result.wait();

                toast.promise(
                    transaction,
                    {
                        pending: 'Transaction pending',
                        success: 'Claim request completed',
                        error: 'Transaction failed'
                    }
                )
            } else if (!!account) {
                const providerr = new WalletConnectProvider({
                    rpc: {
                        56: RpcProvider
                    },
                });

                const web3Provider = new providers.Web3Provider(providerr);
                const signer = web3Provider.getSigner();

                const saleContract = new ethers.Contract(ido.contract_address, SALE_ABI, signer);
                let result = await saleContract.withdrawTokens(id)
                const transaction = result.wait();

                toast.promise(
                    transaction,
                    {
                        pending: 'Transaction pending',
                        success: 'Claim request completed',
                        error: 'Transaction failed'
                    }
                )
               
            }


        } catch (error) {
            alert(error.data.message.replace("execution reverted: ", ""))
        }
    }

    return (
        <div className={classes.allocationsInfo}>
            <ControlButton onClick={() => { claimAllAvailablePortions() }} text="Claim all portions" />
            <Table onClick={(id) => { claimPortion(id) }} mainIdo={ido} />
        </div>
    )
}
