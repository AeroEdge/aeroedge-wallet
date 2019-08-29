import api from '@/api'
import utils from '@/utils'

export default {
  namespaced: true,
  state: {
    /**
     * ログインしているユーザー自身のコイン残高
     * @type {Object}
     */
    myBalance: {}
  },
  getters: {
    getMyBalance: (state) => {
      return state.myBalance
    }
  },
  mutations: {
    setMyBalance: (state, val) => {
      utils.setStrage('balance', val)
      state.myBalance = val.data
    }
  },
  actions: {
    /**
     * ログインしているユーザー自身のコイン残高を取得する
     */
    requestMyBalance: ({ commit, rootState, rootGetters }, payload) => {
      let apiHeader = rootGetters['auth/getAuthHeader']
      return new Promise((resolve, reject) => {
        api.get(process.env.API_URL + '/balance/me', {}, apiHeader)
          .then(res => {
            // 取得した残高をセットする
            commit('setMyBalance', res)
            resolve()
          }).catch(err => {
            commit('defaultModal/openModal', 'error', {root: true})
            reject(err)
          })
      })
    }
  }
}
