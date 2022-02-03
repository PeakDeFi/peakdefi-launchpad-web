import React, { useEffect, useState } from "react";
import classes from "./Table.module.scss"
import { TableHeader } from "./components/TableHeader/TableHeader";
import { TableRow } from "./components/TableRow/TableRow";
import Img from './test_img.svg'
import { ethers } from "ethers";
import { SALE_ABI } from "../../../../consts/abi";
import { useSelector } from "react-redux";

const Table = ({onClick, mainIdo}) => {
    const [activeType, setActiveType] = useState(0);
    const [rotateRate, setRotateRate] = useState(0);
    const [info, setInfo] =useState([
        { id: 0, vested: "30%", amount: "Need calculate", portion: "2022.01.13"},
        { id: 1, vested: "20%", amount: "Need calculate", portion: "2022.01.14"}, 
        { id: 2, vested: "50%", amount: "Need calculate", portion: "2022.01.15"}
    ]);

    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const saleContract = new ethers.Contract(mainIdo.contract_address, SALE_ABI, signer);

    const userWalletAddress = useSelector(state=>state.userWallet.address);

    useEffect(()=>{
        if(mainIdo===undefined)
            return;
        console.log(saleContract);
        setInfo(mainIdo.project_detail.vesting_percent.map((e, index)=>{
            return{
                id: index, 
                vested: e+'%',
                amount: saleContract.calculateAmountWithdrawingPortionPub(userWalletAddress, e),
                portion: new Date(mainIdo.project_detail.vesting_time[index]*1000).toLocaleDateString('en-GB')
            }
        }))
    }, [mainIdo])
    
    return (  <>
        <div className={classes.Table}>
            <TableHeader />
            <div className={classes.line} />
            {
                info.map((ido, index) => {
                    ido.color = index % 2 ? "linear-gradient(rgb(10, 167, 245, 0.1) 0%, rgb(60, 231, 255, 0.1) 100%)" : "#FFFFFF"
                return <TableRow {...ido} onClick={(id) => {onClick(id)}} />
                } )
            }
        </div>
    </>);
}
 
export default Table;