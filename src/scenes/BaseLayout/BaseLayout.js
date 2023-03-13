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

const BaseLayour = ({ children }) => {
  const location = useLocation();
  const currentSaleStatus = useSelector(
    (state) => state.projectDetails.saleStatus
  );
  const { openTour } = useMainTour();
  const { openTour: openWhitelistTour } = useWhitelistTour();
  const { openTour: openDepositTour } = useDepositTour();
  const { openTour: openClaimTour } = useClaimTour();

  const handleTourClick = () => {
    if (location.pathname.includes("project-details")) {
      if (currentSaleStatus === "whitelist") {
        openWhitelistTour();
      } else if (currentSaleStatus === "deposit") {
        openDepositTour();
      } else if (currentSaleStatus === "claim") {
        openClaimTour();
      }
    } else {
      openTour();
    }
  };
  return (
    <>
      <Blockpass />
      <div className={classes.BaseLayout}>
        <Header />
        <div className={classes.content}>{children}</div>
        <Footer />
        <div className={classes.tourTrigger} onClick={handleTourClick}>
          Take a tour
        </div>
      </div>
    </>
  );
};

export default BaseLayour;
