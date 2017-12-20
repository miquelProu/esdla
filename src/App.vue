<template>
    <div id="app" class="body">
        <div class="tile is-ancestor">
            <div class="tile is-8 is-parent">
                <div class="tile is-ancestor is-child">
                    <div class="tile is-vertical is-parent">
                        <div class="tile is-child expositor">HOLA1</div>
                        <div class="tile is-child expositor">HOLA2</div>
                        <div class="tile is-child expositor">HOLA3</div>
                        <div class="tile is-child expositor">HOLA4</div>
                        <div class="tile is-child expositor">HOLA5</div>
                        <div class="tile is-child expositor">HOLA6</div>
                    </div>
                </div>
            </div>
            <div class="tile is-4"></div>
        </div>
    </div>
    <!--<div id="app" class="body">-->
        <!--<div class="tile is-ancestor">-->
            <!--<div class="tile ">-->
                <!--<div class="tile is-child is-8">-->
                    <!--<div class="tile is-ancestor">-->
                        <!--<div class="tile is-parent is-vertical" style="height: 100%;min-height: 100%">-->
                            <!--<div class="tile is-child" style="height: 16%;min-height: 16%;">HOLA1</div>-->
                            <!--<div class="tile is-child" style="height: 16%">HOLA2</div>-->
                            <!--<div class="tile is-child" style="height: 16%">HOLA3</div>-->
                            <!--<div class="tile is-child" style="height: 16%">HOLA4</div>-->
                            <!--<div class="tile is-child" style="height: 16%">HOLA5</div>-->
                            <!--<div class="tile is-child" style="height: 20%">HOLA6</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="tile is-child is-4"></div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
    <!--<img src="./assets/logo.png">-->
    <!--<h1>{{ msg }}</h1>-->
    <!--<display :deck="getMaPlayer"></display>-->
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

html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
}
html {
    min-height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/

    padding: 0;
    height: 100%;
    max-height: 100%;
    width: 100%;
    max-width: 100%;
    z-index: 0;
    overflow: hidden;
    position: absolute;
}
.tile.is-ancestor,
.tile.is-parent {
    height: 100%;
    max-height: 100%;
    z-index: 0;
    overflow: hidden;
}
.tile.expositor {
    height: 16%;
    min-height: 16%;
    margin-bottom: 0 !important;
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
