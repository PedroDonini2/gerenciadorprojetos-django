import axios from "axios";

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
 baseURL: API_BASE_URL,
 withCredentials: true,
});


api.interceptors.request.use((config) => {
    const method = config.method ? config.method.toUpperCase() : '';
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        const csrfToken = getCookie('csrftoken');
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


// Função auxiliar para obter cookies
function getCookie(name) {
 let cookieValue = null;
 if (document.cookie && document.cookie !== '') {
 const cookies = document.cookie.split(';');
 for (let i = 0; i < cookies.length; i++) {
 const cookie = cookies[i].trim();
 if (cookie.substring(0, name.length + 1) === (name + '=')) {
 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
 break;
 }
 }
 }
 return cookieValue;
}

export default api;