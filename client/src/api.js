import { API_URL } from './config';
import axios from 'axios';

export const REQ_POST = (query, data) => {
    return axios.post(`${API_URL}/${query}`, data)
                .then(res => {
                    return res;
                })
                .catch(error => {
                    return error;
                })
}

export const REQ_GET = (query) => {
    return axios.get(`${API_URL}/${query}`)
                .then(res => {
                    return res;
                })
                .catch(error => {
                    return error;
                })
}