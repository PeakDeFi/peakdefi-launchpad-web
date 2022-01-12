import React from "react";
import classes from "./TableHeader.module.scss"


export function TableHeader(props) {
    return (
        <div className={classes.TableHeader} style={{minWidth: "1176px"}}>
            <div style={{width: "200px", minWidth: "200px", maxWidth: "200px"}} >Portion Id</div>
            <div style={{width: "140px", minWidth: "140px", maxWidth: "200px"}}>Vested %</div>
            <div style={{width: "120px", minWidth: "120px", maxWidth: "200px"}}>Amount</div>
            <div style={{width: "80px", minWidth: "80px", maxWidth: "200px"}}>Portion Unlock At</div>
            <div style={{width: "120px", minWidth: "120px", maxWidth: "200px"}}>Claim</div>
        </div>
    )
}