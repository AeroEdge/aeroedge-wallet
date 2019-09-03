<template>
  <div class="l-qrWrapper">
    <div class="l-qrWrapper__inner--main">
      <router-view />
    </div>
    <ErrorModal />
  </div>
</template>

<script>
import ErrorModal from '@/components/modal/Error'
export default {
  name: 'QRLayout',
  components: {
    ErrorModal
  }
}
</script>
