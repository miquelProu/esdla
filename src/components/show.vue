<template>
    <div ref="show" class="columns is-gapless">
        <div class="column is-one-quarter" v-for="carta in deck">
            <carta :cara="true" :card="carta" :rol="AREA_PREPARACIO" :isVertical="false" @width="newWidth"></carta>
        </div>
    </div>
</template>

<script>

    import * as types from '../store/mutation-types'
    import Carta from './carta.vue'

export default {
    name: 'show',
    components: {
        'carta':  Carta,
    },
    props: ['deck'],
    data: function(){
        return {
            hasMax: true,
            [types.AREA_PREPARACIO]: types.AREA_PREPARACIO,
        }
    },
    mounted: function(){},
    watch: {},
    computed: {},
    methods:{
        newWidth: function(ample){
            if (this.$refs.show.clientWidth !== 'undefined') {
                let displayWidth = this.$refs.show.clientWidth;
                let nCartes = displayWidth / Math.round(ample);
                this.hasMax = !(this.deck.length > nCartes);
                console.log(this.deck.length, nCartes);
            }
        }
    }
}
</script>

<style lang="scss">
    .columns {
        height:100%;
        margin-bottom: 0;
    }
</style>