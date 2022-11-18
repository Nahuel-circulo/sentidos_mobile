import axios from 'axios';

export const payloadAPI = axios.create({ baseURL: 'https://payloadback-production.up.railway.app/api' })