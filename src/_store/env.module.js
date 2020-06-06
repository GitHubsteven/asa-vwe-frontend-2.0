import {apiEnv} from "../_helpers/env"

//define a state
const envStr = localStorage.getItem(apiEnv.key);
const state = envStr
  ? {apiEnv: envStr}
  : {apiEnv: apiEnv.express};

const mutations = {
    switchTo(state, vwe_env) {
        if (apiEnv.express !== vwe_env && apiEnv.spring !== vwe_env) {
            throw new Error("env: " + vwe_env + " not support");
        }
        localStorage.setItem(apiEnv.key, vwe_env);
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
        location.reload();
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