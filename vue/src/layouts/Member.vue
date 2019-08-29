<template>
  <div class="l-signInWrapper">
    <div class="l-memberWrapper">
      <div class="l-memberWrapper__inner--left">
        <sideMenuComp />
      </div>
    </div>
    <router-view />
    <ChangePasswordConfirmModal />
    <ChangePasswordCompleteModal />
    <ErrorModal />
  </div>
</template>

<script>
import ErrorModal from '@/components/modal/Error'
import sideMenuComp from '@/components/SideMenu'
import ChangePasswordConfirmModal from '@/components/modal/ChangePasswordConfirm'
import ChangePasswordCompleteModal from '@/components/modal/ChangePasswordComplete'

export default {
  name: 'SignInLayout',
  components: {
    ErrorModal,
    sideMenuComp,
    ChangePasswordConfirmModal,
    ChangePasswordCompleteModal
  }
}
</script>
