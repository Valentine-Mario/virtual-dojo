import { API_URL } from './config';
import axios from 'axios';

export const REG_REQ = (query, data) => {
    return axios.post(`${API_URL}/${query}`, data)
                .then(res => {
                    return res;
                })
                .catch(error => {
                    return error;
                })
}

export const LOG_REQ = (query, data) => {
    return axios.post(`${API_URL}/${query}`, data)
                .then(res => {
                    return res;
                })
                .catch(error => {
                    return error;
                })
}