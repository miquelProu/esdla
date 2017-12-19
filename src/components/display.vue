<template>
    <div class="columns is-gapless">
        <div class="column" v-for="carta in deck">
            <carta :rotate="false" :card="carta"></carta>
        </div>
        <!--<div class="column"><carta :rotate="false" :card="deck[0]"></carta></div>-->
        <!--<div class="column"><carta :rotate="false" :card="deck[1]"></carta></div>-->
        <!--<div class="column"><carta :rotate="false" :card="deck[2]"></carta></div>-->
        <!--<div class="column"><carta :rotate="false" :card="deck[3]"></carta></div>-->
        <!--<div class="column"><carta :rotate="false" :card="deck[4]"></carta></div>-->
        <!--<div class="column"><carta :rotate="false" :card="deck[5]"></carta></div>-->
        <!--<div class="column"><carta :rotate="false" :card="deck[6]"></carta></div>-->
        <div class="column"></div>
        <div class="column"></div>
        <div class="column"></div>
        <div class="column"></div>
        <div class="column"></div>
    </div>
</template>

<script>
    import Carta from './carta.vue'

export default {
    name: 'display',
    components: {
        'carta':  Carta,
    },
    props: ['deck'],
    data: function(){
        return {}
    },
    mounted: function(){},
    watch: {},
    computed: {

    },
    methods:{},
}
</script>

<style lang="scss">

</style>