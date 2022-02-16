import axios from 'axios';

const KYC_LINK = `https://kyc.blockpass.org/kyc/1.0/connect/peak_5e82c/refId/`
let config = {
  headers: { 'Authorization': '99bb5e12ba69fcbd49430db6ad909864' }
}
export function getUserDataKYC(wallet){
    return axios.get(KYC_LINK+wallet, config);
}
