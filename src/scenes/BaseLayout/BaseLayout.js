import React from "react";
import classes from "./BaseLayout.module.scss";
import Header from "../Header/Header.js";
import { Footer } from "../Footer/Footer";
import { Blockpass } from "../Header/Blockpass";
import useMainTour from "../../hooks/useMainTour/useMainTour";
import useWhitelistTour from "../../hooks/useWhitelistTour/useWhitelistTour";
import useDepositTour from "../../hooks/useDepositTour/useDepositTour";

const BaseLayour = ({ children }) => {
  //const { openTour } = useWhitelistTour();
  //const { openTour } = useMainTour();
  const { openTour } = useDepositTour();
  return (
    <>
      <Blockpass />
      <div className={classes.BaseLayout}>
        <Header />
        <div className={classes.content}>{children}</div>
        <Footer />
        <div className={classes.tourTrigger} onClick={openTour}>
          Take a tour
        </div>
      </div>
    </>
  );
};

export default BaseLayour;
