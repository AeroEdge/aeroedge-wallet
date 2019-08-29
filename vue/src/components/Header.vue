<template>
  <header class="l-header">
  <span class="l-header__container__users__menu__bg" @click="changeUserMenuFlag" :class="{'active': userMenuFlag === true}"></span>
    <button @click="changeMenuOpenFlag(true)" class="l-header__menu-btn">
      <span class="fas fa-bars"></span>
    </button>
    <span></span>
    <div class="l-header__container">
      <div class="l-header__container__users" @click="changeUserMenuFlag" :class="{'active': userMenuFlag === true}">
        <span class="c-icon--user"></span>
        <span class="l-header__container__accountName">{{userInfo.userId}}</span>
        <span class="fas fa-caret-down"></span>
        <div class="l-header__container__users__menu" @click="userLogout()">
          <ul>
            <li><button>{{ $tc('login.logout') }}</button></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {}
  },
  created: function () {
    this.changeSiteType()
  },
  computed: {
    ...mapGetters('auth', {
      userInfo: 'getUserInfo'
    }),
    ...mapGetters('header', {
      siteType: 'getSiteType',
      userMenuFlag: 'getUserMenuFlag'
    }),
    ...mapGetters('main', {
      pageLang: 'getPageLang'
    })
  },
  methods: {
    ...mapMutations('auth', {
      logout: 'logout'
    }),
    ...mapMutations('header', {
      changeSiteType: 'changeSiteType',
      changeUserMenuFlag: 'changeUserMenuFlag'
    }),
    ...mapMutations('sideMenu', {
      changeMenuOpenFlag: 'changeMenuOpenFlag'
    }),
    ...mapMutations('main', {
      changePageLang: 'changePageLang'
    }),
    userLogout () {
      this.logout()
      this.$router.push({name: 'LoginPage'})
    },
    langSelect (lang) {
      this.$i18n.locale = lang
      this.changePageLang(lang)
    }
  }
}
</script>
