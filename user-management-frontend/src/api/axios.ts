import axios from 'axios';
const PORT = import.meta.env.VITE_PORT;

// Creating Instance
const api = axios.create({
    baseURL: `http://localhost:${PORT}/api/v1`
    // headers: {
    //     "Content-Type": "application/json"
    // }
});

export default api;