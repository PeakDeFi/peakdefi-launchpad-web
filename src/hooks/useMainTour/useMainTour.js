import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
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
} from "../../features/tourSlice";
import { stakingContractAddress } from "../../scenes/AllocationStaking/services/consts";
import useStakingContract from "../useStakingContract/useStakingContract";

const useMainTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stakingContract } = useStakingContract();
  const { account } = useWeb3React();
  const [allowance, setAllowance] = useState(0);
  const balance = useSelector((state) => state.staking.balance);

  useEffect(() => {
    const handler = async () => {
      const res = await stakingContract.allowance(
        account,
        stakingContractAddress
      );

      setAllowance(parseInt(res.toString()));
    };
    if (stakingContract && account) handler();
  }, [account, stakingContract]);

  const goToNextStep = () => {
    dispatch(nextStep());
  };
  const goToStep = (step) => {
    dispatch(setStep(step));
  };

  const openTour = () => {
    dispatch(globalStateOpenTour());
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
    (state) => state.tourSlice.isNextStepBlocked
  );

  const isTourOpen = useSelector((state) => state.tourSlice.isShowingTour);

  const currentStep = useSelector((state) => state.tourSlice.currentStep);

  const nextStepHandler = () => {
    if (currentStep === 3) {
      if (allowance > balance) {
        goToStep(5);
      } else {
        goToNextStep();
      }
    } else {
      goToNextStep();
    }
  };

  const tourSteps = [
    {
      selector: '[data-tut="connect_button"]',
      content: "Connect wallet",
    },
    {
      selector: '[data-tut="select_provider"]',
      content: "Choose your wallet provider",
      mutationObservables: ['[data-tut="select_provider"]'],
      highlightedSelectors: ['[data-tut="select_provider"]'],
    },
    {
      selector: ".walletconnect-qrcode__image",
      content: "Scan QR Code",
      mutationObservables: [".walletconnect-qrcode__image"],
      highlightedSelectors: [".walletconnect-qrcode__image"],
    },
    {
      selector: '[data-tut="staking__input"]',
      content:
        "Enter the amount you would like to deposit(to make a good progress stake at least a 1000 PEAK tokens)",
      observe: '[data-tut="staking__input"]',
      mutationObservables: ['[data-tut="staking__input"]'],
      highlightedSelectors: ['[data-tut="staking__input"]'],
      resizeObservables: ['[data-tut="staking__input"]'],
      action: () => {
        navigate("/allocation-staking");
      },
    },
    {
      selector: '[data-tut="stake_card_button"]',
      content: "Approve entered amount",
      mutationObservables: ['[data-tut="stake_card_button"]'],
      highlightedSelectors: ['[data-tut="stake_card_button"]'],
    },
    {
      selector: '[data-tut="stake_card_button"]',
      content: "Deposit tokens",
      observe: '[data-tut="stake_card_button"]',
      mutationObservables: ['[data-tut="stake_card_button"]'],
      highlightedSelectors: ['[data-tut="stake_card_button"]'],
      resizeObservables: ['[data-tut="stake_card_button"]'],
    },
    {
      selector: '[data-tut="stake_dialog"]',
      content: "Deposit tokens",
      mutationObservables: ['[data-tut="stake_dialog"]'],
      highlightedSelectors: ['[data-tut="stake_dialog"]'],
      resizeObservables: ['[data-tut="stake_dialog"]'],
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: '[data-tut="projects_section"]',
      content: "Take a look at our upcoming projects",
      mutationObservables: ['[data-tut="projects_section"]'],
      highlightedSelectors: ['[data-tut="projects_section"]'],
      resizeObservables: ['[data-tut="projects_section"]'],
      action: () => {
        navigate('/');
      },
    },
    {
        selector: '[data-tut="gitbook_section"]',
        content: "Download our amazing book",
        mutationObservables: ['[data-tut="gitbook_section"]'],
        highlightedSelectors: ['[data-tut="gitbook_section"]'],
        resizeObservables: ['[data-tut="gitbook_section"]'],
    }
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
  };
};

export default useMainTour;