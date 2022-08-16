import axios from 'axios';

export const praktikumApi = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2/',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true
});

export const appApi = axios.create({
  withCredentials: true
})
