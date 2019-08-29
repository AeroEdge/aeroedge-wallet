<template>
    <defaultModal name="passwordComplete">
        <template slot="header">
        <h3 class="c-title--h3 c-icon--complete">
            <template>{{$tc('common.modal.password.complete.title')}}</template>
        </h3>
        </template>
        <template slot="footer">
        <button class="c-btn--default" @click="openLoading">OK</button>
        </template>
    </defaultModal>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import defaultModal from '@/components/modal/DefaultModal'

export default {
  name: 'ChangePasswordComplete',
  components: {
    defaultModal
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations('defaultModal', {
      openModal: 'openModal',
      closeModal: 'closeModal'
    }),
    ...mapMutations('auth', {
      logout: 'logout',
      changeTimeoutFlag: 'changeTimeoutFlag'
    }),
    ...mapActions('auth', {
      timeout: 'timeout'
    }),
    openLoading () {
      this.closeModal()
      this.logout()
      this.$router.push({name: 'LoginPage'})
    }
  }
}
</script>
