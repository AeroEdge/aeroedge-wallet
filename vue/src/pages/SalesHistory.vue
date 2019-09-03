<template>
  <div class="c-ent">
    <div class="c-ent--wrapper">
      <div class="c-ent--header">
        <div class="c-ent__lang history" id="lang">
          <v-select v-model="selectSelected" :options="selectOptions" :change="changeLang(selectSelected)"></v-select>
        </div>
        <div class="c-ent--header__label">
          <p class="u-mt--0px u-mb--0px">{{ $tc('common.label.balance') }}</p>
          <p class="u-mt--10px u-mb--15px">{{ balance.total | addDelimiter }} COINS</p>
        </div>
      </div>
      <div class="c-ent--wrapper__inner u-pt--0px">
        <div class="c-ent--box u-pt--20px payment">
          <div class="c-ent--box__inner">
          <p class="c-ent__title__sub">{{ $tc('salesHistory.title') }}</p>

            <div class="c-ent__inner payment">
              <div v-if="historyList.entries && historyList.entries.length">
                <ul class="c-top__list">
                  <li class="c-top__list__data" v-for="item in historyList.entries" :key="item.id" @click="openDetail(item)">
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
                    <div class="c-text--transaction plus" v-else>+ {{ item.currencies.edge | addDelimiter }} COINS</div>
                  </li>
                </ul>
              </div>
              <div class="u-text--center" v-else>
                <p>{{ $tc('salesHistory.no_data') }}</p>
              </div>
            </div>
          </div><!-- c-ent--box__inner -->
          <div class="c-top__btn__home">
            <router-link :to="{ name: 'Top'}" >
              <button class="c-btn--home" type="button"><img src="../assets/images/ae_icon_home.svg" alt="backspace"></button>
            </router-link>
          </div>
        </div><!-- c-ent--box -->
      </div><!-- c-ent--wrapper__inner -->
    </div><!-- c-ent--wrapper -->

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

  </div><!-- c-ent-->
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import defaultModal from '@/components/modal/DefaultModal'
import vSelect from 'vue-select'

export default {
  name: 'SalesHistory',
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
    this.requestHistory({type: 'all', target: this.userInfo.userId})
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
    ...mapActions('history', {
      requestHistory: 'requestHistory'
    }),
    backPage () {
      this.$router.push({name: 'Top'})
    },
    // 言語設定切り替え
    changeLang (lang) {
      this.$i18n.locale = lang.id
      this.changePageLang(lang.id)
    },
    openDetail (val) {
      if (val.type === 'redeem') {
        this.selectedDetail.title = this.$tc('salesHistory.content.lunch')
      } else if (val.type === 'payment') {
        this.selectedDetail.title = this.$tc('salesHistory.content.AEMart')
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
