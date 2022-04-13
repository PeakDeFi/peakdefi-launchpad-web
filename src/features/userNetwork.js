import { createSlice } from "@reduxjs/toolkit";

export const NetworkSlice= createSlice({
    name: 'network',
    initialState: {
        network: {
            chainId: '0x39',
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
                name: 'Avalanche',
                symbol: 'BNB',
                decimals: 18
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com']
        }
    },
    networkId: 56,
    
    reducers: {
        setNetwork: (state, action)=>{
            return {...state, network: action.payload}
        },
        setNetworkId: (state, action)=>{
            return {...state, id: action.payload}
        },
    }
})

export const {setNetwork, setNetworkId} = NetworkSlice.actions;

export default NetworkSlice.reducer;