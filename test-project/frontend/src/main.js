import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { useAuthStore } from './stores/authStore';
import axios from 'axios';

import App from './App.vue'
import router from './router'

const app = createApp(App);
const pinia = createPinia();

app.use(router);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

const authStore = useAuthStore();
authStore.initializeAuth(); // Gjenopprett bruker hvis token finnes


axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status && error.response.status === 401) {
            console.log("Session expired. Redirecting to login...");
            sessionStorage.removeItem("token");
            router.push("/login");
        }
        return Promise.reject(error);
    }
);



app.mount('#app');
