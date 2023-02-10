import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  nextStep,
  setStep,
  openTour as globalStateOpenTour,
  closeTour as globalStateCloseTour,
  blockNextStep,
  unblockNextStep,
} from "../../features/whitelistTourSlice";
import { stakingContractAddress } from "../../scenes/AllocationStaking/services/consts";
import useStakingContract from "../useStakingContract/useStakingContract";
import useTokenContract from "../useTokenContract/useTokenContract";

const useWhitelistTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stakingContract } = useStakingContract();
  const { tokenContract } = useTokenContract();
  const { account } = useWeb3React();
  const [allowance, setAllowance] = useState(0);
  const balance = useSelector((state) => state.staking.balance);

  const goToNextStep = () => {
    dispatch(nextStep());
  };
  const goToStep = (step) => {
    dispatch(setStep(step));
  };

  const openTour = () => {
    dispatch(globalStateOpenTour());
  };

  const setUserIsRegistered = () => {
    goToStep(2);
  };

  const closeTour = () => {
    dispatch(globalStateCloseTour());
  };

  const blockPropagation = () => {
    dispatch(blockNextStep());
  };

  const unblockPropagation = () => {
    dispatch(unblockNextStep());
  };

  const isNextStepBlocked = useSelector(
    (state) => state.whitelistTourSlice.isNextStepBlocked
  );

  const isTourOpen = useSelector(
    (state) => state.whitelistTourSlice.isShowingTour
  );

  const currentStep = useSelector(
    (state) => state.whitelistTourSlice.currentStep
  );

  const nextStepHandler = () => {
    goToNextStep();
  };

  const tourSteps = [
    {
      selector: '[data-tut="whlitelist_button"]',
      content: "Get started by whitelisting for this sale",
    },
    {
      selector: ".Toastify__toast-container",
      content: "Wait untill whitelisting transaction completes",
      mutationObservables: [".Toastify__toast-container"],
      highlightedSelectors: [".Toastify__toast-container"],
      resizeObservables: [".Toastify__toast-containerƒ"],
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: '[data-tut="whlitelist_button"]',
      content:
        "You have been successfully whitelisted, now wait for sale start and deposit your tokens",
    },
  ];

  return {
    goToNextStep,
    goToStep,
    currentStep,
    tourSteps,
    closeTour,
    openTour,
    isTourOpen,
    blockPropagation,
    unblockPropagation,
    isNextStepBlocked,
    nextStepHandler,
    setUserIsRegistered,
  };
};

export default useWhitelistTour;
