import axios from 'axios';

export function createIDO(idoData){
    return axios.post('https://peakdefi-launchpad.herokuapp.com/create-ido', idoData);
}
