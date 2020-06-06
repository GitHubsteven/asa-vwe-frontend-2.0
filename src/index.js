import Vue from 'vue';

import {store} from './_store';
import {router} from './_helpers';
import App from './component/app/App';
import './css/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// setup fake backend
Vue.use(ElementUI);

// configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});