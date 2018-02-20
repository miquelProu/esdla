<template>
    <div class="columns is-multiline is-mobile" ref="displayVinc">
        <div v-for="carta in cartes" class="column is-one-third">
            <carta :cara="true" :caraForce="true" :card="carta" :rol="'vinculada'" :isVertical="false" :hasLupa="false" @width="newWidth" :class=""></carta>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Carta from './carta'

export default {
    name: 'vinc',
    components: {
        'carta': Carta
    },
    props:  ['cartes'],
    data: function(){
        return {}
    },
    mounted: function(){
        console.log("VINCULADA");
        console.log(this.carta);
    },
    watch: {},
    computed: {},
    methods: {
        newWidth: function(ample){
            if (this.$refs.displayVinc.clientWidth !== 'undefined') {
                let displayWidth = this.$refs.displayVinc.clientWidth;
                let nCartes = displayWidth / Math.round(ample);
                this.hasMax = !(this.deck.length > nCartes);
            }
        },
    }
}
</script>

<style lang="scss">
    .text {
        font-weight: bold;
        font-size: 0.8rem;
    }
</style>