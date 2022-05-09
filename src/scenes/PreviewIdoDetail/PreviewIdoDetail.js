import React, { useEffect, useState } from "react";
import classes from './PreviewIdoDetail.module.scss'
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
import { getSingleIdo } from "../MainScreen/components/Table/API/idos";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBG } from "../../features/projectDetailsSlice";
import { useNavigate } from 'react-router-dom';


const PreviewIdoDetail = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const currentBg = useSelector(state=>state.projectDetails.bg_image);
    const testINfo = useSelector(state=>state.previewSlice.rawData)
    useEffect(()=>{
        console.log("🚀 ~ file: PreviewIdoDetail.js ~ line 31 ~ PreviewIdoDetail ~ testINfo", testINfo)
    }, [testINfo])

    return (<div className={classes.idoDetail} >
        <h2>TEST URL HERE</h2>
        <h2>{testINfo?.img_url}</h2>
    </div >);
}

export default PreviewIdoDetail

function participateBlock(props) {
    return (<div key={props.title} className={classes.participateBlock}>
        <div className={classes.imgBlock} >
            <img alt="" src={props.img} style={{ filter: props.date.getTime() < Date.now() ? 'grayscale(1)' : 'none' }} />

        </div>
        <div className={classes.title} > {props.title} </div>
        <div className={classes.text} > {props.text1} </div>
        <div className={classes.text} > {props.text2} </div>
        <div className={classes.text} > ({props.UTCTime} UTC)  </div>
    </div>)
}
