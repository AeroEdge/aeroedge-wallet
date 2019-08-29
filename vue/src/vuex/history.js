import api from '@/api'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    /**
     * 全決済履歴
     * @type {Object}
     */
    historyList: [],
    /**
     * 履歴ページで検索処理が実行されたかを確認する関数
     * @type {Boolean}
     */
    searchFlag: false
  },
  getters: {
    getHistoryList: state => {
      return state.historyList
    },
    getSearchFlag: state => {
      return state.searchFlag
    }
  },
  mutations: {
    /**
     * 取得した決済履歴をもとに全履歴、件数、金額合計をstateに登録する
     * @param {Object} state
     * @param {Object} val 取得した履歴データ
     */
    setHistoryInfo: (state, val) => {
      if (val.data.entries) {
        for (let i = 0; i < val.data.entries.length; i++) {
          val.data.entries[i].created_at = moment((val.data.entries[i].created_at).replace('[GMT]', '')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
      state.historyList = val.data
    },
    /**
     * 取得した履歴をトップ画面用に3件をstateに登録する
     * @param {Object} state
     * @param {Object} val 取得した履歴データ
     */
    setHistoryInfoTop: (state, val) => {
      if (val.data.entries) {
        for (let i = 0; i < val.data.entries.length; i++) {
          val.data.entries[i].created_at = moment((val.data.entries[i].created_at).replace('[GMT]', '')).format('YYYY-MM-DD HH:mm:ss')
        }

        state.historyList = val.data

        if (state.historyList.entries.length > 3) {
          for (let j = 1; state.historyList.entries.length > 3; j++) {
            state.historyList.entries.splice(state.historyList.entries.length - j, 1)
            j--
          }
        } else {
          state.historyList = val.data
        }
      }
    },
    /**
     * 履歴ページで検索処理が実行されたかを確認する関数
     * @param {Boolean} searchFlag
     */
    changeSearchFlag: (state, searchFlag) => {
      state.searchFlag = searchFlag
    }
  },
  actions: {
    /**
     * 決済履歴を取得する
     */
    requestHistory: ({ commit, state, rootGetters }, payload) => {
      let apiHeader = rootGetters['auth/getAuthHeader']
      let sendData = {
        target: payload.target
      }

      return new Promise((resolve, reject) => {
        api.get(process.env.API_URL + '/reports/transactions', sendData, apiHeader)
          .then(res => {
            if (payload.type === 'all') {
              commit('setHistoryInfo', res)
            } else {
              commit('setHistoryInfoTop', res)
            }
            resolve()
          }).catch(err => {
            commit('defaultModal/openModal', 'error', {root: true})
            reject(err)
          })
      })
    }
  }
}
