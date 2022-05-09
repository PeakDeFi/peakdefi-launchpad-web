import { createSlice } from "@reduxjs/toolkit";

export const previewSlice = createSlice({
    name: 'previewSlice',
    initialState: {
        rawData: {}
    },

    reducers: {
        setRawData: (state, action)=>{
            return {...state, rawData: action.payload}
        }
    }
})

export const {setRawData} = previewSlice.actions;

export default previewSlice.reducer;