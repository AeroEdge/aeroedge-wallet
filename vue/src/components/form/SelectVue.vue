<template>
<div class="c-plug-in--vselect" id="lang">
<v-select v-model="select.selectSelected" :options="select.selectOptions"></v-select>
</div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  name: 'SelectVue',
  components: {
    vSelect
  },
  data () {
    return {
      select: {
        selectOptions: [
          {id: 1, label: 'Today TodayTodayTodayTodayToday Today'},
          {id: 2, label: 'Yesterday'},
          {id: 3, label: 'This week'},
          {id: 4, label: 'This month'},
          {id: 5, label: 'Custom'}
        ],
        selectSelected: {
          id: 1, label: 'Today TodayTodayTodayTodayToday Today'
        }
      }
    }
  }
}
</script>
