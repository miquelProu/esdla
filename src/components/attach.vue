<template>
    <div class="attach">
        <div class="columns is-gapless" style="position:absolute;width:100%;height:33%;margin-bottom:0.5rem;" v-for="(fila, index) in attachCartes" v-bind:style="{bottom: (index*33) + '%'}">
            <div v-for="cartaUna in fila" class="column is-one-third">
                <carta :cara="true" :caraForce="true" :card="cartaUna" :rol="AREA_ATTACH" :isVertical="false" :hasLupa="true"></carta>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Carta from './carta.vue'
    import _ from 'lodash'
    import * as types from '../store/mutation-types'

export default {
    name: 'attach',
    components: {},
    props:  ['cartes'],
    data: function(){
        return {
            attachCartes: _.chunk(this.cartes, 3),
            [types.AREA_ATTACH]: types.AREA_ATTACH
        }
    },
    mounted: function(){},
    watch: {
        cartes: {
            handler: function(newData, oldData){
                this.attachCartes = _.chunk(newData, 3);
            }
        }
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss">
    .text {
        font-weight: bold;
        font-size: 0.8rem;
    }
</style>