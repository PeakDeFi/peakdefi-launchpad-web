import { CircularProgress, Switch } from "@mui/material";
import { useSelectStakingVersion } from "hooks/useSelectStakingVersion/useSelectStakingVersion";
import { useEffect } from "react";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./StakingVersionSwitch.module.scss";

const StakingVersionSwitch = () => {
  const { stakingVersion, switchToStakingV2, switchToStakingV1 } =
    useSelectStakingVersion();

  const [isDisabled, setIsDisabled] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDisabled(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
      setIsDisabled(true);
    };
  }, [location]);

  const navigate = useNavigate();

  return (
    <div className={classes.switchContainer}>
      <h1 className={stakingVersion === 1 ? classes.selectedVersion : ""}>
        Staking V2
      </h1>
      {!isDisabled && (
        <Switch
          checked={stakingVersion === 2}
          onChange={(e) => {
            if (e.target.checked) {
              navigate("/allocation-staking-v3");
            } else {
              navigate("/allocation-staking");
            }
          }}
          disabled={isDisabled}
        />
      )}

      {isDisabled && <CircularProgress size={'1.5rem'} />}

      <h1 className={stakingVersion === 2 ? classes.selectedVersion : ""}>
        Staking V3
      </h1>
    </div>
  );
};

export default StakingVersionSwitch;
