const state = {
    type: null,
    message: null
};

const actions = {
    success({dispatch, commit}, message) {
        commit('success', message);
        setTimeout(() => {
            commit('clear')
        }, 1000)
    },
    error({dispatch, commit}, message) {
        commit('error', message);
        setTimeout(() => {
            commit('clear')
        }, 1500)
    },
    clear({commit}) {
        commit('clear');
    }
};

const mutations = {
    success(state, message) {
        state.type = 'alert-success';
        state.message = message;
    },
    error(state, message) {
        state.type = 'alert-danger';
        state.message = message;
    },
    clear(state) {
        state.type = null;
        state.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};
