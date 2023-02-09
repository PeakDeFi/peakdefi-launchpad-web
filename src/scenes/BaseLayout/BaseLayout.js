import React from "react";
import classes from "./BaseLayout.module.scss";
import Header from "../Header/Header.js";
import { Footer } from "../Footer/Footer";
import { Blockpass } from "../Header/Blockpass";
import useMainTour from "../../hooks/useMainTour/useMainTour";

const BaseLayour = ({ children }) => {
  const { openTour, currentStep } = useMainTour();

  return (
    <>
      <Blockpass />
      <div className={classes.BaseLayout}>
        <Header />
        <div className={classes.content}>{children}</div>
        <Footer />
        <div className={classes.tourTrigger} onClick={openTour}>
          {" "}
          tourussy{currentStep}
        </div>
      </div>
    </>
  );
};

export default BaseLayour;
