<template>
  <div class="c-ent">
    <div class="c-ent--wrapper">
      <div class="c-ent__lang" id="lang">
        <v-select v-model="selectSelected" :options="selectOptions" :change="changeLang(selectSelected)"></v-select>
      </div>
      <div class="c-ent--wrapper__inner u-mt--10px">
        <div class="c-ent--box">
          <div class="c-ent--box__inner">
            <h1 class="c-ent__logo">
              <img src="../assets/images/ae_logo.svg" alt="AE">
            </h1>
            <h2>
              <img src="../assets/images/ae_logo_label.svg" alt="AE">
            </h2>

            <!-- Sign In  -->
            <div class="c-ent__inner">
              <div v-if="timeoutFlag" class="c-ent__text c-text--error">
                <p v-html="$tc('error.session_timeout')"></p>
              </div>
              <form @submit.prevent="userLogin" class="c-ent__form">
                  <input
                    type="text"
                    name="userId"
                    value=""
                    id="userForm"
                    class="c-ent__form__input"
                    :placeholder="$tc('login.user_id')"
                    :data-vv-as="$tc('login.user_id')"
                    data-vv-validate-on="blur"
                    v-model="userId"
                    v-validate="{required: 'required', min:4, max:15, regex:/^[a-zA-Z0-9_]+$/}">

                  <p class="c-ent__form__error c-text--error" v-if="errors.has('userId')">{{errors.first('userId')}}</p>

                  <div class="c-form--mask u-mt--40px">
                    <input
                      :type="mask"
                      name="password"
                      value=""
                      id="passwordForm"
                      class="c-ent__form__input c-form--mask__input"
                      :placeholder="$tc('login.password')"
                      :data-vv-as="$tc('login.password')"
                      data-vv-validate-on="blur"
                      v-model="password"
                      v-validate="{required: 'required', min:7, max:32, regex:/(?!(^[a-zA-Z]+$)|(^[0-9]+$)|(^[!-/:-@[-`{-~]+$))(^[a-zA-Z0-9!-/:-@[-`{-~]+$)/}">
                    <button type="button" class="c-form--mask__icon fas fa-eye-slash" @click="changePasswordMask('passwordForm')"></button>
                  </div>

                  <p class="c-ent__form__error c-text--error" v-if="errors.has('password')">{{errors.first('password')}}</p>

                  <label class="c-form--checkbox u-mt--30px">
                    <span class="c-form--checkbox__btn">
                      <input type="checkbox" class="c-form--checkbox--input" value="true" id="checkBox" v-model="keepIDPassFlag">
                      <span class="c-form--checkbox--icon">
                        <i class="fas fa-check"></i>
                      </span>
                    </span>
                    <span class="c-form--checkbox__text">{{ $tc('login.keep') }}</span>
                  </label>

                  <span id="loginError" class="c-ent__form__error c-text--error" v-if="loginError">{{ $tc('login.login_error') }}</span>

                  <div class="c-ent__forgot">
                    <button type="button" class="c-link--default" @click="changeRecoverPage()">{{ $tc('login.forgot') }}</button>
                  </div>

                  <div class="c-ent__btn">
                    <button class="c-btn--default" type="submit">{{ $tc('common.btn.sign_in') }}</button>
                  </div>
              </form>

            </div>
          </div><!-- c-ent--box__inner -->
        </div><!-- c-ent--box -->
      </div><!-- c-ent--wrapper__inner -->
    </div><!-- c-ent--wrapper -->
  </div><!-- c-ent-->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import utils from '../utils'
import vSelect from 'vue-select'

export default {
  name: 'Login',
  components: {
    vSelect
  },
  created: function () {
    if (this.pageLang === 'ja') {
      this.selectSelected = {id: 'ja', label: '日本語'}
      this.selectOptions = [{id: 'en', label: 'English'}]
    } else {
      this.selectSelected = {id: 'en', label: 'English'}
      this.selectOptions = [{id: 'ja', label: '日本語'}]
    }
    const keepFlag = JSON.parse(utils.getStrage('keepIDPassFlag'))
    const IDPass = JSON.parse(utils.getStrage('IDPass'))
    if (keepFlag) {
      this.userId = IDPass.id
      this.password = IDPass.password
    }
    this.autoLogin()
  },
  data () {
    return {
      userId: null,
      password: null,
      keepIDPassFlag: true,
      loginError: false,
      mask: 'password',
      selectOptions: [
        {id: '', label: ''}
      ],
      selectSelected: {id: 'ja', label: '日本語'}
    }
  },
  watch: {
    pageLang: function (val) {
      if (this.pageLang === 'ja') {
        this.selectOptions = [{id: 'en', label: 'English'}]
      } else {
        this.selectOptions = [{id: 'ja', label: '日本語'}]
      }
    }
  },
  computed: {
    ...mapGetters('auth', {
      timeoutFlag: 'getTimeoutFlag'
    }),
    ...mapGetters('main', {
      pageLang: 'getPageLang'
    })
  },
  methods: {
    ...mapMutations('auth', {
      changeTimeoutFlag: 'changeTimeoutFlag'
    }),
    ...mapMutations('form', {
      changePasswordMask: 'changePasswordMask'
    }),
    ...mapMutations('main', {
      changePageLang: 'changePageLang'
    }),
    ...mapMutations('sideMenu', {
      changeListOpenFlag: 'changeListOpenFlag'
    }),
    ...mapActions('auth', {
      login: 'login'
    }),
    // 言語設定切り替え
    changeLang (lang) {
      this.$i18n.locale = lang.id
      this.changePageLang(lang.id)
    },
    // パスワード回復ページ遷移
    changeRecoverPage () {
      this.$router.push({name: 'ResetPasswordRecover'})
    },
    // リンクから遷移した際の自動ログイン
    autoLogin () {
      if (sessionStorage.getItem('user') && sessionStorage.getItem('pass')) {
        this.userId = sessionStorage.getItem('user')

        let StoragePassword = sessionStorage.getItem('pass')
        if (StoragePassword.indexOf('%60') !== -1 || StoragePassword.indexOf('%22') !== -1 || StoragePassword.indexOf('%3C') !== -1 || StoragePassword.indexOf('%3E') !== -1) {
          StoragePassword = StoragePassword.replace(/%60/g, '`')
          StoragePassword = StoragePassword.replace(/%22/g, '"')
          StoragePassword = StoragePassword.replace(/%3C/g, '<')
          StoragePassword = StoragePassword.replace(/%3E/g, '>')
        }
        this.password = StoragePassword

        sessionStorage.removeItem('user')
        sessionStorage.removeItem('pass')

        return new Promise((resolve, reject) => {
          this.login({
            userId: this.userId,
            password: this.password,
            keepIDPassFlag: this.keepIDPassFlag
          }).then((res) => {
            if (res.data.authority[0] === 'issuer') {
              this.loginError = true
            } else {
              this.changeTimeoutFlag(false)
              this.changePageLang('ja')
              this.$router.push({name: 'Top'})
            }
          }).catch(err => {
            this.loginError = true
            reject(err)
          })
        })
      }
    },
    userLogin (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          return new Promise((resolve, reject) => {
            this.login({
              userId: this.userId,
              password: this.password,
              keepIDPassFlag: this.keepIDPassFlag
            }).then((res) => {
              if (res.data.authority[0] === 'issuer') {
                this.loginError = true
              } else {
                this.changeTimeoutFlag(false)
                this.$router.push({name: 'Top'})
              }
            }).catch(err => {
              this.loginError = true
              reject(err)
            })
          })
        }
      })
    }
  }
}
</script>
