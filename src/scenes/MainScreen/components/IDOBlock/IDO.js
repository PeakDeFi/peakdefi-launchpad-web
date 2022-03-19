import React, { useEffect, useState } from "react";
import classes from "./IDO.module.scss"
import TestImg from './test_img.svg'
import { IdoBlock } from './components/IdoBlock/IdoBlock'
import { OngoingIdo } from './components/OngoingIdo/OngoingIdo';
import Table from "../Table/Table";
import { getUpcomingIdos } from "./API/upcomingIDOs";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";


const IDO = ({ props }) => {
    const [idos, setIdos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [upcomingIdos, setUpcomingIdos] = useState([]);
    const [endedIdos, setEndedIdos] = useState([]);
    const [ongoingIdos, setOngoingIdos] = useState([]);
    const navigate = useNavigate();
    const [displayIndex, setDisplayIndex] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        getUpcomingIdos().then((response) => {
            setIsLoading(false);
            setUpcomingIdos(response.data.ongoing.map(
                e => {

                    return {
                        id: e.id,
                        token: {
                            name: e.token.name,
                            symbol: e.token.symbol,
                            img: e.logo_url,
                            price: parseFloat(e.token.current_token_price)
                        },
                        saleInfo: {
                            totalRaised: e.target_raised,
                            raised: parseFloat(e.token.total_raise).toFixed(2),
                            partisipants: e.number_of_participants,
                            start_date: new Date(e.timeline.sale_start * 1000),
                            token_price: e.current_price,
                            time_until_launch: e.time_until_launch,
                            end_date: e.timeline.sale_ends,

                            info: {
                                time_until_launch: null,
                                token_sold: Math.round(parseFloat(e.token.total_tokens_sold)),
                                token_distribution: e.token.token_distribution,
                                sale_progres: e.percent_raised
                            }
                        },
                        bg_image: e.project_detail.project_bg,
                        timeline: e.timeline
                    }
                }
            ));

            setEndedIdos(response.data.ended.map(
                e => {
                    return {
                        id: e.id,
                        token: {
                            name: e.token.name,
                            symbol: e.token.symbol,
                            img: e.logo_url,
                            price: parseFloat(e.token.current_token_price)
                        },
                        saleInfo: {
                            totalRaised: e.target_raised,
                            raised: parseFloat(e.token.total_raise).toFixed(2),
                            partisipants: e.number_of_participants,
                            start_date: new Date(e.timeline.sale_start * 1000),
                            token_price: e.current_price,
                            time_until_launch: e.time_until_launch,
                            end_date: e.timeline.sale_ends,

                            info: {
                                time_until_launch: null,
                                token_sold: Math.round(parseFloat(e.token.total_tokens_sold)),
                                token_distribution: e.token.token_distribution,
                                sale_progres: e.percent_raised
                            }
                        },
                        bg_image: e.project_detail.project_bg,
                        timeline: e.timeline
                    }
                }
            ));

            setOngoingIdos(response.data.upcoming.map(
                e => {
                    return {
                        id: e.id,
                        token: {
                            name: e.token.name,
                            symbol: e.token.symbol,
                            img: e.logo_url,
                            price: parseFloat(e.token.current_token_price)
                        },
                        saleInfo: {
                            totalRaised: e.target_raised,
                            raised: parseFloat(e.token.total_raise).toFixed(2),
                            partisipants: e.number_of_participants,
                            start_date: new Date(e.timeline.sale_start * 1000),
                            token_price: e.current_price,
                            time_until_launch: e.time_until_launch,
                            end_date: e.timeline.sale_ends,

                            info: {
                                time_until_launch: null,
                                token_sold: Math.round(parseFloat(e.token.total_tokens_sold)),
                                token_distribution: e.token.token_distribution,
                                sale_progres: e.percent_raised
                            }
                        },
                        bg_image: e.project_detail.project_bg,
                        timeline: e.timeline
                    }
                }
            ));

            setIdos(response.data.upcoming.map(
                e => {
                    return {
                        id: e.id,
                        token: {
                            name: e.token.name,
                            symbol: e.token.symbol,
                            img: e.logo_url,
                            price: parseFloat(e.token.current_token_price)
                        },
                        saleInfo: {
                            totalRaised: e.target_raised,
                            raised: parseFloat(e.token.total_raise).toFixed(2),
                            partisipants: e.number_of_participants,
                            start_date: new Date(e.timeline.sale_start * 1000),
                            token_price: e.current_price,
                            time_until_launch: e.time_until_launch,
                            end_date: e.timeline.sale_ends,

                            info: {
                                time_until_launch: null,
                                token_sold: Math.round(parseFloat(e.token.total_tokens_sold)),
                                token_distribution: e.token.token_distribution,
                                sale_progres: e.percent_raised
                            }
                        },
                        bg_image: e.project_detail.project_bg,
                        timeline: e.timeline
                    }
                }
            ));


        })
    }, []);


    return (<div style={{ marginBottom: "40px" }}>

        <div className={classes.ongoing}>
            <h1 className={classes.title}>Ongoing Sales</h1>

            <div className={classes.ongoingIdos}>
                {
                    ongoingIdos.length === 0 &&
                    <div className={classes.emptyArrays}>
                        {isLoading && <CircularProgress color="inherit" />}
                        {!isLoading && <p>No IDOs to display</p>}
                    </div>
                }
                {
                    ongoingIdos.map((ido_data, index) => {
                        if (window.screen.width <= 1000) {
                            return <IdoBlock props={ido_data} key={"ido_data" + index}></IdoBlock>
                        }

                        return <OngoingIdo props={ido_data} key={"ido_data" + index}></OngoingIdo>
                    })
                }
            </div>
        </div>

        <div className={classes.menu}>
            <div
                onClick={() => { setDisplayIndex(0); setIdos([...upcomingIdos]) }}
                className={displayIndex === 0 ? classes.menuElementActive : classes.menuElement}>
                Upcoming IDOs
                <div className={displayIndex === 0 ? classes.line : classes.clear}></div>
            </div>
            <div
                onClick={() => { setDisplayIndex(1); setIdos([...endedIdos]) }}
                className={displayIndex === 1 ? classes.menuElementActive : classes.menuElement}>
                Completed IDOs
                <div className={displayIndex === 1 ? classes.line : classes.clear}></div>
            </div>
        </div>



        <div className={classes.idos} style={{ justifyContent: idos.length === 1 ? 'flex-start !important' : 'space-between' }}>
            {
                idos.length === 0 &&
                <div className={classes.emptyArrays}>
                    {isLoading && <CircularProgress color="inherit" />}
                    {!isLoading && <p>No IDOs to display</p>}
                </div>
            }

            {
                idos.map((ido_data, index) => {
                    return <IdoBlock props={ido_data} key={"ido_data" + index}></IdoBlock>
                })
            }
        </div>

    </div>);
}

export default IDO;