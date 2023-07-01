import axios from 'axios';

const api = axios.create({baseURL: 'http://192.168.1.134:8001/v1'});

export default api;
