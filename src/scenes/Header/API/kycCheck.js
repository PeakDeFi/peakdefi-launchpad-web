import axios from 'axios'

import { API_LINK } from "../../../consts/api";

export function showKyc() {
    return axios.get(API_LINK + '/show_kyc', { withCredentials: true });
}

export function markKyc() {
    return axios.get(API_LINK + '/mark_kyc');
}

export function markKycError() {
    return axios.get(API_LINK + '/mark_kyc_error');
}

export function register(walletAddress) {
    
    return axios.post(
        API_LINK + '/register',
        {
            wallet: walletAddress
        },

        {
            withCredentials: true
        }
    );
}