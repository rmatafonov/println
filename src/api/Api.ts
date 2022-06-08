import axios from 'axios';

export default axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2/',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true
});
