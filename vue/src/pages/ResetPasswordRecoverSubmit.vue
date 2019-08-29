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

            <div class="c-ent__inner">
              <div class="c-ent__note">
                <p>{{$tc('password_rule.title')}}</p>
                <p>{{$tc('password_rule.list1')}}<br>
                    {{$tc('password_rule.list2')}}</p>
              </div>
              <form @submit.prevent="openConfirm" class="c-ent__form">
              <div class="c-ent__label">
                <div class="u-mt--20px">
                  <input
                    name="code"
                    value="" id="Code"
                    class="c-ent__form__input"
                    :placeholder="$tc('resetPasswordForced.step3.code')"
                    :data-vv-as="$tc('resetPasswordForced.step3.code')"
                    data-vv-validate-on="blur"
                    v-model="code"
                    v-validate="{
                      required: 'required'}">
                  <button type="button" class="c-form--mask__icon" @click="changePasswordMask('mask1')"></button>
                </div>

                  <p class="c-ent__form__error c-text--error" v-if="errors.has('code')">{{errors.first('code')}}</p>
                  <p class="c-ent__form__error c-text--error" v-show="!errors.has('code') && errorMsg">{{ errorMsg }}</p>

                <div class="c-form--mask u-mt--30px">
                  <input
                    :type="mask1"
                    name="new_password"
                    value="" id="NewPasswordForm"
                    class="c-ent__form__input"
                    :placeholder="$tc('changePassword.new_password')"
                    :data-vv-as="$tc('changePassword.new_password')"
                    data-vv-validate-on="blur"
                    v-model="new_password"
                    v-validate="{
                      required: 'required',
                      min:7,
                      max:32,
                      regex:/(?!(^[a-zA-Z]+$)|(^[0-9]+$)|(^[!-/:-@[-`{-~]+$))(^[a-zA-Z0-9!-/:-@[-`{-~]+$)/}">
                  <button type="button" class="c-form--mask__icon fas fa-eye-slash" @click="changePasswordMask('mask1')"></button>
                </div>

                  <p class="c-ent__form__error c-text--error" v-if="errors.has('new_password')">{{errors.first('new_password')}}</p>

                <div class="c-form--mask u-mt--30px">
                  <input
                    :type="mask2"
                    name="confirm_password"
                    value="" id="ConfirmPasswordForm"
                    class="c-ent__form__input"
                    :placeholder="$tc('changePassword.confirm_password')"
                    :data-vv-as="$tc('changePassword.confirm_password')"
                    data-vv-validate-on="blur"
                    v-model="confirm_password"
                    v-validate="{
                      required: 'required',
                      min:7,
                      max:32,
                      regex:/(?!(^[a-zA-Z]+$)|(^[0-9]+$)|(^[!-/:-@[-`{-~]+$))(^[a-zA-Z0-9!-/:-@[-`{-~]+$)/}">
                  <button type="button" class="c-form--mask__icon fas fa-eye-slash" @click="changePasswordMask('mask2')"></button>
                </div>

                <p class="c-ent__form__error c-text--error" v-if="errors.has('confirm_password')">{{errors.first('confirm_password')}}</p>
                </div>

                <div class="c-ent__btn u-text--center">
                  <button class="c-btn--default" type="submit">{{$tc('common.btn.next')}}</button><button class="c-link--default u-color--inherit u-mt--20px" type="button" @click="backPage">{{$tc('common.btn.to_login')}}</button>
                </div>
              </form>
            </div>

          </div><!-- c-ent--box__inner -->
        </div><!-- c-ent--box -->

        <defaultModal name="recoverConfirm">
          <template slot="header">
          <h3 class="c-title--h3">
              <template>{{$tc('resetPasswordForced.recover_confirm.title')}}</template>
          </h3>
          </template>
          <template slot="content">
          <p>{{$tc('resetPasswordForced.recover_confirm.txt1')}}</p>
          <p>{{$tc('resetPasswordForced.recover_confirm.txt2')}}</p>
          </template>
          <template slot="footer">
          <button class="c-btn--off u-mr--20px" @click="closeModal">{{$tc('common.btn.cancel')}}</button>
          <button class="c-btn--default" @click.once="resetPasswordWithCode">{{$tc('common.btn.ok')}}</button>
          </template>
        </defaultModal>

        <defaultModal name="recoverComplete">
          <template slot="header">
          <h3 class="c-title--h3 c-icon--complete">
            <template>{{$tc('resetPasswordForced.recover_complete.title')}}</template>
          </h3>
          </template>
          <template slot="footer">
            <button class="c-btn--default" @click="afterComplete">OK</button>
          </template>
        </defaultModal>

      </div><!-- c-ent--wrapper__inner -->
    </div><!-- c-ent--wrapper -->
  </div><!-- c-ent-->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import vSelect from 'vue-select'
import defaultModal from '@/components/modal/DefaultModal'

export default {
  name: 'resetPasswordRecover',
  components: {
    vSelect,
    defaultModal
  },
  created: function () {
    if (this.pageLang === 'ja') {
      this.selectSelected = {id: 'ja', label: '日本語'}
      this.selectOptions = [{id: 'en', label: 'English'}]
    } else {
      this.selectSelected = {id: 'en', label: 'English'}
      this.selectOptions = [{id: 'ja', label: '日本語'}]
    }
  },
  beforeDestroy: function () {
    this.setErrorMsg('')
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
  data () {
    return {
      confirm_password: null,
      new_password: null,
      code: null,
      loginError: null,
      mask1: 'password',
      mask2: 'password',
      selectOptions: [
        {id: '', label: ''}
      ],
      selectSelected: {id: 'ja', label: '日本語'}
    }
  },
  computed: {
    ...mapGetters('main', {
      errorMsg: 'getErrorMsg',
      pageLang: 'getPageLang'
    })
  },
  methods: {
    ...mapMutations('auth', {
      clearChangePasswordFlag: 'clearChangePasswordFlag',
      logout: 'logout'
    }),
    ...mapMutations('defaultModal', {
      openModal: 'openModal',
      closeModal: 'closeModal'
    }),
    ...mapMutations('main', {
      setErrorMsg: 'setErrorMsg',
      changePageLang: 'changePageLang'
    }),
    ...mapActions('user', {
      changePasswordWithCode: 'changePasswordWithCode',
      recoverPassword: 'recoverPassword'
    }),
    afterComplete () {
      this.closeModal()
      this.logout()
      this.$router.push({name: 'LoginPage'})
    },
    /**
     * パスワード入力直後に、パスワード（確認）にエラーが表示されることを回避する
     *    パスワード（確認）からフォーカスを外した時点でconfirmedがtrueになり、
     *    以降はエラーが表示されるようになる
     */
    anableConfirmErr () {
      this.confirmed = true
    },
    backPage () {
      this.$router.push({name: 'LoginPage'})
    },
    // 言語設定切り替え
    changeLang (lang) {
      this.$i18n.locale = lang.id
      this.changePageLang(lang.id)
    },
    // パスワードマスク切り替え
    changePasswordMask (maskType) {
      if (maskType === 'mask1') {
        if (this.mask1 === 'password') {
          this.mask1 = 'text'
        } else {
          this.mask1 = 'password'
        }
      } else {
        if (this.mask2 === 'password') {
          this.mask2 = 'text'
        } else {
          this.mask2 = 'password'
        }
      }
    },
    openConfirm () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.openModal('recoverConfirm')
        }
      })
    },
    /**
     * パスワード変更処理
     */
    resetPasswordWithCode (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.changePasswordWithCode({
            code: this.code,
            password: this.new_password
          })
            .then((res) => {
              this.openModal('recoverComplete')
            })
            .catch(err => {
              if (err.response && err.response.data && err.response.data.errors && err.response.data.errors[0]) {
                this.closeModal()
                this.setErrorMsg(err.response.data.errors[0].detail)
              }
            })
        }
      })
    }
  }
}
</script>
