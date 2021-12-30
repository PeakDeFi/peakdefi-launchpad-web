import React from "react";
import classes from "./Info.module.scss"
import Arrow from '../../../../resources/link_arrow.svg'
import FirstImg from './images/first.svg'
import SecondImg from './images/second.svg'
import ThirdImg from './images/third.svg'
import FourthImg from './images/fourth.svg'

function infoBlock(props) {
    
    return ( 
        <div key={props.title} className={classes.infoBlock}>
            <div className={classes.title} > {props.title} </div>
            <div className={classes.text} > {props.text} </div>
            <div className={classes.link} >
                <img alt="link" src={Arrow} />
            </div>
        </div>
     )

}


function participateBlock(props) {
    return (<div key={props.title} className={classes.participateBlock}>
        <div className={classes.imgBlock} >
            <img alt="" src={props.img} />
        </div>
        <div className={classes.title} > {props.title} </div>
        <div className={classes.text} > {props.text} </div>
        <div className={classes.link} >
            {props.link.text}
        </div>
    </div>)
}

class Info extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            dataToShowInfo: [
                {
                    title: "About",
                    text: "Let's dig into PEAKDEFI Launchpad and what it stands for",
                    link: ""
                },
                {
                    title: "Tier System",
                    text: "Get to know more about the IDO allocation system here",
                    link: ""
                },
                {
                    title: "How To Stake",
                    text: "Time for action! This guide enlights you on your blockchain investment path",
                    link: ""
                },
            ],

            dataToShowParticipate: [
                {
                    img: FirstImg,
                    title: "Register and KYC",
                    text: "In order to participate in sales on PEAKDEFI Launchpad, you must register and KYC first. You can still stake and earn PeakDefi without registering.",
                    link: {
                        link: "",
                        text: "Start the KYC Process"
                    }
                },
                {
                    img: SecondImg,
                    title: "Verify Wallet",
                    text: "Once you have registered and submitted your KYC, you must verify your wallet. This is the only wallet you will be able to use for sales.",
                    link: {
                        link: "",
                        text: "Verify Wallet"
                    }
                },
                {
                    img: ThirdImg,
                    title: "Allocation Staking",
                    text: "By staking PeakDefi, you earn allocation in IDOs. If you do not want to participate in sales, you can still benefit from staking.",
                    link: {
                        link: "",
                        text: "Stake XAVA"
                    }
                },
                {
                    img: FourthImg,
                    title: "Register for Sale",
                    text: "During the registration period, you must confirm your interest in participation. Once registration closes, you will not be able to register until the next sale.",
                    link: {
                        link: "",
                        text: "Register"
                    }
                },
            ]
        }
    }

    render() {
        return (
            <div className={classes.Info}>
                {
                    this.state.dataToShowInfo.map(data => {
                        return infoBlock(data)
                    } )
                }
                <div className={classes.titleBlock} > How to Participate </div>

                <div className={classes.participateBlocks}>
                    {
                        this.state.dataToShowParticipate.map(data => {
                            return participateBlock(data)
                        } )
                    }
                </div>
            </div>
        )
    }
}

export default Info