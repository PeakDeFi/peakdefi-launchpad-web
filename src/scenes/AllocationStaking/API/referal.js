import axios from 'axios';

export const getReferees = (referrerAddress, params) => {
    return axios.get('https://peakstaging.herokuapp.com/' + 'referral-deposit-info/' + referrerAddress + '?' +
        'page=' + params.page + '&per-page' + params.perPage +
        (params.referrals.length > 0 ? '&referrals=' + params.referrals?.join() : '') +
        (!!params.dateFrom || !!params.dateTo ? '&timestamp=range:' + (params.dateFrom ?? 0) + ',' + (params.dateTo ?? Math.floor(Date.now() / 1000)) : '') +
        (params.comissionFrom>0 || params?.comissionTo>0 ? '&rewards-amount=range:' + (params.comissionFrom ?? 0) + ',' + (params.comissionTo ?? 100) : '')
    );
}