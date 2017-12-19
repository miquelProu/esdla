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
        outDeckPlayer: [],
        maPlayer: []
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
       deckOutPlayer(state){
           return state.outDeckPlayer;
       },
        maPlayer(state){
           return state.maPlayer;
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
        [types.ALL_TO_ALL_DECK_PLAYER](state, payload){
            state.allDeckPlayer = payload;
        },
        [types.ALL_TO_DECK_PLAYER](state, payload) {
            state.deckPlayer = payload;
        },
        [types.ALL_TO_OUT_DECK_PLAYER](state, payload) {
            state.outDeckPlayer = payload;
        },
        [types.MA_PLAYER](state, payload){
            state.maPlayer = payload;
        }
    },
    actions:{
        allToDeck: function({commit}, payload){
            if (payload.deckType == types.QUEST) {
                commit(types.ALL_TO_ALL_DECK_QUEST, payload.cards);
                let deckQuestFiltered = _.filter(payload.cards, function(c) {return c.type == 'Encounter'});
                commit(types.ALL_TO_DECK_QUEST, deckQuestFiltered);
                deckQuestFiltered = _.filter(payload.cards, function(c) {return c.type != 'Encounter'});
                commit(types.ALL_TO_OUT_DECK_QUEST, deckQuestFiltered);
            } else if (payload.deckType == types.PLAYER) {
                commit(types.ALL_TO_ALL_DECK_PLAYER, payload.cards);
                let deckPlayerFiltered = _.filter(payload.cards, function(c) {return c.type == 'Hero'});
                commit(types.ALL_TO_OUT_DECK_PLAYER, deckPlayerFiltered);
                deckPlayerFiltered = _.filter(payload.cards, function(c) {return c.type != 'Hero'});
                commit(types.ALL_TO_DECK_PLAYER, deckPlayerFiltered);
                let sis = deckPlayerFiltered.splice(0,6);
                commit(types.MA_PLAYER, sis);

            }
        }
    }
})