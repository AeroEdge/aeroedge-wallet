<template>
  <div class="l-bottom-menu">
    <nav>
      <ul class="l-bottom-menu__list">
        <div class="l-bottom-menu__list__topic">
          <ul class="l-bottom-menu__list__select">
            <li @click="changeMenuOpenFlag('top')">
              <router-link :to="{ name: 'Top'}" >
                <img class="u-w--100per" src="../assets/images/icon_home.svg" alt="home" v-if="menuOpen !== 'top'">
                <img class="u-w--100per" src="../assets/images/icon_home_select.svg" alt="home" v-else>
                <span class="l-bottom-menu__list__text" :class="{'notSelect': menuOpen !== 'top'}">{{$tc('common.menu.home')}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="l-bottom-menu__list__topic">
          <ul class="l-bottom-menu__list__select">
            <li @click="changeMenuOpenFlag('history')">
              <router-link :to="{ name: 'SalesHistory'}" >
                <img src="../assets/images/icon_history.svg" alt="history" v-if="menuOpen !== 'history'">
                <img src="../assets/images/icon_history_select.svg" alt="history" v-else>
                <span class="l-bottom-menu__list__text" :class="{'notSelect': menuOpen !== 'history'}">{{$tc('common.menu.history')}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="l-bottom-menu__list__topic">
          <ul class="l-bottom-menu__list__select">
            <li @click="changeMenuOpenFlag('shop')">
              <router-link :to="{ name: 'Merchants'}" >
                <img src="../assets/images/icon_shop.svg" alt="shop" v-if="menuOpen !== 'shop'">
                <img src="../assets/images/icon_shop_select.svg" alt="shop" v-else>
                <span class="l-bottom-menu__list__text" :class="{'notSelect': menuOpen !== 'shop'}">{{$tc('common.menu.merchants')}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="l-bottom-menu__list__topic">
          <ul class="l-bottom-menu__list__select">
            <li @click="changeMenuOpenFlag('setting')">
              <router-link :to="{ name: 'Settings'}">
                <img src="../assets/images/icon_setting.svg" alt="setting" v-if="menuOpen !== 'setting'">
                <img src="../assets/images/icon_setting_select.svg" alt="setting" v-else>
                <span class="l-bottom-menu__list__text" :class="{'notSelect': menuOpen !== 'setting'}">{{$tc('common.menu.settings')}}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'BottomMenu',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('bottomMenu', {
      menuOpen: 'getMenuOpenFlag'
    })
  },
  methods: {
    ...mapMutations('bottomMenu', {
      changeMenuOpenFlag: 'changeMenuOpenFlag'
    })
  }
}
</script>
