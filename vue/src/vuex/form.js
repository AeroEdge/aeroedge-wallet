export default {
  namespaced: true,
  mutations: {
    // パスワードマスク切り替え
    changePasswordMask (state, id) {
      if (id !== null) {
        let target = document.getElementById(id)
        let nowType = target.type
        if (nowType === 'password') {
          target.type = 'text'
        } else {
          target.type = 'password'
        }
      }
    }
  }
}
