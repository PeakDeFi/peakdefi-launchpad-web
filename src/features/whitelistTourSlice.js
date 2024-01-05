import { createSlice } from "@reduxjs/toolkit";

export const whitelistTourSlice = createSlice({
  name: "whitelistTourSlice",
  initialState: {
    currentStep: 0,
    isShowingTour: false,
    isNextStepBlocked: false,
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
  blockPreviousStep,
  unblockPreviousStep,
} = whitelistTourSlice.actions;

export default whitelistTourSlice.reducer;
