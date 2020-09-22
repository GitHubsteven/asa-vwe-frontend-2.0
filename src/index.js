import Vue from 'vue';

import {store} from './_store';
import {router} from './_helpers';
import App from './component/app/App';
import './css/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'

Vue.use(ElementUI);
Vue.use(VueI18n);
import echarts from 'echarts'

Vue.use(echarts);

// Vue.prototype.$echarts = echarts;

const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
    messages: {
        'zh-CN': require('./common/lang/zh'),   // 中文语言包
        'en-US': require('./common/lang/en')    // 英文语言包
    }
});

new Vue({
    el: '#app',
    i18n,  // 最后
    router,
    store,
    render: h => h(App)
});