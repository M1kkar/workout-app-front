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
Vue.component('register', Register);

const loggedInGuard = (to, from, next) => {
    if (sessionStorage.getItem('loggedIn')) {
        next();
    } else {
        next('/');
    }
};
const notLoggedInGuard = (to, from, next) => {
    if (sessionStorage.getItem('loggedIn')) {
        next('/login');
    } else {
        next();
    }
};

const routes = [
    {
        path: '/',
        name: 'homepage',
        component: () => import('../components/HomePage'),
        beforeEnter: notLoggedInGuard,
    },
    {
        path: '/login',
        name: 'login',
        component:() => import('../components/Login'),
        beforeEnter: notLoggedInGuard,
    },
    {
      path: '/register',
      name: 'register' ,
      component:() =>import('../components/Register'),
        beforeEnter: notLoggedInGuard
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component:() =>import('../components/Dashboard'),
        beforeEnter: loggedInGuard,
    },
    {
        path: '/myDiet',
        name: 'myDiet',
        component:() =>import('../components/MyDiet'),
        beforeEnter: loggedInGuard,
    },
    {
        path: '/myProfile',
        name: 'myProfile',
        component:() =>import('../components/MyProfile'),
        beforeEnter: loggedInGuard,
    },
    {
        path: '/myTraining',
        name: 'myTraining',
        component:() =>import('../components/MyTraining'),
        beforeEnter: loggedInGuard,
    },
    {
        path: '/allExercises',
        name: '/allExercises',
        component:() =>import('../components/Exercises'),
        beforeEnter: loggedInGuard,
    },
    {
        path: '/aboutTraining',
        name: '/aboutTraining',
        component:() =>import('../components/AboutTraining'),
    },
    {
        path: '/moreDetails',
        name: '/moreDetails',
        component:()=>import('../components/TrainingDetails'),
    },
    {
        path: '/addProduct',
        name: '/addProduct',
        component:()=>import('../components/AddProduct')
    }


];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;


