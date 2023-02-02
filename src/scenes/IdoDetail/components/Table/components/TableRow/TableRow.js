import React, { useEffect, useState } from "react";
import classes from "./TableRow.module.scss";
import { Button } from "../../../ControlButton/ControlButton";

function timeLeft(seconds) {
  let timeString = "";
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  if (d > 0) {
    return d + " days, " + h + " h, " + m + " mins";
  } else if (h > 0) {
    return h + " hours " + m + " minutes";
  } else if (m > 0 || s > 0) {
    return m + ":" + s;
  } else {
    return "Unlocked";
  }
}

const TableRow = (props, onClick) => {
  const [secondsLeft, setSecondsLeft] = useState(
    props.portion - Math.round(Date.now() / 1000)
  );
  const [buttonActive, setButtonActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.TableRow} style={{ background: props.color }}>
      <div
        className={classes.divUpdate}
        style={{ width: "15%", minWidth: "100px" }}
      >
        {" "}
        {props.id + 1}{" "}
      </div>
      <div
        className={classes.divUpdate}
        style={{ width: "15%", minWidth: "100px" }}
      >
        {" "}
        {props.vested}{" "}
      </div>
      <div
        className={classes.divUpdate}
        style={{ width: "20%", minWidth: "100px" }}
      >
        {" "}
        {props.amount}{" "}
      </div>
      <div
        className={classes.divUpdate}
        style={{ width: "30%", minWidth: "80px" }}
      >
        {timeLeft(secondsLeft)}
      </div>
      <div
        className={classes.divUpdate}
        style={{ width: "20%", minWidth: "100px" }}
      >
        {/* <Button onClick={() => { props.onClick(props.id); setButtonActive(false) }} isActive={buttonActive} text="Claim" /> */}
        <h2 className={buttonActive ? classes.claimability : classes.claimed}>
          {buttonActive ? "Claimable" : "Claimed"}{" "}
        </h2>
      </div>
    </div>
  );
};

export default TableRow;
