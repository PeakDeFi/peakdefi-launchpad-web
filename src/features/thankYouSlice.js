import { createSlice } from "@reduxjs/toolkit";

export const thankYouSlice = createSlice({
    name: 'thankYouPage',
    initialState: {
        register: false,
        deposit: false,
        staking: false,
        projectName: '',
        amount: 0
    },

    reducers: {
        setDeposit: (state, action) => {
            return {
                ...state,
                register: false,
                deposit: true,
                staking: false,
                projectName: action.payload.projectName,
                amount: action.payload.amount
            }
        },

        setRegister: (state, action) => {
            return {
                ...state,
                register: true,
                deposit: false,
                staking: false,
                projectName: action.payload.projectName
            }
        },

        setStaking: (state, action) => {
            return {
                ...state,
                register: false,
                deposit: false,
                staking: true,
                amount: action.payload
            }
        }
    }
})

export const { setDeposit, setRegister, setStaking } = thankYouSlice.actions;

export default thankYouSlice.reducer;