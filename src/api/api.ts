import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://backend-production-a652.up.railway.app',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})
