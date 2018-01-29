import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import * as types from './mutation-types'
import * as groups from './mutation-groups'
import {translateAreaSetTo} from './mutation-types'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        allDeckQuest: [],       // TOT el Deck DOLENTS
        allDeckPlayer: [],      // TOT el Deck BONS

        AREA_QUEST_DECK: [],
        AREA_QUEST_OUT_DECK: [],
        AREA_PLAYER_DECK: [],
        AREA_PLAYER_OUT_DECK: [],
        AREA_HERO: [],
        AREA_MA: [],
        AREA_PREPARACIO: [],
        AREA_MISION_DECK: [],
        AREA_MISION_OUT_DECK: [],
        AREA_ALIATS: [],
        AREA_ATACK: [],
        AREA_VIATGE: [],
        lupa: {
            carta: null,
            position: 'right'
        },
    },
    getters:{
        questDeck(state){                    // Get AREA_QUEST_DECK
            return state.AREA_QUEST_DECK;
        },
        questOutDeck(state){                 // Get AREA_QUEST_OUT_DECK
           return state.AREA_QUEST_OUT_DECK;
        },
        playerDeck(state){                   // Get AREA_PLAYER_DECK
           return state.AREA_PLAYER_DECK;
        },
        playerOutDeck(state){               // Get AREA_PLAYER_OUT_DECK
          return state.AREA_PLAYER_OUT_DECK
        },
        hero(state){                        // Get AREA_HERO
           return state.AREA_HERO;
        },
        ma(state){                          // Get AREA_MA
           return state.AREA_MA;
        },
        preparacio(state){                  // Get AREA_PREPARACIO
            return state.AREA_PREPARACIO;
        },
        missionDeck(state){                 // Get AREA_MISION_DECK
            return state.AREA_MISION_DECK;
        },
        missionOutDeck(state){
            return state.AREA_MISION_OUT_DECK;  // Get AREA_MISION_OUT_DECK
        },
        aliats(state){                      // Get AREA_ALIATS
           return state.AREA_ALIATS;
        },
        atack(state){
          return state.AREA_ATACK;           // Get AREA_ATACK
        },
        viatge(state){
          return state.AREA_VIATGE;         // Get AREA_VIATGE
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
            state.AREA_QUEST_DECK = payload;
        },
        [types.SET_TO_QUEST_OUT_DECK](state, payload){      // Mutation AREA_QUEST_OUT_DECK
            state.AREA_QUEST_OUT_DECK = payload;
        },
        [types.SET_TO_MISION_DECK](state, payload){          // Mutation AREA_MISION_DECK
            state.AREA_MISION_DECK = payload;
        },
        [types.SET_TO_MISION_OUT_DECK](state, payload){
            state.AREA_MISION_OUT_DECK = payload;
        },
        [types.SET_TO_PREPARACIO](state, payload){     // Mutation AREA_PREPARACIO
            state.AREA_PREPARACIO = payload;
        },

        [types.SET_TO_ALL_DECK_PLAYER](state, payload){     // Mutation TOT el Deck BONS
            state.allDeckPlayer = payload;
        },
        [types.SET_TO_PLAYER_DECK](state, payload) {        // Mutation AREA_PLAYER_DECK
            state.AREA_PLAYER_DECK = payload;
        },
        [types.SET_TO_PLAYER_OUT_DECK](state, payload){     // Mutation AREA_PLAYER_OUT_DECK
            state.AREA_PLAYER_OUT_DECK = payload;
        },
        [types.SET_TO_HERO](state, payload) {   //Mutation AREA HERO
            state.AREA_HERO = payload;
        },
        [types.SET_TO_MA](state, payload){           // Mutation AREA_MA
            state.AREA_MA = payload;
        },
        [types.SET_TO_ATACK](state, payload){           // Mutation AREA_MA
            state.AREA_ATACK = payload;
        },
        [types.ONE_TO_PREPARACIO](state, payload){
            state.AREA_PREPARACIO = payload;
        },
        [types.SET_TO_ALIATS](state, payload){               // Mutation AREA_ALIATS
            state.AREA_ALIATS = payload;
        },
        [types.SET_TO_VIATGE](state, payload){
            state.AREA_VIATGE = payload;
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
                commit(types.SET_TO_MISION_DECK, quest);
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
        //******************************/
        // obj.card -> La carta a moure
        // obj.pos -> La posició que ocupa la carta en l'area actual
        // obj.from -> L'area on és actualment la carta
        // obj.to -> L'area on ha d'anar
        //***************************************/
        move: function({commit, state}, obj) {
            //Recullo les barralles From i To
            let from = state[obj.from];
            let to = state[obj.to];

            // Trec la carta de l'area actual
            // Afegeixo la carta a l'area destí
            // A dalt o a baix de la pila depenent de quina pila sigui
            from.splice(obj.pos, 1);
            if (obj.to.includes('_OUT_')) {
                to.unshift(obj.card);
            } else {
                to.push(obj.card);
            }

            // Resolc l'area en acció
            let setFrom = translateAreaSetTo(obj.from);
            let setTo = translateAreaSetTo(obj.to);

            console.log(obj, setFrom, setTo, from, to);

            // Envio a l'state les dues baralles modificades
            commit(setFrom, from);
            commit(setTo, to);
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
        setLupaCard: function({commit, state}, carta){
            commit(types.SET_LUPA_CARD, carta);
        },
        setLupaPosition: function({commit, state}, position){
            commit(types.SET_LUPA_POSITION, position);
        }
    }
})