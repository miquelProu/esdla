<template>
    <div ref="display" class="columns is-gapless">
        <div class="column" v-bind:class="[{'is-narrow': hasMax}, { 'vinculada': carta.type == 'Attachment' }]" v-for="carta in deck">
            <carta :cara="cara" :card="carta" :rol="rol" :isVertical="false" @width="newWidth" :hasLupa="true" :class=""></carta>
        </div>
    </div>
</template>

<script>
    import Carta from './carta.vue'

export default {
    name: 'display',
    components: {
        'carta':  Carta,
    },
    props: ['deck', 'cara', 'rol'],
    data: function(){
        return {
            hasMax: true
        }
    },
    mounted: function(){},
    watch: {},
    computed: {},
    methods:{
        newWidth: function(ample){
            if (this.$refs.display.clientWidth !== 'undefined') {
                let displayWidth = this.$refs.display.clientWidth;
                let nCartes = displayWidth / Math.round(ample);
                this.hasMax = !(this.deck.length > nCartes);
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
    .columns.is-gapless > .column.vinculada {
        margin-left: -12%;
    }
</style>