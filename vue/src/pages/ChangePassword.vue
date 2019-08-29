<template>
  <div class="c-ent">
    <div class="c-ent--wrapper">
      <div class="c-ent__lang" id="lang">
        <v-select v-model="selectSelected" :options="selectOptions" :change="changeLang(selectSelected)"></v-select>
      </div>
      <div class="c-ent--wrapper__inner u-mt--10px">
        <div class="c-ent--box u-pt--0px">
          <button type="button" class="c-btn--back" @click="backPage"></button>
          <div class="c-ent--box__inner">
          <p class="c-ent__title__sub">{{ $tc('changePassword.title') }}</p>

            <div class="c-ent__inner">
              <div class="c-ent__note">
                <p>{{$tc('password_rule.title')}}</p>
                <p>{{$tc('password_rule.list1')}}<br>
                    {{$tc('password_rule.list2')}}</p>
              </div>
              <form @submit.prevent="openConfirm" class="c-ent__form">
              <div class="c-ent__label">
                <div class="c-form--mask">
                  <input
                    :type="mask1"
                    name="oldPassword"
                    class="c-ent__form__input"
                    :placeholder="$tc('changePassword.old_password')"
                    id="oldPasswordForm"
                    v-validate="{required: 'required', min:7, max:32, regex:/(?!(^[a-zA-Z]+$)|(^[0-9]+$)|(^[!-/:-@[-`{-~]+$))(^[a-zA-Z0-9!-/:-@[-`{-~]+$)/}"
                    :data-vv-as="$tc('changePassword.old_password')"
                    data-vv-validate-on="blur"
                    v-model="oldPassword"
                    ref="oldPassword"
                    @blur="showError()">
                  <button type="button" class="c-form--mask__icon fas fa-eye-slash" @click="changePasswordMask('oldPasswordForm')"></button>
                </div>

                <p class="c-ent__form__error c-text--error" v-show="errors.has('oldPassword')">{{errors.first('oldPassword')}}</p>
                <p class="c-ent__form__error c-text--error" v-show="!errors.has('oldPassword') && errorMsg">{{ $tc('changePassword.error') }}</p>

                <div class="c-form--mask u-mt--40px">
                  <input
                    :type="mask2"
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
                  <button type="button" class="c-form--mask__icon fas fa-eye-slash" @click="changePasswordMask('NewPasswordForm')"></button>
                </div>

                  <p class="c-ent__form__error c-text--error" v-if="errors.has('new_password')">{{errors.first('new_password')}}</p>

                <div class="c-form--mask u-mt--40px">
                  <input
                    :type="mask3"
                    name="confirm_password"
                    value="" id="ConfirmPasswordForm"
                    class="c-ent__form__input"
                    :placeholder="$tc('changePassword.confirm_password')"
                    v-validate="{
                      required: 'required',
                      min:7,
                      max:32,
                      regex:/(?!(^[a-zA-Z]+$)|(^[0-9]+$)|(^[!-/:-@[-`{-~]+$))(^[a-zA-Z0-9!-/:-@[-`{-~]+$)/,
                      confirmed:'new_password'}"
                    :data-vv-as="$tc('changePassword.confirm_password')"
                    data-vv-validate-on="blur"
                    v-model="confirm_password"
                    @blur="anableConfirmErr()">
                  <button type="button" class="c-form--mask__icon fas fa-eye-slash" @click="changePasswordMask('ConfirmPasswordForm')"></button>
                </div>

                <p class="c-ent__form__error c-text--error" v-if="errors.has('confirm_password') && confirmed">{{errors.first('confirm_password')}}</p>
                </div>

                <div class="c-ent__btn u-text--center">
                  <button class="c-btn--default" type="submit" @click="anableConfirmErr()">{{$tc('common.btn.next')}}</button><button class="c-link--default u-color--inherit u-mt--20px" type="button" @click="backPage">{{$tc('common.btn.cancel')}}</button>
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

export default {
  name: 'ChangePassword',
  components: {
    vSelect
  },
  data () {
    return {
      oldPassword: null,
      new_password: null,
      confirm_password: null,
      mask1: 'password',
      mask2: 'password',
      mask3: 'password',
      confirmed: false,
      selectOptions: [
        {id: '', label: ''}
      ],
      selectSelected: {id: 'ja', label: '日本語'}
    }
  },
  created: function () {
    this.changePageTitle(this.$tc('changePassword.title'))
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
  computed: {
    ...mapGetters('main', {
      pageTitle: 'getPageTitle',
      errorMsg: 'getErrorMsg',
      pageLang: 'getPageLang'
    })
  },
  methods: {
    ...mapMutations('auth', {
      logout: 'logout',
      changeTimeoutFlag: 'changeTimeoutFlag'
    }),
    ...mapMutations('defaultModal', {
      openModal: 'openModal',
      closeModal: 'closeModal'
    }),
    ...mapMutations('form', {
      changePasswordMask: 'changePasswordMask'
    }),
    ...mapMutations('main', {
      changePageTitle: 'changePageTitle',
      setErrorMsg: 'setErrorMsg',
      changePageLang: 'changePageLang'
    }),
    ...mapMutations('user', {
      setOldPassword: 'setOldPassword',
      setPassword: 'setPassword',
      setChangeType: 'setChangeType'
    }),
    ...mapActions('auth', {
      timeout: 'timeout'
    }),
    anableConfirmErr () {
      this.confirmed = true
    },
    backPage () {
      this.$router.push({name: 'Top'})
    },
    // 言語設定切り替え
    changeLang (lang) {
      this.$i18n.locale = lang.id
      this.changePageLang(lang.id)
    },
    openConfirm () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.openModal('passwordConfirm')
          this.setOldPassword(this.oldPassword)
          this.setPassword(this.new_password)
          this.setChangeType('normal')
        }
      })
    },
    showError () {
      this.setErrorMsg('')
    }
  }
}
</script>
