<template xmlns="http://www.w3.org/1999/html">
    <div id="app" class="body">
        <div class="tile is-ancestor">
            <div class="tile is-8 is-parent taulellDret">
                <div class="tile is-ancestor is-child">
                    <div class="tile is-vertical is-parent">
                        <div class="tile is-child expositor preparacio" style="margin-bottom:2% !important;"><display :deck="getPreparacio" :cara="true" :caraForce="false" :rol="AREA_PREPARACIO"></display></div>
                        <div class="tile is-child expositor encuentros" style="margin-bottom:2% !important;"><display :deck="getAtack" :cara="true" :caraForce="false" :rol="AREA_ATACK"></display></div>
                        <div class="tile is-child expositor herois" style="margin-bottom:2% !important;"><display :deck="getHero" :cara="true" :caraForce="false" :rol="AREA_HERO"></display></div>
                        <div class="tile is-child expositor baixades " style="margin-bottom:2% !important;"><display :deck="getAliats" :cara="true" :rol="AREA_ALIATS"></display></div>
                        <div class="tile is-child expositor ma"><display :deck="getMa" :cara="true" :caraForce="false" :rol="AREA_MA"></display></div>
                    </div>
                </div>
            </div>
            <div class="tile is-4 is-parent taulellEsq">
                <div class="tile is-ancestor is-child">
                    <div class="tile is-vertical is-parent">
                        <div class="tile is-child stackQuest" style="margin-bottom:2% !important;">
                            <div class="columns">
                                <div class="column is-one-third"><pila v-if="getQuestDeck" :cara="false" :caraForce="true" :deck="getQuestDeck" :rol="AREA_QUEST_DECK" :isVertical="false"></pila></div>
                                <div class="column is-one-third"><pila v-if="getQuestOutDeck" :cara="true" :caraForce="true" :deck="getQuestOutDeck" :rol="AREA_QUEST_OUT_DECK" :isVertical="false"></pila></div>
                                <div class="column is-one-third">
                                    <contador type="torn"></contador>
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
                                <div class="column is-one-third"><pila v-if="getPlayerDeck" :deck="getPlayerDeck" :cara="false" :caraForce="true" :rol="AREA_PLAYER_DECK" :isVertical="false"></pila></div>
                                <div class="column is-one-third"><pila v-if="getPlayerOutDeck" :deck="getPlayerOutDeck" :cara="true" :caraForce="true" :rol="AREA_PLAYER_OUT_DECK" :isVertical="false"></pila></div>
                                <div class="column is-one-third">
                                    <contador type="amenasa"></contador>
                                    <!--<input ref="avatar" type="file" name="avatar" id="avatar" v-on:change="load"/>-->
                                    <div class="desplegable" style="float:right;">
                                        <b-dropdown position="is-bottom-left">
                                            <button class="button is-primary" slot="trigger">
                                                <b-icon icon="menu-down"></b-icon>
                                            </button>
                                            <!--<b-dropdown-item v-on:click="addAmenasa">Afegir 1 amenaça</b-dropdown-item>-->
                                            <!--<b-dropdown-item v-on:click="subAmenasa">Treure 1 amenaça</b-dropdown-item>-->
                                            <!--<b-dropdown-item v-on:click="addTorn">Afegir 1 torn</b-dropdown-item>-->
                                            <b-dropdown-item v-on:click="finalitzar">Finalitzar torn</b-dropdown-item>
                                            <b-dropdown-item v-on:click="save">Save File</b-dropdown-item>
                                            <b-dropdown-item v-on:click="reset">Reset</b-dropdown-item>
                                            <b-dropdown-item>
                                                <div class="file">
                                                    <label class="file-label">
                                                        <input ref="avatar" type="file" name="resume"  class="file-input" id="avatar" v-on:change="load"/>
                                                        <span class="file-cta">
                                                            <span class="file-label">Load Deck Quest</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </b-dropdown-item>
                                            <b-dropdown-item>
                                                <div class="file">
                                                    <label class="file-label">
                                                        <input ref="loadGameRef" type="file" name="resume"  class="file-input" id="loadGame" v-on:change="loadGame"/>
                                                        <span class="file-cta">
                                                            <span class="file-label">Load Game</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </b-dropdown-item>

                                            <b-dropdown-item v-on:click="reparteix">Reparteix</b-dropdown-item>
                                        </b-dropdown>
                                    </div>
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
import Vue2Dnd from 'vue2-dnd'
import XmlToJson from 'x2js'

import Pila from './components/pila.vue'
import Carta from './components/carta.vue'
import Display from './components/display.vue'
import Lupa from './components/lupa'
import * as types from './store/mutation-types'
import * as groups from './store/mutation-groups'
import BDropdownItem from "buefy/src/components/dropdown/DropdownItem";
import ModalNCartes from './components/modalNCartes'
import ModalShowCartes from './components/modalShowCartes'
import Contador from './components/contador'


import { mapGetters, mapActions } from 'vuex'

import QuestDeckFile from './assets/deck/Quest-006-A-Journey-to-Rhosgobel.o8d'
import PlayerDeckFile from './assets/deck/carrock-solo-1.0.o8d'

Vue.use(Buefy);
Vue.use(Vue2Dnd);

Vue.component('carta', Carta);

export default {
    name: 'app',
    components: {
        // ModalShowCartes,
        'pila': Pila,
        'carta':  Carta,
        'display': Display,
        'lupa': Lupa,
        'b-dropdown-item': BDropdownItem,
        'modal-n-cartes' : ModalNCartes,
        'modal-show-cartes' : ModalShowCartes,
        'contador': Contador,
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
        // this.loadDeck(QuestDeckFile, true);
        // this.loadDeck(PlayerDeckFile, true);
        // console.log("HOLA");
        // let store = this.encapsulate();
        // console.log(store);
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
            finalitzar: 'finalitzar',
            addTorn: 'addTorn',
            addAmenasa: 'addAmenasa',
            subAmenasa: 'subAmenasa',
            start: 'start',
            reset: 'reset',
            reparteix: 'reparteix'
        }),
        loadDeck: function(file, isInit) {
            let self = this;
            let sections = file.deck.section;
            let deck = [];

            _.forEach(sections, function (section) {
                if ('card' in section) {
                    let tipus = (isInit) ? section['$']['name'] : section['_name'];
                    let cartes = section.card;
                    if (!Array.isArray(section.card) && (section.card !== 'undefined')) {
                        cartes = [];
                        cartes.push(section.card)
                    }
                    _.forEach(cartes, function (carta) {
                        let card = {};
                        let qty = (isInit) ? carta['$']['qty'] : carta['_qty'];
                        card['id'] = (isInit) ? carta['$']['id'] : carta['_id'];
                        card['name'] = (isInit) ? carta['_'] : carta['__text'];
                        card['type'] = tipus;
                        card['ID'] = 0;
                        card['viatge'] = 0;
                        card['damage'] = 0;
                        card['resource'] = 0;
                        card['cara'] = null;
                        card['esgotat'] = false;
                        card['vinculada'] = [];
                        for (let x = 1; x <= qty; x++) {
                            // Afegeixo un clone, així totes les cartes son diferents objs
                            // sino les cartes repetides eran la mateixa instancia
                            let clone = _.clone(card);
                            deck.push(clone);
                        }
                    });
                }
            });

            // Afegeixo un index unic a cada carta
            deck.forEach(function(carta, index, mazo){
                mazo[index]['ID'] = self.setID;
                self.setID++;
            });
            this.allToDeck({cards: deck});
        },
        newNumber: function(val){
            console.log("NEW NUMBER");
            this.toogleShowCartes();
        },
        load: function(e) {
            let self = this;
            e.preventDefault();
            // Get files from input
            let files = this.$refs.avatar.files;

            //Retrieve the first (and only!) File from the FileList object
            let f = files[0];
            let reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Convert XML 2 JSON
                    let x2js = new XmlToJson();
                    let json = x2js.xml2js(e.target.result);
                    // console.log(json);
                    self.loadDeck(json, false);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsText(f);
        },
        loadGame: function(e) {
            let self = this;
            e.preventDefault();
            // Get files from input
            var files = this.$refs.loadGameRef.files;

            //Retrieve the first (and only!) File from the FileList object
            var f = files[0];
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Convert XML 2 JSON
                    let arr = JSON.parse(e.target.result);
                    self.start(arr);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsText(f);
        },
        save: function(){
            let estat = this.encapsulate();
            this.saveFile(estat);
        },
        encapsulate: function() {
            let lotr = new Array();
            let prep = {
                name: types.AREA_PREPARACIO,
                deck: this.getPreparacio
            };
            lotr.push(prep);
            let at = {
                name: types.AREA_ATACK,
                deck: this.getAtack
            };
            lotr.push(at);
            let hero = {
                name: types.AREA_HERO,
                deck: this.getHero
            };
            lotr.push(hero);
            let al = {
                name: types.AREA_ALIATS,
                deck: this.getAliats
            };
            lotr.push(al);
            let ma = {
                name: types.AREA_MA,
                deck: this.getMa
            };
            lotr.push(ma);
            let qd = {
                name: types.AREA_QUEST_DECK,
                deck: this.getQuestDeck
            };
            lotr.push(qd);
            let qod = {
                name: types.AREA_QUEST_OUT_DECK,
                deck: this.getQuestOutDeck
            };
            lotr.push(qod);
            let mis = {
                name: types.AREA_MISION_DECK,
                deck: this.getMissionDeck
            };
            lotr.push(mis);
            let misout = {
                name: types.AREA_MISION_OUT_DECK,
                deck: this.getMissionOutDeck
            };
            lotr.push(misout);
            let pd = {
                name: types.AREA_PLAYER_DECK,
                deck: this.getPlayerDeck
            };
            lotr.push(pd);
            let pod = {
                name: types.AREA_PLAYER_OUT_DECK,
                deck: this.getPlayerOutDeck
            };
            lotr.push(pod);
            let vi = {
                name: types.AREA_VIATGE,
                deck: this.getViatge
            };
            lotr.push(vi);

            return lotr;
        },
        saveFileLocal: function(lotr){
            const data = JSON.stringify(lotr);
            window.localStorage.setItem('lotr', data);
            console.log(JSON.parse(window.localStorage.getItem('lotr')))
        },
        saveFile: function(arr) {
            const data = JSON.stringify(arr);
            const blob = new Blob([data], {type: 'text/plain'});
            const e = document.createEvent('MouseEvents'),
                a = document.createElement('a');
            a.download = "test.json";
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
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
        &.herois {
            height: 22%;
            min-height: 22%;
        }
        &.ma {
            height: 19%;
            min-height: 19%;
        }
        height: 17%;
        min-height: 17%;
    }
}

.taulellEsq {
    .stackQuest,
    .stackHerois {
        height: 15%;
        min-height: 15%;
    }

    .stackMision {
        height: 40%;
        min-height: 40%;
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
.dropdown.is-mobile-modal .dropdown-menu .dropdown-item, .dropdown.is-mobile-modal .dropdown-menu .has-link a{
    padding: 0.3rem 1.5rem;
}
</style>
