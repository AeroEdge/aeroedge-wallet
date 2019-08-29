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
              <div class="c-ent__text u-mt--0px">
                <p class="u-mt--0px">{{ $tc('resetPasswordForced.message') }}</p>
              </div>
              <div class="c-ent__note u-mt--20px">
                <p>{{$tc('password_rule.title')}}</p>
                <p>{{$tc('password_rule.list1')}}<br>
                    {{$tc('password_rule.list2')}}</p>
              </div>
              <form @submit.prevent="resetPassword" class="c-ent__form">
                <div class="c-form--mask u-mt--20px">
                  <input
                    :type="mask1"
                    name="new_password"
                    id="NewPasswordForm"
                    class="c-ent__form__input"
                    :placeholder="$tc('changePassword.new_password')"
                    :data-vv-as="$tc('changePassword.new_password')"
                    data-vv-validate-on="blur"
                    v-model="new_password"
                    v-validate="{required: 'required', min:7, max:32, regex:/(?!(^[a-zA-Z]+$)|(^[0-9]+$)|(^[!-/:-@[-`{-~]+$))(^[a-zA-Z0-9!-/:-@[-`{-~]+$)/}"
                    ref="new_password">
                  <button type="button" class="c-form--mask__icon fas fa-eye-slash" @click="changePasswordMask('mask1')"></button>
                </div>

                  <p class="c-ent__form__error c-text--error" v-if="errors.has('new_password')">{{errors.first('new_password')}}</p>

                <div class="c-form--mask u-mt--20px">
                  <input
                    :type="mask2"
                    name="confirm_password"
                    id="ConfirmPasswordForm"
                    class="c-ent__form__input"
                    :placeholder="$tc('changePassword.confirm_password')"
                    :data-vv-as="$tc('changePassword.confirm_password')"
                    data-vv-validate-on="blur"
                    v-model="confirm_password"
                    v-validate="{required: 'required', min:7, max:32, regex:/(?!(^[a-zA-Z]+$)|(^[0-9]+$)|(^[!-/:-@[-`{-~]+$))(^[a-zA-Z0-9!-/:-@[-`{-~]+$)/, confirmed:'new_password'}"
                    ref="confirm_password"
                    @blur="anableConfirmErr()">
                  <button type="button" class="c-form--mask__icon fas fa-eye-slash" @click="changePasswordMask('mask2')"></button>
                </div>

                <p class="c-ent__form__error c-text--error" v-if="errors.has('confirm_password') && confirmed">{{errors.first('confirm_password')}}</p>

                <div class="c-ent__btn u-text--center">
                  <button class="c-btn--default" type="submit" @click="anableConfirmErr()">{{ $tc('common.btn.next') }}</button>
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
import vSelect from 'vue-select'
import utils from '@/utils'

export default {
  name: 'resetPasswordForced',
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
  },
  data () {
    return {
      new_password: null,
      confirm_password: null,
      confirmed: false,
      mask1: 'password',
      mask2: 'password',
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
      userInfo: 'getUserInfo'
    }),
    ...mapGetters('main', {
      pageLang: 'getPageLang'
    })
  },
  methods: {
    ...mapMutations('auth', {
      clearChangePasswordFlag: 'clearChangePasswordFlag',
      logout: 'logout'
    }),
    ...mapMutations('main', {
      changePageLang: 'changePageLang'
    }),
    ...mapActions('user', {
      changePassword: 'changePassword'
    }),
    /**
     * パスワード入力直後に、パスワード（確認）にエラーが表示されることを回避する
     *    パスワード（確認）からフォーカスを外した時点でconfirmedがtrueになり、
     *    以降はエラーが表示されるようになる
     */
    anableConfirmErr () {
      this.confirmed = true
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
    /**
     * パスワード変更処理
     */
    resetPassword (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const userPassword = JSON.parse(utils.getStrage('password'))
          this.changePassword({
            oldPassword: userPassword,
            password: this.new_password
          })
            .then(() => {
              this.clearChangePasswordFlag()
              this.logout()
              this.$router.push({name: 'LoginPage'})
            })
            .catch(err => {
              if (err.response && err.response.data && err.response.data.errors && err.response.data.errors[0]) {
                this.cgangeError = err.response.data.errors[0].detail
              }
            })
        }
      })
    }
  }
}
</script>
