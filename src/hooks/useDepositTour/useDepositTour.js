import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  nextStep,
  setStep,
  openTour as globalStateOpenTour,
  closeTour as globalStateCloseTour,
  blockNextStep,
  unblockNextStep,
  setIsApproved,
} from "../../features/depositTourSlice";

const useDepositTour = (isApproved) => {
  const dispatch = useDispatch();

  const goToNextStep = () => {
    dispatch(nextStep());
  };
  const goToStep = (step) => {
    dispatch(setStep(step));
  };

  const globalIsApproved = useSelector(
    (state) => state.depositTourSlice.isApproved
  );

  useEffect(() => {
    dispatch(setIsApproved(isApproved));
  }, [isApproved]);

  const openTour = () => {
    goToStep(0);
    dispatch(globalStateOpenTour());
  };

  const amountIsApproved = () => {
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
    (state) => state.depositTourSlice.isNextStepBlocked
  );

  const isTourOpen = useSelector(
    (state) => state.depositTourSlice.isShowingTour
  );

  const currentStep = useSelector(
    (state) => state.depositTourSlice.currentStep
  );

  const nextStepHandler = () => {
    debugger;
    if (currentStep === 0 && globalIsApproved) {
      goToStep(2);
    } else {
      goToNextStep();
    }
  };

  const tourSteps = [
    {
      selector: '[data-tut="ido-deposit-input"]',
      mutationObservables: ['[data-tut="ido-deposit-input"]'],
      highlightedSelectors: ['[data-tut="ido-deposit-input"]'],
      resizeObservables: ['[data-tut="ido-deposit-input"]'],
      content: "Enter the amount you'd like to deposit",
    },
    {
      selector: '[data-tut="deposit-approve-button"]',
      content: "Click this button to approve the transaction for this ammount",
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: '[data-tut="ido-deposit-button"]',
      mutationObservables: ['[data-tut="ido-deposit-button"]'],
      highlightedSelectors: ['[data-tut="ido-deposit-button"]'],
      resizeObservables: ['[data-tut="ido-deposit-button"]'],
      content: "Click this button to deposit the amount you just entered",
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: ".Toastify__toast-container",
      content: "Wait untill whitelisting transaction completes",
      mutationObservables: [".Toastify__toast-container"],
      highlightedSelectors: [".Toastify__toast-container"],
      resizeObservables: [".Toastify__toast-container"],
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: '[data-tut="all-ido-inputs"]',
      content: "View the sum you just deposited",
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
    amountIsApproved,
  };
};

export default useDepositTour;
