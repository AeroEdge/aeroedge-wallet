<template>
  <div class="c-ent">
    <div class="c-ent--wrapper">
      <div class="c-ent__lang" id="lang">
        <v-select v-model="selectSelected" :options="selectOptions" :change="changeLang(selectSelected)"></v-select>
      </div>
      <div class="c-ent--wrapper__inner u-mt--10px">
        <div class="c-ent--box u-pt--0px u-pb--30px">
          <button type="button" class="c-btn--back" @click="backPage"></button>
          <div class="c-ent--box__inner">
          <p class="c-ent__title__sub"><span class="c-ent__payment__label">{{ $tc('payment.balance') }}</span>{{ balance.total | addDelimiter }} COINS</p>

            <div class="c-ent__inner">
              <form @submit.prevent="openConfirmModal">
              <p class="c-ent__amount__label">{{ $tc('payment.amount') }}</p>
              <div class="c-ent__amount">
                <input type="number" step="any" id="coinAmountForm" name="paymentCoinAmount" class="c-form--coinAmount" v-validate="{required: 'required'}" :data-vv-as="$tc('payment.input_amount')" data-vv-validate-on="none" v-model="paymentCoinAmount" readonly>
                <label for="coinAmountForm">COINS</label>
              </div>
              <p class="c-ent__form__error c-text--error" v-if="errors.has('paymentCoinAmount')">{{errors.first('paymentCoinAmount')}}</p>
              <p class="c-ent__form__error c-text--error" v-if="!errors.has('paymentCoinAmount') && shortageFlag">{{$tc('payment.shortage_error')}}</p>
              <ul class="c-ent__inner__tenkey">
                <li><button type="button" @click="inputPaymentCoinAmount('1')">1</button></li>
                <li><button type="button" @click="inputPaymentCoinAmount('2')">2</button></li>
                <li><button type="button" @click="inputPaymentCoinAmount('3')">3</button></li>
                <li><button type="button" @click="inputPaymentCoinAmount('4')">4</button></li>
                <li><button type="button" @click="inputPaymentCoinAmount('5')">5</button></li>
                <li><button type="button" @click="inputPaymentCoinAmount('6')">6</button></li>
                <li><button type="button" @click="inputPaymentCoinAmount('7')">7</button></li>
                <li><button type="button" @click="inputPaymentCoinAmount('8')">8</button></li>
                <li><button type="button" @click="inputPaymentCoinAmount('9')">9</button></li>
                <li><button type="button"></button></li>
                <li><button type="button" @click="inputPaymentCoinAmount('0')">0</button></li>
                <li><button type="button" @click="backSpace"><img src="../assets/images/backspace.svg" alt="backspace"></button></li>
              </ul>
              <div class="c-ent__btn u-text--center u-mt--0px">
                <button class="c-btn--default" type="submit">{{ $tc('common.btn.next') }}</button>
              </div>
              </form>
            </div>

          </div><!-- c-ent--box__inner -->
        </div><!-- c-ent--box -->
      </div><!-- c-ent--wrapper__inner -->
    </div><!-- c-ent--wrapper -->

    <defaultModal name="paymentConfirm">
      <template slot="header">
        <h3 class="c-title--h3">
          {{$tc('common.modal.payment_amount')}}
        </h3>
      </template>
      <template slot="content">
        <p class="u-font--30px"><span class="u-font--40px">{{ paymentCoinAmount | addDelimiter }}</span> <span v-if="paymentCoinAmount === '1'">COIN</span><span v-else>COINS</span></p>
      </template>
      <template slot="footer">
        <button class="c-btn--off u-mr--20px" @click="closeModal">{{$tc('common.btn.cancel')}}</button>
        <button class="c-btn--default" @click.once="payment">{{$tc('common.btn.confirm')}}</button>
      </template>
    </defaultModal>

    <defaultModal name="issueComplete">
      <template slot="header">
        <h3 class="c-title--h3 c-icon--complete">
            <template>{{$tc('common.modal.payment_complete')}}</template>
        </h3>
      </template>
      <template slot="content">
        <p>{{$tc('common.modal.complete_amount')}} {{ paymentCoinAmount | addDelimiter }} <span v-if="paymentCoinAmount === '1'">COIN</span><span v-else>COINS</span></p>
      </template>
      <template slot="footer">
        <router-link :to="{ name: 'Top'}" >
          <button class="c-btn--default" @click="afterComplete">OK</button>
        </router-link>
      </template>
    </defaultModal>

  </div><!-- c-ent-->

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import defaultModal from '@/components/modal/DefaultModal'
import vSelect from 'vue-select'

export default {
  name: 'Payment',
  components: {
    defaultModal,
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
    this.requestMyBalance()
  },
  data () {
    return {
      paymentCoinAmount: '',
      shortageFlag: false,
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
    ...mapGetters('auth', {
      timeoutFlag: 'getTimeoutFlag'
    }),
    ...mapGetters('balance', {
      balance: 'getMyBalance'
    }),
    ...mapGetters('main', {
      pageLang: 'getPageLang'
    })
  },
  methods: {
    ...mapMutations('auth', {
      changeTimeoutFlag: 'changeTimeoutFlag'
    }),
    ...mapMutations('defaultModal', {
      openModal: 'openModal',
      closeModal: 'closeModal'
    }),
    ...mapMutations('main', {
      changePageLang: 'changePageLang'
    }),
    ...mapActions('balance', {
      requestMyBalance: 'requestMyBalance'
    }),
    ...mapActions('transaction', {
      requestTransaction: 'requestTransaction'
    }),
    afterComplete () {
      this.paymentCoinAmount = ''
      this.closeModal()
      this.requestMyBalance()
    },
    backPage () {
      this.$router.push({name: 'Top'})
    },
    backSpace () {
      if (this.paymentCoinAmount === '') return false
      this.paymentCoinAmount = this.paymentCoinAmount.slice(0, -1)
    },
    // 言語設定切り替え
    changeLang (lang) {
      this.$i18n.locale = lang.id
      this.changePageLang(lang.id)
    },
    inputPaymentCoinAmount (val) {
      if (val === '0' && this.paymentCoinAmount === '') return false
      this.paymentCoinAmount += val
    },
    payment () {
      this.requestTransaction({
        type: 'redeem',
        amount: this.paymentCoinAmount
      })
        .then((res) => {
          this.openModal('issueComplete')
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.errors && err.response.data.errors[0]) {
            this.closeModal()
            this.setErrorMsg(err.response.data.errors[0].detail)
          }
        })
    },
    openConfirmModal () {
      this.$validator.validateAll().then((result) => {
        let diff = parseInt(this.balance.total) - parseInt(this.paymentCoinAmount)
        if (diff < 0) {
          this.shortageFlag = true
        } else {
          this.shortageFlag = false
        }

        if (result && !this.shortageFlag) {
          this.openModal('paymentConfirm')
        }
      })
    }
  }
}
</script>
