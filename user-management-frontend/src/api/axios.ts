import axios from 'axios';

// Creating Instance
const api = axios.create({
    baseURL: "http://localhost:8000/api/v1"
    // headers: {
    //     "Content-Type": "application/json"
    // }
});

export default api;