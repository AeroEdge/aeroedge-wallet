export default {
  namespaced: true,
  state: {
    menuOpenFlag: false
  },
  getters: {
    getMenuOpenFlag: state => {
      return state.menuOpenFlag
    }
  },
  mutations: {
    changeMenuOpenFlag: (state, type) => {
      state.menuOpenFlag = type
    }
  }
}
