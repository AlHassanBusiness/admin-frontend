import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://backend.amazoonaustralia.com',
    // baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
