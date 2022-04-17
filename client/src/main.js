import { createApp } from 'vue';
import App from './App.vue';
// import HelloWorld from './components/HelloWorld.vue';
import HomePage from './components/HomePage/HomePage.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    { path: '/', component: HomePage },
    // { path: '/', component:  HelloWorld },
    // { path: '/about', component: About },
  ]
  
const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

createApp(App).use(router).mount('#app')
