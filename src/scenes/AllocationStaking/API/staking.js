import axios from 'axios'

export const getPrice = () => {
    return axios.get(process.env.REACT_APP_API_URL + 'peak_defi_price');
}

//TO DO: replace hardcoded endpoint
export const addReferrer = (refereeAddress, referrerAddress) => {
    return axios.post(process.env.REACT_APP_API_URL + 'make-referral',
        {
            referrer_wallet: referrerAddress,
            referral_wallet: refereeAddress
        }
    )
}

export const getLeaderboardData = () =>{
    return axios.get(process.env.REACT_APP_API_URL+'leaderboard');
}

export const getReferrer = (wallet) =>{
    return axios.get(process.env.REACT_APP_API_URL+'find-my-referrer/'+wallet);
}