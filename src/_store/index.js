import Vue from 'vue';
import Vuex from 'vuex';

import {alert} from './alert.module';
import {account} from './account.module';
import {users} from './users.module';
import {env} from './env.module'
import {setting} from './setting.module'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        env,
        setting
    }
});
