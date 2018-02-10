<template>
    <div class="columns is-gapless">
        <div class="column" v-for="carta in one">
            <carta :card="carta" :cara="cara" :rol="rol" :isVertical="isVertical" :hasLupa="(rol == AREA_MISION_DECK || rol == AREA_PLAYER_OUT_DECK || rol == AREA_QUEST_OUT_DECK)"></carta>
        </div>
    </div>
</template>

<script>
    import Carta from './carta.vue'
    import * as types from '../store/mutation-types'

export default {
    name: 'pila',
    components: {
        'carta': Carta
    },
    props: ['deck', 'cara', 'rol', 'isVertical'],
    data: function(){
        return {
            [types.AREA_MISION_DECK]: types.AREA_MISION_DECK,
            [types.AREA_PLAYER_OUT_DECK] : types.AREA_PLAYER_OUT_DECK,
            [types.AREA_QUEST_OUT_DECK]: types.AREA_QUEST_OUT_DECK
        }
    },
    mounted: function(){},
    watch: {},
    computed: {
        one: function(){
            return this.deck.slice(0,1);
        }
    },
    methods:{},
}
</script>

<style lang="scss">

</style>