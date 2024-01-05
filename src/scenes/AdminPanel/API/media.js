import axios from 'axios';

export function createMediaDetail(idoData, id){
    return axios.post(process.env.REACT_APP_API_URL + 'media_detail_create', idoData);
}
export function updateMediaDetail(idoData, id){
    return axios.put(process.env.REACT_APP_API_URL + 'media_detail_update/'+id, idoData);
}
export function deleteMediaDetail(id){
    return axios.delete(process.env.REACT_APP_API_URL + 'media_detail_delete/'+id);
}