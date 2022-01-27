import axios from 'axios';
import { API_LINK } from '../../../consts/api';

export function createIDO(idoData){
    return axios.post(API_LINK+'/create-ido', idoData);
}

export function updateIDO(idoData, id){
    return axios.put(API_LINK + '/update-ido/'+id, idoData);
}
