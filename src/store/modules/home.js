/* 
管理首页相关数据的vuex子模块
*/

import {reqCategoryList} from "../../api"

const state = {
    categoryList: []
}

const mutations ={

    //接受保存分类列表
    RECEIVE_CATEGORY_LIST(state, categoryList){
        state.categoryList = categoryList
    }
}

const actions = {
    //异步接受分类列表请求
    async getCategoryList ({commit}) {

        const result = await reqCategoryList()

        if (result.code === 200) {
            commit('RECEIVE_CATEGORY_LIST', result.data)
        }
    }
}

const getters = {}

export default ({
    state,
    mutations,
    actions,
    getters
})