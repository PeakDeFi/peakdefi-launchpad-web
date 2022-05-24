import axios from 'axios';

export function createIDO(idoData){
    return axios.post(process.env.REACT_APP_API_URL+'create-ido', idoData);
}

export function updateIDO(idoData, id){
    return axios.put(process.env.REACT_APP_API_URL + 'update-ido/'+id, idoData);
}

export function createIDODetail(idoData){
    return axios.post(process.env.REACT_APP_API_URL + 'project_detail_create', idoData);
}

export function updateIDODetail(idoData, id){
    return axios.put(process.env.REACT_APP_API_URL + 'project_detail_update/'+id, idoData);
}

export function createTokenDetail(idoData){
    return axios.post(process.env.REACT_APP_API_URL + 'token_detail_create', idoData);
}

export function updateTokenDetail(idoData, id){
    return axios.put(process.env.REACT_APP_API_URL + 'token_detail_update/'+id, idoData);
}

export function deleteIDO(id){
    return axios.delete(process.env.REACT_APP_API_URL+'delete-ido-all/'+id);
}

export function updateAllIDO(idoData, id){
    return axios.put(process.env.REACT_APP_API_URL + 'update-ido-all/'+id, idoData);
}

export function createAllIDO(idoData){
    return axios.put(process.env.REACT_APP_API_URL + 'create-ido-all', idoData);
}