import { shallow, createLocalVue } from 'vue-test-utils'
import LoginPage from '@/pages/Login'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'
import validation from '@/validations'
import api from '@/api'
import store from '@/vuex'

const localVue = createLocalVue()

localVue.use(VueRouter)
localVue.use(Vuex)
Validator.localize('ja', ja)
localVue.use(VeeValidate, validation)

localVue.use(store)
localVue.use(api)

describe('Login.vue', () => {
  const wrapper = shallow(LoginPage, {
    localVue,
    stubs: ['router-link', 'router-view']
  })

  describe('ログイン情報 ID正常系', () => {
    let idCheckNormal = async () => {
      await wrapper.vm.$validator.validateAll()

      expect(wrapper.find('[name="id"]+.c-input-err-text').text()).toBe('')
    }

    it('ID数字のみ', () => {
      wrapper.setProps({
        id: '1234',
        pw: 'abcd@$#1234'
      })
      try {
        idCheckNormal()
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('ID英字のみ', () => {
      wrapper.setProps({
        id: 'abcdef',
        pw: 'abcd@$#1234'
      })
      try {
        idCheckNormal()
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('ID英数', () => {
      wrapper.setProps({
        id: '123abc',
        pw: 'abcd@$#1234'
      })
      try {
        idCheckNormal()
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('ID英数_', () => {
      wrapper.setProps({
        id: '123_abc',
        pw: 'abcd@$#1234'
      })
      try {
        idCheckNormal()
      } catch(e) {
        expect(e).toMatch('error')
      }
    })
  })

  describe('ログイン情報 PW正常系', () => {
    let pwCheckNormal = async () => {
      await wrapper.vm.$validator.validateAll()

      expect(wrapper.find('[name="pw"]+.c-input-err-text').text()).toBe('')
    }

    it('PW数字＋英字', () => {
      wrapper.setProps({
        id: '123abc',
        pw: '1234abcd'
      })
      try {
        pwCheckNormal()
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW英字＋記号', () => {
      wrapper.setProps({
        id: '123abc',
        pw: 'abcd@$#'
      })
      try {
        pwCheckNormal()
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW数字＋記号', () => {
      wrapper.setProps({
        id: '123abc',
        pw: '1234@#$%^&*()'
      })
      try {
        pwCheckNormal()
      } catch(e) {
        expect(e).toMatch('error')
      }
    })
  })

  describe('ログイン情報 ID異常系', () => {
    let idCheckErr = async (errText) => {
      await wrapper.vm.$validator.validateAll()

      expect(wrapper.find('[name="id"]+.c-input-err-text').text()).toBe(errText)
    }

    it('ID必須エラー', () => {
      wrapper.setProps({
        id: '',
        pw: 'abcd1234'
      })
      try {
        idCheckErr('ユーザーIDを入力してください')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('ID空白文字エラー', () => {
      wrapper.setProps({
        id: ' ',
        pw: 'abcd1234'
      })
      try {
        idCheckErr('ユーザーIDを入力してください')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('ID最小文字数エラー', () => {
      wrapper.setProps({
        id: '123',
        pw: '123456789'
      })
      try {
        idCheckErr('ユーザーIDに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('ID最大文字数エラー', () => {
      wrapper.setProps({
        id: '1234512345123450',
        pw: '123456789'
      })
      try {
        idCheckErr('ユーザーIDに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('ID使用不可文字エラー', () => {
      wrapper.setProps({
        id: '*-/|~=',
        pw: '123456789'
      })
      try {
        idCheckErr('ユーザーIDに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('ID使用不可文字＋使用可文字エラー', () => {
      wrapper.setProps({
        id: '*-/123',
        pw: '123456789'
      })
      try {
        idCheckErr('ユーザーIDに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })
  })

  describe('ログイン情報 PW異常系', () => {
    let pwCheckErr = async (errText) => {
      await wrapper.vm.$validator.validateAll()

      expect(wrapper.find('[name="pw"]+.c-input-err-text').text()).toBe(errText)
    }

    it('PW必須エラー', () => {
      wrapper.setProps({
        id: 'test',
        pw: ''
      })
      try {
        pwCheckErr('パスワードを入力してください')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW空白文字エラー', () => {
      wrapper.setProps({
        id: 'test',
        pw: ' '
      })
      try {
        pwCheckErr('パスワードを入力してください')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW最小文字数エラー', () => {
      wrapper.setProps({
        id: 'test',
        pw: 'abcd12'
      })
      try {
        pwCheckErr('パスワードに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW最大文字数エラー', () => {
      wrapper.setProps({
        id: 'test',
        pw: '123456789012345678901234567890abc'
      })
      try {
        pwCheckErr('パスワードに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW単一文字種使用エラー 数字', () => {
      wrapper.setProps({
        id: 'test',
        pw: '123456789'
      })
      try {
        pwCheckErr('パスワードに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW単一文字種使用エラー 英字', () => {
      wrapper.setProps({
        id: 'test',
        pw: 'abcdefghij'
      })
      try {
        pwCheckErr('パスワードに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW単一文字種使用エラー 記号', () => {
      wrapper.setProps({
        id: 'test',
        pw: '(=)!#$%[]-*/'
      })
      try {
        pwCheckErr('パスワードに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW使用不可文字エラー', () => {
      wrapper.setProps({
        id: 'test',
        pw: '<>.,\\"'
      })
      try {
        pwCheckErr('パスワードに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })

    it('PW使用不可文字＋使用可文字エラー', () => {
      wrapper.setProps({
        id: 'test',
        pw: 'abcd1234<>.,'
      })
      try {
        pwCheckErr('パスワードに誤りがあります')
      } catch(e) {
        expect(e).toMatch('error')
      }
    })
  })
})
