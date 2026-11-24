import axios from 'axios';
const PORT = import.meta.env.VITE_PORT;

// Creating Instance
const api = axios.create({
    baseURL: `http://localhost:${PORT}/api/v1`
    // headers: {
    //     "Content-Type": "application/json"
    // }
});


api.interceptors.request.use((config)=>{
   const token = localStorage.getItem('access_token');
   if(token) {
    config.headers.authorization = `Bearer ${token}`
   }

   return config;
});

export default api;