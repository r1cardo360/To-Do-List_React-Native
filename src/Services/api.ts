import axios from 'axios';

//https://jsonplaceholder.typicode.com/todos

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

export default api;
