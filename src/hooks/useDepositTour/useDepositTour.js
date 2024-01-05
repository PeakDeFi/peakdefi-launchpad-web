import { useEffect } from "react";
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
  setIsApproved,
  blockPreviousStep,
  unblockPreviousStep,
  prevStep,
} from "../../features/depositTourSlice";

const useDepositTour = (isApproved) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const blockReverse = () => {
    dispatch(blockPreviousStep());
  };

  const unblockReverse = () => {
    dispatch(unblockPreviousStep());
  };

  const isNextStepBlocked = useSelector(
    (state) => state.depositTourSlice.isNextStepBlocked
  );

  const isPreviousStepBlocked = useSelector(
    (state) => state.depositTourSlice.isPreviousStepBlocked
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
    } else if (currentStep === 5) {
      navigate(-1);
    } else {
      goToNextStep();
    }
  };

  const tourSteps = [
    {
      selector: '[data-tut="all-ido-inputs"]',
      mutationObservables: ['[data-tut="all-ido-inputs"]'],
      highlightedSelectors: ['[data-tut="all-ido-inputs"]'],
      resizeObservables: ['[data-tut="all-ido-inputs"]'],
      content: "Enter the amount of $USDT you would like to deposit.",
    },
    {
      selector: '[data-tut="deposit-approve-button"]',
      content:
        "Click this button twice to approve and deposit the $USDT amount you just entered.",
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: '[data-tut="ido-deposit-button"]',
      mutationObservables: ['[data-tut="ido-deposit-button"]'],
      highlightedSelectors: ['[data-tut="ido-deposit-button"]'],
      resizeObservables: ['[data-tut="ido-deposit-button"]'],
      content:
        "Click this button twice to approve and deposit the $USDT amount you just entered.",
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: ".Toastify__toast-container",
      content: "Wait until the transaction is completed.",
      mutationObservables: [".Toastify__toast-container"],
      highlightedSelectors: [".Toastify__toast-container"],
      resizeObservables: [".Toastify__toast-container"],
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: ".Toastify__toast-container",
      content: "Something went wrong. Please try again later",
      mutationObservables: [".Toastify__toast-container"],
      highlightedSelectors: [".Toastify__toast-container"],
      resizeObservables: [".Toastify__toast-container"],
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: '[data-tut="success-deposit-screen"]',
      mutationObservables: ['[data-tut="success-deposit-screen"]'],
      highlightedSelectors: ['[data-tut="success-deposit-screen"]'],
      resizeObservables: ['[data-tut="success-deposit-screen"]'],
      content:
        "You have successfully deposited tokens, click next to return to project details page and view the sum you deposited",
      action: () => {
        unblockPropagation();
      },
    },
    {
      selector: '[data-tut="all-ido-inputs"]',
      content: "View the sum you just deposited.",
    },
  ];

  const goToPrevStep = () => {
    dispatch(prevStep());
  };

  const prevStepHandler = () => {
    goToPrevStep();
  };

  return {
    goToNextStep,
    goToStep,
    goToPrevStep,
    currentStep,
    tourSteps,
    closeTour,
    openTour,
    isTourOpen,
    blockPropagation,
    unblockPropagation,
    blockReverse,
    unblockReverse,
    isNextStepBlocked,
    isPreviousStepBlocked,
    nextStepHandler,
    amountIsApproved,
    prevStepHandler,
  };
};

export default useDepositTour;
