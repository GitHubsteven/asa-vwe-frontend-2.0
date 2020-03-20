import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';

import {store} from './_store';
import {router} from './_helpers';
import App from './component/app/App';
import './css/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(VeeValidate);

Vue.use(ElementUI);
Vue.use(Vuex);

// setup fake backend
import {configureFakeBackend} from './_helpers';

configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});