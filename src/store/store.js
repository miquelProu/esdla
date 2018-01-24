import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import * as types from './mutation-types'

Vue.use(Vuex);

const PLAYING_DECK_LIST = [types.AREA_PREPARACIO, types.AREA_HERO, types.AREA_ALIATS, types.AREA_MA];

const PLAYING_ALIES_DECK_LIST = [types.AREA_HERO, types.AREA_ALIATS, types.AREA_MA];
const PLAYING_QUEST_DECK_LIST = [types.AREA_PREPARACIO];

export default new Vuex.Store({
    state:{
        allDeckQuest: [],       // TOT el Deck DOLENTS
        allDeckPlayer: [],      // TOT el Deck BONS
        questDeck: [],          // AREA_QUEST_DECK
        questOutDeck: [],       // AREA_QUEST_OUT_DECK
        playerDeck: [],         // AREA_PLAYER_DECK
        playerOutDeck: [],      // AREA_PLAYER_OUT_DECK
        hero: [],               // AREA_HERO
        ma: [],                 // AREA_MA
        preparacio: [],         // AREA_PREPARACIO
        missionDeck: [],        // AREA_MISION_DECK
        aliats: [],             // AREA_ALIATS
        lupa: {
            carta: null,
            position: 'right'
        },
    },
    getters:{
        questDeck(state){                    // Get AREA_QUEST_DECK
            return state.questDeck;
        },
        questOutDeck(state){                 // Get AREA_QUEST_OUT_DECK
           return state.questOutDeck;
        },
        playerDeck(state){                   // Get AREA_PLAYER_DECK
           return state.playerDeck;
        },
        playerOutDeck(state){               // Get AREA_PLAYER_OUT_DECK
          return state.playerOutDeck
        },
        hero(state){                        // Get AREA_HERO
           return state.hero;
        },
        ma(state){                          // Get AREA_MA
           return state.ma;
        },
        preparacio(state){                  // Get AREA_PREPARACIO
            return state.preparacio;
        },
        missionDeck(state){                 // Get AREA_MISION_DECK
            return state.missionDeck;
        },
        aliats(state){                      // Get AREA_ALIATS
           return state.aliats;
        },
        getLupaCard(state){
           return state.lupa.carta;
        },
        getLupaPosition(state){
           return state.lupa.position;
        }

    },
    mutations:{
        [types.SET_TO_ALL_DECK_QUEST](state, payload){      // Mutation TOT el Deck DOLENTS
            state.allDeckQuest = payload;
        },
        [types.SET_TO_QUEST_DECK](state, payload){          // Mutation AREA_QUEST_DECK
            state.questDeck = payload;
        },
        [types.SET_TO_QUEST_OUT_DECK](state, payload){      // Mutation AREA_QUEST_OUT_DECK
            state.questOutDeck = payload;
        },
        [types.SET_TO_MISSION_DECK](state, payload){          // Mutation AREA_MISION_DECK
            state.missionDeck = payload;
        },
        [types.SET_TO_PREPARACIO](state, payload){     // Mutation AREA_PREPARACIO
            state.preparacio = payload;
        },

        [types.SET_TO_ALL_DECK_PLAYER](state, payload){     // Mutation TOT el Deck BONS
            state.allDeckPlayer = payload;
        },
        [types.SET_TO_PLAYER_DECK](state, payload) {        // Mutation AREA_PLAYER_DECK
            state.playerDeck = payload;
        },
        [types.SET_TO_PLAYER_OUT_DECK](state, payload){     // Mutation AREA_PLAYER_OUT_DECK
            state.playerOutDeck = payload;
        },
        [types.SET_TO_HERO](state, payload) {   //Mutation AREA HERO
            state.hero = payload;
        },
        [types.SET_TO_MA](state, payload){           // Mutation AREA_MA
            state.ma = payload;
        },
        [types.ONE_TO_PREPARACIO](state, payload){
            state.preparacio = payload;
        },
        [types.SET_TO_ALIATS](state, payload){               // Mutation AREA_ALIATS
            state.aliats = payload;
        },
        [types.SET_LUPA_CARD](state, carta){
            state.lupa.carta = carta;
        },
        [types.SET_LUPA_POSITION](state, position){
            state.lupa.position = position;
        }
    },
    actions:{
        allToDeck: function({commit}, payload){
            if (payload.deckType == types.QUEST) {
                commit(types.SET_TO_ALL_DECK_QUEST, payload.cards);
                let deckQuestFiltered = _.filter(payload.cards, function(c) {return c.type == 'Encounter'});
                commit(types.SET_TO_QUEST_DECK, deckQuestFiltered);
                let preparacio = _.filter(payload.cards, function(c) {return c.type == 'Setup'});
                let quest = _.filter(payload.cards, function(c){return c.type == 'Quest'});
                commit(types.SET_TO_MISSION_DECK, quest);
                commit(types.SET_TO_PREPARACIO, preparacio);
            } else if (payload.deckType == types.PLAYER) {
                commit(types.SET_TO_ALL_DECK_PLAYER, payload.cards);
                let deckPlayerFiltered = _.filter(payload.cards, function(c) {return c.type == 'Hero'});
                commit(types.SET_TO_HERO, deckPlayerFiltered);
                deckPlayerFiltered = _.filter(payload.cards, function(c) {return c.type != 'Hero'});
                let ma = deckPlayerFiltered.splice(0,6);
                commit(types.SET_TO_PLAYER_DECK, deckPlayerFiltered);
                commit(types.SET_TO_MA, ma);
            }
        },
        toPreparacio: function({commit, state}, numero){
            let deckQuest = state.questDeck;
            let preparacio = state.preparacio;
            for (let f = 0; f < numero; f++) {
                let carta = deckQuest.splice(0, 1);
                preparacio.push(carta[0]);
                commit(types.ONE_TO_PREPARACIO, preparacio);
                commit(types.SET_TO_QUEST_DECK, deckQuest);
            }
        },
        toMa: function({commit, state}, numero){
            let deckPlayer = state.playerDeck;
            let ma = state.ma;
            for (let f = 0; f < numero; f++) {
                let carta = deckPlayer.splice(0, 1);
                ma.push(carta[0]);
                commit(types.SET_TO_MA, ma);
                commit(types.SET_TO_PLAYER_DECK, deckPlayer);
            }
        },
        toTaula: function({commit, state}, carta){
            let ma = state.ma;
            let taula = state.aliats;
             // let ma2 = _.filter(ma, function(c) {return c.id != carta.id});
            let esborrar =  _.findIndex(ma, function(c) {return c.id == carta.id});
            console.log(esborrar);
            console.log(ma);
            let ma2 = ma.splice(esborrar, 1)
            console.log(ma2);
            commit(types.SET_TO_MA, ma);
            taula.push(carta);
            commit(types.SET_TO_ALIATS, taula);
        },
        remenar: function({commit, state}, deck){
            if (deck == 'Encounter') {
                let d = this.getters.questDeck;
                let d2 = _.shuffle(d);
                commit(types.SET_TO_QUEST_DECK, d2);
            } else if (deck == 'Aliats') {
                let d = this.getters.playerDeck;
                let d2 = _.shuffle(d);
                commit(types.SET_TO_PLAYER_DECK, d2);
            }
        },
        eliminar: function({commit, state}, deck){
            // let cart = deck.slice(0,1);
            let carta =deck.carta;
            console.log(deck);
            console.log(PLAYING_ALIES_DECK_LIST, deck.deck);
            if (PLAYING_ALIES_DECK_LIST.indexOf(deck.deck) > -1) {
                console.log('PILA ALIATS: '+deck.pos+'::'+deck.deck);
                let pila;
                let retall;
                // [types.AREA_HERO, types.AREA_ALIATS, types.AREA_MA];
                if (deck.deck == types.AREA_HERO){
                    pila = state.hero;
                    retall = pila.splice(deck.pos, 1);
                    commit(types.SET_TO_HERO, pila);
                } else if (deck.deck == types.AREA_ALIATS){
                    pila = state.aliats;
                    retall = pila.splice(deck.pos, 1);
                    commit(types.SET_TO_ALIATS, pila);
                } else if (deck.deck == types.AREA_MA){
                    pila = state.ma;
                    retall = pila.splice(deck.pos, 1);
                    commit (types.SET_TO_MA, pila);
                }
                let descartes = state.playerOutDeck;
                descartes.unshift(deck.carta);
                commit(types.SET_TO_PLAYER_OUT_DECK, descartes);

            } else {
                console.log('PILA QUEST: '+deck.pos+'::'+deck.deck);
                let pila;
                let retall;
                if (deck.deck == types.AREA_PREPARACIO){
                    pila = state.preparacio;
                    retall = pila.splice(deck.pos, 1);
                    commit(types.SET_TO_PREPARACIO, pila);
                }
                let descartes = state.questOutDeck;
                descartes.unshift(deck.carta);
                commit(types.SET_TO_QUEST_OUT_DECK, descartes);
            }


            // if(deck[1] == types.SET_TO_MA){
            //     let esborrar =  _.findIndex(state.aliats, function(c) {return c.id == carta.id});
            //     let ma = state.ma;
            //     let ma2 = ma.splice(esborrar, 1)
            //     let descartes = state.playerOutDeck;
            //     descartes.unshift(carta);
            //     commit(deck[1], ma);
            //     commit(deck[2], descartes);
            // } else if (deck[1] == types.AREA_HERO) {
            //     let esborrar =  _.findIndex(state.hero, function(c) {return c.id == carta.id});
            //     let ma = state.hero;
            //     let ma2 = ma.splice(esborrar, 1)
            //     let descartes = state.playerOutDeck;
            //     descartes.unshift(carta);
            //     commit(types.SET_TO_HERO, ma);
            //     commit(deck[2], descartes);
            // }

        },
        setLupaCard: function({commit, state}, carta){
            commit(types.SET_LUPA_CARD, carta);
        },
        setLupaPosition: function({commit, state}, position){
            commit(types.SET_LUPA_POSITION, position);
        }
    }
})