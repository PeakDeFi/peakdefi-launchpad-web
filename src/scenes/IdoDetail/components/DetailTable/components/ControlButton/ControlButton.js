import React from "react";
import classes from "./ControlButton.module.scss";

export function ControlButton(props) {
  return (
    <button
      data-tut={props.title}
      onClick={props.onClick}
      className={props.isActive ? classes.ActiveButton : classes.Button}
    >
      {" "}
      {props.text}{" "}
    </button>
  );
}
