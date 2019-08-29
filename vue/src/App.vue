<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  watch: {
    '$route': function (to, from) {
      this.changeMenuOpenFlag(false)
      this.changeSearchFlag(false)
    }
  },
  methods: {
    ...mapMutations('header', {
      changeSiteType: 'changeSiteType'
    }),
    ...mapMutations('sideMenu', {
      changeMenuOpenFlag: 'changeMenuOpenFlag'
    }),
    ...mapMutations('history', {
      changeSearchFlag: 'changeSearchFlag'
    })
  }
}
</script>

<style lang="scss">
@import "./assets/scss/style";
#app{
  height: 100%;
}
</style>
