import React, { useEffect, useState } from "react";
import classes from "./Table.module.scss"
import { TableHeader } from "./components/TableHeader/TableHeader";
import { TableRow } from "./components/TableRow/TableRow";
import Img from './test_img.svg'
import { ethers, BigNumber } from "ethers";
import { SALE_ABI } from "../../../../consts/abi";
import { useSelector } from "react-redux";

const Table = ({onClick, mainIdo}) => {
    const [activeType, setActiveType] = useState(0);
    const [rotateRate, setRotateRate] = useState(0);
    const [info, setInfo] =useState([
    ]);

    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const [saleContract, setSaleContract] = useState(new ethers.Contract(mainIdo.contract_address, SALE_ABI, signer));

    const userWalletAddress = useSelector(state=>state.userWallet.address);

    useEffect(()=>{
        if(mainIdo===undefined)
            return;
        
        
        setSaleContract(new ethers.Contract(mainIdo.contract_address, SALE_ABI, signer));
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
        if(info.length===0)
            return;

        let t_info = [...info];
        for(let i =0; i<t_info.length; i++){
            console.log('cycling htrou')
            
            await saleContract.calculateAmountWithdrawingPortionPub(userWalletAddress, BigNumber.from(100))
            .then(response=>{
                console.log(response);
                t_info[i].amount = response;
                debugger
            })
            .catch(error=>{
                console.log(saleContract)
                console.log(error);
            });

        }

        //setInfo([...t_info]);
    }, [info, saleContract, userWalletAddress])
    
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