import { useEffect } from "react";
import { useState } from "react";

export const useSelectStakingVersion = () => {
  const [stakingVersion, setStakingVersion] = useState(
    parseInt(localStorage.getItem("stakingVersion") ?? 1)
  );

  useEffect(() => {
    const storageData = localStorage.getItem("stakingVersion");
    if (storageData) {
      setStakingVersion(parseInt(storageData));
    } else {
      localStorage.setItem("stakingVersion", 1);
      window.dispatchEvent(new Event("storage"));
    }

    const storageListener = (e) => {
      const storageData = localStorage.getItem("stakingVersion");

      if (storageData) setStakingVersion(parseInt(storageData));
    };

    window.addEventListener("storage", storageListener);

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  const toggleStakingVersion = () => {
    if (stakingVersion === 1) {
      switchToStakingVersion(2);
    } else {
      switchToStakingVersion(1);
    }
  };

  const switchToStakingVersion = (version) => {
    //setStakingVersion(version);
    localStorage.setItem("stakingVersion", version);
    window.dispatchEvent(new Event("storage"));
  };

  const switchToStakingV1 = () => {
    switchToStakingVersion(1);
  };

  const switchToStakingV2 = () => {
    switchToStakingVersion(2);
  };

  return {
    stakingVersion,
    toggleStakingVersion,
    switchToStakingV1,
    switchToStakingV2,
  };
};
