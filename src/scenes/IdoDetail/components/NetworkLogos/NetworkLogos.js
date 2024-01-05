import classes from "./NetworkLogos.module.scss";
import polygonLogo from "./assets/polygon.svg";
import bscLogo from "./assets/binance.svg";

const NetworkLogos = ({ network }) => {
  const logos = {
    bsc: bscLogo,
    polygon: polygonLogo,
  };

  return <img src={logos[network]} className={classes.NetworkLogo}></img>;
};

export default NetworkLogos;
