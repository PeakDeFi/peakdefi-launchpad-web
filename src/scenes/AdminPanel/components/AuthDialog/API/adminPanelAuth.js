import axios from "axios";
import { API_LINK } from "../../../../../consts/api";

export function login(data){
    return axios.post(API_LINK+'/login', data);
}

export function signUp(data){
    return axios.post(API_LINK+'/register', data)
}

export function logout(){
    return axios.get(API_LINK+'/logout');
}