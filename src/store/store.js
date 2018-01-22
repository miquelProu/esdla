import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import * as types from './mutation-types'

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        allDeckQuest: [],       // TOT el Deck DOLENTS
        allDeckPlayer: [],      // TOT el Deck BONS
        deckQuest: [],          // AREA_QUEST_DECK
        outDeckQuest: [],       // AREA_QUEST_OUT_DECK
        deckPlayer: [],         // AREA_PLAYER_DECK
        outDeckPlayer: [],      // AREA_PLAYER_OUT_DECK
        heroDeckPlayer: [],     // AREA HERO
        maPlayer: [],           // AREA_MA
        preparacioDeck: [],     // AREA_PREPARACIO
        missionDeck: [],        // AREA_MISION_DECK
        taulaDeck: [],          // AREA_ALIATS
        lupa: {
            carta: null,
            position: 'right'
        },
    },
    getters:{
       deckQuest(state){                    // Get AREA_QUEST_DECK
           return state.deckQuest;
       },
       deckOutQuest(state){                 // Get AREA_QUEST_OUT_DECK
           return state.outDeckQuest;
       },
       deckPlayer(state){                   // Get AREA_PLAYER_DECK
           return state.deckPlayer;
       },
        deckOutPlayer(state){               // Get AREA_PLAYER_OUT_DECK
           return state.outDeckPlayer
        },
       deckHeroPlayer(state){               // Get AREA_HERO
           return state.heroDeckPlayer;
       },
        maPlayer(state){                    // Get AREA_MA
           return state.maPlayer;
        },
        deckPreparacio(state){              // Get AREA_PREPARACIO
            return state.preparacioDeck;
        },
        missionDeck(state){                 // Get AREA_MISION_DECK
            return state.missionDeck;
        },
        taulaDeck(state){                   // Get AREA_ALIATS
           return state.taulaDeck;
        },
        getLupaCard(state){
           return state.lupa.carta;
        },
        getLupaPosition(state){
           return state.lupa.position;
        }

    },
    mutations:{
        [types.ALL_TO_ALL_DECK_QUEST](state, payload){      // Mutation TOT el Deck DOLENTS
            state.allDeckQuest = payload;
        },
        [types.ALL_TO_DECK_QUEST](state, payload){          // Mutation AREA_QUEST_DECK
            state.deckQuest = payload;
        },
        [types.ALL_TO_OUT_DECK_QUEST](state, payload){      // Mutation AREA_QUEST_OUT_DECK
            state.outDeckQuest = payload;
        },
        [types.ALL_TO_QUEST_DECK](state, payload){          // Mutation AREA_MISION_DECK
            state.missionDeck = payload;
        },
        [types.ALL_TO_PREPARACIO_DECK](state, payload){     // Mutation AREA_PREPARACIO
            state.preparacioDeck = payload;
        },

        [types.ALL_TO_ALL_DECK_PLAYER](state, payload){     // Mutation TOT el Deck BONS
            state.allDeckPlayer = payload;
        },
        [types.ALL_TO_DECK_PLAYER](state, payload) {        // Mutation AREA_PLAYER_DECK
            state.deckPlayer = payload;
        },
        [types.ALL_TO_OUT_DECK_PLAYER](state, payload){     // Mutation AREA_PLAYER_OUT_DECK
            state.outDeckPlayer = payload;
        },
        [types.ALL_TO_HERO_DECK_PLAYER](state, payload) {   //Mutation AREA HERO
            state.heroDeckPlayer = payload;
        },
        [types.ALL_TO_MA_PLAYER](state, payload){           // Mutation AREA_MA
            state.maPlayer = payload;
        },
        [types.ONE_TO_PREPARACIO](state, payload){
            state.preparacioDeck = payload;
        },
        [types.ALL_TO_TAULA](state, payload){               // Mutation AREA_ALIATS
            state.taulaDeck = payload;
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
                commit(types.ALL_TO_ALL_DECK_QUEST, payload.cards);
                let deckQuestFiltered = _.filter(payload.cards, function(c) {return c.type == 'Encounter'});
                commit(types.ALL_TO_DECK_QUEST, deckQuestFiltered);
                let preparacio = _.filter(payload.cards, function(c) {return c.type == 'Setup'});
                let quest = _.filter(payload.cards, function(c){return c.type == 'Quest'});
                commit(types.ALL_TO_QUEST_DECK, quest);
                commit(types.ALL_TO_PREPARACIO_DECK, preparacio);
            } else if (payload.deckType == types.PLAYER) {
                commit(types.ALL_TO_ALL_DECK_PLAYER, payload.cards);
                let deckPlayerFiltered = _.filter(payload.cards, function(c) {return c.type == 'Hero'});
                commit(types.ALL_TO_HERO_DECK_PLAYER, deckPlayerFiltered);
                deckPlayerFiltered = _.filter(payload.cards, function(c) {return c.type != 'Hero'});
                let ma = deckPlayerFiltered.splice(0,6);
                commit(types.ALL_TO_DECK_PLAYER, deckPlayerFiltered);
                commit(types.ALL_TO_MA_PLAYER, ma);
            }
        },
        toPreparacio: function({commit, state}, numero){
            let deckQuest = state.deckQuest;
            let preparacio = state.preparacioDeck;
            for (let f = 0; f < numero; f++) {
                let carta = deckQuest.splice(0, 1);
                preparacio.push(carta[0]);
                commit(types.ONE_TO_PREPARACIO, preparacio);
                commit(types.ALL_TO_DECK_QUEST, deckQuest);
            }
        },
        toMa: function({commit, state}, numero){
            let deckPlayer = state.deckPlayer;
            let ma = state.maPlayer;
            for (let f = 0; f < numero; f++) {
                let carta = deckPlayer.splice(0, 1);
                ma.push(carta[0]);
                commit(types.ALL_TO_MA_PLAYER, ma);
                commit(types.ALL_TO_DECK_PLAYER, deckPlayer);
            }
        },
        toTaula: function({commit, state}, carta){
            let ma = state.maPlayer;
            let taula = state.taulaDeck;
             // let ma2 = _.filter(ma, function(c) {return c.id != carta.id});
            let esborrar =  _.findIndex(ma, function(c) {return c.id == carta.id});
            console.log(esborrar);
            console.log(ma);
            let ma2 = ma.splice(esborrar, 1)
            console.log(ma2);
            commit(types.ALL_TO_MA_PLAYER, ma);
            taula.push(carta);
            commit(types.ALL_TO_TAULA, taula);
        },
        remenar: function({commit, state}, deck){
            if (deck == 'Encounter') {
                let d = this.getters.deckQuest;
                let d2 = _.shuffle(d);
                commit(types.ALL_TO_DECK_QUEST, d2);
            } else if (deck == 'Aliats') {
                let d = this.getters.deckPlayer;
                let d2 = _.shuffle(d);
                commit(types.ALL_TO_DECK_PLAYER, d2);
            }
        },
        eliminar: function({commit, state}, deck){
            let cart = deck.slice(0,1);
            let carta =cart[0];
            console.log(deck[1],carta);
            if(deck[1] == types.ALL_TO_MA_PLAYER){
                let esborrar =  _.findIndex(state.taulaDeck, function(c) {return c.id == carta.id});
                let ma = state.maPlayer;
                let ma2 = ma.splice(esborrar, 1)
                let descartes = state.outDeckPlayer;
                descartes.unshift(carta);
                commit(deck[1], ma);
                commit(deck[2], descartes);
            } else if (deck[1] == types.AREA_HERO) {
                let esborrar =  _.findIndex(state.heroDeckPlayer, function(c) {return c.id == carta.id});
                let ma = state.heroDeckPlayer;
                let ma2 = ma.splice(esborrar, 1)
                let descartes = state.outDeckPlayer;
                descartes.unshift(carta);
                commit(types.ALL_TO_HERO_DECK_PLAYER, ma);
                commit(deck[2], descartes);
            }

        },
        setLupaCard: function({commit, state}, carta){
            commit(types.SET_LUPA_CARD, carta);
        },
        setLupaPosition: function({commit, state}, position){
            commit(types.SET_LUPA_POSITION, position);
        }
    }
})