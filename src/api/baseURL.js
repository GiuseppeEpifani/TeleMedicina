import axios from 'axios';
import { URL } from '../const/Url';

const baseURL = `${URL}/api`;
const teleMedicinaLogin = axios.create({ baseURL, headers: {['Content-Type']: 'application/json'} });

export default teleMedicinaLogin;