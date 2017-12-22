<template>
    <div class="columns is-gapless">
        <div class="column hola" v-for="carta in deck">
            <carta :rotate="false" :card="carta"></carta>
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
    props: ['deck'],
    data: function(){
        return {}
    },
    mounted: function(){},
    watch: {},
    computed: {},
    methods:{

    }
}
</script>

<style lang="scss">
    .columns {
        height:100%;
        margin-bottom: 0;
    }
</style>