<template>
    <defaultModal name="loading">
        <template slot="footer">
            <div class="u-text--center">
              <div class="c-icon-loading">
                <div v-for="i in 10" :key="i" class="c-icon-loading__ber"></div>
              </div>
              <p class="c-title--h3 u-mb--0px">Redirecting</p>
            </div>
        </template>
    </defaultModal>
</template>

<script>
import { mapMutations } from 'vuex'
import defaultModal from '@/components/modal/DefaultModal'

export default {
  name: 'Loading',
  components: {
    defaultModal
  },
  data () {
    return {}
  },
  watch: {
    loadStartFlag: function (val) {
      setTimeout(this.loading, 2500)
    }
  },
  methods: {
    ...mapMutations('defaultModal', {
      closeModal: 'closeModal'
    }),
    ...mapMutations('auth', {
      logout: 'logout'
    }),
    loading () {
      this.closeModal()
      this.changeLoadStartFlag(false)
      this.logout()
      this.$router.push({name: 'LoginPage'})
    }
  }
}
</script>
