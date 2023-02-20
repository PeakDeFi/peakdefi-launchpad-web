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
import useTokenContract from "../useTokenContract/useTokenContract";

const useMainTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stakingContract } = useStakingContract();
  const { tokenContract } = useTokenContract();
  const { account } = useWeb3React();
  const [allowance, setAllowance] = useState(0);
  const balance = useSelector((state) => state.staking.balance);

  useEffect(() => {
    const handler = async () => {
      const res = await tokenContract.allowance(
        account,
        stakingContractAddress
      );

      setAllowance(parseInt(res.toString()));
    };
    if (tokenContract && account) handler();
  }, [account, tokenContract]);

  useEffect(() => {
    if (currentStep <= 2 && account) {
      goToStep(3);
    }
  }, [account]);

  const goToNextStep = () => {
    dispatch(nextStep());
  };
  const goToStep = (step) => {
    dispatch(setStep(step));
  };

  const openTour = () => {
    dispatch(globalStateOpenTour());
    if (account) {
      goToStep(3);
    } else {
      goToStep(0);
    }
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
      content:
        "Connect your wallet and select the Binance Smart Chain network.",
    },
    {
      selector: '[data-tut="select_provider"]',
      content: "Choose your favourite wallet provider.",
      mutationObservables: ['[data-tut="select_provider"]'],
      highlightedSelectors: ['[data-tut="select_provider"]'],
      resizeObservables: ['[data-tut="select_provider"]'],
    },
    {
      selector: ".walletconnect-qrcode__image",
      content: "Scan the QR from with your wallet app.",
      mutationObservables: [".walletconnect-qrcode__image"],
      highlightedSelectors: [".walletconnect-qrcode__image"],
    },
    {
      selector: '[data-tut="staking__input"]',
      content:
        "Enter the amount of PEAK tokens you would like to stake (to be able to get a guaranteed allocation for our IDOs, you need to stake at least 10,000 $PEAK)",
      highlightedSelectors: ['[data-tut="staking__input"]'],
      resizeObservables: ['[data-tut="staking__input"]'],
      action: () => {
        navigate("/allocation-staking");
      },
    },
    {
      selector: '[data-tut="stake_card_button"]',
      content: "Approve your entered amount of $PEAK.",
      mutationObservables: ['[data-tut="stake_card_button"]'],
      highlightedSelectors: ['[data-tut="stake_card_button"]'],
    },
    {
      selector: '[data-tut="stake_card_button"]',
      content: "Click the ‘Stake PEAK’ button to confirm.",
      observe: '[data-tut="stake_card_button"]',
      mutationObservables: ['[data-tut="stake_card_button"]'],
      highlightedSelectors: ['[data-tut="stake_card_button"]'],
      resizeObservables: ['[data-tut="stake_card_button"]'],
    },
    {
      selector: '[data-tut="stake_dialog"]',
      content:
        "Please be aware that your penalty fee will be reset. ( If you are staking for less than 8 weeks, you will have to pay a fee of 30%-5% of your PEAK tokens you wish to withdraw). Tick the box and click ‘Stake PEAK’ to proceed.",
      mutationObservables: ['[data-tut="stake_dialog"]'],
      highlightedSelectors: ['[data-tut="stake_dialog"]'],
      resizeObservables: ['[data-tut="stake_dialog"]'],
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: ".Toastify__toast-container",
      content:
        "Apprpve the transaction in your wallet (you need a small amount of BNB for transaction fees) and wait until the transaction is completed.",
      mutationObservables: [".Toastify__toast-container"],
      highlightedSelectors: [".Toastify__toast-container"],
      resizeObservables: [".Toastify__toast-containerƒ"],
      action: () => {
        blockPropagation();
      },
    },
    {
      selector: '[data-tut="KYC"]',
      content: "Start the KYC Verification process here.",
      mutationObservables: ['[data-tut="KYC"]'],
      highlightedSelectors: ['[data-tut="KYC"]'],
      resizeObservables: ['[data-tut="KYC"]'],
      action: () => {
        navigate("/");
      },
    },
    {
      selector: '[data-tut="projects_section"]',
      content: "Take a look at all upcoming projects.",
      mutationObservables: ['[data-tut="projects_section"]'],
      highlightedSelectors: ['[data-tut="projects_section"]'],
      resizeObservables: ['[data-tut="projects_section"]'],
      action: () => {
        unblockPropagation();
        navigate("/");
      },
    },
    {
      selector: '[data-tut="gitbook_section"]',
      content: (
        <>
          Have a look at our Gitbook to get more details on how to use our
          platform. (PLEASE REFER TO{" "}
          <a href={"https://documents.peakdefi.com"}>
            https://documents.peakdefi.com
          </a>
          )
        </>
      ),
      mutationObservables: ['[data-tut="gitbook_section"]'],
      highlightedSelectors: ['[data-tut="gitbook_section"]'],
      resizeObservables: ['[data-tut="gitbook_section"]'],
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
  };
};

export default useMainTour;
