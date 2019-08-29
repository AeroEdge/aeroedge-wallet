import api from '@/api'
import utils from '@/utils'

export default {
  namespaced: true,
  state: {
    /**
     * ログイン状態管理フラグ
     * @type {Boolean}
     */
    loggedIn: false,
    /**
     * ユーザ情報
     * @type {Object}
     */
    userInfo: null,
    /**
     * ID・パスワード情報
     * @type {Object}
     */
    IDPass: [],
    /**
     * ID・パスワード保存フラグ
     * @type {Object}
     */
    keepIDPassFlag: false,
    /**
     * セッションタイムアウト判定フラグ
     *  セッションタイムアウト時に遷移したログイン画面にて文言を表示するためのフラグ
     * @type {Boolean}
     */
    timeoutFlag: false
  },
  getters: {
    getLoggedIn: state => {
      return state.loggedIn
    },
    /**
     * ユーザ情報取得
     *    stateに無い場合はlocalStrageから取得する
     * @return {Object, String} ユーザー情報、または空の文字列
     */
    getUserInfo: state => {
      let storageUserInfo = utils.getStrage('userInfo')

      if (state.userInfo) {
        return state.userInfo
      } else if (storageUserInfo) {
        return storageUserInfo
      } else {
        return ''
      }
    },
    /**
     * ユーザ情報取得
     *    stateに無い場合はlocalStrageから取得する
     * @return {Object} X-Auth-Token
     */
    getAuthHeader: (state, getters) => {
      if (!getters.getUserInfo) {
        return false
      }
      return {
        'X-Auth-Token': getters.getUserInfo.access_token
      }
    },
    /**
     * セッションタイムアウトフラグを取得
     *    stateに無い場合はStrageから取得する
     * @return {String} keepLoginFlag
     */
    getTimeoutFlag: state => {
      return state.timeoutFlag
    }
  },
  mutations: {
    /**
     * ログイン処理（各種データの保存）
     *    Storageにも保存する
     * @param {Object} state
     * @param {Object} レスポンスデータ
     */
    login: (state, data) => {
      const nowDate = new Date().getTime()
      state.IDPass = {
        id: data.userId,
        password: data.password
      }
      state.loggedIn = true
      state.keepIDPassFlag = data.keepIDPassFlag
      state.userInfo = Object.assign(data.response.data, {
        userId: data.userId,
        expires_datetime: nowDate + (data.response.data.expires_in * 1000)
      })
      utils.setStrage('userInfo', state.userInfo)

      if (state.keepIDPassFlag) {
        utils.setLocalStrage('keepIDPassFlag', state.keepIDPassFlag)
        utils.setLocalStrage('IDPass', state.IDPass)
      } else {
        utils.removeStrage('keepIDPassFlag')
        utils.removeStrage('IDPass')
      }

      // パスワード未変更の場合に限り、一時的にパスワードを保存する
      // change_passwordがtrue、かつパスワードが保存されている場合に限り
      // パスワード強制変更画面にリダイレクトする
      if (data.response.data.change_password) {
        sessionStorage.setItem('password', JSON.stringify(data.password))
      }
    },
    /**
     * 保存していたパスワード、およびパスワード変更フラグを削除する
     * @param {Object} state
     */
    clearChangePasswordFlag: state => {
      utils.removeStrage('password')
      let userInfo = JSON.parse(utils.getStrage('userInfo'))
      userInfo.change_password = false

      state.userInfo = userInfo
      utils.setStrage('userInfo', state.userInfo)
    },
    /**
     * ログアウト処理（データの削除）
     * @param {Object} state
     */
    logout: state => {
      state.loggedIn = false
      state.userInfo = null
      utils.removeStrage('userInfo')
      utils.removeStrage('keepLoginFlag')
      if (state.keepIDPassFlag) {
        utils.setLocalStrage('keepIDPassFlag', state.keepIDPassFlag)
        utils.setLocalStrage('IDPass', state.IDPass)
        state.keepIDPassFlag = false
        state.IDPass = []
      } else {
        utils.removeStrage('keepIDPassFlag')
        utils.removeStrage('IDPass')
        state.keepIDPassFlag = false
        state.IDPass = []
      }
    },
    /**
     * Storageに保存したデータをstateに格納
     * @param {Object} state
     */
    setUserInfo: state => {
      const userInfo = JSON.parse(utils.getStrage('userInfo'))
      if (userInfo) {
        state.userInfo = userInfo
      } else {
        console.log('Not logged in')
        return false
      }
    },
    /**
     * セッションタイムアウトフラグを切り替える
     * @param {Boolean} timeoutFlag
     */
    changeTimeoutFlag: (state, timeoutFlag) => {
      state.timeoutFlag = timeoutFlag
    }
  },
  actions: {
    /**
     * ログイン処理
     * @param {Object} payload ログイン情報
     */
    login ({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        api.post(process.env.API_URL + '/login', {
          user_id: payload.userId,
          password: payload.password,
          source: 'WEB'
        }, '').then(response => {
          commit('login', {response: response, userId: payload.userId, password: payload.password, keepIDPassFlag: payload.keepIDPassFlag})
          resolve(response)
        }).catch(err => {
          // 400エラーのときはモーダルは出さない
          if (err.data && err.data.errors[0] && err.data.errors[0].code !== '20B0002') {
            commit('defaultModal/openModal', 'error', {root: true})
          }
          reject(err)
        })
      })
    },
    /**
     * セッションタイムアウト判定
     * @param {Object} state
     */
    timeout () {
      const userInfo = JSON.parse(utils.getStrage('userInfo'))
      if ((userInfo && userInfo['expires_datetime'] <= (new Date()).getTime())) {
        return true
      }
    }
  }
}
