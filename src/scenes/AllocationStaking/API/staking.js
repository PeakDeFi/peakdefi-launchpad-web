import axios from 'axios'

export const getPrice = () => {
    return axios.get(process.env.REACT_APP_API_URL + 'peak_defi_price');
}

//TO DO: replace hardcoded endpoint
export const addReferrer = (refereeAddress, referrerAddress) => {
    return axios.post('https://api.peakdefi.com/make-referral',
        {
            referrer_wallet: referrerAddress,
            referral_wallet: refereeAddress
        }
    )
}