import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export const registerUser = (dataToSubmit)=>{
    const request = axios.post(`http://localhost:5000/api/users/register`,dataToSubmit, { withCredentials: true })
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export const loginUser = (dataToSubmit)=>{
    const request = axios.post(`http://localhost:5000/api/users/login`,dataToSubmit, { withCredentials: true })
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export const auth = ()=>{
    const request = axios.get(`http://localhost:5000/api/users/auth`, { withCredentials: true })
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export const logoutUser = ()=>{
    const request = axios.get(`http://localhost:5000/api/users/logout`, { withCredentials: true })
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

