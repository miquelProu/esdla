<template>
    <div id="app" class="body">
        <div class="tile is-ancestor">
            <div class="tile is-8 is-parent taulellDret">
                <div class="tile is-ancestor is-child">
                    <div class="tile is-vertical is-parent">
                        <div class="tile is-child expositor preparacio" style="margin-bottom:2% !important;"><display :deck="getPreparacio" :cara="true" :rol="AREA_PREPARACIO"></display></div>
                        <div class="tile is-child expositor encuentros" style="margin-bottom:2% !important;">ENCUENTROS QUEST</div>
                        <div class="tile is-child expositor defensa" style="margin-bottom:2% !important;">ENFRENTAMENT</div>
                        <div class="tile is-child expositor herois" style="margin-bottom:2% !important;"><display :deck="getHero" :cara="true" :rol="AREA_HERO"></display></div>
                        <div class="tile is-child expositor baixades " style="margin-bottom:2% !important;"><display :deck="getAliats" :cara="true" :rol="AREA_ALIATS"></display></div>
                        <div class="tile is-child expositor ma" xstyle="margin-bottom:2% !important;"><display :deck="getMa" :cara="true" :rol="AREA_MA"></display></div>
                    </div>
                </div>
            </div>
            <div class="tile is-4 is-parent taulellEsq">
                <div class="tile is-ancestor is-child">
                    <div class="tile is-vertical is-parent">
                        <div class="tile is-child stackQuest" style="margin-bottom:2% !important;">
                            <div class="columns">
                                <div class="column is-one-quarter"><pila v-if="getQuestDeck" :cara="false" :deck="getQuestDeck" :rol="AREA_QUEST_DECK"></pila></div>
                                <div class="column is-one-quarter"><pila v-if="getQuestOutDeck" :cara="true" :deck="getQuestOutDeck" :rol="AREA_QUEST_OUT_DECK"></pila></div>
                                <div class="column is-half">PUNTUACIONS GLOBALS</div>
                            </div>
                        </div>
                        <div class="tile is-child stackMision" style="margin-bottom:2% !important;">
                            <div class="columns">
                                <div class="column is-one-thirds"><pila :deck="getMissionDeck" :cara="true" :rol="AREA_MISION_DECK"></pila></div>
                                <div class="column is-multiline">
                                    <div class="column">MISION DECK</div>
                                    <div class="column">MISION DESCARTE</div>
                                </div>
                            </div>
                        </div>
                        <div class="tile is-child stackHerois">
                            <div class="columns">
                                <div class="column is-one-quarter"><pila v-if="getPlayerDeck" :deck="getPlayerDeck" :cara="false" :rol="AREA_PLAYER_DECK"></pila></div>
                                <div class="column is-one-quarter"><pila v-if="getPlayerOutDeck" :deck="getPlayerOutDeck" :cara="true" :rol="AREA_PLAYER_OUT_DECK"></pila></div>
                                <div class="column is-half">PUNTUACIONS HEROIS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <lupa v-if="getLupaCard"></lupa>
    </div>
</template>

<script>

import Pila from './components/pila.vue'
import Carta from './components/carta.vue'
import Display from './components/display.vue'
import Lupa from './components/lupa'
import * as types from './store/mutation-types'

import { mapGetters, mapActions } from 'vuex'

import QuestDeckFile from './assets/deck/Quest-006-A-Journey-to-Rhosgobel.o8d'
import PlayerDeckFile from './assets/deck/carrock-solo-1.0.o8d'

export default {
    name: 'app',
    components: {
        'pila': Pila,
        'carta':  Carta,
        'display': Display,
        'lupa': Lupa
    },
    data: function() {
      return {
          [types.AREA_PREPARACIO]: types.AREA_PREPARACIO,
          [types.AREA_HERO]: types.AREA_HERO,
          [types.AREA_ALIATS]: types.AREA_ALIATS,
          [types.AREA_MA]: types.AREA_MA,
          [types.AREA_QUEST_DECK]: types.AREA_QUEST_DECK,
          [types.AREA_QUEST_OUT_DECK]: types.AREA_QUEST_OUT_DECK,
          [types.AREA_MISION_DECK]: types.AREA_MISION_DECK,
          [types.AREA_PLAYER_DECK]: types.AREA_PLAYER_DECK,
          [types.AREA_PLAYER_OUT_DECK]: types.AREA_PLAYER_OUT_DECK,
          setID: 0,
      }
    },
    mounted: function(){
        this.loadDeck(QuestDeckFile, types.QUEST);
        this.loadDeck(PlayerDeckFile, types.PLAYER);

    },
    watch: {},
    computed: {
        ...mapGetters({
            getQuestDeck: 'questDeck',
            getQuestOutDeck: 'questOutDeck',
            getPlayerDeck: 'playerDeck',
            getPlayerOutDeck: 'playerOutDeck',
            getHero: 'hero',
            getMa: 'ma',
            getPreparacio: 'preparacio',
            getMissionDeck: 'missionDeck',
            getAliats: 'aliats',
            getLupaCard: 'getLupaCard'
        })
    },
    methods:{
        ...mapActions({
            allToDeck: 'allToDeck'
        }),
        loadDeck: function(file, type) {
            let self = this;
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
                    card['ID'] = self.setID;
                    for (let x = 1; x <= qty; x++) {
                        deck.push(card);
                        self.setID++;
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
.tile{
    border:1px solid green;

    &.is-ancestor,
    &.is-parent {
        height: 100%;
        max-height: 100%;
        z-index: 0;
        overflow: hidden;
    }

    .tile.expositor {
        &.ma {
            height: 10%;
            min-height: 10%;
        }
        &.herois {
            height: 20%;
            min-height: 20%;
        }
        height: 15%;
        min-height: 15%;
    }
}

.taulellEsq {
    .stackQuest,
    .stackHerois {
        height: 15%;
        min-height: 15%;
    }

    .stackMision {
        height: 30%;
        min-height: 30%;
    }
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
