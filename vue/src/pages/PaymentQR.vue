<template>
  <div class="c-main qrread">
    <div class="c-main--wrapper">
      <div class="c-main--wrapper__inner">
        <div class="qrReader c-main__payment__qrview">
          <qrcode-stream :paused="paused" @init="onInit" @decode="onDecode"></qrcode-stream>
        </div>
        <p class="c-main__payment__qrread">{{ $tc('payment.qrread') }}</p>
      </div><!-- c-main--wrapper__inner -->
    </div><!-- c-main--wrapper -->
  </div><!-- c-main-->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'PaymentQR',
  data () {
    return {
      paused: false
    }
  },
  computed: {
    ...mapGetters('merchants', {
      shopDetails: 'getShopDetails'
    })
  },
  methods: {
    ...mapMutations('transaction', {
      setTargetMerchInfo: 'setTargetMerchInfo'
    }),
    ...mapActions('merchants', {
      requestShopDetails: 'requestShopDetails'
    }),
    afterComplete () {
      this.paymentCoinAmount = ''
      this.closeModal()
      this.requestMyBalance()
    },
    async onInit (promise) {
      // show loading indicator
      try {
        await promise
        // successfully initialized
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
        } else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
        } else {
          // browser is probably lacking features (WebRTC, Canvas)
        }
      } finally {
        // hide loading indicator
      }
    },
    onDecode (content) {
      this.paused = true
      let contentArr = content.split(',')
      let merchID = contentArr[0].split('=')
      let fixedMerchID = merchID[1].replace(' ', '')
      let amaountID = contentArr[1].split('=')
      let fixedAmaountID = amaountID[1].replace(' ', '')
      localStorage.setItem('refAmount', fixedAmaountID)
      location.href = location.href.slice(0, -2) + 'Mart'
      this.requestShopDetails(fixedMerchID)
        .then(() => {
          this.setTargetMerchInfo({merchID: fixedMerchID, merchName: this.shopDetails.shop_name})
          this.$router.push({name: 'PaymentInput'})
        })
    }
  }
}
</script>
