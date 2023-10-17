import { Switch } from "@mui/material";
import { useSelectStakingVersion } from "hooks/useSelectStakingVersion/useSelectStakingVersion";
import classes from "./StakingVersionSwitch.module.scss";

const StakingVersionSwitch = () => {
  const { stakingVersion, switchToStakingV2, switchToStakingV1 } =
    useSelectStakingVersion();

  return (
    <div className={classes.switchContainer}>
      <h1 className={stakingVersion === 1 ? classes.selectedVersion : ""}>
        Staking V1
      </h1>
      <Switch
        checked={stakingVersion === 2}
        onChange={(e) => {
          if (e.target.checked) {
            switchToStakingV2();
          } else {
            switchToStakingV1();
          }
        }}
      />
      <h1 className={stakingVersion === 2 ? classes.selectedVersion : ""}>
        Staking V2
      </h1>
    </div>
  );
};

export default StakingVersionSwitch;
