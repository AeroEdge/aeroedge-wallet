<template>
  <div class="c-top">
    <div class="c-top--wrapper">
      <div class="c-top--header">
        <button @click="changeMenuOpenFlag(true)" class="c-top__menu-btn u-mt--20px">
          <span class="fas fa-bars"></span>
        </button>
        <div class="c-top__lang" id="lang">
          <v-select v-model="selectSelected" :options="selectOptions" :change="changeLang(selectSelected)"></v-select>
        </div>
        <div class="c-top--header__label">
          <p class="u-mt--0px u-mb--0px">{{ $tc('common.label.balance') }}</p>
          <p class="u-mt--10px">{{ balance.total | addDelimiter }} COINS</p>
        </div>
      </div>
      <div class="c-top--wrapper__inner u-pt--0px">
        <div class="c-top--box">
          <div class="c-top--box__inner">
            <p class="c-top__title__sub">{{ $tc('salesHistory.title') }}</p>

            <div class="c-top__inner">

              <div class="u-mt--20px">
                <ul class="c-top__list">
                  <li class="c-top__list__data" v-for="item in historyList.entries" :key="item.tx_id" @click="openDetail(item)">
                      <div>
                        <span v-if="item.type === 'redeem'">{{ $tc('salesHistory.content.lunch') }}</span>
                        <span v-else-if="item.type === 'payment'">{{ $tc('salesHistory.content.AEMart') }}</span>
                        <span v-else>{{ $tc('salesHistory.content.suggestion') }}</span>
                        <span class="c-icon--type" v-if="item.type === 'redeem'">{{ $tc('salesHistory.type.redeem') }}</span>
                        <span class="c-icon--type" v-else-if="item.type === 'payment'">{{ $tc('salesHistory.type.payment') }}</span>
                        <span class="c-icon--type bonus" v-else>{{ $tc('salesHistory.type.reward') }}</span>
                        <p class="c-text--date">{{ item.created_at }}</p>
                      </div>
                      <div class="c-text--transaction" v-if="item.type === 'redeem'">- {{ item.currencies.edge | addDelimiter }} COINS</div>
                      <div class="c-text--transaction" v-else-if="item.type === 'payment'">- {{ item.currencies.edge | addDelimiter }} COINS</div>
                      <div class="c-text--transaction plus" v-else>+ {{ item.currencies.edge | addDelimiter}} COINS</div>
                  </li>
                </ul>
              </div>

              <div class="c-top__view">
                <router-link :to="{ name: 'SalesHistory'}" >
                  <button class="c-link--view" type="button">{{$tc('common.btn.view_all')}}</button>
                </router-link>
              </div>

            </div>
          </div><!-- c-top--box__inner -->
        </div><!-- c-top--box -->
        <div class="c-top__btn">
          <router-link :to="{ name: 'Payment'}" >
            <button class="c-btn--payment" type="button" style="width: 15px">{{ $tc('common.btn.payment') }}</button>
          </router-link>
          <router-link :to="{ name: 'PaymentQR'}" >
            <button class="c-btn--payment" type="button">{{ $tc('common.btn.paymentQR') }}</button>
          </router-link>
        </div>
      </div><!-- c-top--wrapper__inner -->
    </div><!-- c-top--wrapper -->

    <defaultModal name="detail">
      <template slot="header">
        <h3 class="c-title--h3">
          {{ selectedDetail.title }}
        </h3>
      </template>
      <template slot="content">
        <p class="u-font--30px u-mt--10px u-mb--10px"><span class="u-font--40px">{{ selectedDetail.currencies | addDelimiter }}</span> COINS</p>
        <span class="c-icon--type" v-if="selectedDetail.type === 'redeem'">{{ $tc('salesHistory.type.redeem') }}</span>
        <span class="c-icon--type bonus" v-else>{{ $tc('salesHistory.type.reward') }}</span>
      </template>
      <template slot="footer">
        <hr class="u-hr">
        <p class="c-text--date">Date: {{ selectedDetail.created_at }}</p>
        <p class="c-text--date">Payment ID: {{ selectedDetail.tx_id }}</p>
      </template>
    </defaultModal>

  </div><!-- c-top-->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import defaultModal from '@/components/modal/DefaultModal'
import vSelect from 'vue-select'

export default {
  name: 'Top',
  components: {
    vSelect,
    defaultModal
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
      .then(() => {
        this.requestHistory({type: 'top', target: this.userInfo.userId})
      })
  },
  data () {
    return {
      selectOptions: [
        {id: '', label: ''}
      ],
      selectSelected: {id: 'ja', label: '日本語'},
      selectedDetail: {
        title: '',
        currencies: '',
        type: '',
        created_at: '',
        tx_id: ''
      }
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
      timeoutFlag: 'getTimeoutFlag',
      userInfo: 'getUserInfo'
    }),
    ...mapGetters('balance', {
      balance: 'getMyBalance'
    }),
    ...mapGetters('history', {
      historyList: 'getHistoryList'
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
    ...mapMutations('sideMenu', {
      changeMenuOpenFlag: 'changeMenuOpenFlag'
    }),
    ...mapActions('balance', {
      requestMyBalance: 'requestMyBalance'
    }),
    ...mapActions('history', {
      requestHistory: 'requestHistory'
    }),
    // 言語設定切り替え
    changeLang (lang) {
      this.$i18n.locale = lang.id
      this.changePageLang(lang.id)
    },
    openDetail (val) {
      if (val.type === 'redeem') {
        this.selectedDetail.title = this.$tc('salesHistory.content.lunch')
      } else {
        this.selectedDetail.title = this.$tc('salesHistory.content.suggestion')
      }
      this.selectedDetail.currencies = val.currencies.edge
      this.selectedDetail.type = val.type
      this.selectedDetail.created_at = val.created_at
      this.selectedDetail.tx_id = val.tx_id
      this.openModal('detail')
    }
  }
}
</script>
