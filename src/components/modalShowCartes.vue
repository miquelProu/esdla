<template>
    <show :deck="deckSelected"></show>
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
            moveToShow: 'moveToShow'
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
        }
    },
    // filters: {}
}
</script>

<style lang="scss">

</style>