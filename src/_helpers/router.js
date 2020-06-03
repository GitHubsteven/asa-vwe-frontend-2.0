import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from '../component/login/Login'
import RegisterPage from '../component/register/Register'
import BlogAdd from '../component/blog/BlogAdd'
import BlogList from '../component/blog/BlogList'
import BlogView from '../component/blog/BlogView'
import BlogUpdate from '../component/blog/BlogUpdate'


Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', component: BlogList},
        {path: '/login', component: LoginPage},
        {path: '/register', component: RegisterPage},
        {
            path: '/blog-list',
            name: 'BlogList',
            component: BlogList
        },
        {
            path: '/blog-view',
            name: 'BlogView',
            component: BlogView
        },
        {
            path: '/blog-add',
            name: 'BlogAdd',
            component: BlogAdd
        },
        {
            path: '/blog-update',
            name: 'BlogUpdate',
            component: BlogUpdate
        },
        // otherwise redirect to home
        {path: '*', redirect: '/'}
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});