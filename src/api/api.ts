import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://amazoon-backend.amazoonaustralia.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
