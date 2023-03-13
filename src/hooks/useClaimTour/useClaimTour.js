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
  prevStep,
  blockPreviousStep,
  unblockPreviousStep,
} from "../../features/claimTourSlice";

const useClaimTour = (isApproved) => {
  const dispatch = useDispatch();

  const goToNextStep = () => {
    dispatch(nextStep());
  };

  const goToPrevStep = () => {
    dispatch(prevStep());
  };

  const goToStep = (step) => {
    dispatch(setStep(step));
  };

  const globalIsApproved = useSelector(
    (state) => state.claimTourSlice.isApproved
  );

  useEffect(() => {
    dispatch(setIsApproved(isApproved));
  }, [isApproved]);

  const openTour = () => {
    goToStep(0);
    dispatch(globalStateOpenTour());
    unblockPropagation();
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
    (state) => state.claimTourSlice.isNextStepBlocked
  );

  const isPreviousStepBlocked = useSelector(
    (state) => state.claimTourSlice.isPreviousStepBlocked
  );

  const isTourOpen = useSelector((state) => state.claimTourSlice.isShowingTour);

  const currentStep = useSelector((state) => state.claimTourSlice.currentStep);

  const nextStepHandler = () => {
    goToNextStep();
  };

  const prevStepHandler = () => {
    goToPrevStep();
  };

  const blockReverse = () => {
    dispatch(blockPreviousStep());
  };

  const unblockReverse = () => {
    dispatch(unblockPreviousStep());
  };

  const tourSteps = [
    {
      selector: '[data-tut="your_allocations_control_button"]',
      mutationObservables: ['[data-tut="your_allocations_control_button"]'],
      highlightedSelectors: ['[data-tut="your_allocations_control_button"]'],
      resizeObservables: ['[data-tut="your_allocations_control_button"]'],
      content: "Click on the allocations tab to view all your allocations.",
      action: () => {
        blockPropagation();
        blockPreviousStep();
      },
    },
    {
      selector: '[data-tut="allocations-table"]',
      mutationObservables: ['[data-tut="allocations-table"]'],
      highlightedSelectors: ['[data-tut="allocations-table"]'],
      resizeObservables: ['[data-tut="allocations-table"]'],
      content: "Here you can see all your allocations.",
      action: () => {
        unblockPropagation();
        unblockPreviousStep();
      },
    },
    {
      selector: '[data-tut="claim-all-portions"]',
      mutationObservables: ['[data-tut="claim-all-portions"]'],
      highlightedSelectors: ['[data-tut="claim-all-portions"]'],
      resizeObservables: ['[data-tut="claim-all-portions"]'],
      content: "Click here to claim all available allocations.",
      action: () => {
        unblockPreviousStep();
        blockPropagation();
      },
    },
    {
      selector: ".Toastify__toast-container",
      content: "Wait until the claim transaction is completed.",
      mutationObservables: [".Toastify__toast-container"],
      highlightedSelectors: [".Toastify__toast-container"],
      resizeObservables: [".Toastify__toast-container"],
      action: () => {
        blockPropagation();
        blockPreviousStep();
      },
    },
    {
      selector: '[data-tut="allocations-table"]',
      mutationObservables: ['[data-tut="allocations-table"]'],
      highlightedSelectors: ['[data-tut="allocations-table"]'],
      resizeObservables: ['[data-tut="allocations-table"]'],
      content: "View status of all of your portions",
      action: () => {
        blockPreviousStep();
      },
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
    prevStepHandler,
    blockReverse,
    unblockReverse,
    isPreviousStepBlocked,
  };
};

export default useClaimTour;
