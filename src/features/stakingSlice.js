import { createSlice } from "@reduxjs/toolkit";

export const stakingSlice = createSlice({
  name: "staking",
  initialState: {
    balance: 0,
    decimals: 18,
  },

  reducers: {
    setBalance: (state, action) => {
      return { ...state, balance: action.payload };
    },

    setDecimals: (state, action) => {
      return { ...state, decimals: action.payload };
    },
  },
});

export const { setBalance, setDecimals } = stakingSlice.actions;

export default stakingSlice.reducer;
