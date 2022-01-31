import axios from 'axios';

const idoLink = 'https://peakdefi-launchpad.herokuapp.com/';

export function getUpcomingIdos() {
    return axios.get(idoLink + '/upcoming-ido');
}