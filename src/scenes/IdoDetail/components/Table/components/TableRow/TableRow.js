import React from "react"
import classes from "./TableRow.module.scss"
import {Button} from "../../../ControlButton/ControlButton"

export function TableRow(props, onClick) {
    return (
        // { id: 0, vested: "30%", amount: "????", portion: "Some data"}
        <div className={classes.TableRow} style={{minWidth: "1176px", background:props.color}}>
            <div className={classes.divUpdate} style={{width: "200px", minWidth: "200px", maxWidth: "200px"}}> {props.id} </div>
            <div className={classes.divUpdate} style={{width: "140px", minWidth: "140px", maxWidth: "200px"}}> {props.vested} </div>
            <div className={classes.divUpdate} style={{width: "120px", minWidth: "120px", maxWidth: "200px"}}> {props.amount} </div>
            <div className={classes.divUpdate} style={{ width: "80px", minWidth: "80px", maxWidth: "200px" }}>{props.portion }</div>
            <div className={classes.divUpdate} style={{ width: "120px", minWidth: "120px", maxWidth: "200px" }}>
                <Button onClick={() => {props.onClick(props.id)}} isActive={true} text="Claime" />
            </div>
        </div>
    )
}