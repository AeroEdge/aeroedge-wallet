<template>
  <div class="l-side-menu" :class="{'l-side-menu--is-open': menuOpenFlag}">
    <transition name="fade">
      <div @click="changeMenuOpenFlag(false)" v-if="menuOpenFlag" class="l-side-menu__ovarlay"></div>
    </transition>
      <div class="l-side-menu__modal">
        <h1 class="c-ent__logo">
          <img src="../assets/images/ae_logo.svg" alt="AE">
        </h1>
        <h2>
          <img src="../assets/images/ae_logo_label.svg" alt="AE">
        </h2>
        <nav>
          <ul class="l-side-menu__list">
            <div class="l-side-menu__list__topic">
              <ul class="l-side-menu__list__select">
                <li>
                  <a>
                    <span class="l-side-menu__list__text">{{$tc('common.menu.id')}} {{userInfo.userId}}</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="l-side-menu__list__root">
              <div class="l-side-menu__list__topic home">
                <ul class="l-side-menu__list__select">
                  <li>
                    <router-link :to="{ name: 'Top'}" >
                      <span class="l-side-menu__list__text">{{$tc('common.menu.home')}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
              <hr class="u-hr home">
              <div class="l-side-menu__list__topic">
                <ul class="l-side-menu__list__select">
                  <li>
                    <router-link :to="{ name: 'ChangePassword'}" >
                      <span class="l-side-menu__list__text">{{$tc('common.menu.change_password')}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
              <hr class="u-hr">
              <div class="l-side-menu__list__topic">
                <ul class="l-side-menu__list__select">
                  <li>
                    <router-link :to="{ name: 'Terms'}" >
                      <span class="l-side-menu__list__text">{{$tc('common.menu.terms')}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
              <hr class="u-hr">
              <div class="l-side-menu__list__topic">
                <ul class="l-side-menu__list__select">
                  <li @click="userLogout">
                    <a>
                      <span class="l-side-menu__list__text">{{$tc('common.menu.logout')}}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </nav>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SideMenu',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('sideMenu', {
      menuOpenFlag: 'getMenuOpenFlag',
      listOpen: 'getListOpenFlag'
    }),
    ...mapGetters('auth', {
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    ...mapMutations('sideMenu', {
      changeMenuOpenFlag: 'changeMenuOpenFlag'
    }),
    ...mapMutations('auth', {
      logout: 'logout'
    }),
    userLogout () {
      this.logout()
      this.$router.push({name: 'LoginPage'})
    }
  }
}
</script>
