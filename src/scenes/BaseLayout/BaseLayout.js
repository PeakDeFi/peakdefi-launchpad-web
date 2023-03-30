import React from "react";
import classes from "./BaseLayout.module.scss";
import Header from "../Header/Header.js";
import { Footer } from "../Footer/Footer";
import { Blockpass } from "../Header/Blockpass";
import useMainTour from "../../hooks/useMainTour/useMainTour";
import useWhitelistTour from "../../hooks/useWhitelistTour/useWhitelistTour";
import useDepositTour from "../../hooks/useDepositTour/useDepositTour";
import useClaimTour from "../../hooks/useClaimTour/useClaimTour";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import TourTrigger from "../Tours/components/ToursTrigger/ToursTrigger";

const BaseLayour = ({ children }) => {
  return (
    <>
      <Blockpass />
      <div className={classes.BaseLayout}>
        <Header />
        <div className={classes.content}>{children}</div>
        <Footer />
        <TourTrigger />
      </div>
    </>
  );
};

export default BaseLayour;
