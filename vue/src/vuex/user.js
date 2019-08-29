import api from '@/api'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    /**
     * ユーザー情報
     * @type {Object}
     */
    userInfo: [],
    /**
     * 現在のパスワード
     * @type {String}
     */
    oldPassword: '',
    /**
     * 更新後のパスワード
     * @type {String}
     */
    newPassword: '',
    /**
     * パスワード変更種別
     * @type {String}
     */
    changeType: ''
  },
  getters: {
    /**
     * userInfoの取得
     */
    getUserInfo: (state) => {
      return state.userInfo
    },
    /**
     * oldPasswordの取得
     */
    getOldPassword: (state) => {
      return state.oldPassword
    },
    /**
     * newPasswordの取得
     */
    getPassword: (state) => {
      return state.newPassword
    },
    /**
     * changeTypeの取得
     */
    getChangeType: (state) => {
      return state.changeType
    }
  },
  mutations: {
    setUserInfo: (state, val) => {
      for (let i = 0; i < val.data.users.length; i++) {
        val.data.users[i].registration_date = moment.unix(val.data.users[i].registration_date).format('YYYY-MM-DD')
      }
      state.userInfo = val.data
    },
    setOldPassword: (state, val) => {
      state.oldPassword = val
    },
    setPassword: (state, val) => {
      state.newPassword = val
    },
    setChangeType: (state, val) => {
      state.changeType = val
    }
  },
  actions: {
    /**
     * ユーザー情報を取得する
     */
    requestUserInfo: ({ commit, rootState, rootGetters }, payload) => {
      let apiHeader = rootGetters['auth/getAuthHeader']
      let sendData = {
        authority: payload.authority,
        is_active: payload.isActive
      }
      if (payload.user_id) {
        sendData = {
          user_id: payload.user_id
        }
      }
      return new Promise((resolve, reject) => {
        api.get(process.env.API_URL + '/users/search', sendData, apiHeader)
          .then(res => {
            commit('setUserInfo', res)
            resolve()
          }).catch(err => {
            commit('defaultModal/openModal', 'error', {root: true})
            reject(err)
          })
      })
    },
    /**
     * パスワードを再設定する
     * @param {Object} payload 新旧パスワード情報
     */
    changePassword: ({ commit, rootGetters }, payload) => {
      let apiHeader = rootGetters['auth/getAuthHeader']
      return new Promise((resolve, reject) => {
        api.post(process.env.API_URL + '/users/password', {
          old_password: payload.oldPassword,
          new_password: payload.password
        }, apiHeader).then(response => {
          resolve(response)
        }).catch(err => {
          if (!payload.changeType || (payload.changeType && payload.changeType !== 'normal')) {
            commit('defaultModal/openModal', 'error', {root: true})
          } else {
            commit('defaultModal/closeModal', '', {root: true})
          }
          reject(err)
        })
      })
    },
    /**
     * パスワードを再設定する（認証コード付き）
     * @param {Object} payload パスワードリセット用情報
     */
    changePasswordWithCode: ({ commit, getters }, payload) => {
      return new Promise((resolve, reject) => {
        api.post(process.env.API_URL + '/users/password/recover/complete', {
          code: payload.code,
          new_password: payload.password
        }, '').then(response => {
          resolve(response)
        }).catch(err => {
          commit('defaultModal/openModal', 'error', {root: true})
          reject(err)
        })
      })
    },
    /**
     * パスワード回復用のメールを送信させる
     * @param {Object} payload 回復対象者のEmailまたはユーザーID
     */
    recoverPassword: ({ commit }, payload) => {
      api.post(process.env.API_URL + '/users/password/recover', {
        user_credential: payload
      }, '')
    }
  }
}
