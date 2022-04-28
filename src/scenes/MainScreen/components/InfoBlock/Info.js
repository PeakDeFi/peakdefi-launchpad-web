import React, { useEffect } from "react";
import classes from "./Info.module.scss"
import Arrow from '../../../../resources/link_arrow.svg'
import FirstImg from './images/first.svg'
import SecondImg from './images/second.svg'
import ThirdImg from './images/third.svg'
import FourthImg from './images/fourth.svg'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import ErrorDialog from "../../../ErrorDialog/ErrorDialog";

import { getUserDataKYC } from '../../../Header/API/blockpass'

function infoBlock(props, navigate) {

    return (
        <div key={props.title} className={classes.infoBlock}>
            <div className={classes.title} > {props.title} </div>
            <div className={classes.text} > {props.text} </div>
            <div className={classes.link} onClick={() => navigate(props.link)} >
                <img alt="link" src={Arrow} />
            </div>
        </div>
    )

}


function participateBlock(props, navigate) {


    return (<div key={props.title} className={classes.participateBlock}>


        <div>
            <div className={classes.imgBlock} >
                <img alt="" src={props.img} />
            </div>
            <div className={classes.title} > {props.title} </div>
            <div className={classes.text} > {props.text} </div>
        </div>

        <div>
            <div className={classes.link} onClick={() => {
                if (props.link.link === "" && !!props.link.onClick) {
                    props.link.onClick();
                }
                else if (props.link.link === "") {
                    return;
                }
                navigate(props.link.link)

            }}>


                {!!props.link.scrollTo &&
                    <Link to="ongoingSale" spy={true} smooth={true} offset={0} duration={500}>
                        {props.link.text}
                    </Link>
                }

                {
                    !props.link.scrollTo &&
                    <>{props.link.text}</>
                }
            </div>

        </div>
    </div>)
}

const Info = () => {
    const navigate = useNavigate();

    const { account } = useWeb3React();
    const [isVerified, setIsVerified] = useState(false);
    const [isPending, setIsPending] = useState(false)

    const userWalletAddress = useSelector(state => state.userWallet.address)
    const stakingBalance = useSelector(state => state.staking.balance);
    const decimals = useSelector(state => state.userWallet.decimal);

    const [showError, setShowError] = useState(false);
    const [customMessage, setCustomMessage] = useState('');

    useEffect(() => {
        getUserDataKYC(account).then(response => {
            if (response.data.data.status === "approved") {
                setIsVerified(true);
            } else {
                setIsVerified(false);
                setIsPending(true);
            }
        }).catch(error => {
            setIsPending(false);
            setIsVerified(false);
        })

        setDataToShowParticipate([
            {
                img: ThirdImg,
                title: "Allocation Staking",
                text: "By staking PeakDefi, you earn allocation in IDOs. If you do not want to participate in sales, you can still benefit from staking.",
                link: {
                    link: "/allocation-staking",
                    text: "Stake PEAK"
                }
            },
            {
                img: FirstImg,
                title: "Register and KYC",
                text: "In order to participate in sales on PEAKDEFI Launchpad, you must register and KYC first. You can still stake and earn PeakDefi without registering.",
                link: {
                    link: "",
                    onClick: () => {
                        if (account && stakingBalance / (10 ** decimals) >= 1000) {
                            if (isVerified) {
                                setShowError(true);
                                setCustomMessage("You have already completed KYC registration process")
                            } else if (isPending) {
                                setShowError(true);
                                setCustomMessage("Your KYC registration process is pending, please wait")
                            } else {
                                document.getElementById('blockpass-kyc-connect').click();
                            }
                        }
                        else if (account) {
                            setShowError(true);
                            setCustomMessage("You need to stake at least 1000 PEAK to be able to start the KYC process")
                        }
                        else {
                            setShowError(true);
                            setCustomMessage("You cannot start KYC process without connecting your wallet")
                        }
                    },
                    text: "Start the KYC process"
                }
            },
            {
                img: SecondImg,
                title: "Verify Wallet",
                text: "Once you have registered and submitted your KYC, you must verify your wallet. This is the only wallet you will be able to use for sales.",
                link: {
                    link: "",
                    onClick: () => {
                        if (account && stakingBalance / (10 ** decimals) >= 1000) {
                            if (isVerified) {
                                setShowError(true);
                                setCustomMessage("You have already verified your wallet")
                            } else if (isPending) {
                                setShowError(true);
                                setCustomMessage("Your wallet verification is pending, please wait")
                            } else {
                                document.getElementById('blockpass-kyc-connect').click();
                            }
                        }
                        else if (account) {
                            setShowError(true);
                            setCustomMessage("You need to stake at least 1000 PEAK to be able to verify your wallet")
                        }
                        else {
                            setShowError(true);
                            setCustomMessage("Please connect your wallet before starting the verification process")
                        }
                    },
                    text: "Verify Wallet"
                }
            },
            {
                img: FourthImg,
                title: "Register for Sale",
                text: "During the registration period, you must confirm your interest in participation. Once registration closes, you will not be able to register until the next sale.",
                link: {
                    link: "",
                    scrollTo: 'ongoingSale',
                    text: "Register"
                }
            },
        ]);
    }, [account, stakingBalance, isVerified, decimals, isPending]);


    const [dataToShowInfo, setDataToShowInfo] = useState([
        {
            title: "About",
            text: "Let's dig into PEAKDEFI Launchpad and what it stands for",
            link: "/about"
        },
        {
            title: "Tier System",
            text: "Get to know more about the IDO allocation system here",
            link: "/tier-system"
        },
        {
            title: "How To Stake",
            text: "Time for action! This guide enlights you on your blockchain investment path",
            link: "/allocation-staking"
        },

    ]);

    const [dataToShowParticipate, setDataToShowParticipate] = useState([]);

    return (<div className={classes.Info}>

        <div className={classes.infoBlocks}>
            {
                dataToShowInfo.map(data => {
                    return infoBlock(data, navigate)
                })
            }
        </div>

        <div className={classes.titleBlock} > How to Participate </div>

        <div className={classes.participateBlocks}>
            {
                dataToShowParticipate.map(data => {
                    return participateBlock(data, navigate)
                })
            }
        </div>

        <ErrorDialog show={showError} customMessage={customMessage} setError={setShowError} />
    </div>);
}

export default Info;