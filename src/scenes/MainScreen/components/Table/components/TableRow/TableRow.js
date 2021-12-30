import React from "react"
import classes from "./TableRow.module.scss"

export function TableRow(props) {
    return (
        <div className={classes.TableRow} style={{minWidth: "1176px", background:props.color}}>
            <div className={classes.infoBlock} style={{ width: "200px", minWidth: "200px", maxWidth: "200px" }} >
                <img alt={props.name} src={props.img} />
                <div className={classes.info}>
                    <div className={classes.name}>
                        {props.name}
                    </div>
                    <div className={classes.symbol}>
                        {props.symbol}
                    </div>
                </div>
            </div>
            <div className={classes.divUpdate} style={{width: "140px", minWidth: "140px", maxWidth: "200px"}}> {props.idoPrice} </div>
            <div className={classes.divUpdate} style={{width: "120px", minWidth: "120px", maxWidth: "200px"}}> {props.currentPrice} </div>
            <div className={classes.divUpdate} style={{ width: "80px", minWidth: "80px", maxWidth: "200px" }}>{props.ath }</div>
            <div className={classes.divUpdate} style={{ width: "120px", minWidth: "120px", maxWidth: "200px" }}>{ props.roi }</div>
            <div className={classes.divUpdate} style={{ width: "150px", minWidth: "150px", maxWidth: "200px" }}>{ props.partisipants }</div>
            <div className={classes.divUpdate} style={{ width: "130px", minWidth: "130px", maxWidth: "200px" }}>{ props.totalRaised } </div>
            <div className={classes.divUpdate} style={{width: "150px", minWidth: "150px", maxWidth: "200px"}}> {props.totalTokenSold} </div>
            <div className={classes.divUpdate} style={{width: "120px", minWidth: "120px", maxWidth: "200px"}}> {props.endAt} </div>
        </div>
    )
}