<template>
    <div class="columns is-gapless">
        <div class="column" v-for="carta in one">
            <carta :card="carta" :cara="cara" :rol="rol" :isVertical="isVertical"></carta>
        </div>
    </div>
</template>

<script>
    import Carta from './carta.vue'

export default {
    name: 'pila',
    components: {
        'carta': Carta
    },
    props: ['deck', 'cara', 'rol', 'isVertical'],
    data: function(){
        return {
            mazo:[]
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