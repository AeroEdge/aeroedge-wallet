export default {
  namespaced: true,
  state: {
    /**
     * 対象となるモーダルの名称
     * @type {string}
     */
    modalName: '',
    /**
     * 対象となるモーダルのフラグ
     * @type {binding}
     */
    isShow: ''
  },
  getters: {
    getModalName: state => {
      return state.modalName
    },
    getModalFlag: state => {
      return state.isShow
    }
  },
  mutations: {
    openModal (state, name) {
      state.modalName = name
    },
    closeModal (state) {
      state.modalName = ''
    }
  },
  actions: {
    /**
     * モーダル開閉切り替え関数
     *     mutationに渡すだけです
     * @param {Object} val
     */
    openModal: ({ commit }, val) => {
      commit('openModal', val)
    }
  }
}
