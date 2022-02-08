import React, {useState} from 'react';
import { SALE_ABI } from '../../consts/abi';
import { ethers, BigNumber } from 'ethers';
import FunctionConstructor from './components/FunctionConstructor/FunctionConstructor';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from "react-icons/bs";
import classes from './AbiConstructor.module.scss'
import { useEffect } from 'react';

const {ethereum} = window;


const AbiConstructor = () => {

    const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")

    const abiJson = JSON.parse(SALE_ABI)
    const [contract, setContract] = useState("")

    const configContract = () => {
        
    }

    useEffect(async ()=>{
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = await provider.getSigner();
            let contract = new ethers.Contract("0x63644CCf2f3ea1488d03871A494dA148ee77C0ee", SALE_ABI, signer);
            setContract(contract)
        } else {
            alert("Connect wallet")
        }
    }, []);


    
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