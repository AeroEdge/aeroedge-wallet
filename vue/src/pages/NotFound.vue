<template>
  <div class="c-ent l-error">
    <div class="c-ent--wrapper">
      <div class="c-ent--wrapper__inner">
        <div class="c-ent--box">
          <div class="c-ent--box__inner">
            <h1 class="c-ent__logo">
              <img src="../assets/images/ae_logo.svg" alt="AE">
            </h1>
            <h2>
              <img src="../assets/images/ae_logo_label.svg" alt="AE">
            </h2>

            <div class="c-ent__inner">
              <h2 class="c-ent__title l-error__ttl">404</h2>
              <p class="l-error__txt--01 u-text--center"><b>Oops!</b></p>
              <div class="c-ent__text u-text--center">
                <p>{{$tc('error.not_found')}}</p>
              </div>
              <div class="c-ent__btn u-text--center l-error__btn">
                <button class="c-btn--default" type="submit" @click="backPage()">{{$tc('common.btn.to_home')}}</button>
              </div>
            </div>
          </div><!-- c-ent--box__inner -->
        </div><!-- c-ent--box -->
      </div><!-- c-ent--wrapper__inner -->
    </div><!-- c-ent--wrapper -->
  </div><!-- c-ent-->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotFound',
  created: function () {
    this.$i18n.locale = this.pageLang
  },
  computed: {
    ...mapGetters('auth', {
      userInfo: 'getUserInfo'
    }),
    ...mapGetters('main', {
      pageLang: 'getPageLang'
    })
  },
  methods: {
    backPage () {
      if (this.userInfo) {
        this.$router.push({name: 'Top'})
      } else {
        this.$router.push({name: 'LoginPage'})
      }
    }
  }
}
</script>
