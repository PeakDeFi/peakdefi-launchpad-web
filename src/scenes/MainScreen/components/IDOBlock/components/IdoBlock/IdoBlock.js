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
                <div className={classes.progresLabel}>
                    <div className={classes.styledLabel}>
                        In Progress
                    </div>
                </div>
            </div>

            <div className={classes.saleInfo}>
                {totalRaised(props.saleInfo)}
                <div className={classes.line} ></div>
                <div className={classes.textToShowBlock} >
                    {textToShow("Participants", props.saleInfo.partisipants )}
                    {textToShow("Start Date", timeToDate(props.saleInfo.start_date) )}
                    {textToShow("Token Price", priceToFormatedPrice(props.saleInfo.token_price) )}
                </div>
                {progressBar(props.saleInfo)}
                {launchDetaid(props.saleInfo)}
            </div>

        </div>
    )
}

function tokenInfo(props) {
    return (
        <div className={classes.token}>
            <img alt={props.name} src={props.img} height={"80"}/>
            <div className={classes.text}>
                <div className={classes.name}> {props.name} </div>
            </div>
        </div>
    )
}

function totalRaised(props) {
    return ( 
        <div className={classes.totalRaised}>
            <div className={classes.text}>Total Raised</div>
            <div className={classes.count}>
               ${numberWithCommas(props.raised)}/${numberWithCommas(props.totalRaised)}
            </div>
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
    
}

function launchDetaid(props) {
    
    return (
        <div className={classes.launchDetaid}>
            <div className={classes.block}>
                <div className={classes.text}> Time Until Launch </div>
                <div style={{marginTop:"10px"}} className={classes.value}> Launched </div>
            </div>
            <div className={classes.block}>
                <div className={classes.subBlock}>
                    <div className={classes.text}> Token Sold: </div>
                    <div className={classes.value}> 0 </div>
                </div>
                <div className={classes.subBlock}>
                    <div className={classes.text}> Token Distribution:  </div>
                    <div className={classes.value}> 10.5M </div>
                </div>
            </div>
            <div className={classes.block}>
                <div className={classes.text}> Sale progress </div>
                <div style={{marginTop:"10px"}} className={classes.value}> 0% </div>
            </div>
        </div>
    )
}