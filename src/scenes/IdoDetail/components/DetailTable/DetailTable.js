import React, { useEffect, useState } from "react";
import classes from "./DetailTable.module.scss"
import { ControlButton } from "./components/ControlButton/ControlButton";
import { TableRow } from "./components/TableRow/TableRow";
import { AllocationsInfo } from '../AllocationsInfo/AllocationsInfo'
import SimpleVestingList from "./components/SimpleVestingList/SimpleVestingList";
import { ethers, providers } from "ethers";
import { SALE_ABI } from "../../../../consts/abi";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { RpcProvider } from "../../../../consts/rpc";
import { useWeb3React } from "@web3-react/core";
import SaleOwner from "./components/SaleOwner/SaleOwner";

const DetailTable = ({ ido }) => {
    const [activeButton, setActivateButton] = useState('sale_info');
    const [isSaleOwner, setIsSaleOwner] = useState(false);
    const [showYourAllocations, setShowYourAllocations] = useState(true);
    const [saleContract, setSaleContract] = useState();

    const [rowInfo, setRowInfo] = useState([
        {
            text: "Project Website",
            link: {
                url: "",
                text: "www.crabada.com"
            }
        },
        {
            text: "Number of Registrations",
            info: "15,290"
        },
        {
            text: "Vesting",
            info: "100% TGE"
        },
        {
            text: "TGE",
            info: "Nov 13th 2021 at 14:00"
        },
        {
            text: "Sale Contract Address(never send token for contract directly)",
            link: {
                url: "",
                text: "0x51208420EAba25b787008EE856665B2F4c5ed818",
                isShortText: true
            }
        },
        {
            text: "Restricted countries:",
            info: "US, North Korea, Russia, Iran"
        }
    ]);
    const [tokenInfo, setTokenInfo] = useState([
        {
            text: "Token Name",
            info: "Crabada"
        },
        {
            text: "Token Symbol",
            info: "CRA"
        },
        {
            text: "Token Decimals",
            info: "18"
        },
        {
            text: "Total Supply",
            info: "1,000,000,000"
        },
        {
            text: "Token Address",
            link: {
                url: "",
                text: "0x51208420EAba25b787008EE856665B2F4c5ed818",
                isShortText: true
            }
        }
    ]);

    const {account} = useWeb3React();


    useEffect(() => {
        if (ido === undefined)
            return;


        setShowYourAllocations(ido.project_detail.vesting_percent.length>0);
        let tempRowInfo = [...rowInfo];
        tempRowInfo[0].link.url = ido.website_url;
        tempRowInfo[0].link.text = ido.website_url;

        tempRowInfo[1].info = ido.project_detail.number_of_registration;

        tempRowInfo[2].info = ido.project_detail.vesting_text;

        tempRowInfo[3].info = new Date(ido.project_detail.tge).toLocaleString('en-US', { dateStyle: 'long' });
        tempRowInfo[3].info = new Date(ido.project_detail.tge).toLocaleString('en-US', { dateStyle: 'long' });

        tempRowInfo[4].link.text = ido.contract_address;

        setRowInfo([...tempRowInfo])


        let t_tokenInfo = [...tokenInfo];

        t_tokenInfo[0].info = ido.token.name;
        t_tokenInfo[1].info = ido.token.symbol;
        t_tokenInfo[2].info = ido.token.decimals;
        t_tokenInfo[3].info = numberWithCommas(ido.token.total_supply);
        t_tokenInfo[4].link.text = ido.token.token_address;

        setTokenInfo([...tokenInfo]);

        const {ethereum} = window;

        if (ethereum && !!ido) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            setSaleContract(new ethers.Contract(ido.contract_address, SALE_ABI, signer));
            
        } else if (!!ido) {
            const providerr = new WalletConnectProvider({
                rpc: {
                    56: RpcProvider
                },
            });

            const web3Provider = new providers.Web3Provider(providerr);
            const signer = web3Provider.getSigner();

            setSaleContract(new ethers.Contract(ido.contract_address, SALE_ABI, signer));
        }
    }, [ido]);

    useEffect(()=>{
        if(!!saleContract){
            saleContract.sale().then((response)=>{
                setIsSaleOwner(response.saleOwner===account)
            }).catch(error=>{
            });


        }
    }, [saleContract]);

    function showTableRows() {

        let arrayToShow = []
        switch (activeButton) {
            case "sale_info":
                arrayToShow = rowInfo
                break;

            case "token_info":
                arrayToShow = tokenInfo
                break;

            default:
                break;
        }

        return arrayToShow.map((info, id) => {
            if (info.text != "Number of Registrations") {
                if (id + 1 == rowInfo.length) {
                    info["showLine"] = false
                } else {
                    info["showLine"] = true
                }
                return <TableRow key={id} {...info} />
            }
        })
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <div className={classes.detailTable} >
            <div className={classes.controlButtons}>
                <ControlButton
                    onClick={(ev) => { setActivateButton('sale_info') }}
                    isActive={activeButton === "sale_info"}
                    text="Sale Info"
                />
                <ControlButton
                    onClick={(ev) => { setActivateButton('token_info') }}
                    isActive={activeButton === "token_info"}
                    text="Token Info"
                />
                <ControlButton
                    onClick={(ev) => { setActivateButton('about_the_project') }}
                    isActive={activeButton === "about_the_project"}
                    text="About the Project"
                />
                {
                    // showYourAllocations &&
                    <ControlButton
                        onClick={(ev) => { setActivateButton('your_allocations') }}
                        isActive={activeButton === "your_allocations"}
                        text="Your Allocations"
                    />
                }
                {
                    isSaleOwner &&
                    <ControlButton
                        onClick={(ev) => { setActivateButton('sale_owner') }}
                        isActive={activeButton === "sale_owner"}
                        text="Sale owner"
                    />
                }

                {/*
                    ido.token.name === "Tangible" &&
                    <ControlButton
                        onClick={(ev) => { setActivateButton('vesting') }}
                        isActive={activeButton === "vesting"}
                        text="Vesting"
                    />*/
                }
            </div>

            {
                activeButton === "your_allocations" ?
                    <AllocationsInfo ido={ido} />
                : activeButton === 'about_the_project' ?
                    <div className={classes.aboutTheProject} dangerouslySetInnerHTML={{ __html: ido.description }} />
                : activeButton ==='sale_owner' ?
                    <></>
                    // <SaleOwner ido={ido} saleContract={saleContract}/>
                :activeButton === 'vesting' ?
                    <SimpleVestingList />
                :
                    <div className={classes.tableBody}>
                        {showTableRows()}
                    </div>
            }


        </div>
    );
}

export default DetailTable;
