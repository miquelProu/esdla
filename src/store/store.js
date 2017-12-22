import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import * as types from './mutation-types'

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        allDeckQuest: [],
        allDeckPlayer: [],
        deckQuest: [],
        outDeckQuest: [],
        deckPlayer: [],
        heroDeckPlayer: [],
        maPlayer: [],
        preparacioDeck: [],
        missionDeck: [],
    },
    getters:{
       deckQuest(state){
           return state.deckQuest;
       },
       deckOutQuest(state){
           return state.outDeckQuest;
       },
       deckPlayer(state){
           return state.deckPlayer;
       },
       deckHeroPlayer(state){
           return state.heroDeckPlayer;
       },
        maPlayer(state){
           return state.maPlayer;
        },
        deckPreparacio(state){
            return state.preparacioDeck;
        },
        missionDeck(state){
            return state.missionDeck;
        }
    },
    mutations:{
        [types.ALL_TO_ALL_DECK_QUEST](state, payload){
            state.allDeckQuest = payload;
        },
        [types.ALL_TO_DECK_QUEST](state, payload){
            state.deckQuest = payload;
        },
        [types.ALL_TO_OUT_DECK_QUEST](state, payload){
            state.outDeckQuest = payload;
        },
        [types.ALL_TO_QUEST_DECK](state, payload){
            state.missionDeck = payload;
        },
        [types.ALL_TO_PREPARACIO_DECK](state, payload){
            state.preparacioDeck = payload;
        },

        [types.ALL_TO_ALL_DECK_PLAYER](state, payload){
            state.allDeckPlayer = payload;
        },
        [types.ALL_TO_DECK_PLAYER](state, payload) {
            state.deckPlayer = payload;
        },
        [types.ALL_TO_HERO_DECK_PLAYER](state, payload) {
            state.heroDeckPlayer = payload;
        },
        [types.ALL_TO_MA_PLAYER](state, payload){
            state.maPlayer = payload;
        },
        [types.ONE_TO_PREPARACIO](state, payload){
            state.preparacioDeck = payload;
        }
    },
    actions:{
        allToDeck: function({commit}, payload){
            if (payload.deckType == types.QUEST) {
                commit(types.ALL_TO_ALL_DECK_QUEST, payload.cards);
                let deckQuestFiltered = _.filter(payload.cards, function(c) {return c.type == 'Encounter'});
                commit(types.ALL_TO_DECK_QUEST, deckQuestFiltered);
                let encuentros = _.filter(payload.cards, function(c) {return c.type == 'Setup'});
                let quest = _.filter(payload.cards, function(c){return c.type == 'Quest'});
                commit(types.ALL_TO_QUEST_DECK, quest);
                commit(types.ALL_TO_PREPARACIO_DECK, encuentros);
            } else if (payload.deckType == types.PLAYER) {
                commit(types.ALL_TO_ALL_DECK_PLAYER, payload.cards);
                let deckPlayerFiltered = _.filter(payload.cards, function(c) {return c.type == 'Hero'});
                commit(types.ALL_TO_HERO_DECK_PLAYER, deckPlayerFiltered);
                deckPlayerFiltered = _.filter(payload.cards, function(c) {return c.type != 'Hero'});
                let ma = deckPlayerFiltered.splice(0,16);
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
        remenar: function({commit, state}, deck){
            if (deck == 'Encounter') {
                let d = this.getters.deckQuest;
                let d2 = _.shuffle(d);
                commit(types.ALL_TO_DECK_QUEST, d2);
            } else if (deck == 'Aliats') {
                let d = this.getters.deckQuest;
                let d2 = _.shuffle(d);
                commit(types.ALL_TO_DECK_PLAYER, d2);
            }
        }
    }
})