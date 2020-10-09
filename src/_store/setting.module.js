import {userService} from '../_services';
import {router} from '../_helpers';
import * as vweConstant from "../common/constants"

const vweSetting = JSON.parse(localStorage.getItem(vweConstant.SETTING_KEY));

const actions = {
    login({dispatch, commit}, {username, password}) {
        commit('loginRequest', {username});

        userService.login(username, password)
            .then(
                user => {
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, {root: true});
                }
            );
    },
    logout({commit}) {
        userService.logout();
        commit('logout');
    },
    register({dispatch, commit}, user) {
        commit('registerRequest', user);

        userService.register(user)
            .then(
                user => {
                    commit('registerSuccess', user);
                    router.push('/login');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', {root: true});
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, {root: true});
                }
            );
    }
};

const mutations = {
    registerFailure(state, error) {
        state.status = {};
    },
    /**
     * 刷新系统配置
     * @param vweSetting
     * @param newSetting
     */
    refresh(vweSetting, newSetting) {
        localStorage.setItem(vweConstant.SETTING_KEY, newSetting);
        vweSetting = newSetting;
    }

};

export const setting = {
    namespaced: true,
    vweSetting,
    actions,
    mutations
};