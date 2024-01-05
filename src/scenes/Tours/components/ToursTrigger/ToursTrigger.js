import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useClaimTour from "../../../../hooks/useClaimTour/useClaimTour";
import useDepositTour from "../../../../hooks/useDepositTour/useDepositTour";
import useMainTour from "../../../../hooks/useMainTour/useMainTour";
import useWhitelistTour from "../../../../hooks/useWhitelistTour/useWhitelistTour";
import classes from "./ToursTrigger.module.scss";

const TourTrigger = () => {
  const location = useLocation();
  const currentSaleStatus = useSelector(
    (state) => state.projectDetails.saleStatus
  );
  const { openTour } = useMainTour();
  const { openTour: openWhitelistTour } = useWhitelistTour();
  const { openTour: openDepositTour } = useDepositTour();
  const { openTour: openClaimTour } = useClaimTour();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isWhitelistTourAvailable =
    location.pathname.includes("project-details") &&
    currentSaleStatus === "whitelist";
  const isDepositTourAvailable =
    location.pathname.includes("project-details") &&
    currentSaleStatus === "deposit";
  const isClaimTourAvailable =
    location.pathname.includes("project-details") &&
    currentSaleStatus === "claim";
  return (
    <div
      className={isMenuOpen ? classes.clickedTourTrigger : classes.tourTrigger}
      onClick={handleOpenMenu}
    >
      <div className={classes.label}>Take a tour</div>
      <div className={classes.toursMenu}>
        <button className={classes.tourItem} onClick={openTour}>
          Staking Tour
        </button>
        <button
          className={classes.tourItem}
          onClick={openWhitelistTour}
          disabled={!isWhitelistTourAvailable}
        >
          Whitelist Tour
        </button>
        <button
          className={classes.tourItem}
          onClick={openDepositTour}
          disabled={!isDepositTourAvailable}
        >
          Deposit Tour
        </button>
        <button
          className={classes.tourItem}
          onClick={openClaimTour}
          disabled={!isClaimTourAvailable}
        >
          Claim Tour
        </button>
      </div>
    </div>
  );
};

export default TourTrigger;
