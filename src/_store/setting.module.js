import {CategoryService, CommonService} from '../_services';
import * as vweConstant from "../common/constants"
import * as _ from "lodash"


let categoryService = new CategoryService();
let commonService = new CommonService();

const vweSetting = localStorage.getItem(vweConstant.SETTING_KEY) ? JSON.parse(localStorage.getItem(vweConstant.SETTING_KEY)) : {};

const state = vweSetting.categories
  ? {categories: mapCategories(vweSetting.categories)}
  : {categories: []};

const actions = {

    /**
     * refresh system setting
     *
     * @param commit
     */
    refresh({commit}) {
        commonService.settings().then(result => {
            commit("refreshAll", result);
        })
    },

    /**
     * change isEditable field
     *
     * @param commit
     * @param payload:{id:"",isEditable:false/true}
     */
    changeEditable({commit}, payload) {
        commit("modifyEditable", payload);
    },

    /**
     * refresh categories
     * @param dispatch
     * @param commit
     */
    refreshCate({dispatch, commit}) {

        categoryService.listCategories().then(newCategories => {
              // dispatch('alert/success', "add success", {root: true});
              dispatch('refresh');
          },
          error => {
              dispatch('alert/error', error, {root: true});
          }
        );
    },


    /**
     * add category
     *
     * @param commit
     * @param dispatch
     * @param category
     */
    addCate({commit, dispatch}, category) {
        categoryService.createCategory(category).then(result => {
              dispatch('alert/success', "add success", {root: true});
              dispatch('refresh');
          },
          error => {
              dispatch('alert/error', error, {root: true});
          });
    },


    /**
     * update category
     *
     * @param commit
     * @param dispatch
     * @param category
     */
    updateCate({commit, dispatch}, category) {
        // make up the parameters
        categoryService.update(category).then(result => {
              dispatch('alert/success', "update success", {root: true});
              dispatch('refresh');
          },
          error => {
              dispatch('alert/error', error, {root: true});
          });
    },

    /**
     * delete category
     *
     * @param commit
     * @param dispatch
     * @param id category id
     */
    async delCate({commit, dispatch}, id) {
        categoryService.delCategory(id).then(result => {
              dispatch('alert/success', "delete success", {root: true});
              dispatch('refresh');
          },
          error => {
              dispatch('alert/error', error, {root: true});
          });

    }
};


const getters = {
    getCategories: (state) => {
        return state.categories;
    }
};

const mutations = {
    /**
     * refresh system setting
     *
     * @param state
     * @param newSetting
     */
    refreshAll(state, newSetting) {
        localStorage.setItem(vweConstant.SETTING_KEY, JSON.stringify(newSetting));
        state.categories = mapCategories(newSetting.categories);
    },

    modifyEditable(state, payload) {
        state.categories.forEach(cate => {
            if (cate.key === payload.key) {
                cate.isEditable = payload.isEditable;
            }
        })
    }
};

function mapCategories(categories) {
    if (!categories) return [];
    return categories.map(cate => {
        let cateObj = {};
        Object.assign(cateObj, cate);
        cateObj.isEditable = false;
        return cateObj;
    });
}


export const setting = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};