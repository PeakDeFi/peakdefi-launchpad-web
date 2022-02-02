import React, { useEffect, useState } from "react";
import classes from "./IDO.module.scss"
import TestImg from './test_img.svg'
import { IdoBlock } from './components/IdoBlock/IdoBlock'
import Table from "../Table/Table";
import { getUpcomingIdos } from "./API/upcomingIDOs";
import { useNavigate } from "react-router-dom";


const IDO = ({ props }) => {
    const [idos, setIdos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUpcomingIdos().then((response) => {
            setIdos(response.data.idos.map(
                e => {
                    return {
                        token: {
                            name: e.name,
                            symbol: e.symbol,
                            img: e.img_url,
                            price: e.ido_price
                        },
                        saleInfo: {
                            totalRaised: e.goal ?? 0,
                            raised: e.total_raised,
                            partisipants: e.participants,
                            start_date: e.sale_start ? new Date(e.sale_start) : null,
                            token_price: e.ido_price,
                            info: {
                                time_until_launch: null,
                                token_sold: e.token_sold,
                                token_distribution: e.token_distribution ?? 0,
                                sale_progres: 50
                            }
                        }
                    }
                }
            ))
        })
    }, []);


    return (<div style={{ marginBottom: "40px" }}>
        <div className={classes.menu}>
            <div
                onClick={() => { }}
                className={classes.menuElementActive}>
                Upcoming IDOs
                <div className={classes.line}></div>
            </div>
            <div
                onClick={() => {navigate('/sales')}}
                className={classes.menuElement}>
                Completed IDOs
                <div className={classes.clear}></div>
            </div>
        </div>


        <div className={classes.idos} >
            {
                idos.map((ido_data, index) => {
                    return <IdoBlock props={ido_data} key={"ido_data" + index}></IdoBlock>
                })
            }
        </div>

    </div>);
}

export default IDO;