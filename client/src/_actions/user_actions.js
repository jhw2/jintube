import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER, SERVER_URL } from '../components/Config.js';

export const registerUser = (dataToSubmit)=>{
    const request = axios.post(`${SERVER_URL}${USER_SERVER}/register`,dataToSubmit, { withCredentials: true })
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const loginUser = (dataToSubmit)=>{
    const request = axios.post(`${SERVER_URL}${USER_SERVER}/login`,dataToSubmit, { withCredentials: true })
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const auth = ()=>{
    const request = axios.get(`${SERVER_URL}${USER_SERVER}/auth`, { withCredentials: true })
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export const logoutUser = ()=>{
    const request = axios.get(`${SERVER_URL}${USER_SERVER}/logout`, { withCredentials: true })
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

