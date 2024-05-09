import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./OngoingIdo.module.scss";
import { useDispatch } from "react-redux";
import { setBG } from "../../../../../../features/projectDetailsSlice";
import { SALE_ABI } from "../../../../../../consts/abi";
import { ethers } from "ethers";
import { RpcProvider } from "../../../../../../consts/rpc";

function numberWithCommas(x) {
  if (!x) return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeToDate(time) {
  let date = new Date(time * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
}

function timeLeft(seconds) {
  let timeString = "";
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  if (d > 0) {
    return d + " days " + h + "hours";
  } else if (h > 0) {
    return h + " hours " + m + " minutes";
  } else if (m > 0 || s > 0) {
    return m + ":" + s;
  } else {
    return "Launched";
  }
}

function numFormatter(num) {
  num = parseInt(num);
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + "k"; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}

function priceToFormatedPrice(price) {
  return "$" + price?.toFixed(3);
}

export function OngoingIdo({ props }) {
  const [seconds, setSeconds] = useState(
    typeof props.saleInfo.time_until_launch === "string"
      ? 0
      : props.saleInfo.time_until_launch
  );
  let timer;

  const [totalBUSDRaised, setTotalBUSDRaised] = useState(0);
  const [saleProgress, setSaleProgress] = useState(0);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        setSeconds((prevCount) => prevCount - 1); // new
      }, 1000);
  };

  function get_token_sold() {
    let calculated_token = props.token.total_raise
      ? Math.ceil(props.token.total_raise)
      : Math.ceil(totalBUSDRaised);
    if (calculated_token > props.saleInfo.info.token_distribution) {
      return props.saleInfo.info.token_distribution;
    }
    return calculated_token;
  }

  const updateSaleData = async () => {
    const { ethereum } = window;
    try {
      const providerr = new ethers.providers.JsonRpcProvider(RpcProvider);

      const saleContract = new ethers.Contract(
        props.sale_contract_address,
        SALE_ABI,
        providerr
      );
      const sale = await saleContract.sale();

      setTotalBUSDRaised(sale.totalBUSDRaised / 10 ** 18);
    } catch (error) {
      setTotalBUSDRaised(parseInt(0));
    }
  };

  useEffect(() => {
    setSaleProgress(
      totalBUSDRaised /
        ((props.token.token_distribution * props.token.price) / 100)
    );
  }, [totalBUSDRaised]);

  useEffect(() => {
    updateCount();
    updateSaleData();

    // return () => clearInterval(timer)
  }, []);

  const start_date = props.saleInfo.start_date
    ? ("0" + props.saleInfo.start_date.getDate()).slice(-2) +
      "." +
      ("0" + (props.saleInfo.start_date.getMonth() + 1)).slice(-2) +
      "." +
      props.saleInfo.start_date.getFullYear()
    : "";

  return (
    <div
      className={classes.IdoBlock}
      style={{ cursor: props.id === -1 ? "default" : "pointer" }}
      onClick={() => {
        if (props.id === -1) return;

        navigate("/project-details/" + props.title.toLowerCase());
        dispatch(setBG(props.bg_image));
      }}
    >
      <header>
        <img className={classes.bgImage} src={props.token.img} />

        <div className={classes.tokenBlock}>{tokenInfo(props.token)}</div>
      </header>

      <main>
        <div className={classes.privateSaleFlag}>
          {props.token.name == "EYWA"
            ? "KOL Sale"
            : props.token.name == "Another-1"
            ? "Pre-sale"
            : props.is_private_sale
            ? "Private Sale"
            : "Public Sale"}
        </div>
        <div className={classes.saleInfo}>
          {totalRaised(
            props.saleInfo,
            totalBUSDRaised,
            props.token,
            props.title
          )}
          <div className={classes.textToShowBlock}>
            {/*textToShow("Participants", props.saleInfo.partisipants)*/}
            {textToShow("Sale Begin", start_date)}
            {textToShow(
              "Token Price",
              isNaN(props.saleInfo.sale_price)
                ? "TBA"
                : priceToFormatedPrice(props.saleInfo.sale_price)
            )}
          </div>
        </div>

        <div className={classes.verticalSeparator}></div>

        <div className={classes.details}>
          <div className={classes.launchDetaid}>
            <div className={classes.block}>
              {/* <div className={classes.subBlock}>
                                <div className={classes.text}> Time until Launch </div>
                                <div style={{ marginTop: "10px" }} className={classes.value}> {timeLeft(seconds)}</div>
                            </div> */}

              <div className={classes.subBlock}>
                <div className={classes.text}> Tokens sold: </div>
                <div className={classes.value}>
                  {" "}
                  {numFormatter(totalBUSDRaised / props.token.price)}{" "}
                </div>
              </div>
              <div className={classes.subBlock}>
                <div className={classes.text}> Sale Progress </div>
                <div style={{ marginTop: "10px" }} className={classes.value}>
                  {" "}
                  {Math.round(saleProgress)}%
                </div>
              </div>
            </div>
            <div className={classes.block}>
              <div className={classes.subBlock}>
                <div className={classes.text}> Tokens for Sale:</div>
                <div className={classes.value}>
                  {" "}
                  {numFormatter(props.saleInfo.info.token_distribution)}{" "}
                </div>
              </div>

              {/* <div className={classes.subBlock}>
                                <div className={classes.text}> Sale Progress </div>
                                <div style={{ marginTop: "10px" }} className={classes.value}> {Math.round(saleProgress)}%</div>

                            </div> */}
            </div>
          </div>

          {progressBar(saleProgress)}
        </div>
      </main>
    </div>
  );
}

function tokenInfo(props) {
  return <div className={classes.token}></div>;
}

function totalRaised(props, totalBUSDRaised, token, title) {
  return (
    <div className={classes.totalRaised}>
      <div className={classes.title}>{title}</div>
      <div className={classes.text}>Total raised</div>
      <div className={classes.count}>
        ${numberWithCommas(Math.round(totalBUSDRaised))}/$
        {numberWithCommas(
          Math.round(props.sale_price * props.info.token_distribution)
        )}
      </div>
    </div>
  );
}

function textToShow(text, value) {
  return (
    <div className={classes.textToShow}>
      <div className={classes.text}>{text}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
}

function progressBar(saleProgress) {
  return (
    <div className={classes.progressBar}>
      <div className={classes.backPart}></div>
      <div
        style={{ width: `${saleProgress}%` }}
        className={classes.topPart}
      ></div>
    </div>
  );
}
