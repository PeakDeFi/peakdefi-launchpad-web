import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { ethers, providers } from "ethers";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SALE_ABI } from "../../../../../../consts/abi";
import { RpcProvider } from "../../../../../../consts/rpc";
import { setBG } from "../../../../../../features/projectDetailsSlice";
import classes from "./IdoBlock.module.scss"
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
    else if (m > 0 || s>0) {
        return m + ":" + s;
    } else {
        return 'Launched';
    }

}

function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}

function priceToFormatedPrice(price) {
    return "$" + price.toFixed(2)
}

export function IdoBlock({ props }) {
    const [seconds, setSeconds] = useState(typeof props.saleInfo.time_until_launch === 'string' ? 0 : props.saleInfo.time_until_launch);
    const dispatch = useDispatch();

    const [totalBUSDRaised, setTotalBUSDRaised] = useState(200000);
    const [saleProgress, setSaleProgress] = useState(100);

    let timer;

    const navigate = useNavigate();

    const updateCount = () => {
        timer = !timer && setInterval(() => {
            setSeconds(prevCount => prevCount - 1) // new
        }, 1000)
    }

    const updateSaleData = async ()=>{
        const { ethereum } = window;
        if (ethereum) {
        //     const provider = new ethers.providers.Web3Provider(ethereum);
          
        
        //     const saleContract = new ethers.Contract(props.sale_contract_address, SALE_ABI, provider);
        //     const sale = await saleContract.sale();
        //     setTotalBUSDRaised((sale.totalBUSDRaised/(10**18)));
        //     setSaleProgress(100*(sale.totalBUSDRaised/(10**18))/parseFloat(props.saleInfo.totalRaised));
        // }else{
          
        //     const provider = new ethers.providers.JsonRpcProvider(RpcProvider);

        //     const saleContract = new ethers.Contract(props.sale_contract_address, SALE_ABI, provider)

            
        //     const sale = await saleContract.sale();
        //     setTotalBUSDRaised((sale.totalBUSDRaised/(10**18)));
        //     setSaleProgress(100*(sale.totalBUSDRaised/(10**18))/parseFloat(props.saleInfo.totalRaised));
            
        }
    }

    useEffect(() => {
        updateCount()
        updateSaleData();

        return () => clearInterval(timer)
    }, []);

    const start_date =  props.saleInfo.start_date ?  ("0" +  props.saleInfo.start_date.getDate()).slice(-2) + "." + ("0"+( props.saleInfo.start_date.getMonth()+1)).slice(-2) + "." +
    props.saleInfo.start_date.getFullYear() : '';

    return (
        <div className={classes.IdoBlock} onClick={()=>{
            navigate('/project-details?id='+props.id);
            dispatch(setBG(props.bg_image));
        }}>
            <header>
                
                <img className={classes.bgImage} src = {props.bg_image} />

                <div className={classes.tokenBlock}>
                    
                    <div className={classes.progresLabel}>
                        {props.timeline.sale_start * 1000 < Date.now() && props.timeline.sale_end * 1000 > Date.now() &&
                            <div className={classes.styledLabel}>
                                In Progress
                            </div>}
                    </div>
                </div>
            </header>

            <main>
                <div className={classes.saleInfo}>
                    {totalRaised(props.saleInfo, totalBUSDRaised)}
                    <div className={classes.line} ></div>
                    <div className={classes.textToShowBlock} >
                        {/*textToShow("Participants", props.saleInfo.partisipants)*/}
                        {textToShow("Start Date", start_date)}
                        {textToShow("Token Price", isNaN(props.token.price) ? 'TBA':priceToFormatedPrice(props.token.price))}
                    </div>
                    {progressBar(saleProgress)}
                    <div className={classes.launchDetaid}>
                        <div className={classes.block}>
                            <div className={classes.text}> Time Until Launch </div>
                            <div style={{ marginTop: "10px" }} className={classes.value}> {timeLeft(seconds)}</div>
                        </div>
                        <div className={classes.block}>
                            <div className={classes.subBlock}>
                                <div className={classes.text}> Token Sold: </div>
                                <div className={classes.value}> Sold out </div>
                            </div>
                            <div className={classes.subBlock}>
                                <div className={classes.text}> Token Distribution:</div>
                                <div className={classes.value}> {numFormatter(props.saleInfo.info.token_distribution)} </div>
                            </div>
                        </div>
                        <div className={classes.block}>
                            <div className={classes.text}> Sale progress </div>
                            <div style={{ marginTop: "10px" }} className={classes.value}> {Math.round(saleProgress)}%</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

function tokenInfo(props) {
    return (
        <div className={classes.token}>
            <img alt={props.name} src={props.img}/>
            <div className={classes.text}>
                <div className={classes.name}> {props.name} </div>
            </div>
        </div>
    )
}

function totalRaised(props, totalBUSDRaised) {
    return (
        <div className={classes.totalRaised}>
            <div className={classes.text}>Total Raised</div>
            <div className={classes.count}>
                ${numberWithCommas(Math.round(totalBUSDRaised))}/${numberWithCommas(props.totalRaised)}
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
    return(
        <div className={classes.progressBar} >
            <div className={classes.backPart} ></div>
            <div style={{width: `${saleProgress}%`}} className={classes.topPart} ></div>
        </div>
    )
}
