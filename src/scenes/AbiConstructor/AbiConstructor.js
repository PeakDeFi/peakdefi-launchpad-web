import React, {useState} from 'react';
import { SALE_ABI } from '../../consts/abi';
import { ethers, BigNumber } from 'ethers';
import FunctionConstructor from './components/FunctionConstructor/FunctionConstructor';
import Collapsible from 'react-collapsible';
import { BsChevronDown } from "react-icons/bs";
import classes from './AbiConstructor.module.scss'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RpcProvider } from '../../consts/rpc';
import { useProviderHook } from 'hooks/useProviderHook/useProviderHook';

const {ethereum} = window;


const AbiConstructor = () => {

    const provider = useProviderHook()

    const abiJson = JSON.parse(SALE_ABI)
    const [contract, setContract] = useState("")
    const selectedIDO = useSelector(state => state.adminPage.selectedIDO);


    const configContract = () => {
        
    }

    useEffect(async ()=>{
        if (ethereum && selectedIDO.contract_address!==undefined) {
            const signer = await provider?.getSigner();
            let contract = new ethers.Contract(selectedIDO.contract_address, SALE_ABI, signer);
            setContract(contract)
        } else {
            if(!ethereum)
             alert("Connect wallet")
        }
    }, [selectedIDO.contract_address]);


    
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
