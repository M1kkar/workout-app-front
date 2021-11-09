import Vue from 'vue';
import VueRouter from 'vue-router';
import Footer from "../components/Footer";
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import Register from "../components/Register";

Vue.use(VueRouter);
Vue.component('my-home-page', HomePage);
Vue.component('my-footer', Footer);
Vue.component('login', Login);
Vue.component('register', Register)


const routes = [
    {
        path: '/',
        name: 'homepage',
        component: () => import('../components/HomePage'),
    },
    {
        path: '/login',
        name: '/login',
        component:() => import('../components/Login'),
    },
    {
      path: '/register',
      name: '/register' ,
      component:() =>import('../components/Register'),
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;


