import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBG } from "../../../../../../features/projectDetailsSlice";
import classes from "./UpcomingIdoBlock.module.scss"
import InternetLogo from './resources/internet_logo.png'

function numberWithCommas(x) {
    if (!x)
        return 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function UpcomingIdoBlock({ props }) {
    const [seconds, setSeconds] = useState(typeof props.saleInfo?.time_until_launch === 'string' ? 0 : props.saleInfo?.time_until_launch ?? 0 );
    const dispatch = useDispatch();

    const [activeSection, setActiveSection] = useState(0);

    let timer;

    const navigate = useNavigate();

    const updateCount = () => {
        timer = !timer && setInterval(() => {
            setSeconds(prevCount => prevCount - 1) // new
        }, 1000)
    }

    useEffect(() => {
        updateCount()

        return () => clearInterval(timer)
    }, []);


    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className={classes.IdoBlock}>
            {
                !!props.blank_img &&
                <div className={classes.blankIDO} style={{backgroundImage : `url(${props.blank_img})`}}>
                    <h1>TBA</h1>
                </div>
            }

            {
                !props.blank_img &&
                <>
                    <header
                        onClick={() => {
                            if (props.id != 1) {
                                navigate('/project-details/' + props.token.name)
                            }
                        }}
                    >

                        <img className={classes.bgImage} src={props.bg_image} />

                        <div className={classes.tokenBlock}>
                            {tokenInfo(props.token)}
                        </div>
                    </header>

                    <main>
                        <div className={classes.saleInfo}>
                            <div className={classes.privateSaleFlag}>{props.is_private_sale ? 'Private sale': 'Public sale'}</div>
                            <div className={classes.mediaBar}>
                                <a href={props.website} target="_blank"><img src={InternetLogo} /></a>
                                <div className={classes.verticalSeparator}></div>
                                {props.socials.map(link =>
                                    <a href={link.url} target="_blank"><img src={link.logo_url} /></a>
                                )}
                            </div>

                            <div className={classes.navBar}>
                                <div
                                    className={activeSection === 0 ? classes.navItemActive : classes.navItem}
                                    onClick={() => {
                                        setActiveSection(0);
                                    }}
                                >
                                    Offering
                                </div>

                                <div
                                    className={activeSection === 1 ? classes.navItemActive : classes.navItem}
                                    onClick={() => {
                                        setActiveSection(1);
                                    }}
                                >
                                    Description
                                </div>
                            </div>


                            {activeSection === 0 && <div className={classes.offeringSection}>
                                <div>
                                    <h1>{props.token.name}</h1>
                                </div>

                                <div className={classes.textToShowBlock} >

                                    {textToShow(
                                        "Start Date", props.timeline.show_text ? props.timeline.sale_timeline_text : new Date(props.timeline.registration_start * 1000).toLocaleDateString('en-US', options)
                                    )}
                                </div>
                                <div className={classes.launchDetaid}>
                                    <div className={classes.block}>
                                        <div className={classes.subBlock}>
                                            <div className={classes.text}> Tokens sold: </div>
                                            <div className={classes.value}> TBA </div>
                                        </div>

                                        <div className={classes.subBlock}>
                                            <div className={classes.text}> Tokens for sale: </div>
                                            <div className={classes.value}> TBA </div>
                                        </div>
                                    </div>

                                </div>
                            </div>}

                            {activeSection === 1 && <>
                                <div className={classes.descriptionSection}>
                                    <h1>{props.token.name}</h1>
                                    <p>{props.short_description}</p>
                                </div>
                            </>}

                        </div>
                    </main>
                </>
            }

        </div>
    )
}

function tokenInfo(props) {
    return (
        <div className={classes.token}>
            <img alt={props.name} src={props.img} height={"80"} />
            {false && <div className={classes.text}>
                <div className={classes.name}> {props.name} </div>
            </div>}
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
