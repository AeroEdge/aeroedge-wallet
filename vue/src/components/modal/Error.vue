<template>
    <defaultModal name="error">
      <template slot="header">
        <h3 class="c-title--h3">
          <template>{{$tc('common.modal.error.title')}}</template>
        </h3>
      </template>
      <template slot="content">
        <p>
          <template>{{$tc('common.modal.error.txt')}}</template>
        </p>
      </template>
    </defaultModal>
</template>

<script>
import defaultModal from '@/components/modal/DefaultModal'

export default {
  name: 'Error',
  components: {
    defaultModal
  },
  data () {
    return {}
  }
}
</script>
