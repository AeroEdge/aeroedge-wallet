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

            <!-- Recover your account step1 -->
            <div class="c-ent__inner" v-if="recoverFlag">
              <p class="c-ent__title">{{ $tc('resetPasswordForced.step1.title') }}</p>
              <form @submit.prevent="recoverPasswordSendMail" class="c-ent__form">
              <div class="c-ent__label">
                <div class="c-ent__text">
                  <p>{{ $tc('resetPasswordForced.step1.txt1') }}</p>
                </div>
                    <input
                      type="text"
                      name="content"
                      value=""
                      id="userForm"
                      class="c-ent__form__input"
                      :placeholder="$tc('resetPasswordForced.email_userid')"
                      :data-vv-as="$tc('common.label.address_id')"
                      data-vv-validate-on="blur"
                      v-model="content"
                      v-validate="{
                        required: 'required'}">

                    <p class="c-ent__form__error c-text--error" v-if="errors.has('content')">{{errors.first('content')}}</p>
                  </div>

                  <div class="c-ent__btn u-text--center">
                    <button class="c-btn--default" type="submit">{{$tc('common.btn.next')}}</button><button class="c-link--default u-color--inherit u-mt--20px" type="button" @click="backPage">{{$tc('common.btn.cancel')}}</button>
                  </div>
              </form>
            </div>

            <!-- Recover your account step2 -->
            <div class="c-ent__inner" v-if="verifyFlag">
              <div class="c-ent__label__mail">
                <p class="c-ent__title">{{ $tc('resetPasswordForced.step2.title') }}</p>
                <div class="c-ent__text">
                  <p>{{ $tc('resetPasswordForced.step2.txt1') }}</p>
                  <p class="u-mt--20px" v-html="$tc('resetPasswordForced.step2.txt2')"></p>
                </div>
                <div class="u-text--center">
                  <button type="button" class="c-link--default u-font--15px" @click="backPage">{{ $tc('common.btn.to_login') }}</button>
                </div>
              </div>
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

export default {
  name: 'resetPasswordRecover',
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
  beforeDestroy: function () {
    this.setErrorMsg('')
  },
  data () {
    return {
      content: '',
      recoverFlag: true,
      verifyFlag: false,
      loginError: null,
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
    /**
     * パスワード回復用のメールを送信
     */
    recoverPasswordSendMail (e) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.recoverPassword(this.content)
            .then((res) => {
              this.recoverFlag = false
              this.verifyFlag = true
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
