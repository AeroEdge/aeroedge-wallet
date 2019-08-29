<template>
<div class="c-plug-in--vselect" :class="this.className">
  <v-select
  v-if="flag"
  :name="name"
  v-model="select.selectSelected"
  :options="select.selectOptions"
  :class="{ disabled: this.disabled }"
  @input="changeSelected($event, 'active_peaple')"
  :get-option-label="getLabel"
  ></v-select>
</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import vSelect from 'vue-select'
// import { i18n } from '../../main.js'

export default {
  name: 'SelectBox',
  props: [
    'content',
    'className',
    'disabled',
    'default',
    'name',
    'searchId'
  ],
  components: {
    vSelect
  },
  data () {
    return {
      select: {
        selectOptions: {},
        selectSelected: {}
      },
      flag: false,
      locale: this.$i18n.locale,
      form: {
        active_peaple: null
      }
    }
  },
  created: function () {
    // デフォルト指定設定がある場合
    let sendDefault = ''
    if (this.default) {
      sendDefault = this.default
    }

    switch (this.content) {
      case 'merchants':
        this.requestUserInfo({authority: 'merchant', isActive: true})
          .then(res => {
            this.createList(this.userInfo)
            this.flag = true
          })
        break
      case 'developers':
        this.requestUserInfo({authority: 'developer', isActive: true})
          .then(res => {
            this.createList(this.userInfo, sendDefault)
            this.flag = true
          })
        break
      case 'consumerStatus':
        this.select.selectOptions = [
          {id: 1, label: '活動中ユーザー'},
          {id: 2, label: '削除済ユーザー'}
        ]
        this.addDefault(1)
        break
      case 'merchantStatus':
        this.select.selectOptions = [
          {id: 1, label: '活動中加盟店'},
          {id: 2, label: '削除済加盟店'}
        ]
        this.addDefault(1)
        break
      case 'developerStatus':
        this.select.selectOptions = [
          {id: 1, label: '活動中加盟店運営会社'},
          {id: 2, label: '削除済加盟店運営会社'}
        ]
        this.addDefault(1)
        break
      case 'chargeType':
        this.select.selectOptions = [
          {id: 1, label: '全て'},
          {id: 'monthly-charge', label: '福利厚生'},
          {id: 'ssnb-charge', label: '住信SBIネット銀行'}
        ]
        this.addDefault(1)
        break
      case 'language':
        this.select.selectOptions = [
          {id: 1, label: '日本語'},
          {id: 2, label: 'English'}
        ]
        this.addDefault(1)
        break
      case 'status':
        this.select.selectOptions = this.$t('select.status.items')
        this.addDefault(1)
        break
      case 'term':
        this.select.selectOptions = this.$t('select.term.items')
        this.addDefault(1)
        break
      case 'frequency':
        this.select.selectOptions = this.$t('select.frequency.items')
        this.addDefault(sendDefault)
        break
      case 'statement_delivery_method':
        this.select.selectOptions = this.$t('select.statement_delivery_method.items')
        this.addDefault(sendDefault)
        break
      case 'account_type':
        this.select.selectOptions = this.$t('select.account_type.items')
        this.addDefault(sendDefault)
        break
      case 'shop_category':
        this.select.selectOptions = this.$t('select.shop_category.items')
        this.requestShopDetail({shop_id: this.authUserInfo.userId})
          .then(res => {
            if (this.shopInfo) {
              this.addDefault(this.shopInfo[0].category)
            }
          })
        break
    }
    this.addDisabled()
  },
  computed: {
    ...mapGetters('history', {
      merchants: 'getMerchants'
    }),
    ...mapGetters('user', {
      userInfo: 'getUserInfo'
    }),
    ...mapGetters('data', {
      detailData: 'getDataDetails'
    }),
    ...mapGetters('selectbox', {
      selectedFlag: 'getSelectedFlag'
    }),
    ...mapGetters('main', {
      pageLang: 'getPageLang'
    }),
    ...mapGetters('shop', {
      shopInfo: 'getShopInfo'
    }),
    ...mapGetters('auth', {
      authUserInfo: 'getUserInfo'
    }),
    locales () {
      return this.$i18n.locale
    }
  },
  methods: {
    ...mapMutations('main', {
      changePageLang: 'changePageLang'
    }),
    ...mapMutations('selectbox', {
      setSelected: 'setSelected',
      setSelectedAdd: 'setSelectedAdd',
      getNowSelected: 'getNowSelected',
      setSelectedFlag: 'setSelectedFlag'
    }),
    ...mapActions('data', {
      requestDataDetails: 'requestDataDetails'
    }),
    ...mapActions('user', {
      requestUserInfo: 'requestUserInfo'
    }),
    ...mapActions('shop', {
      requestShopDetail: 'requestShopDetail'
    }),
    ...mapActions('history', {
      requestmerchants: 'requestmerchants'
    }),
    getLabel (option) {
      let label = option.label

      switch (this.content) {
        case 'term':
        case 'frequency':
        case 'statement_delivery_method':
        case 'account_type':
          let index = this.select.selectOptions.findIndex(({id}) => id === option.id)
          if (index !== -1) {
            label = this.$t('select.' + this.content + '.items')[index].label
          }
          break
      }

      return label
    },
    getTargetSelectedFlag () {
      let name = this.content
      return this.selectedFlag[name]
    },
    addDefault (val) {
      let idName = val
      if (idName) {
        let index = this.select.selectOptions.findIndex(({id}) => id === idName)
        this.select.selectSelected = this.select.selectOptions[index]
        this.flag = true
      } else {
        this.flag = true
      }
    },
    addDisabled () {
      if (this.disabled) {
        for (let i = 0; i < this.select.selectOptions.length; i++) {
          this.select.selectOptions[i]['disabled'] = true
        }
      }
    },
    createList (data, defaultID) {
      let options = []
      let selected = [{id: '', label: 'なし'}]

      if (this.content === 'merchants') {
        selected = [{id: '', label: '全て'}]
        options.push({id: '', label: '全て'})
        for (let i = 0; i < data.users.length; i++) {
          options.push({id: data.users[i].user_id, label: data.users[i].user_id + '/' + data.users[i].company})
          if (defaultID === data.users[i].user_id) {
            selected = [{id: data.users[i].user_id, label: data.users[i].user_id + '/' + data.users[i].company}]
          }
        }
      } else {
        options.push({id: '', label: 'なし'})
        for (let i = 0; i < data.users.length; i++) {
          options.push({id: data.users[i].user_id, label: data.users[i].user_id + '/' + data.users[i].company})
          if (defaultID === data.users[i].user_id) {
            selected = [{id: data.users[i].user_id, label: data.users[i].user_id + '/' + data.users[i].company}]
          }
        }
      }

      this.select.selectOptions = options
      this.select.selectSelected = selected
    },
    changeSelected (vals, keyName) {
      this.form[keyName] = vals
      this.setSelected({target: this.content, data: this.select.selectSelected})
    }
  }
}
</script>
