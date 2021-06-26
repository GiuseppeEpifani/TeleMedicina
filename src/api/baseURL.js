import axios from 'axios';

const baseURL = 'http://54.227.176.51/api';
const teleMedicinaLogin = axios.create({ baseURL, headers: {['Content-Type']: 'application/json'} });

export default teleMedicinaLogin;