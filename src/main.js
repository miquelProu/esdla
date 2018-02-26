import Vue from 'vue'


import 'buefy/lib/buefy.css'
import 'mdi/scss/materialdesignicons.scss'

import App from './App.vue'
import Store from './store/store.js'


new Vue({
  el: '#app',
  store: Store,
  render: h => h(App)
})
