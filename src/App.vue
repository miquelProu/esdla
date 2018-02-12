<template>
    <div id="app" class="body">
        <div class="tile is-ancestor">
            <div class="tile is-8 is-parent taulellDret">
                <div class="tile is-ancestor is-child">
                    <div class="tile is-vertical is-parent">
                        <div class="tile is-child expositor preparacio" style="margin-bottom:2% !important;"><display :deck="getPreparacio" :cara="true" :caraForce="false" :rol="AREA_PREPARACIO"></display></div>
                        <div class="tile is-child expositor encuentros" style="margin-bottom:2% !important;"><display :deck="getAtack" :cara="true" :caraForce="false" :rol="AREA_ATACK"></display></div>
                        <div class="tile is-child expositor defensa" style="margin-bottom:2% !important;">ENFRENTAMENT</div>
                        <div class="tile is-child expositor herois" style="margin-bottom:2% !important;"><display :deck="getHero" :cara="true" :caraForce="false" :rol="AREA_HERO"></display></div>
                        <div class="tile is-child expositor baixades " style="margin-bottom:2% !important;"><display :deck="getAliats" :cara="true" :rol="AREA_ALIATS"></display></div>
                        <div class="tile is-child expositor ma" xstyle="margin-bottom:2% !important;"><display :deck="getMa" :cara="true" :caraForce="false" :rol="AREA_MA"></display></div>
                    </div>
                </div>
            </div>
            <div class="tile is-4 is-parent taulellEsq">
                <div class="tile is-ancestor is-child">
                    <div class="tile is-vertical is-parent">
                        <div class="tile is-child stackQuest" style="margin-bottom:2% !important;">
                            <div class="columns">
                                <div class="column is-one-quarter"><pila v-if="getQuestDeck" :cara="false" :caraForce="true" :deck="getQuestDeck" :rol="AREA_QUEST_DECK" :isVertical="false"></pila></div>
                                <div class="column is-one-quarter"><pila v-if="getQuestOutDeck" :cara="true" :caraForce="true" :deck="getQuestOutDeck" :rol="AREA_QUEST_OUT_DECK" :isVertical="false"></pila></div>
                                <div class="column is-half">
                                    <div class="has-text-centered">TORNS</div>
                                    <div class="has-text-centered">{{getTorn}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="tile is-child stackMision" style="margin-bottom:2% !important;">
                            <div class="columns">
                                <div class="column is-one-half"><pila :deck="getViatge" :cara="true" :caraForce="true" :rol="AREA_VIATGE" :isVertical="false"></pila></div>
                                <div class="column is-one-half">
                                    <div class="tile is-vertical is-parent">
                                        <div class="tile is-child"><pila :deck="getMissionDeck" :cara="true" :caraForce="false" :rol="AREA_MISION_DECK" :isVertical="true"></pila></div>
                                        <div class="tile is-child"><pila :deck="getMissionOutDeck" :cara="true" :caraForce="false" :rol="AREA_MISION_OUT_DECK" :isVertical="true"></pila></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tile is-child stackHerois">
                            <div class="columns">
                                <div class="column is-one-quarter"><pila v-if="getPlayerDeck" :deck="getPlayerDeck" :cara="false" :caraForce="true" :rol="AREA_PLAYER_DECK" :isVertical="false"></pila></div>
                                <div class="column is-one-quarter"><pila v-if="getPlayerOutDeck" :deck="getPlayerOutDeck" :cara="true" :caraForce="true" :rol="AREA_PLAYER_OUT_DECK" :isVertical="false"></pila></div>
                                <div class="column is-half">
                                    <div class="desplegable" style="float:right;">
                                        <b-dropdown> <!--position="is-bottom-left"-->
                                            <button class="button is-primary" slot="trigger">
                                                <b-icon icon="menu-down"></b-icon>
                                            </button>
                                            <b-dropdown-item v-on:click="">Afegir 1 amenaça</b-dropdown-item>
                                            <b-dropdown-item v-on:click="">Treure 1 amenaça</b-dropdown-item>
                                            <b-dropdown-item v-on:click="finalitzar">Finalitzar torn</b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                    <div class="has-text-centered">AMENAÇA</div>
                                    <div class="has-text-centered">{{getAmenasa}}</div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <lupa v-if="getLupaCard"></lupa>
        <b-modal :active.sync="hasModalNCartes" has-modal-card :width="350">
            <modal-n-cartes @hasNumber="newNumber"></modal-n-cartes>
        </b-modal>
        <b-modal :active.sync="hasModalShowCartes" has-modal-card>
            <modal-show-cartes></modal-show-cartes>
        </b-modal>
    </div>
</template>

<script>

import Vue from 'vue'
import Buefy from 'buefy'
import Pila from './components/pila.vue'
import Carta from './components/carta.vue'
import Display from './components/display.vue'
import Lupa from './components/lupa'
import * as types from './store/mutation-types'
import BDropdownItem from "buefy/src/components/dropdown/DropdownItem";
import ModalNCartes from './components/modalNCartes'
import ModalShowCartes from './components/modalShowCartes'

import { mapGetters, mapActions } from 'vuex'

import QuestDeckFile from './assets/deck/Quest-006-A-Journey-to-Rhosgobel.o8d'
import PlayerDeckFile from './assets/deck/carrock-solo-1.0.o8d'

Vue.use(Buefy);

export default {
    name: 'app',
    components: {
        ModalShowCartes,
        'pila': Pila,
        'carta':  Carta,
        'display': Display,
        'lupa': Lupa,
        'b-dropdown-item': BDropdownItem,
        'modal-n-cartes' : ModalNCartes,
        'modal-show-cartes' : ModalShowCartes
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
          [types.AREA_MISION_OUT_DECK]: types.AREA_MISION_OUT_DECK,
          [types.AREA_PLAYER_DECK]: types.AREA_PLAYER_DECK,
          [types.AREA_PLAYER_OUT_DECK]: types.AREA_PLAYER_OUT_DECK,
          [types.AREA_ATACK]: types.AREA_ATACK,
          [types.AREA_VIATGE]: types.AREA_VIATGE,
          setID: 0,
          hasModalNCartes : false,
          hasModalShowCartes: false
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
            getMissionOutDeck: 'missionOutDeck',
            getAliats: 'aliats',
            getAtack: 'atack',
            getViatge: 'viatge',
            getLupaCard: 'getLupaCard',
            getAmenasa: 'amenasa',
            getTorn: 'torn',
            getModalNcartes: 'modalNcartes',
            getModalShowCartes: 'modalShowCartes',
        }),
    },
    methods:{
        ...mapActions({
            allToDeck: 'allToDeck',
            toogleShowCartes: 'toogleShowCartes',
            setShowCartes: 'setShowCartes',
            finalitzar: 'finalitzar'
        }),
        doFinalitzar: function(){
           this.dooFinalitzar(true);
        },
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
                    card['ID'] = 0;
                    card['viatge'] = 0;
                    card['damage'] = 0;
                    card['resource'] = 0;
                    card['cara'] = null;
                    card['esgotat'] = false;
                    for (let x = 1; x <= qty; x++) {
                        // Afegeixo un clone, així totes les cartes son diferents objs
                        // sino les cartes repetides eran la mateixa instancia
                        let clone = _.clone(card);
                        deck.push(clone);
                    }
                });
            });

            // Afegeixo un index unic a cada carta
            deck.forEach(function(carta, index, mazo){
                mazo[index]['ID'] = self.setID;
                self.setID++;
            });
            this.allToDeck({deckType: type, cards: deck});
        },
        newNumber: function(val){
            console.log("NEW NUMBER");
            this.toogleShowCartes();
        }
    },
    watch: {
        'getModalNcartes': {
            handler(newData, oldData) {
                this.hasModalNCartes = newData;
            }
        },
        'getModalShowCartes': {
            handler(newData, oldData){
                this.hasModalShowCartes = newData;
            }
        },
        hasModalShowCartes:function (val) {
            console.log("HAS MODAL"+val);
            this.setShowCartes(val);
        }
    }
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

.modal.is-active{
    .modal-content{
        max-height: 430px;
        overflow-y: auto;
        overflow-x: hidden;

        .columns {
            background-color: rgba(255,255,255,0.5);
        }
    }
}
</style>
