import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./OngoingIdo.module.scss"
import {useDispatch} from 'react-redux'
import { setBG } from "../../../../../../features/projectDetailsSlice";
import { SALE_ABI } from "../../../../../../consts/abi";
import { ethers, providers} from "ethers";
import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { RpcProvider } from "../../../../../../consts/rpc";

function numberWithCommas(x) {
    if (!x)
        return 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeToDate(time) {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

function timeLeft(seconds) {

    let timeString = '';
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    if (d > 0) {
        return d + ' days ' + h + 'hours'
    }
    else if (h > 0) {
        return h + ' hours ' + m + ' minutes';
    }
    else if (m > 0 || s > 0) {
        return m + ":" + s;
    } else {
        return 'Launched';
    }

}

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}

function priceToFormatedPrice(price) {
    return "$" + price?.toFixed(2)
}

export function OngoingIdo({ props }) {
    const [seconds, setSeconds] = useState(typeof props.saleInfo.time_until_launch === 'string' ? 0 : props.saleInfo.time_until_launch);
    let timer;

    const [totalBUSDRaised, setTotalBUSDRaised] = useState(200000);
    const [saleProgress, setSaleProgress] = useState(0);
    
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const updateCount = () => {
        timer = !timer && setInterval(() => {
            setSeconds(prevCount => prevCount - 1) // new
        }, 1000)
    }


    function get_token_sold(){
        let calculated_token = Math.ceil(totalBUSDRaised / props.saleInfo.sale_price)
        if (calculated_token > props.saleInfo.info.token_distribution) {
            return props.saleInfo.info.token_distribution
        }
        return calculated_token
    }

    const updateSaleData = async ()=>{
        const { ethereum } = window;
        try {
             if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
          
        
            const saleContract = new ethers.Contract(props.sale_contract_address, SALE_ABI, provider);
            const sale = await saleContract.sale();
            setTotalBUSDRaised((sale.totalBUSDRaised/(10**18)));
            }else{
                
                const providerr = new ethers.providers.JsonRpcProvider(RpcProvider)

                const saleContract = new ethers.Contract(props.sale_contract_address, SALE_ABI, providerr);
                const sale = await saleContract.sale();
                
                setTotalBUSDRaised((sale.totalBUSDRaised/(10**18)));
             }
            setSaleProgress(100*get_token_sold()/props.saleInfo.info.token_distribution);
            
        } catch (error) {
            setTotalBUSDRaised(parseInt(props.saleInfo.totalRaised));
            setSaleProgress(100* get_token_sold()/parseInt(props.saleInfo.info.token_distribution));
        }
       
    }

    useEffect(() => {
        updateCount()
        updateSaleData();


        // return () => clearInterval(timer)
    }, []);

    const start_date = props.saleInfo.start_date ? ("0" + props.saleInfo.start_date.getDate()).slice(-2) + "." + ("0" + (props.saleInfo.start_date.getMonth() + 1)).slice(-2) + "." +
        props.saleInfo.start_date.getFullYear() : '';

    
    
    
    return (
        <div className={classes.IdoBlock} style={{cursor: props.id===-1 ? 'default' : 'pointer'}} onClick={() => {
            if(props.id===-1)
                return;
            
            navigate('/project-details?id=' + props.id);
            dispatch(setBG(props.bg_image));
        }}>
            <header>

                <img className={classes.bgImage} src={props.bg_image}/>

                <div className={classes.tokenBlock}>
                    {tokenInfo(props.token)}
                    
                </div>
            </header>

            <main>
                <div className={classes.saleInfo}>
                    {totalRaised(props.saleInfo, totalBUSDRaised)}
                    <div className={classes.textToShowBlock} >
                        {/*textToShow("Participants", props.saleInfo.partisipants)*/}
                        {textToShow("Start Date", start_date)}
                        {textToShow("Token Price", isNaN(props.saleInfo.sale_price) ? 'TBA' : priceToFormatedPrice(props.saleInfo.sale_price))}
                    </div>

                </div>

                <div className={classes.verticalSeparator}></div>

                <div className={classes.details}>

                    <div className={classes.launchDetaid}>
                        <div className={classes.block}>
                            <div className={classes.subBlock}>
                                <div className={classes.text}> Time until Launch </div>
                                <div style={{ marginTop: "10px" }} className={classes.value}> {timeLeft(seconds)}</div>
                            </div>

                            <div className={classes.subBlock}>
                                <div className={classes.text}> Tokens sold: </div>
                                <div className={classes.value}> {numFormatter( get_token_sold() )} </div>
                            </div>
                        </div>
                        <div className={classes.block}>
                            
                            <div className={classes.subBlock}>
                                <div className={classes.text}> Tokens for sale:</div>
                                <div className={classes.value}> {numFormatter(props.saleInfo.info.token_distribution)} </div>
                            </div>

                            <div className={classes.subBlock}>
                                <div className={classes.text}> Sale Progress </div>
                                <div style={{ marginTop: "10px" }} className={classes.value}> {Math.round(saleProgress)}%</div>

                            </div>
                        </div>
                    </div>

                    {progressBar(saleProgress)}
                </div>
            </main>
        </div>
    )
}

function tokenInfo(props) {
    return (
        <div className={classes.token}>
            
        </div>
    )
}

function totalRaised(props, totalBUSDRaised) {
    return (
        <div className={classes.totalRaised}>
            <div className={classes.text}>Total raised</div>
            <div className={classes.count}>
                ${numberWithCommas(Math.round(totalBUSDRaised))}/${numberWithCommas(props.sale_price*props.info.token_distribution)}
            </div>
        </div>
    )
}

function textToShow(text, value) {
    return (
        <div className={classes.textToShow}>
            <div className={classes.text}>{text}</div>
            <div className={classes.value}>{value}</div>
        </div>
    )
}

function progressBar(saleProgress) {
    return (
        <div className={classes.progressBar} >
            <div className={classes.backPart} ></div>
            <div style={{ width: `${saleProgress}%` }} className={classes.topPart} ></div>
        </div>
    )
}
