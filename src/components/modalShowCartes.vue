<template>
    <div class="modal-card" style="width:100%;">
        <header class="modal-card-head">
            <p class="modal-card-title">Quantes cartes vols veure?</p>
        </header>
        <section class="modal-card-body">
            <show :deck="deckSelected"></show>
        </section>
        <footer class="modal-card-foot" style="justify-content: flex-end;">
            <button class="button" type="button" @click="sendClose()">Tancar</button>
            <button class="button is-primary" @click="sendRemenar()">Tancar i remenar</button>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Show from './show.vue'
import * as types from './../store/mutation-types'

export default {
    name: 'modalShowCartes',
    components:{
        'show' : Show
    },
    // props: [],
    data: function(){
        return {
            [types.AREA_QUEST_DECK]: types.AREA_QUEST_DECK,
            [types.AREA_QUEST_OUT_DECK]: types.AREA_QUEST_OUT_DECK,
            [types.AREA_MISION_DECK]: types.AREA_MISION_DECK,
            [types.AREA_MISION_OUT_DECK]: types.AREA_MISION_OUT_DECK,
            [types.AREA_PLAYER_DECK]: types.AREA_PLAYER_DECK,
            [types.AREA_PLAYER_OUT_DECK]: types.AREA_PLAYER_OUT_DECK,
            deckSelected: []
        }
    },
    mounted: function(){
        this.selectDeck();
        this.deckSelected = this.getShow;
    },
    // watch: {},
    computed: {
        ...mapGetters({
            getNumCartes: 'numShowCartes',
            getRolCartes: 'rolShowCartes',
            getQuestDeck: 'questDeck',
            getQuestOutDeck: 'questOutDeck',
            getPlayerDeck: 'playerDeck',
            getPlayerOutDeck: 'playerOutDeck',
            getShow: 'show'

        }),

    },
    methods: {
        ...mapActions({
            moveToShow: 'moveToShow',
            toogleShowCartes: 'toogleShowCartes',
            closeShow: 'closeShow'
        }),
        selectDeck: function(){
            let deck = [];
            if (this.getRolCartes == types.AREA_PLAYER_DECK) {
                deck = this.getPlayerDeck;
            } else if (this.getRolCartes == types.AREA_QUEST_DECK){
                deck = this.getQuestDeck;
            } else if (this.getRolCartes == types.AREA_PLAYER_OUT_DECK){
                deck = this.getPlayerOutDeck;
            } else if (this.getRolCartes == types.AREA_QUEST_OUT_DECK) {
                deck = this.getQuestOutDeck;
            }
            let obj = {
                num: this.getNumCartes,
                rol: this.getRolCartes,
                deck: deck
            };
            this.moveToShow(obj);
        },
        sendClose: function(){
            //this.toogleShowCartes();
            this.closeShow(false);
            this.$parent.close();
        },
        sendRemenar: function(){
            this.closeShow(true);
            this.$parent.close();
        },
    },
    // filters: {}
}
</script>

<style lang="scss">

</style>