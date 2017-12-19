<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <display :deck="getMaPlayer"></display>
  </div>
</template>

<script>

import Pila from './components/pila.vue'
import Carta from './components/carta.vue'
import Display from './components/display.vue'
import * as types from './store/mutation-types'

import { mapGetters, mapActions } from 'vuex'

import QuestDeckFile from './assets/deck/Quest-006-A-Journey-to-Rhosgobel.o8d'
import PlayerDeckFile from './assets/deck/carrock-solo-1.0.o8d'

export default {
    name: 'app',
    components: {
        'pila': Pila,
        'carta':  Carta,
        'display': Display
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    },
    mounted: function(){
        this.loadDeck(QuestDeckFile, types.QUEST);
        this.loadDeck(PlayerDeckFile, types.PLAYER);


    },
    watch: {},
    computed: {
        ...mapGetters({
            getDeckQuest: 'deckQuest',
            getOutDeckQuest: 'deckOutQuest',
            getDeckPlayer: 'deckPlayer',
            getOutDeckPlayer: 'deckOutPlayer',
            getMaPlayer: 'maPlayer'
        })
    },
    methods:{
        ...mapActions({
            allToDeck: 'allToDeck'
        }),
        loadDeck: function(file, type) {
            let sections = file.deck.section;
            let deck = [];
            _.forEach(sections, function (section) {
                let tipus = section['$']['name'];
                _.forEach(section.card, function (carta) {
                    let card = {};
                    let qty = carta['$']['qty'];
                    card['id'] = carta['$']['id'];
                    card['name'] = carta['_'];
                    card['type'] = tipus;
                    for (let x = 1; x <= qty; x++) {
                        deck.push(card);
                    }

                });
            });
            this.allToDeck({deckType: type, cards: deck});
        }
    },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
