import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import validation from '../validations'
import utils from '@/utils'
import { i18n } from '../main.js'

export default {
  namespaced: true,
  state: {
    pageTitle: '',
    pageLang: '',
    errorMsg: ''
  },
  getters: {
    getPageTitle: state => {
      return state.pageTitle
    },
    getPageLang: state => {
      let fixedLang = ''
      state.pageLang = JSON.parse(utils.getStrage('pageLang'))

      i18n.locale = state.pageLang

      if (state.pageLang) {
        fixedLang = state.pageLang.replace(/"/g, '')
        return fixedLang
      } else {
        return 'ja'
      }
    },
    getErrorMsg: state => {
      return state.errorMsg
    }
  },
  mutations: {
    /**
     * 表示するページ名を変更する
     * @param {String} val
     */
    changePageTitle: (state, val) => {
      state.pageTitle = val
    },
    /**
     * ページの言語を変更する
     * @param {String} val
     */
    changePageLang: (state, val) => {
      state.pageLang = val
      if (val === 'en') {
        Validator.localize('en')
      } else {
        Validator.localize('ja')
      }
      Vue.use(VeeValidate, validation)
      utils.setLocalStrage('pageLang', val)
    },
    setErrorMsg: (state, val) => {
      state.errorMsg = val
    }
  }
}
