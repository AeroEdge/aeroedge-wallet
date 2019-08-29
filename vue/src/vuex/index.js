import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import sideMenu from './sideMenu'
import history from './history'
import defaultModal from './defaultModal'
import main from './main'
import balance from './balance'
import user from './user'
import form from './form'
import transaction from './transaction.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    sideMenu,
    history,
    defaultModal,
    main,
    balance,
    user,
    form,
    transaction
  }
})
