import classes from "./NetworkInfoSection.module.scss";
import polygonLogo from "./assets/polygon.svg";

const NetfowrkInfoSection = ({ network }) => {
  const logos = {
    polygon: polygonLogo,
  };

  return (
    <div className={classes.NetfowrkInfoSection}>
      <div className={classes.dottedBorderTop}></div>
      <h1>Distribution network</h1>
      <img src={logos[network]} />
      <div className={classes.dottedBorderBottom}></div>
    </div>
  );
};

export default NetfowrkInfoSection;
