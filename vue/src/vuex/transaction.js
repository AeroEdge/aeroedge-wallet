import api from '@/api'

export default {
  namespaced: true,
  actions: {
    /**
     * コインを利用して支払いを行う
     */
    requestTransaction: ({ commit, rootGetters }, payload) => {
      let apiHeader = rootGetters['auth/getAuthHeader']
      let sendData = {
        currency: {
          amount: payload.amount,
          code: 'edge'
        }
      }
      return new Promise((resolve, reject) => {
        api.post(process.env.API_URL + '/transactions/' + payload.type, sendData, apiHeader)
          .then(res => {
            resolve(res)
          }).catch(err => {
            commit('defaultModal/openModal', 'error', {root: true})
            reject(err)
          })
      })
    },
    requestTransaction2: ({ commit, rootGetters }, payload) => {
      let apiHeader = rootGetters['auth/getAuthHeader']
      let sendData = {
        currency: {
          amount: payload.amount,
          code: 'edge'
        },
        participants: {
          merchant: 'aemart01'
        }
      }
      return new Promise((resolve, reject) => {
        api.post(process.env.API_URL + '/transactions/' + payload.type, sendData, apiHeader)
          .then(res => {
            resolve(res)
          }).catch(err => {
            commit('defaultModal/openModal', 'error', {root: true})
            reject(err)
          })
      })
    }
  }
}
