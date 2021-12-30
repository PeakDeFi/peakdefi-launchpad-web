import React from "react";
import classes from "./IdoBlock.module.scss"
function numberWithCommas(x) {
    return x.toString() //.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function timeToDate(time) {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

function priceToFormatedPrice(price) {
    return "$"+price
}

export function IdoBlock(props) {
    return (
        <div className={classes.IdoBlock}>
            <div className={classes.tokenBlock}>
                {tokenInfo(props.token)}
                {priceDetail(props.token)}
            </div>

            <div className={classes.saleInfo}>
                <div className={classes.line} ></div>
                {roundDetail(props.saleInfo)}
                {progressBar(props.saleInfo)}
                {launchDetaid(props.saleInfo)}
            </div>

        </div>
    )
}

function tokenInfo(props) {
    return (
        <div className={classes.token}>
            <img alt={props.name} src={props.img} />
            <div className={classes.text}>
                <div className={classes.name}> {props.name} </div>
                <div className={classes.symbol}>{props.symbol}</div>
            </div>
        </div>
    )
}

function priceDetail(props) {
    return (
        <div className={classes.priceDetail}>
            <div className={classes.text}> Price </div>
            <div className={classes.price}> ${props.price} </div>
            <div className={classes.text}> {props.peakPrice} PEAK </div>
        </div>
    )
}


function textToShow(text, value) {
    return ( 
        <div className={classes.textToShow}>
            <div className={classes.text}>{text}</div>
            <div className={classes.value}>{ value }</div>
        </div>
     )
}

function progressBar(props) {
    return (
        <div className={classes.progressBar} >
            <div className={classes.backPart} ></div>
            <div style={{width: `${Math.round(props.raised/props.totalRaised, 2)}%`}} className={classes.topPart} ></div>
        </div>
    )
}

function roundDetail(props) {
    let countDownShow = false
    let now_date = Date.now()
    let timeToCount = 0
    if (props.end_date > now_date) {
        countDownShow = true
        timeToCount = props.end_date - now_date
    }
    
    if (props.start_date > 1) {
        
    }

    return (
        <div className={classes.roundDetail}>
            <div className={classes.block}>
                <div className={classes.text}> Round </div>
                <div className={classes.text}> Time Left </div>
            </div>
            <div className={classes.block}>
                <div className={classes.roundInfo}> Sale end </div>
                <div className={classes.timeInfo}> Sale end </div>
            </div>
        </div>
    )
}

function launchDetaid(props) {
    
    return (
        <div className={classes.roundDetail}>
            <div className={classes.block}>
                <div className={classes.text}> Token Distribution </div>
                <div className={classes.text}> Total Raised </div>
            </div>
            <div className={classes.block}>
                <div className={classes.roundInfo}> 22.22M </div>
                <div className={classes.roundInfo}> $400,000 </div>
            </div>
        </div>
    )
}