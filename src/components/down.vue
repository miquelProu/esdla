<template>
    <b-dropdown>
        <button class="button is-primary" slot="trigger">
            <b-icon icon="menu-down"></b-icon>
        </button>
        <template v-if="rol == AREA_QUEST_DECK && card.type == 'Encounter'">
            <b-dropdown-item v-on:click="toPreparacio(1)">A preparació</b-dropdown-item>
            <b-dropdown-item v-on:click="remenar('Encounter')">Remenar Preparació</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_PLAYER_DECK && (card.type == 'Ally' || card.type == 'Attachment' || card.type == 'Event')">
            <b-dropdown-item v-on:click="toMa(1)">A la ma</b-dropdown-item>
            <b-dropdown-item v-on:click="remenar('Aliats')">Remenar Aliats</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_MA && (card.type == 'Ally' || card.type == 'Attachment' || card.type == 'Event')">
            <b-dropdown-item v-on:click="toTaula(card)">Baixar a taula</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_ALIATS">
            <b-dropdown-item v-on:click="addResource">Add Resource</b-dropdown-item>
            <b-dropdown-item v-on:click="subsResource">Subs Resource</b-dropdown-item>
            <b-dropdown-item v-on:click="addDamage">Add Damage</b-dropdown-item>
            <b-dropdown-item v-on:click="subsDamage">Subs Damage</b-dropdown-item>
            <b-dropdown-item v-on:click="rotate">Esgotar</b-dropdown-item>
            <b-dropdown-item v-on:click="noRotate">Recuperar</b-dropdown-item>
        </template>
        <template v-if="card.type == 'Quest'">
            <b-dropdown-item v-on:click="flip">Flip</b-dropdown-item>
        </template>
        <hr class="dropdown-divider">
        <b-dropdown-item v-on:click="eliminar(eliminarDades)">Eliminar</b-dropdown-item>
    </b-dropdown>
</template>

<script>
    import { mapActions } from 'vuex'
    import * as types from '../store/mutation-types'
    import BDropdownItem from "buefy/src/components/dropdown/DropdownItem";

    export default {
        name: 'down',
        components: {BDropdownItem},
        props: ['card', 'rol'],
        data: function(){
            return {
                [types.AREA_PREPARACIO]: types.AREA_PREPARACIO,
                [types.AREA_HERO]: types.AREA_HERO,
                [types.AREA_ALIATS]: types.AREA_ALIATS,
                [types.AREA_MA]: types.AREA_MA,
                [types.AREA_QUEST_DECK]: types.AREA_QUEST_DECK,
                [types.AREA_MISION_DECK]: types.AREA_MISION_DECK,
                [types.AREA_PLAYER_DECK]: types.AREA_PLAYER_DECK,
                [types.AREA_PLAYER_OUT_DECK]: types.AREA_PLAYER_OUT_DECK
            }
        },
        mounted: function(){

        },
        watch: {},
        computed: {
            eliminarDades: function(){
                let a = [];
                a.push(this.card);
                if (this.rol == types.AREA_PLAYER_DECK) {
                    a.push(types.ALL_TO_MA_PLAYER);
                    a.push(types.ALL_TO_OUT_DECK_PLAYER);
                } else if (this.rol == types.AREA_HERO) {
                    a.push(types.AREA_HERO);
                    a.push(types.ALL_TO_OUT_DECK_PLAYER);
                }

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
            subsResource: function(){
                this.$emit('resource', 'subs');
            },
            addDamage: function(){
                this.$emit('damage','add');
            },
            subsDamage: function(){
                this.$emit('damage', 'subs');
            },
            rotate: function(){
                this.$emit('rotate', true);
            },
            noRotate: function(){
                this.$emit('rotate', false);
            },
            flip: function(){
                this.$emit('flip', true);
            }
        },
    }
</script>

<style lang="scss">

</style>