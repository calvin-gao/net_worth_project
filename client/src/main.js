import { createApp} from 'vue';
import App from './App.vue';
// import HelloWorld from './components/HelloWorld.vue';
import HomePage from './components/HomePage/HomePage.vue';
import VueApexCharts from "vue3-apexcharts";
import { createRouter, createWebHistory } from 'vue-router';
import RegisterAccount from './components/Account/RegisterAccount.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/register', component: RegisterAccount}
    // { path: '/', component:  HelloWorld },
    // { path: '/about', component: About },
  ]
  
const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes, // short for `routes: routes`
})
let app = createApp(App);
console.log(app)
app.use(router).use(VueApexCharts).mount('#app')
// app.config.globalProperties.$runningSum = 0.0

