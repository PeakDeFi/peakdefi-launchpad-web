import axios from 'axios';
import { API_LINK } from '../../../consts/api';

export function createIDO(idoData){
    return axios.post(API_LINK+'/create-ido', idoData);
}

export function updateIDO(idoData, id){
    return axios.put(API_LINK + '/update-ido/'+id, idoData);
}

export function createIDODetail(idoData){
    return axios.post(API_LINK + '/project_detail_create', idoData);
}

export function updateIDODetail(idoData, id){
    return axios.put(API_LINK + '/project_detail_update/'+id, idoData);
}

export function createTokenDetail(idoData){
    return axios.post(API_LINK + '/token_detail_create', idoData);
}

export function updateTokenDetail(idoData, id){
    return axios.put(API_LINK + '/token_detail_update/'+id, idoData);
}