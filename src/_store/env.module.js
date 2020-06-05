import {API_ENV} from "../_helpers/env"

//define a state
const envStr = localStorage.getItem(API_ENV.key);
const state = envStr
  ? {apiEnv: envStr}
  : {apiEnv: API_ENV.express};

const mutations = {
    switchTo(state, vwe_env) {
        if (API_ENV.express !== vwe_env && API_ENV.spring !== vwe_env) {
            throw new Error("env: " + vwe_env + " not support");
        }
        localStorage.setItem(API_ENV.key, vwe_env);
        state.apiEnv = vwe_env;
    },

    getEnv(state) {
        return state.apiEnv;
    }
};

const actions = {
    /**
     * 切换到
     * @param state
     * @param vwe_env
     */
    switchTo({commit, dispatch}, vwe_env) {
        commit('switchTo', vwe_env);
    },

    /**
     * 获取当前的api环境
     * @returns string
     */
    getEnv(commit) {
        return commit('getEnv');
    }
};

export const env = {
    namespaced: true,
    state,
    actions,
    mutations
};