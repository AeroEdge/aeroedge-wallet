<template>
  <transition name="fade">
  <div class="c-modal open" v-if="modalName !== '' && modalName === targetModal">
    <div class="c-modal__ovarlay" @click="closeModal"></div>
    <div class="c-modal__modal" :class="{'detail': name === 'detail'}">
      <div class="c-modal__body" :class="{'c-modal__body__detail': name === 'detail'}">
        <div class="c-modal__header">
          <slot name="header"></slot>
        </div>
        <div class="c-modal__content" :class="{'c-modal__content__detail': name === 'detail'}">
          <slot name="content"></slot>
        </div>
        <footer class="c-modal__footer">
          <slot name="footer">
            <button class="c-btn--default" @click="closeModal">{{$tc('common.btn.close')}}</button>
          </slot>
        </footer>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'defaultModal',
  props: [
    'name'
  ],
  data () {
    return {
      targetModal: ''
    }
  },
  created: function () {
    this.targetModal = this.name
  },
  computed: {
    ...mapGetters('defaultModal', {
      modalName: 'getModalName'
    })
  },
  methods: {
    ...mapMutations('defaultModal', {
      closeModal: 'closeModal'
    })
  }
}
</script>
