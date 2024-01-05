import { createSlice } from "@reduxjs/toolkit";

export const bgSlice= createSlice({
    name: 'bg',
    initialState: {
        short: false,
        superShort: false
    },

    reducers: {
        setShort: (state, action)=>{
            return {...state, short: action.payload}
        },
        
        setSuperShort: (state, action)=>{
            return {...state, superShort: action.payload}
        }
    }
});

export const {setShort, setSuperShort} = bgSlice.actions;

export default bgSlice.reducer;