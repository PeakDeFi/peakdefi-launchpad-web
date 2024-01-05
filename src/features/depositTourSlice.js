import { createSlice } from "@reduxjs/toolkit";
import { boolean } from "yup/lib/locale";

export const depositTourSlice = createSlice({
  name: "depositTourSlice",
  initialState: {
    currentStep: 0,
    isShowingTour: false,
    isNextStepBlocked: false,
    isApproved: false,
    isPreviousStepBlocked: true,
  },

  reducers: {
    nextStep: (state, action) => {
      return { ...state, currentStep: state.currentStep + 1 };
    },
    prevStep: (state, action) => {
      return { ...state, currentStep: state.currentStep - 1 };
    },
    setStep: (state, action) => {
      return { ...state, currentStep: action.payload };
    },
    openTour: (state, action) => {
      return { ...state, isShowingTour: true };
    },
    closeTour: (state, action) => {
      return { ...state, isShowingTour: false };
    },
    blockNextStep: (state, action) => {
      return { ...state, isNextStepBlocked: true };
    },
    unblockNextStep: (state, action) => {
      return { ...state, isNextStepBlocked: false };
    },
    setIsApproved: (state, action) => {
      return { ...state, isApproved: action.payload };
    },
    blockPreviousStep: (state, action) => {
      return { ...state, isPreviousStepBlocked: true };
    },
    unblockPreviousStep: (state, action) => {
      return { ...state, isPreviousStepBlocked: false };
    },
  },
});

export const {
  nextStep,
  prevStep,
  setStep,
  openTour,
  closeTour,
  blockNextStep,
  unblockNextStep,
  setIsApproved,
  blockPreviousStep,
  unblockPreviousStep,
} = depositTourSlice.actions;

export default depositTourSlice.reducer;
