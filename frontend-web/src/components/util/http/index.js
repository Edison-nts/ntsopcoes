import axios from 'axios';

let baseURL = process.env[`REACT_APP_TS_API_URL`];

export const baseUrl = baseURL;

export const httpTsApi = axios.create({
  baseURL: baseURL,
});
