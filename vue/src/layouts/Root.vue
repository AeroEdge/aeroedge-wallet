<template>
  <div>
    <router-view />
    <ChangePasswordConfirmModal />
    <ChangePasswordCompleteModal />
    <ErrorModal />
    <SaveCompleteModal />
  </div>
</template>

<script>
import ChangePasswordConfirmModal from '@/components/modal/ChangePasswordConfirm'
import ChangePasswordCompleteModal from '@/components/modal/ChangePasswordComplete'
import ErrorModal from '@/components/modal/Error'
import SaveCompleteModal from '@/components/modal/SaveComplete'

export default {
  name: 'RootLayout',
  components: {
    ChangePasswordConfirmModal,
    ChangePasswordCompleteModal,
    ErrorModal,
    SaveCompleteModal
  }
}
</script>
