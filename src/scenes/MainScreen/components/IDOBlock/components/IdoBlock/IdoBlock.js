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
import { useProviderHook } from "hooks/useProviderHook/useProviderHook";
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
    num = parseInt(num)
    if (num >= 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'k'; // convert to K for number from > 1000 < 1 million 
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'm'; // convert to M for number from > 1 million 
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}

function priceToFormatedPrice(price) {
    return "$" + price.toFixed(2)
}

export function IdoBlock({ props }) {
    const provider = useProviderHook()
    const date = new Date().getTime() / 1000;
    const [seconds, setSeconds] = useState(props.timeline.sale_end - date < 0 ? 0 : props.timeline.sale_end - date);
    const dispatch = useDispatch();

    const [totalBUSDRaised, setTotalBUSDRaised] = useState(0);
    const [saleProgress, setSaleProgress] = useState(0);

    let timer;

    const navigate = useNavigate();


    const updateCount = () => {
        timer = !timer && setInterval(() => {
            setSeconds(prevCount => prevCount - 1) // new
        }, 1000)
    }


    function get_token_sold() {
        let calculated_token = props.token.total_raise? Math.ceil(props.token.total_raise) : Math.ceil(totalBUSDRaised)
        if (calculated_token > props.saleInfo.info.token_distribution) {
            return props.saleInfo.info.token_distribution
        }
        return calculated_token
    }

    const updateSaleData = async () => {
        const { ethereum } = window;
        try {
            console.log("seconds", seconds)
            if (seconds <= 0) {
                setTotalBUSDRaised(props.token.token_distribution*props.token.price);
            }else
            {if (ethereum) {

                const saleContract = new ethers.Contract(props.sale_contract_address, SALE_ABI, provider);
                const sale = await saleContract.sale();
                console.log("sale.totalBUSDRaised", sale.totalBUSDRaised)
                setTotalBUSDRaised((sale.totalBUSDRaised / (10 ** 18)));
            } else {
                const providerr = new ethers.providers.JsonRpcProvider(RpcProvider)
                const saleContract = new ethers.Contract(props.sale_contract_address, SALE_ABI, providerr);
                const sale = await saleContract.sale();

                console.log("sale.totalBUSDRaised1", sale.totalBUSDRaised)
                setTotalBUSDRaised((sale.totalBUSDRaised / (10 ** 18)));
            }}
        } catch (error) {
            console.log('err', error)
            setTotalBUSDRaised(parseInt(0));
        }

    }

    useEffect(() => {
        setSaleProgress(100 * totalBUSDRaised / props.token.price / (props.token.token_distribution));
    }, [totalBUSDRaised])

    useEffect(() => {
        updateCount()
        updateSaleData();


        // return () => clearInterval(timer)
    }, []);


    const start_date = props.saleInfo.start_date ? ("0" + props.saleInfo.start_date.getDate()).slice(-2) + "." + ("0" + (props.saleInfo.start_date.getMonth() + 1)).slice(-2) + "." +
        props.saleInfo.start_date.getFullYear() : '';

    return (
        <div className={classes.IdoBlock} style={{ cursor: props.id === -1 ? 'default' : 'pointer' }} onClick={() => {
            if (props.id === -1)
                return false;

            navigate('/project-details/' + props.token.name.toLowerCase() + (props.type ? '/' + props.type : ''));
            dispatch(setBG(props.bg_image));
        }}>
            <header>

                <img className={classes.bgImage} src={props.bg_image} />

                <div className={classes.tokenBlock}>
                    <div className={classes.progresLabel}>
                        {false && props.timeline.sale_start * 1000 < Date.now() && props.timeline.sale_end * 1000 > Date.now() &&
                            <div className={classes.styledLabel}>
                                In Progress
                            </div>}
                    </div>
                </div>
            </header>

            <main>
                <div className={classes.saleInfo}>
                    <div className={classes.privateSaleFlag}>{ props.token.name == "EYWA" ? "KOL Sale" :  props.title == "Another-1"  ? "Pre-sale" :  props.is_private_sale ? 'Private Sale': 'Public Sale'}</div>
                    {totalRaised(props.token, totalBUSDRaised)}
                    <div className={classes.line} ></div>
                    <div className={classes.textToShowBlock} >
                        {/*textToShow("Participants", props.saleInfo.partisipants)*/}
                        {textToShow("Start Date", start_date)}
                        {textToShow("Token Price", isNaN(props.token.price) ? 'TBA' : priceToFormatedPrice(props.token.price))}
                    </div>
                    {progressBar(saleProgress)}
                    <div className={classes.launchDetaid}>
                        <div className={classes.block}>
                            <div className={classes.text}> Time until Launch </div>
                            <div style={{ marginTop: "10px" }} className={classes.value}> {timeLeft(seconds)}</div>
                        </div>
                        <div className={classes.block}>
                            <div className={classes.subBlock}>
                                <div className={classes.text}> Token sold: </div>
                                <div className={classes.value}> {numFormatter(totalBUSDRaised / props.token.price) ?? 'Sold out'} </div>
                            </div>
                            <div className={classes.subBlock}>
                                <div className={classes.text}> Tokens for sale:</div>
                                <div className={classes.value}> {numFormatter(parseInt(props.saleInfo.info.token_distribution))} </div>
                            </div>
                        </div>
                        <div className={classes.block}>
                            <div className={classes.text}> Sale Progress </div>
                            <div style={{ marginTop: "10px" }} className={classes.value}> {isNaN(Math.round(saleProgress)) ? 100 : Math.round(saleProgress)}%</div>
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
            <img alt={props.name} src={props.img} />
            <div className={classes.text}>
                <div className={classes.name}> {props.name} </div>
            </div>
        </div>
    )
}

function totalRaised(props, totalBUSDRaised) {
    return (
        <div className={classes.totalRaised}>
            <div className={classes.title}>{props.name}</div>
            <div className={classes.text}>Total raised</div>
            <div className={classes.count}>
                ${numberWithCommas(isNaN(props.total_raise * props.price) ? Math.round(parseInt(totalBUSDRaised)) : props.total_raise * props.price)}/${numberWithCommas(props.price * props.token_distribution)}
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
