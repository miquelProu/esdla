<template>
    <div class="columns is-gapless">
        <div class="column" v-for="carta in one">
            <carta :card="carta" :cara="cara" :caraForce="caraForce" :rol="rol" :isVertical="isVertical" :hasLupa="(rol == AREA_MISION_DECK || rol == AREA_PLAYER_OUT_DECK || rol == AREA_QUEST_OUT_DECK || rol == AREA_VIATGE)"></carta>
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
    props: ['deck', 'cara', 'rol', 'isVertical', 'caraForce'],
    data: function(){
        return {
            [types.AREA_MISION_DECK]: types.AREA_MISION_DECK,
            [types.AREA_PLAYER_OUT_DECK] : types.AREA_PLAYER_OUT_DECK,
            [types.AREA_QUEST_OUT_DECK]: types.AREA_QUEST_OUT_DECK,
            [types.AREA_VIATGE] : types.AREA_VIATGE
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