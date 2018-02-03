<template>
    <show :deck="getPlayerDeck"></show>
</template>

<script>
import { mapGetters } from 'vuex'
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
            selectedDeck: [],
        }
    },
    // mounted: function(){},
    // watch: {},
    computed: {
        ...mapGetters({
            getNumCartes: 'numShowCartes',
            getRolCartes: 'rolShowCartes',
            getQuestDeck: 'questDeck',
            getQuestOutDeck: 'questOutDeck',
            getPlayerDeck: 'playerDeck',
            getPlayerOutDeck: 'playerOutDeck',

        }),

    },
    methods: {
        selectDeck: function(){
            let deck = [];
            if (this.getRolCartes == types.AREA_PLAYER_DECK) {
                deck = this.getPlayerDeck;
            } else if (this.getRolCartes == AREA_QUEST_DECK){
                deck = this.getQuestDeck;
            } else if (this.getRolCartes == AREA_PLAYER_OUT_DECK){
                deck = this.getPlayerOutDeck;
            } else if (this.getRolCartes == AREA_QUEST_OUT_DECK) {
                deck = this.getQuestOutDeck;
            }
            deck.splice(0, this.getNumCartes);
            let setTo = translateAreaSetTo(this.getRolCartes);

        }
    },
    // filters: {}
}
</script>

<style lang="scss">

</style>