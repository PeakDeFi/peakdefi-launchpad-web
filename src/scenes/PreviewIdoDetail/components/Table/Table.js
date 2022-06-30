import React, { useEffect, useState } from "react";
import classes from "./Table.module.scss"
import { TableHeader } from "./components/TableHeader/TableHeader";
import { TableRow } from "./components/TableRow/TableRow";
import Img from './test_img.svg'
import { ethers, BigNumber } from "ethers";
import { SALE_ABI } from "../../../../consts/abi";
import { useSelector } from "react-redux";
import { useWeb3React } from '@web3-react/core'

import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";

import { RpcProvider } from "../../../../consts/rpc";

const Table = ({onClick, mainIdo}) => {
    const { activate, deactivate, account, error } = useWeb3React();

    const [activeType, setActiveType] = useState(0);
    const [rotateRate, setRotateRate] = useState(0);
    const [info, setInfo] =useState([
    ]);

    
    const [saleContract, setSaleContract] = useState(null);

    const userWalletAddress = useSelector(state=>state.userWallet.address);

    useEffect(()=>{
        if(mainIdo===undefined)
            return;

        
            const { ethereum } = window;
            

        if(ethereum && !!account){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            setSaleContract(new ethers.Contract(mainIdo.contract_address, SALE_ABI, signer));
        }else if(!!account){
            const providerr = new WalletConnectProvider({
                rpc: {
                    56: RpcProvider
                },
            });

            const web3Provider = new providers.Web3Provider(providerr);
            const signer = web3Provider.getSigner();

            setSaleContract(new ethers.Contract(mainIdo.contract_address, SALE_ABI, signer));
        }
        
        
        
        setInfo(mainIdo.project_detail.vesting_percent.map((e, index)=>{
            return{
                id: index, 
                vested: e+'%',
                amount: "Calculating...",
                portion: new Date(mainIdo.project_detail.vesting_time[index]*1000).toLocaleDateString('en-GB')
            }
        }))
    }, [mainIdo])

    useEffect( async ()=>{
        if(info.length===0 || !saleContract || !userWalletAddress)
            return;

        let t_info = [...info];
        for(let i =0; i<t_info.length; i++){
            await saleContract.calculateAmountWithdrawingPortionPub(userWalletAddress, BigNumber.from(mainIdo.project_detail.vesting_percent[i])).then((response)=>{
                t_info[i].amount = response.toString();
            });
        }

        setInfo([...t_info]);
    }, [saleContract, userWalletAddress])
    
    return (  <>
        <div className={classes.Table}>
            <TableHeader />
            
            {
                info.map((ido, index) => {
                    ido.color = index % 2 ? "linear-gradient(rgb(10, 167, 245, 0.1) 0%, rgb(60, 231, 255, 0.1) 100%)" : "#FFFFFF"
                return <TableRow {...ido} onClick={(id) => {onClick(id)}} />
                } )
            }

            {
                info.length===0 && 
                <h2 className={classes.emptyMessage}> You have not made any allocations yet </h2>
            }
        </div>
    </>);
}
 
export default Table;