import axios from 'axios';

const idoLink = 'http://192.168.10.57:5000'

export function getIdos() {
    return axios.get(idoLink + '/ended-ido');
}