import classes from './SaleOwner.module.scss'
import {Button} from "../../../ControlButton/ControlButton"
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const SaleOwner = ({ido, saleContract}) => {

    const defaultTransactionHandler = async (contractMethod)=>{
        try{
            const request = await contractMethod();
            const transaction = request.wait();
            toast.promise(
                transaction,
                {
                    pending: 'Transaction pending',
                    success: 'Transaction successful',
                    error: 'Transaction failed'
                }
            );
        } catch(error) {
            toast.error(error.error.message)
        }
    }

    const withdrawEarningsHander = ()=> {
        if((ido.timeline.sale_end*1000)<Date.now())
            defaultTransactionHandler(saleContract.withdrawEarnings)
    }

    const withdrawLeftoverHandler = async ()=> {
        if((ido.timeline.sale_end*1000)<Date.now())
            defaultTransactionHandler(saleContract.withdrawLeftover);
    }

    const depositTokensHandler = async ()=> {
        if((ido.timeline.sale_start*1000)>Date.now())
            defaultTransactionHandler(saleContract.depositTokens);
    }

    return (<div className={classes.SaleOwner}>
        <h1>Sale owner operations</h1>
        <section>
            <p>Withdraw Earnings:</p>
            <Button isActive={(ido.timeline.sale_end*1000)<Date.now()} onClick={withdrawEarningsHander} text="Withdraw"/>
        </section>

        <section>
            <p>Withdraw leftover:</p>
            <Button isActive={(ido.timeline.sale_end*1000)<Date.now()} onClick={withdrawLeftoverHandler} text="Withdraw"/>
        </section>

        <section>
            <p>Deposit Tokens:</p>
            <Button isActive={(ido.timeline.sale_start*1000)>Date.now()} onClick={depositTokensHandler} text="Deposit"/>
        </section>  

    </div>);
}
 
export default SaleOwner;