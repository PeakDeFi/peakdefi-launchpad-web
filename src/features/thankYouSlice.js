import { createSlice } from "@reduxjs/toolkit";

export const thankYouSlice = createSlice({
    name: 'thankYouPage',
    initialState: {
        register: false,
        deposit: false,
        projectName: '',
        amount: 0
    },

    reducers: {
        setDeposit: (state, action) => {
            return {
                ...state,
                register: false,
                deposit: true,
                projectName: action.payload.projectName,
                amount: action.payload.amount
            }
        },

        setRegister: (state, action) => {
            return {
                ...state,
                register: true,
                deposit: false,
                projectName: action.payload.projectName
            }
        }
    }
})

export const { setDeposit, setRegister } = thankYouSlice.actions;

export default thankYouSlice.reducer;