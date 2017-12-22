<template>
    <carta :rotate="false" :card="deck[0]" :posicio="posicio"></carta>
</template>

<script>
    import Carta from './carta.vue'

export default {
    name: 'pila',
    components: {
        'carta': Carta
    },
    props: ['deck', 'posicio'],
    data: function(){
        return {}
    },
    mounted: function(){},
    watch: {},
    computed: {},
    methods:{},
}
</script>

<style lang="scss">

</style>