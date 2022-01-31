import { createSlice } from "@reduxjs/toolkit";

export const userWalletSlice = createSlice({
    name: 'wallet',
    initialState: {
        address: null,
        balance: 1,
        decimal: 1
    }, 

    reducers: {
        setAddress: (state, action)=> {
            if(action.payload===undefined)
                return {...state, address: null}
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