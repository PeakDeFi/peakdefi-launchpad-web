import axios from "axios";

export function create_subscription(email){
    //to do: replace hardcoded api link
    return axios.post('https://api.peakdefi.com/make_subscribe', {email: email});
}