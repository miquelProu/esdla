<template>
    <b-dropdown>
        <button class="button is-primary" slot="trigger">
            <b-icon icon="menu-down"></b-icon>
        </button>
        <template v-if="rol == 'pila' && card.type == 'Encounter'">
            <down-encounter></down-encounter>
        </template>
        <template v-if="rol == 'pila' && (card.type == 'Ally' || card.type == 'Attachment' || card.type == 'Event')">
            <down-aliats></down-aliats>
        </template>
        <template v-if="rol == 'diplay_aliats' && (card.type == 'Ally' || card.type == 'Attachment' || card.type == 'Event')">
            <b-dropdown-item v-on:click="toTaula(carta)">Baixar a taula</b-dropdown-item>
        </template>
        <!--<hr class="dropdown-divider">-->
        <b-dropdown-item v-on:click="eliminar(eliminarDades)">Eliminar</b-dropdown-item>
    </b-dropdown>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        name: 'downMa',
        components: {},
        props: ['carta'],
        data: function(){
            return {}
        },
        mounted: function(){

        },
        watch: {},
        computed: {

        },
        methods:{
            ...mapActions({
                toTaula: 'toTaula'
            }),
        },
    }
</script>

<style lang="scss">

</style>