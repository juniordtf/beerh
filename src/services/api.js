import axios from 'axios';

const api = axios.create({baseURL: 'http://192.168.0.202:8001/v1'});

export default api;
