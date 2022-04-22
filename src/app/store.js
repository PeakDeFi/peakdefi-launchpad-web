import { configureStore } from '@reduxjs/toolkit'
import userWalletSlice from '../features/userWalletSlice'
import stakingSlice from '../features/stakingSlice'
import adminPageSlice from '../features/adminPageSlice'
import projectDetailsSlice from '../features/projectDetailsSlice'
import bgSlice from '../features/bgSlice'

export default configureStore({
    reducer: {
        userWallet: userWalletSlice,
        staking: stakingSlice,
        adminPage: adminPageSlice,
        projectDetails: projectDetailsSlice,
        bg: bgSlice
    },
  })