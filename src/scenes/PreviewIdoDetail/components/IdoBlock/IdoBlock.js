import React, { useState, useEffect } from "react";
import classes from "./IdoBlock.module.scss"
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeLeft(seconds) {

    let timeString = '';
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    if (d > 0) {
        return d + ' days, ' + h + ' h, ' + m + ' mins'
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


const IdoBlock = ({ idoInfo, ido, media }) => {

    if (ido === undefined)
        return (<></>)

    console.log('ido.current_round', ido.current_round)
    return (
        <div className={classes.IdoBlock}>
            <div className={classes.tokenBlock}>
                <div className={classes.token}>
                    <img className={classes.tokenLogo} alt={idoInfo.token.name} src={idoInfo.token.img} />
                    <div className={classes.text}>
                        <div className={classes.name}> {idoInfo.token.name} </div>
                        <div className={classes.symbol}>{idoInfo.token.symbol}</div>
                        <div className={classes.media}>
                            {media.map((media, id) => {
                                return <a key={id} href={media.link} target="_blank"> <img alt="" src={media.imgMobile} /> </a>
                            })}
                        </div>
                    </div>
                </div>
                
                {priceDetail(idoInfo.token)}


            </div>

            <div className={classes.saleInfo}>
                <div className={classes.line} ></div>
                {console.log('ido.current_round', ido.current_round)}
                <RoundDetail time_left={ido.current_round === 'Preparing for sale' ? ido.time_until_launch : ido.time_left_in_current_round} current_round={ido.current_round === 'Sale end' ? 'Sale ended' : ido.current_round} />
                {progressBar(idoInfo.saleInfo)}
                {launchDetaid(idoInfo.saleInfo)}
            </div>

        </div>
    )
}

export default IdoBlock;


function priceDetail(props) {
    return (
        <div className={classes.priceDetail}>
            <div className={classes.text}> Price </div>
            <div className={classes.price}> ${props.price} </div>
        </div>
    );
}


function textToShow(text, value) {
    return (
        <div className={classes.textToShow}>
            <div className={classes.text}>{text}</div>
            <div className={classes.value}>{value}</div>
        </div>
    )
}

function progressBar(props) {
    return (<div className={classes.progressBarWrapper}>
        <div className={classes.progressBar} >
            <div className={classes.backPart} ></div>
            <div style={{ width: `${100}%` }} className={classes.topPart} ></div>
        </div>

        <div style={{ marginLeft: `calc(${Math.min(100, 100)}% - 1.15em` }}>
            <p>{Math.round(100)}% Sale</p>
        </div>
    </div>
    )
}

function RoundDetail({ time_left, current_round }) {
    let timer;
    const [iTimeLeft, setITimeLeft] = useState(time_left);

    const updateCount = () => {
        timer = !timer && setInterval(() => {
            setITimeLeft(prevCount => prevCount - 1) // new
        }, 1000)
    }

    useEffect(() => {
        updateCount()

        return () => clearInterval(timer)
    }, [])


    return (
        <div className={classes.roundDetail}>
            <div className={classes.block}>
                <div className={classes.text}> Round</div>
                <div className={classes.text}> Time left </div>
            </div>
            <div className={classes.block}>
                <div className={classes.roundInfo}> {current_round} </div>
                <div className={classes.timeInfo}> {timeLeft(iTimeLeft)} </div>
            </div>
        </div>
    )
}

function launchDetaid(props) {


    return (
        <div className={classes.roundDetail}>
            <div className={classes.block}>
                <div className={classes.text}> Tokens for sale </div>
                <div className={classes.text}> Total Raised </div>
            </div>
            <div className={classes.block}>
                <div className={classes.roundInfo}> {props.info.token_distribution} </div>
                <div className={classes.roundInfo}> ${numberWithCommas(200000)} </div>
            </div>
        </div>
    )
}