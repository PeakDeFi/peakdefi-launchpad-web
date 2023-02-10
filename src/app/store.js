import { configureStore } from "@reduxjs/toolkit";
import userWalletSlice from "../features/userWalletSlice";
import stakingSlice from "../features/stakingSlice";
import adminPageSlice from "../features/adminPageSlice";
import projectDetailsSlice from "../features/projectDetailsSlice";
import bgSlice from "../features/bgSlice";
import previewSlice from "../features/previewSlice";
import thankYouSlice from "../features/thankYouSlice";
import tourSlice from "../features/tourSlice";
import whitelistTourSlice from "../features/whitelistTourSlice";
import depositTourSlice from "../features/depositTourSlice";
import claimTourSlice from "../features/claimTourSlice";

export default configureStore({
  reducer: {
    userWallet: userWalletSlice,
    staking: stakingSlice,
    adminPage: adminPageSlice,
    projectDetails: projectDetailsSlice,
    bg: bgSlice,
    previewSlice: previewSlice,
    thankYouPage: thankYouSlice,
    tourSlice: tourSlice,
    whitelistTourSlice: whitelistTourSlice,
    depositTourSlice: depositTourSlice,
    claimTourSlice: claimTourSlice,
  },
});
