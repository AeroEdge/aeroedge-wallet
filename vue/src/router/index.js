// Base
import Vue from 'vue'
import Router from 'vue-router'
import MemberLayout from '@/layouts/Member'
import SignInLayout from '@/layouts/SignIn'


// Pages
import LoginPage from '@/pages/Login'
import TopPage from '@/pages/Top'
import SalesHistoryPage from '@/pages/SalesHistory'
import PaymentPage from '@/pages/Payment'
import PaymentMartPage from '@/pages/Payment_Mart'
import ChangePasswordPage from '@/pages/ChangePassword'
import ResetPasswordRecoverPage from '@/pages/ResetPasswordRecover'
import ResetPasswordRecoverSubmitPage from '@/pages/ResetPasswordRecoverSubmit'
import TermsPage from '@/pages/Terms'
import NotFoundPage from '@/pages/NotFound'
import ResetPasswordForcedPage from '@/pages/ResetPasswordForced'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: SignInLayout,
      children: [
        {
          path: '',
          component: LoginPage,
          name: 'LoginPage'
        },
        {
          path: 'reset',
          component: ResetPasswordForcedPage,
          name: 'ResetPasswordForced',
          meta: {requiresAuth: true}
        },
        {
          path: 'recover',
          component: ResetPasswordRecoverPage,
          name: 'ResetPasswordRecover'
        },
        {
          path: 'recover/submit',
          component: ResetPasswordRecoverSubmitPage,
          name: 'ResetPasswordRecoverSubmit'
        }
      ]
    },
    {
      path: '/member',
      redirect: 'member/top',
      component: MemberLayout,
      meta: {requiresAuth: true},
      children: [
        {
          path: 'top',
          name: 'Top',
          component: TopPage,
          meta: {requiresAuth: true}
        },
        {
          path: 'history',
          name: 'SalesHistory',
          component: SalesHistoryPage,
          meta: {requiresAuth: true}
        },
        {
          path: 'payment',
          name: 'Payment',
          component: PaymentPage,
          meta: {requiresAuth: true}
        },
        {
          path: 'payment_Mart',
          name: 'Payment_Mart',
          component: PaymentMartPage,
          meta: {requiresAuth: true}
        },
        {
          path: 'password',
          name: 'ChangePassword',
          component: ChangePasswordPage,
          meta: {requiresAuth: true}
        },
        {
          path: 'terms',
          name: 'Terms',
          component: TermsPage,
          meta: {requiresAuth: true}
        }
      ]
    },
    {
      path: '*' || '',
      component: SignInLayout,
      children: [
        {
          path: '',
          component: NotFoundPage,
          name: 'NotFoundPage'
        }
      ]
    }
  ]
})
