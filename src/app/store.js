import { configureStore } from '@reduxjs/toolkit'
import userWalletSlice from '../features/userWalletSlice'
import stakingSlice from '../features/stakingSlice'
import adminPageSlice from '../features/adminPageSlice'

export default configureStore({
    reducer: {
        userWallet: userWalletSlice,
        staking: stakingSlice,
        adminPage: adminPageSlice
    },
  })