import axios from 'axios';

export function createTimelinetail(idoData){
    return axios.post(process.env.REACT_APP_API_URL + 'timeline_detail_create', idoData);
}
export function updateTimelinetail(idoData, id){
    return axios.put(process.env.REACT_APP_API_URL + 'timeline_detail_update/'+id, idoData);
}