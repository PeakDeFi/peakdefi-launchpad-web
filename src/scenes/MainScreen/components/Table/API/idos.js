import axios from 'axios';


export function getIdos() {
    return axios.get(process.env.REACT_APP_API_URL + 'projects');
}

export function getSingleIdo(id){
    return axios.get(process.env.REACT_APP_API_URL + 'projects/' + id)
}

export function getSingleIdoByName(name){
    return axios.get(process.env.REACT_APP_API_URL + '/projects/by-name/' + name)
}