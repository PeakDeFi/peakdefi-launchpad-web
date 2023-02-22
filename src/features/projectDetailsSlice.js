import { createSlice } from "@reduxjs/toolkit";

export const projectDetailsSlice = createSlice({
  name: "projectDetails",
  initialState: {
    bg_image: "",
    saleStatus: "",
  },

  reducers: {
    setBG: (state, action) => {
      return { ...state, bg_image: action.payload };
    },
    setSaleStatus: (state, action) => {
      return { ...state, saleStatus: action.payload };
    },
  },
});

export const { setBG, setSaleStatus } = projectDetailsSlice.actions;

export default projectDetailsSlice.reducer;
