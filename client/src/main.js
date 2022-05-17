import { createApp } from 'vue';
import App from './App.vue';
// import HelloWorld from './components/HelloWorld.vue';
import HomePage from './components/HomePage/HomePage.vue';
import VueApexCharts from "vue3-apexcharts";
import { createRouter, createWebHistory } from 'vue-router';
import RegisterAccount from './components/Account/RegisterAccount.vue';
import LoginAccount from './components/Account/LoginAccount.vue';
import { createPinia } from 'pinia';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const routes = [
    { path: '/', component: HomePage },
    { path: '/register', component: RegisterAccount},
    { path: '/login', component: LoginAccount},
    // { path: '/', component:  HelloWorld },
    // { path: '/about', component: About },
  ];
  
const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

const pinia = createPinia();

let app = createApp(App);
app.use(router)
.use(VueApexCharts)
.use(pinia)
.mount('#app');

// app.config.globalProperties.$runningSum = 0.0

