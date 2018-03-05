import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import _move from 'lodash-move'
import VuexPersistence from 'vuex-persist'

import * as types from './mutation-types'
import * as groups from './mutation-groups'
import {translateAreaSetTo, translateSetToArea} from './mutation-types'
import {AREA_PLAYER_OUT_DECK} from "./mutation-types";
// import {array_move} from "./mutation-types";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key: 'lotr'
});

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        // allDeckQuest: [],       // TOT el Deck DOLENTS
        // allDeckPlayer: [],      // TOT el Deck BONS

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
        AREA_SHOW: [],
        AREA_WAIT: [],
        lupa: {
            carta: null,
            position: 'right'
        },

        CONTADOR_PLAYER:{
            amenasa: 0
        },
        CONTADOR_QUEST: {
            torn: 0
        },

        showDeck: {
            isModalNum: false,
            isModalShow: false,
            num: 0,
            rol: null
        }
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
        show(state){
            return state.AREA_SHOW;
        },
        getLupaCard(state){
           return state.lupa.carta;
        },
        getLupaPosition(state){
           return state.lupa.position;
        },
        amenasa(state){
            return state.CONTADOR_PLAYER.amenasa;
        },
        torn(state){
            return state.CONTADOR_QUEST.torn;
        },
        modalNcartes(state){
            return state.showDeck.isModalNum;
        },
        modalShowCartes(state){
            return state.showDeck.isModalShow;
        },
        numShowCartes(state){
            return state.showDeck.num;
        },
        rolShowCartes(state){
            return state.showDeck.rol;
        },
        nVinculada(state){
            return state.nVinculada;
        },
        wait(state){
            return state.AREA_WAIT;
        }

    },
    mutations:{
        // [types.SET_TO_ALL_DECK_QUEST](state, payload){      // Mutation TOT el Deck DOLENTS
        //     state.allDeckQuest = payload;
        // },
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

        // [types.SET_TO_ALL_DECK_PLAYER](state, payload){     // Mutation TOT el Deck BONS
        //     state.allDeckPlayer = payload;
        // },
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
        [types.SET_TO_SHOW](state, payload){
            state.AREA_SHOW = payload;
        },
        [types.SET_TO_VIATGE](state, payload){
            state.AREA_VIATGE = payload;
        },
        [types.SET_TO_WAIT](state, payload){
            state.AREA_WAIT =payload;
        },
        [types.SET_LUPA_CARD](state, carta){
            state.lupa.carta = carta;
        },
        [types.SET_LUPA_POSITION](state, position){
            state.lupa.position = position;
        },
        [types.ADD_AMENASA](state){
            state.CONTADOR_PLAYER.amenasa ++;
        },
        [types.SUB_AMENASA](state){
            state.CONTADOR_PLAYER.amenasa --;
        },
        [types.SET_AMENASA](state, amenasa){
            state.CONTADOR_PLAYER.amenasa = amenasa;
        },
        [types.ADD_TORN](state){
            state.CONTADOR_QUEST.torn ++;
        },
        [types.SUB_TORN](state){
            state.CONTADOR_QUEST.torn --;
        },
        [types.SET_TORN](state, torn){
            state.CONTADOR_QUEST.torn = torn;
        },
        [types.TOGGLE_N_CARTES](state){
            state.showDeck.isModalNum = !state.showDeck.isModalNum;
        },
        [types.TOGGLE_SHOW_CARTES](state){
            state.showDeck.isModalShow = !state.showDeck.isModalShow;
        },
        [types.SET_SHOW_CARTES](state, val){
            state.showDeck.isModalShow = val;
        },
        [types.NUM_CARTES](state, num){
            state.showDeck.num = num;
        },
        [types.ROL_N_CARTES](state, rol){
            state.showDeck.rol = rol;
        },
        [types.SET_N_VINCULADA](state, nVinculada){
            state.nVinculada =  nVinculada;
        },
    },
    actions:{
        addTo: function({commit,state}, payload){
            console.log(payload);
            let area = translateSetToArea(payload.set);
            let temp = _.find(groups.AREA_TO_GET, function(g) {return g.area == types[area]});
            let actual = (this.getters[temp.agafar]);
            actual.push(...payload.cards);
            console.log(payload.set, actual);
            commit(payload.set, actual);
        },
        allToDeck: function({commit,state}, payload){
            let hasQuest = false;

            let deckQuestFiltered = [];
            deckQuestFiltered['cards'] = _.filter(payload.cards, function(c) {return c.type == 'Encounter'});
            deckQuestFiltered['set'] = types.SET_TO_QUEST_DECK;
            this.dispatch('addTo', deckQuestFiltered);

            let preparacio = [];
            preparacio['cards'] = _.filter(payload.cards, function(c) {return c.type == 'Setup'});
            preparacio['set'] = types.SET_TO_PREPARACIO;
            this.dispatch('addTo', preparacio);

            let quest = [];
            quest['cards'] = _.filter(payload.cards, function(c){return c.type == 'Quest'});
            quest['set'] = types.SET_TO_MISION_DECK;
            this.dispatch('addTo', quest);
            hasQuest = (quest.cards.length > 0);

            let hero = [];
            hero['cards'] = _.filter(payload.cards, function(c) {return c.type == 'Hero'});
            hero['set'] = types.SET_TO_HERO;
            this.dispatch('addTo', hero);

            let special = [];
            special['cards'] = _.filter(payload.cards, function(c){return c.type == 'Special'});
            special['set'] = types.SET_TO_ALIATS;
            this.dispatch('addTo', special);

            let player = [];
            player['cards'] = _.filter(payload.cards, function(c) {return (c.type == 'Ally' || c.type == 'Attachment' || c.type == 'Event')});
            player['set'] = (hasQuest) ? types.SET_TO_ALIATS : types.SET_TO_PLAYER_DECK;
            this.dispatch('addTo', player);

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
        //************************/
        // obj.num: El numero de cartes a ensenyar
        // obj.rol: L'area on és la carta
        // obj.deck: El deck complet de l'area
        //************************/
        moveToShow: function({commit, state}, obj){
            let deck = obj.deck;
            let ensenyar = deck.splice(0, obj.num);
            commit(types.SET_TO_SHOW, ensenyar);
            commit(translateAreaSetTo(obj.rol), deck);
        },
        //************************/
        // obj.isLeft: Boolea, True-> moure a l'esquerra, False-> dreta
        // obj.pos -> La posició que ocupa la carta en l'area actual
        // obj.rol: L'area on és la carta
        // obj.deck: El deck complet de l'area
        //************************/
        moveOne: function({commit, state}, obj){
            let newPos = (obj.isLeft) ? obj.pos -1 : obj.pos + 1;
            newPos = (newPos < 0) ? 0 : newPos;
            newPos = (newPos - 1 > obj.deck.length) ? obj.deck.length - 1 : newPos;
            let newDeck = _move(obj.deck, obj.pos, newPos);
            commit(translateAreaSetTo(obj.rol), newDeck);
        },
        deleteAttach: function({commit, state}, carta){
            // Afegim la carta a la pila de descarte
            let to = state[AREA_PLAYER_OUT_DECK];
            to.unshift(carta);
            commit(types.SET_TO_PLAYER_OUT_DECK, to);

            // Busquem la carta entre els herois
            // i quan trobem l'heroi on es l'attach
            // eliminem la carta
            _.each(state.AREA_HERO, function(hero){
                let vincle = -1;
                if (hero.vinculada.length > 0) {
                    vincle = _.findIndex(hero.vinculada, function(vinc){
                        return vinc.ID == carta.ID;
                    });
                }
                if (vincle > -1) {
                    hero.vinculada.splice(vincle, 1);
                }
            });
        },
        reparteix: function({commit, state}){
            this.dispatch('remenar', 'Encounter');
            this.dispatch('remenar', 'Aliats');

            let heros = this.getters.hero;
            _.forEach(heros, function(hero){
                hero.resource++;
            });

            let deck = this.getters.playerDeck;
            let ma = deck.splice(0,6);
            commit(types.SET_TO_PLAYER_DECK, deck);
            commit(types.SET_TO_MA, ma);

            this.dispatch('addTorn');
        },
        start: function({commit, state}, arr){
            _.forEach(arr, function(area){
                let action = area.name;
                let deck = area.deck;
                commit(translateAreaSetTo(action), deck);
            });
        },
        reset: function({commit, state}){
            _.forEach(groups.PLAYING_DECK_LIST, function(area){
                commit(translateAreaSetTo(area), []);
            });
            commit(types.SET_AMENASA, 0);
            commit(types.SET_TORN, 0);
        },
        closeShow: function({commit, state}, isRemenar){
            let to = [];
            if (this.getters.rolShowCartes == types.AREA_PLAYER_DECK) {
                to = this.getters.playerDeck;
            } else if (this.getters.rolShowCartes == types.AREA_PLAYER_OUT_DECK) {
                to = this.getters.playerOutDeck;
            } else if (this.getters.rolShowCartes == types.AREA_QUEST_DECK) {
                to = this.getters.questDeck;
            } else if (this.getters.rolShowCartes == types.AREA_QUEST_OUT_DECK) {
                to = this.getters.questOutDeck;
            }

            let from = this.getters.show;
            let concat = from.concat(to);
            let setTo = translateAreaSetTo(this.getters.rolShowCartes);
            commit(setTo, (isRemenar) ? _.shuffle(concat) : concat);
            console.log("COMMIT ZERO SHOW");
            commit(types.AREA_SHOW, []);

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
        sombra: function({commit,state}, index){
            let atack = this.getters.atack;
            let quest = this.getters.questDeck;

            let sombra = quest.splice(0, 1);
            sombra[0]['cara'] = false;
            atack.splice(index + 1, 0, sombra[0]);
            commit(types.SET_TO_ATACK, atack);
            commit(types.SET_TO_QUEST_DECK, quest);
        },
        finalitzar: function({commit, state}){
            let heros = this.getters.hero;
            _.forEach(heros, function(hero){
                hero.resource++;
                // console.log(hero);
            });
            let deck = this.getters.playerDeck;
            let card = deck[0];
            let obj = {
                card: card,
                pos: 0,
                from: 'AREA_PLAYER_DECK',
                to: 'AREA_MA'
            };
            this.dispatch('move',obj);
            this.dispatch('recuperar');
            this.dispatch('addTorn');
            this.dispatch('addAmenasa');
        },
        recuperar: function({commit, state}){
            let heros = this.getters.hero;
            let aliats = this.getters.aliats;
            _.forEach(heros, function(hero){
                hero.esgotat = false;
            });
            _.forEach(aliats, function(a){
                a.esgotat = false;
            });
        },
        setLupaCard: function({commit, state}, carta){
            commit(types.SET_LUPA_CARD, carta);
        },
        setLupaPosition: function({commit, state}, position){
            commit(types.SET_LUPA_POSITION, position);
        },
        toogleNCartes: function({commit, state}){
            commit(types.TOGGLE_N_CARTES);
        },
        toogleShowCartes: function({commit, state}){
            console.log("STORE TOOGLE");
            commit(types.TOGGLE_SHOW_CARTES);
        },
        setShowCartes: function({commit, state}, val){
            commit(types.SET_SHOW_CARTES, val);
        },
        setModalNum: function({commit, state}, num){
            commit(types.NUM_CARTES, num);
        },
        setRolModalNum: function({commit, state}, rol){
            commit(types.ROL_N_CARTES, rol);
        },
        addTorn: function({commit, state}){
            commit(types.ADD_TORN);
        },
        subTorn: function({commit, state}){
            commit(types.SUB_TORN);
        },
        setTorn: function({commit, state}, val){
            commit(types.SET_TORN, val);
        },
        addAmenasa: function({commit, state}){
            commit(types.ADD_AMENASA);
        },
        subAmenasa: function({commit, state}){
            commit(types.SUB_AMENASA);
        },
        setAmenasa: function({commit, state}, amenasa){
            commit(types.SET_AMENASA, amenasa);
        },
        addToVinculada: function({commit, state}, obj){
            let from = state[obj.from];
            from.splice(obj.pos, 1);

            let hero = this.getters.hero;
            let posDest = _.find(hero, function(c) {return c.ID == obj.cardDest});
            posDest.vinculada.push(obj.card);
        }
    },
    plugins: [vuexLocal.plugin]
})