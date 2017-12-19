import Vue from 'vue'
// import Vuex from 'vuex'
import Buefy from 'buefy'
import _ from 'lodash'

import 'buefy/lib/buefy.css'
import 'mdi/scss/materialdesignicons.scss'

import App from './App.vue'
import Store from './store/store.js'

Vue.use(Buefy)

new Vue({
  el: '#app',
  store: Store,
  render: h => h(App)
})
