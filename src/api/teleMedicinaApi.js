import axios from 'axios';

const baseURL = 'la url de la api';
const teleMedicinaApi = axios.create({ baseURL });

export default teleMedicinaApi;