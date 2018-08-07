import { API_URL } from './config';

export const fetchPost = (query, data) => {
    return fetch(`${API_URL}/${query}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                "Content-Type": "application/json"
                }
            }).then((res) => {
                return res;
            }, (err) => {
                return err;
            })
}

export const fetchGet = (query) => {
    return fetch(`${API_URL}/${query}`)
            .then(res => res.json())
}