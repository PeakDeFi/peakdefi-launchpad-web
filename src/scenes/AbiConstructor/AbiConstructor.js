import React, {useState} from 'react';
import { SALE_ABI } from '../../consts/abi';
import { ethers, BigNumber } from 'ethers';
import FunctionConstructor from './components/FunctionConstructor/FunctionConstructor';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from "react-icons/bs";
import classes from './AbiConstructor.module.scss'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const {ethereum} = window;


const AbiConstructor = () => {

    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")

    const abiJson = JSON.parse(SALE_ABI)
    const [contract, setContract] = useState("")
    const selectedIDO = useSelector(state => state.adminPage.selectedIDO);


    const configContract = () => {
        
    }

    useEffect(async ()=>{
        console.log("SELECTED IDO", selectedIDO);
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = await provider.getSigner();
            let contract = new ethers.Contract(selectedIDO.contract_address, SALE_ABI, signer);
            setContract(contract)
        } else {
            alert("Connect wallet")
        }
    }, [selectedIDO]);


    
    return (
        <div>
            {abiJson.map(f => {
                if (f.type === "function")
                return    <Collapsible
                        trigger={[f.name, <BsChevronDown />]}
                        triggerClassName={classes.collapsibleHeader}
                        triggerOpenedClassName={classes.collapsibleHeaderisOpen}
                        openedClassName={classes.collapsibleContent}
                    >
                    <FunctionConstructor
                        contract={contract}
                        data={f} provider={provider} />
                    </Collapsible>
            } ) }
        </div>
    )
    

}

export default AbiConstructor;