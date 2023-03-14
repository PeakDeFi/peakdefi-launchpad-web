import { current } from "@reduxjs/toolkit";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
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
  blockPreviousStep,
  unblockPreviousStep,
  prevStep,
} from "../../features/tourSlice";
import { stakingContractAddress } from "../../scenes/AllocationStaking/services/consts";
import { getUserDataKYC } from "../../scenes/Header/API/blockpass";
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
  const [isPending, setIsPending] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  useEffect(() => {
    const handler = async () => {
      const res = await tokenContract.allowance(
        account,
        stakingContractAddress
      );

      setAllowance(parseInt(res.toString()));
    };
    if (tokenContract && account) handler();
  }, [account, tokenContract, stakingContractAddress]);

  const decimals = useSelector((state) => state.userWallet.decimal);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (account === undefined) return;

    const handler = async () => {
      if (balance / 10 ** decimals < 10000) {
        //if balance is lower than 1000 PEAK do not let user pass KYC verification
        setShowVerify(false);
        return;
      }

      try {
        await getUserDataKYC(account)
          .then((response) => {
            if (response.data.data.status === "approved") {
              setShowVerify(false);
            } else {
              setIsPending(true);
              setShowVerify(true);
            }
          })
          .catch((error) => {
            setIsPending(false);
            setShowVerify(true);
          });
      } catch (error) {
        setShowVerify(true);
      }
    };

    handler();
  }, [account, balance]);

  useEffect(() => {
    if (currentStep <= 2 && account) {
      goToStep(3);
    }
  }, [account]);

  const goToNextStep = () => {
    dispatch(nextStep());
  };

  const goToErrorFallbackStep = () => {};

  const goToPrevStep = () => {
    dispatch(prevStep());
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

  const blockReverse = () => {
    dispatch(blockPreviousStep());
  };

  const unblockReverse = () => {
    dispatch(unblockPreviousStep());
  };

  const isPreviousStepBlocked = useSelector(
    (state) => state.tourSlice.isPreviousStepBlocked
  );

  const isNextStepBlocked = useSelector(
    (state) => state.tourSlice.isNextStepBlocked
  );

  const isTourOpen = useSelector((state) => state.tourSlice.isShowingTour);

  const currentStep = useSelector((state) => state.tourSlice.currentStep);
  const [localCurrentStep, setLocalCurrentStep] = useState(0);
  useEffect(() => {
    setLocalCurrentStep(currentStep);
  }, [currentStep]);

  useEffect(() => {
    console.log(
      "🚀 ~ file: useMainTour.js:150 ~ useMainTour ~ localCurrentStep:",
      localCurrentStep
    );
  }, [localCurrentStep]);

  const nextStepHandler = () => {
    console.log(localCurrentStep);
    if (localCurrentStep === 3) {
      if (allowance > balance) {
        goToStep(6);
      } else {
        goToNextStep();
      }
    } else if (localCurrentStep === 8) {
      goToStep(10);
    } else {
      goToNextStep();
    }
  };

  const prevStepHandler = () => {
    if (!isPreviousStepBlocked) {
      if (currentStep === 6) {
        goToStep(3);
      } else if (currentStep === 10) {
        goToStep(8);
      } else {
        goToPrevStep();
      }
    }
  };

  const tourSteps = [
    {
      selector: '[data-tut="connect_button"]',
      content:
        "Connect your wallet and select the Binance Smart Chain network. If you are using Metamask, make sure that your wallet is unlocked.",
    },
    {
      selector: '[data-tut="select_provider"]',
      content: "Choose your wallet provider.",
      mutationObservables: ['[data-tut="select_provider"]'],
      highlightedSelectors: ['[data-tut="select_provider"]'],
      resizeObservables: ['[data-tut="select_provider"]'],
    },
    {
      selector: ".walletconnect-qrcode__image",
      content: "Scan the QR code with your wallet app.",
      mutationObservables: [".walletconnect-qrcode__image"],
      highlightedSelectors: [".walletconnect-qrcode__image"],
    },
    {
      selector: '[data-tut="staking__input"]',
      content:
        "Enter the amount of PEAK tokens you would like to stake (to be able to get a guaranteed allocation for our IDOs, you need to stake at least 10,000 $PEAK).",
      highlightedSelectors: ['[data-tut="staking__input"]'],
      resizeObservables: ['[data-tut="staking__input"]'],
      action: () => {
        blockReverse();
        navigate("/allocation-staking");
      },
    },
    {
      selector: '[data-tut="stake_card_button"]',
      content: "Approve your entered amount of $PEAK.",
      mutationObservables: ['[data-tut="stake_card_button"]'],
      highlightedSelectors: ['[data-tut="stake_card_button"]'],
      action: () => {
        unblockReverse();
      },
    },
    {
      selector: ".Toastify__toast-container",
      content:
        "Approve the transaction in your wallet (you need a small amount of BNB for transaction fees) and wait until the transaction is completed. ",
      mutationObservables: [".Toastify__toast-container"],
      highlightedSelectors: [".Toastify__toast-container"],
      resizeObservables: [".Toastify__toast-containerƒ"],
      action: () => {
        blockPropagation();
        blockReverse();
      },
    },
    {
      selector: '[data-tut="stake_card_button"]',
      content: "Click the ‘Stake PEAK’ button to confirm.",
      observe: '[data-tut="stake_card_button"]',
      mutationObservables: ['[data-tut="stake_card_button"]'],
      highlightedSelectors: ['[data-tut="stake_card_button"]'],
      resizeObservables: ['[data-tut="stake_card_button"]'],
      action: () => {
        blockPropagation();
        unblockReverse();
      },
    },
    {
      selector: '[data-tut="stake_dialog"]',
      mutationObservables: ['[data-tut="stake_dialog"]'],
      highlightedSelectors: ['[data-tut="stake_dialog"]'],
      content: (
        <>
          Please be aware that your penalty fee will be reset. For more
          information, refer to{" "}
          <a href={"https://documents.peakdefi.com"}>
            https://documents.peakdefi.com
          </a>
          ). Tick the box and click ‘Stake PEAK’ to proceed.)
        </>
      ),
      resizeObservables: ['[data-tut="stake_dialog"]'],
      action: () => {
        blockReverse();
        blockPropagation();
      },
    },
    {
      selector: ".Toastify__toast-container",
      content:
        "Approve the transaction in your wallet (you need a small amount of BNB for transaction fees) and wait until the transaction is completed. ",
      mutationObservables: [".Toastify__toast-container"],
      highlightedSelectors: [".Toastify__toast-container"],
      resizeObservables: [".Toastify__toast-containerƒ"],
      action: () => {
        blockPropagation();
        blockReverse();
      },
    },
    {
      selector: ".Toastify__toast-container",
      content:
        "Seems like something went wrong. You can restart the tour later and complete the transaction",
      mutationObservables: [".Toastify__toast-container"],
      highlightedSelectors: [".Toastify__toast-container"],
      resizeObservables: [".Toastify__toast-containerƒ"],
      action: () => {
        blockReverse();
        unblockPropagation();
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
        if (!showVerify || isPending) {
          unblockPropagation();
        }
        blockReverse();
      },
    },
    {
      selector: '[data-tut="projects_section"]',
      content: "Take a look at all upcoming and ongoing IDOs.",
      mutationObservables: ['[data-tut="projects_section"]'],
      highlightedSelectors: ['[data-tut="projects_section"]'],
      resizeObservables: ['[data-tut="projects_section"]'],
      action: () => {
        unblockPropagation();
        unblockReverse();
        navigate("/");
      },
    },
    {
      selector: '[data-tut="gitbook_section"]',
      content: (
        <>
          Have a look at our Gitbook to get more details on how to use our
          platform.
          <b>
            (PLEASE REFER TO{" "}
            <a href={"https://documents.peakdefi.com"}>
              https://documents.peakdefi.com
            </a>
            )
          </b>
        </>
      ),
      action: () => {
        unblockReverse();
      },
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
    isPreviousStepBlocked,
    prevStepHandler,
  };
};

export default useMainTour;
