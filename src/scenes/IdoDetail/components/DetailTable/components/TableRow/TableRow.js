import React from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {toast} from 'react-toastify';

import classes from "./TableRow.module.scss"
import LinkImg from './link_img.svg'

export function TableRow(props) {
    return (
        <>
            <div className={classes.tableRow}>
                <div className={classes.text}> {props.text} </div>
                <div className={classes.info}>
                    {props.link && props.link.url !== "" ? renderLink(props.link) : props.info}
                    {!!props.link && props.link.url === "" && renderAddress(props.link)}
                </div>
            </div>
            <div className={props.showLine ? classes.line : classes.clear} />
        </>
    )
}

function renderLink(props) {
    return (<a className={classes.link} href={props.text}>
        <div className={classes.img} >
            <img alt="Link" src={LinkImg} />
        </div>
        <div className={props.isShortText ? classes.linkTextShort : classes.linkText}>
            {props.text}
        </div>
    </a>)
}

function renderAddress(props) {

    const copiedToClipboard = () => toast.info('Address copied to clipboard', {
        icon: ({ theme, type }) => <ContentCopyIcon style={{ color: 'rgb(53, 150, 216)' }} />,
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    console.log("props.text", props.text)

    return (<div className={classes.link} href={props.text}>
        <div style={{cursor: 'pointer'}} className={props.isShortText ? classes.linkTextShort : classes.linkText} onClick={() => {
                navigator.clipboard.writeText(props.text);
                copiedToClipboard();
            }}>
            {props.text === "0x" ? "0x..." : props.text.replace(props.text.substring(5, 38), "...")}
        </div>
    </div>)
}