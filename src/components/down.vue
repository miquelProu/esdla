<template>
    <b-dropdown>
        <button class="button is-primary" slot="trigger">
            <b-icon icon="menu-down"></b-icon>
        </button>
        <template v-if="rol == 'pila' && card.type == 'Encounter'">
            <b-dropdown-item v-on:click="toPreparacio(1)">A preparació</b-dropdown-item>
            <b-dropdown-item v-on:click="remenar('Encounter')">Remenar Preparació</b-dropdown-item>
        </template>
        <template v-if="rol == 'pila' && (card.type == 'Ally' || card.type == 'Attachment' || card.type == 'Event')">
            <b-dropdown-item v-on:click="toMa(1)">A la ma</b-dropdown-item>
            <b-dropdown-item v-on:click="remenar('Aliats')">Remenar Aliats</b-dropdown-item>
        </template>
        <template v-if="rol == 'diplay_aliats_ma' && (card.type == 'Ally' || card.type == 'Attachment' || card.type == 'Event')">
            <b-dropdown-item v-on:click="toTaula(card)">Baixar a taula</b-dropdown-item>
        </template>
        <template v-if="rol == 'diplay_aliats'">
            <b-dropdown-item v-on:click="addResource">Add Resource</b-dropdown-item>
            <b-dropdown-item v-on:click="SubsResource">Subs Resource</b-dropdown-item>
        </template>
        <hr class="dropdown-divider">
        <b-dropdown-item v-on:click="eliminar(eliminarDades)">Eliminar</b-dropdown-item>
    </b-dropdown>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as types from '../store/mutation-types'

    export default {
        name: 'down',
        components: {},
        props: ['card', 'rol'],
        data: function(){
            return {}
        },
        mounted: function(){

        },
        watch: {},
        computed: {
            eliminarDades: function(){
                let a = [];
                a.push(this.card);
                a.push(types.ALL_TO_MA_PLAYER);
                return a;
            },
        },
        methods:{
            ...mapActions({
                toTaula: 'toTaula',
                toMa: 'toMa',
                remenar: 'remenar',
                toPreparacio: 'toPreparacio',
                eliminar: 'eliminar'
            }),
            addResource: function(){
                this.$emit('resource','add');
            },
            SubsResource: function(){
                this.$emit('resource', 'subs');
            }
        },
    }
</script>

<style lang="scss">

</style>