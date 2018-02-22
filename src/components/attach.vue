<template>
    <div class="columns is-gapless is-multiline is-mobile" ref="displayVinc" style="position:absolute;bottom:0;width:100%;" v-bind:style="{height: alcada + '%'}">
        <div v-for="cartaUna in cartes" class="column is-one-third">
            <carta :cara="true" :caraForce="true" :card="cartaUna" :rol="'vinculada'" :isVertical="false" :hasLupa="true" @width="newWidth"></carta>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import Carta from './carta.vue'

export default {
    name: 'attach',
    components: {
        'carta': Carta
    },
    props:  ['cartes'],
    data: function(){
        return {
            hasMax: false
        }
    },
    mounted: function(){
        console.log("VINCULADA");
        console.log(this.cartes);
    },
    watch: {},
    computed: {
        alcada: function(){
            if (this.cartes.length < 4){
                return 33;
            } else {
                return 66;
            }
        }
    },
    methods: {
        newWidth: function(ample){
            if (this.$refs.displayVinc.clientWidth !== 'undefined') {
                let displayWidth = this.$refs.displayVinc.clientWidth;
                let nCartes = displayWidth / Math.round(ample);
                this.hasMax = !(this.cartes.length > nCartes);
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