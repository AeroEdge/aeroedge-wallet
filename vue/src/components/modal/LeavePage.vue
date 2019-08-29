<template>
    <defaultModal name="pageTransition">
      <template slot="header">
        <h3 class="c-title--h3">
          {{$tc('common.modal.transition_page.title')}}
        </h3>
      </template>
      <template slot="content">
        <p>{{$tc('common.modal.transition_page.txt')}}</p>
      </template>
      <template slot="footer">
        <button class="c-btn--off u-mr--20px" @click="closeModal">{{$tc('common.btn.cancel')}}</button><button class="c-btn--default" @click="backPage(pageName)">{{$tc('common.btn.transition')}}</button>
      </template>
    </defaultModal>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import defaultModal from '@/components/modal/DefaultModal'

export default {
  name: 'LeavePage',
  props: ['pageName'],
  components: {
    defaultModal
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations('defaultModal', {
      closeModal: 'closeModal'
    }),
    ...mapMutations('auth', {
      logout: 'logout',
      changeTimeoutFlag: 'changeTimeoutFlag'
    }),
    ...mapActions('auth', {
      timeout: 'timeout'
    }),
    backPage (val) {
      this.closeModal()
      this.$router.push({name: val})
    }
  }
}
</script>
