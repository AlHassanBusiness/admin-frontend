import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://backend.amazoonaustralia.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
