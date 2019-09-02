// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'
import auth from '@/vuex/auth'
import router from './router'
import store from './vuex'
import filter from './filters'
import validation from './validations'
import VueQrcodeReader from 'vue-qrcode-reader'
import utils from './utils'
import VueI18n from 'vue-i18n'

// 言語切り替え設定
const data = require('./lang.json')
Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: 'ja',
  messages: data
})

Vue.use(VueQrcodeReader)

// validation設定
Validator.localize('ja', ja)
Vue.use(VeeValidate, validation)

// production mode
Vue.config.productionTip = false

// redirect Login page
/**
 * ログイン済みかを確認し、未ログインの場合はログイン画面にリダイレクトする
 *     参照
 *     https://router.vuejs.org/ja/guide/advanced/navigation-guards.html
  change_passwordがtrue、かつパスワードが保存されている場合に限り
  パスワード強制変更画面にリダイレクトする
  パスワードが保存されていない場合はログイン画面にリダイレクトする
 */

router.beforeEach((to, from, next) => {
  const userInfo = JSON.parse(utils.getStrage('userInfo'))
  const password = JSON.parse(utils.getStrage('password'))
  // const path = location.pathname
  // const pathInfo = path.split('/')
  const nextPage = to.fullPath.split('/')

  if (to.matched.some(record => record.meta.requiresAuth) && userInfo && userInfo.change_password && password && nextPage[nextPage.length - 1] !== 'reset') {
    // change_passwordがtrue、パスワードが保存されている、かつ遷移先がパスワード強制変更画面以外
    // →パスワード強制変更画面へ
    store.commit('auth/setUserInfo')
    next({
      path: '/login/reset'
    })
  } else if (userInfo && userInfo.change_password && !password) {
    // change_passwordがtrue、パスワードが保存されていない
    // →ログイン画面へ
    store.commit('auth/logout')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (userInfo && userInfo['expires_datetime'] > (new Date()).getTime()) {
    // userInfoがstrageに存在し、前回ログインから期限内

    // ログインした状態でログインページに遷移しようとした際はトップ画面へ
    if (nextPage[nextPage.length - 1] === 'login') {
      next({
        path: 'member/reports'
      })
    }

    // →通常遷移
    store.commit('auth/setUserInfo')
    next()
  } else if (to.matched.some(record => record.meta.requiresAuth) && ((userInfo && userInfo['expires_datetime'] <= (new Date()).getTime()) || !auth.state.loggedIn)) {
    // セッションが期限切れ
    // →ログイン画面へ
    store.commit('auth/changeTimeoutFlag', true)
    store.commit('auth/logout')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (/^.*?(userId=.+)&(password=*.*)/.test(window.location.href) && to.fullPath !== '/login') {
    const search = /^.*?(userId=.+)&(password=*.*)/.exec(window.location.href)

    window.sessionStorage.setItem('user', search[1].replace(/^userId=/, ''))
    window.sessionStorage.setItem('pass', search[2].replace(/^password=/, ''))

    next({
      path: '/login'
    })
  } else {
    if (/^.*?(userId=.+)&(password=*.*)/.test(window.location.href)) {
      const search = /^.*?(userId=.+)&(password=*.*)/.exec(window.location.href)

      window.sessionStorage.setItem('user', search[1].replace(/^userId=/, ''))
      window.sessionStorage.setItem('pass', search[2].replace(/^password=/, ''))
    }
    next()
  }
})

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  filter,
  i18n: i18n,
  components: { App },
  template: '<App/>'
})
