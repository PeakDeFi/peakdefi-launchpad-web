import axios from 'axios';

const idoLink = 'https://peakdefi-launchpad.herokuapp.com';

export function getIdos() {
    return axios.get(idoLink + '/projects');
}

export function getSingleIdo(id){
    return axios.get(idoLink + '/projects/' + id)
}