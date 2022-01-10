import { configureStore } from '@reduxjs/toolkit'
import userWalletSlice from '../features/userWalletSlice'

export default configureStore({
    reducer: {
        userWallet: userWalletSlice,
    },
  })