import axios from 'axios';

export function createIDO(idoData){
    return axios.post('https://peakdefi-launchpad.herokuapp.com/create-ido', idoData);
}

export function updateIDO(idoData, id){
    return axios.put('https://peakdefi-launchpad.herokuapp.com/update-ido/'+id, idoData);
}
