import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import 'mdi/scss/materialdesignicons.scss'



import App from './App.vue'


Vue.use(Buefy, Vuex)

new Vue({
  el: '#app',
  render: h => h(App)
})
