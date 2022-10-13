import classes from './SaleOwner.module.scss'
import {Button} from "../../../ControlButton/ControlButton"
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { ethers, providers } from "ethers";
import { TOKEN_ABI } from "../../../../../../consts/abi";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { RpcProvider } from "../../../../../../consts/rpc";
import { useSelector, useDispatch } from 'react-redux'
import { parse } from 'plist';

const SaleOwner = ({ ido, saleContract }) => {
    
    const [tokenContract, setTokenContract] = useState(null);
    const [allowance, setAllowance] = useState(0);
    const [decimals, setDecimals] = useState(0);
    const userWalletAddress = useSelector((state) => state.userWallet.address);

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
        // if((ido.timeline.sale_end*1000)<Date.now())
            defaultTransactionHandler(saleContract.withdrawEarnings)
    }

    const withdrawLeftoverHandler = async ()=> {
        // if((ido.timeline.sale_end*1000)<Date.now())
            defaultTransactionHandler(saleContract.withdrawLeftover);
    }

    const depositTokensHandler = async ()=> {
        // if((ido.timeline.sale_start*1000)>Date.now())
            defaultTransactionHandler(saleContract.depositTokens);
    }

    const approveTokensHandler = async ()=> {
        tokenContract.approve(ido.contract_address, ethers.constants.MaxUint256).then(res => {
                let tran = res.wait().then((transaction) => {
                    setAllowance(ethers.constants.MaxUint256);
                });

                toast.promise(
                    tran,
                    {
                        pending: 'Approval pending',
                        success: 'Approval successful',
                        error: 'Approval failed'
                    }
                );
            })
    }

    useEffect(() => {
        const { ethereum } = window;
        let contract = null;
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            contract = new ethers.Contract(ido?.token?.token_address, TOKEN_ABI, signer)
        } else{
            const providerr = new WalletConnectProvider({
                rpc: {
                    56: RpcProvider
                },
            });
            const web3Provider = new providers.Web3Provider(providerr);
            const signer = web3Provider.getSigner();
            contract = new ethers.Contract(ido?.token?.token_address, TOKEN_ABI, signer)
        }

        contract.allowance(userWalletAddress, ido.contract_address).then((response) => {
                setAllowance(parseInt(response.toString()));
            }).catch((erorr) => {

            });
        setTokenContract(contract)
        
    }, []);

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
            <Button isActive={(ido.timeline.sale_start*1000)>Date.now()} onClick={parseInt(ido.target_raised) * (10^parseInt(ido.token.decimals)) > allowance ? approveTokensHandler : depositTokensHandler} text={parseInt(ido.target_raised) * (10^parseInt(ido.token.decimals)) > allowance ? "Approve" :  "Deposit"}/>
        </section>  

    </div>);
}
 
export default SaleOwner;