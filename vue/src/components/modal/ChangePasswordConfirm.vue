<template>
    <defaultModal name="passwordConfirm">
        <template slot="header">
        <h3 class="c-title--h3">
            <template>{{$tc('common.modal.password.confirm.title')}}</template>
        </h3>
        </template>
        <template slot="content">
        <p>{{$tc('common.modal.password.confirm.txt1')}}</p>
        <p>{{$tc('common.modal.password.confirm.txt2')}}</p>
        </template>
        <template slot="footer">
        <button class="c-btn--off u-mr--20px" @click="closeModal">{{$tc('common.btn.cancel')}}</button>
        <button class="c-btn--default" @click.once="resetPassword">{{$tc('common.btn.ok')}}</button>
        </template>
    </defaultModal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import defaultModal from '@/components/modal/DefaultModal'

export default {
  name: 'ChangePasswordConfirm',
  components: {
    defaultModal
  },
  data () {
    return {
      ErrorMsg: null
    }
  },
  computed: {
    ...mapGetters('user', {
      oldPassword: 'getOldPassword',
      password: 'getPassword',
      changeType: 'getChangeType'
    })
  },
  methods: {
    ...mapMutations('defaultModal', {
      openModal: 'openModal',
      closeModal: 'closeModal'
    }),
    ...mapMutations('main', {
      setErrorMsg: 'setErrorMsg'
    }),
    ...mapMutations('auth', {
      logout: 'logout',
      changeTimeoutFlag: 'changeTimeoutFlag'
    }),
    ...mapActions('auth', {
      timeout: 'timeout'
    }),
    ...mapActions('user', {
      changePassword: 'changePassword'
    }),
    resetPassword (e) {
      this.timeout()
        .then(res => {
          if (res === true) {
            this.logout()
            this.changeTimeoutFlag(true)
            this.$router.push({name: 'LoginPage'})
          } else {
            this.changePassword({
              oldPassword: this.oldPassword,
              password: this.password,
              changeType: this.changeType
            })
              .then(() => {
                this.openModal('passwordComplete')
              })
              .catch(err => {
                if (err.response && err.response.data) {
                  this.setErrorMsg(err.response.data.detail)
                }
              })
          }
        })
    }
  }
}
</script>
