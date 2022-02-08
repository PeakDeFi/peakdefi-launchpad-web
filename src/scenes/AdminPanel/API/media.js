import axios from 'axios';
import { API_LINK } from '../../../consts/api';

export function createMediaDetail(idoData, id){
    return axios.post(API_LINK + '/media_detail_create', idoData);
}
export function updateMediaDetail(idoData, id){
    return axios.put(API_LINK + '/media_detail_update/'+id, idoData);
}
export function deleteMediaDetail(id){
    return axios.delete(API_LINK + '/media_detail_delete/'+id);
}