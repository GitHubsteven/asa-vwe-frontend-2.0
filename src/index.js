import Vue from 'vue';
import Vuex from 'vuex';

import {store} from './_store';
// setup fake backend
import {router} from './_helpers';
import App from './component/app/App';
import './css/style.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);
Vue.use(Vuex);

// configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});