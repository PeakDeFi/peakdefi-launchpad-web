import React from "react";
import classes from './IdoDetail.module.scss'
import { MainInfo } from "./components/MainInfo/MainInfo"; 
import { IdoBlock } from "./components/IdoBlock/IdoBlock";
import DetailTable from "./components/DetailTable/DetailTable";


// Image imports
import TestImg from "../MainScreen/components/IDOBlock/test_img.svg"
import Telegram from "./img/telegram.svg"
import Twitter from "./img/twitter.svg"
import Mediun from "./img/medium.svg"
import Img1 from './img/img1.svg'
import Img2 from './img/img2.svg'
import Img3 from './img/img3.svg'
import Img4 from './img/img4.svg'

class IdoDetail extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            title: "A Fully-Decentralized Play-and-Earn Idle Game",
            text: "Crabada is an exciting play-and-earn NFT game based in a world filled with fierce fighting Hermit-Crabs called Crabada (the NFTs).",
            media: [
                {
                    link: "", img: Telegram,
                    imgMobile: "https://cdn-icons.flaticon.com/png/512/3670/premium/3670044.png?token=exp=1639986909~hmac=7e5f006cead8d6588bd91b5e6e9da32a"
                },
                {
                    link: "", img: Twitter,
                    imgMobile: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-twitter-4.png"
                },
                { link: "", img: Mediun,
                    imgMobile: "https://cdns.iconmonstr.com/wp-content/assets/preview/2018/240/iconmonstr-medium-4.png", },
            ],
            idoInfo: {
                    token: {
                        name: "Platypus",
                        symbol: "PTP",
                        price: "0.0001",
                        peakPrice: 0.01,
                        img: TestImg
                    },
                    saleInfo: {
                        totalRaised: 1050000,
                        raised: 1000,
                        partisipants: 10,
                        start_date: 1639602566,
                        end_date: 1639602566,
                        token_price: 0.01,
                        info: {
                            time_until_launch: null,
                            token_sold: 0,
                            token_distribution: 1000,
                            sale_progres: 73
                        }
                    }
            },
            dataToShowParticipate: [
                {
                    img: Img1,
                    title: "Registration Opens",
                    text1: "Nov 2nd 2021",
                    text2: "17:00",
                },
                {
                    img: Img2,
                    title: "Registration Closes",
                    text1: "Nov 2nd 2021",
                    text2: "17:00",
                },
                {
                    img: Img3,
                    title: "Sales",
                    text1: "Nov 2nd 2021",
                    text2: "17:00",
                },
                {
                    img: Img4,
                    title: "Sale Ends",
                    text1: "Nov 2nd 2021",
                    text2: "17:00",
                },
            ]
        }
    }

    render() {
        return (
            <div className={classes.idoDetail} >
                <div className={classes.firstBlock}>
                    <MainInfo
                        title={this.state.title}
                        text={this.state.text}
                        media={this.state.media}
                    />
                    {IdoBlock(this.state.idoInfo)}
                </div>

                <div className={classes.participateBlocks}>
                    {
                        this.state.dataToShowParticipate.map(data => {
                            return participateBlock(data)
                        } )
                    }
                </div>

                <div className={classes.tableDetail}>
                    <DetailTable />
                </div>

            </div>
        )
    }
}

export default IdoDetail

function participateBlock(props) {
    return (<div key={props.title} className={classes.participateBlock}>
        <div className={classes.imgBlock} >
            <img alt="" src={props.img} />
        </div>
        <div className={classes.title} > {props.title} </div>
        <div className={classes.text} > {props.text1} </div>
        <div className={classes.text} > {props.text2} </div>
    </div>)
}