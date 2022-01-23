import { configureStore } from '@reduxjs/toolkit'
import userWalletSlice from '../features/userWalletSlice'
import stakingSlice from '../features/stakingSlice'

export default configureStore({
    reducer: {
        userWallet: userWalletSlice,
        staking: stakingSlice
    },
  })