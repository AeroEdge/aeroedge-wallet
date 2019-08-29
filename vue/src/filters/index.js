import Vue from 'vue'
import moment from 'moment'

// 3桁ごとにカンマ区切り
const addDelimiter = Vue.filter('addDelimiter', function (value) {
  return String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
})

// 小数第一まで表示
const decimal = Vue.filter('decimal', function (value) {
  return Number(value).toFixed(1)
})

// 日付
const dateFilter = Vue.filter('dateFilter', function (value) {
  const date = new Date(value)
  return moment(date).format('YYYY/MM/DD')
})

// 日付と時刻
const dateTimeFilter = Vue.filter('dateTimeFilter', function (value) {
  const date = new Date(value)
  return moment(date).format('YYYY/MM/DD HH:mm:ss')
})

export default {
  addDelimiter,
  dateFilter,
  dateTimeFilter,
  decimal
}
