import React from "react";
import classes from "./TableHeader.module.scss"


export function TableHeader(props) {
    return (
        <div className={classes.TableHeader} style={{maxWidth: '100%', minWidth: "1000px"}}>
            <div style={{width: '14%'}} >Project Name</div>
            <div style={{width: '10%'}}>IDO Token Price</div>
            <div style={{width: '9%'}}>Current Price</div>
            <div style={{width: '9%'}}>ATH</div>
            <div style={{width: '9%'}}>ATH IDO ROI</div>
            <div style={{width: '12%'}}>No. Participants</div>
            <div style={{width: '12%'}}>Total Raised</div>
            <div style={{width: '12%'}}>Total Tokens Sold</div>
            <div style={{width: '13%'}}>Sale Ended At</div>
        </div>
    )
}