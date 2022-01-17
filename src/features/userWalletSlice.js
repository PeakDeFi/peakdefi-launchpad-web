import { createSlice } from "@reduxjs/toolkit";

export const userWalletSlice = createSlice({
    name: 'wallet',
    initialState: {
        address: '0xf87AC318CA1F048D178c1E6B4067786C54DbEf4f',
        balance: 0,
        decimal: 1
    }, 

    reducers: {
        setAddress: (state, action)=> {
            if(action.payload===undefined)
                return {...state, address: '0xf87AC318CA1F048D178c1E6B4067786C54DbEf4f'}
            return {...state, address: action.payload}
        },

        setBalance: (state, action)=>{
            return {...state, balance: action.payload}
        },

        setDecimal: (state, action)=> {
            return {...state, decimal: action.payload}
        }
        
    },
});

export const {setAddress, setBalance, setDecimal} = userWalletSlice.actions;

export const selectAddress = state=> state.userWallet.address;

export default userWalletSlice.reducer;