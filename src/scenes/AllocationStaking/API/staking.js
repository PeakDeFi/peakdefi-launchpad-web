import axios from 'axios'

export const getPrice= ()=>{
    return axios.get('https://peakdefi-launchpad.herokuapp.com/' + '/peak_defi_price');
}