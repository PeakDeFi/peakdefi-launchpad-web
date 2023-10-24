import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./StakingButtonPopover.module.scss";

const StakingButtonPopover = ({ children }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsPopoverOpen(false);
    });
  }, []);

  return (
    <div className={classes.anchorContainer}>
      <div
        onClick={(e) => {
          //important because above i'm listening to body's onclick to close the popover
          e.stopPropagation();
          setIsPopoverOpen(!isPopoverOpen);
        }}
      >
        {children}
      </div>

      {isPopoverOpen && (
        <div className={classes.popoverContainer}>
          <button
            onClick={() => {
              navigate("/allocation-staking");
            }}
          >
            Staking V2
          </button>
          <button
            onClick={() => {
              navigate("/allocation-staking-v3");
            }}
          >
            Staking V3
          </button>
        </div>
      )}
    </div>
  );
};

export default StakingButtonPopover;
