import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from '../component/login/Login'
import RegisterPage from '../component/register/Register'
import AddBlog from '../component/blog/AddBlog'
import ListBlog from '../component/blog/ListBlog'
import ViewBlog from '../component/blog/ViewBlog'


Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', component: ListBlog},
        {path: '/login', component: LoginPage},
        {path: '/register', component: RegisterPage},
        {
            path: '/blog-list',
            name: 'ListBlog',
            component: ListBlog
        },
        {
            path: '/blog-view',
            name: 'ViewBlog',
            component: ViewBlog
        },
        {
            path: '/blog-add',
            name: 'AddBlog',
            component: AddBlog
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