<template>
    <b-dropdown>
        <button class="button is-primary" slot="trigger">
            <b-icon icon="menu-down"></b-icon>
        </button>
        <template v-if="rol == AREA_QUEST_DECK && card.type == 'Encounter'">
            <b-dropdown-item v-on:click="moure(AREA_PREPARACIO)">A preparació</b-dropdown-item>
            <b-dropdown-item v-on:click="remenar('Encounter')">Remenar Preparació</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_PLAYER_DECK && (card.type == 'Ally' || card.type == 'Attachment' || card.type == 'Event')">
            <b-dropdown-item v-on:click="moure(AREA_MA)">A la ma</b-dropdown-item>
            <b-dropdown-item v-on:click="remenar('Aliats')">Remenar Aliats</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_MA">
            <b-dropdown-item v-on:click="moure(AREA_ALIATS)">Baixar a taula</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_PREPARACIO">
            <b-dropdown-item v-on:click="moure(AREA_ATACK)">Baixar a enfrontament</b-dropdown-item>
            <b-dropdown-item v-on:click="moure(AREA_VIATGE)">Viatjar</b-dropdown-item>
            <b-dropdown-item v-on:click="addDamage">Add Damage</b-dropdown-item>
            <b-dropdown-item v-on:click="subsDamage">Subs Damage</b-dropdown-item>
            <b-dropdown-item v-on:click="addViatge">Add Viatge</b-dropdown-item>
            <b-dropdown-item v-on:click="subsViatge">Subs Viatge</b-dropdown-item>
        </template>
        <template v-if="(rol == AREA_ALIATS) || (rol == AREA_HERO)">
            <b-dropdown-item v-on:click="addResource">Add Resource</b-dropdown-item>
            <b-dropdown-item v-on:click="subsResource">Subs Resource</b-dropdown-item>
            <b-dropdown-item v-on:click="addDamage">Add Damage</b-dropdown-item>
            <b-dropdown-item v-on:click="subsDamage">Subs Damage</b-dropdown-item>
            <b-dropdown-item v-on:click="addViatge">Add Viatge</b-dropdown-item>
            <b-dropdown-item v-on:click="subsViatge">Subs Viatge</b-dropdown-item>
            <b-dropdown-item v-on:click="rotate">Esgotar</b-dropdown-item>
            <b-dropdown-item v-on:click="noRotate">Recuperar</b-dropdown-item>
        </template>
        <template v-if="card.type == 'Quest'">
            <b-dropdown-item v-on:click="flip">Flip</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_VIATGE">
            <b-dropdown-item v-on:click="addViatge">Add Viatge</b-dropdown-item>
            <b-dropdown-item v-on:click="subsViatge">Subs Viatge</b-dropdown-item>
        </template>
        <hr class="dropdown-divider">
        <b-dropdown-item v-on:click="esborrar()">Eliminar</b-dropdown-item>
    </b-dropdown>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import * as types from '../store/mutation-types'
    import * as groups from '../store/mutation-groups'
    import BDropdownItem from "buefy/src/components/dropdown/DropdownItem";
    import _ from 'lodash'

    export default {
        name: 'down',
        components: {BDropdownItem},
        props: ['card', 'rol'],
        data: function(){
            return {
                [types.AREA_PREPARACIO]: types.AREA_PREPARACIO,
                [types.AREA_ATACK]: types.AREA_ATACK,
                [types.AREA_HERO]: types.AREA_HERO,
                [types.AREA_ALIATS]: types.AREA_ALIATS,
                [types.AREA_MA]: types.AREA_MA,
                [types.AREA_QUEST_DECK]: types.AREA_QUEST_DECK,
                [types.AREA_QUEST_OUT_DECK]: types.AREA_QUEST_OUT_DECK,
                [types.AREA_MISION_DECK]: types.AREA_MISION_DECK,
                [types.AREA_MISION_OUT_DECK]: types.AREA_MISION_OUT_DECK,
                [types.AREA_PLAYER_DECK]: types.AREA_PLAYER_DECK,
                [types.AREA_PLAYER_OUT_DECK]: types.AREA_PLAYER_OUT_DECK,
                [types.AREA_VIATGE]: types.AREA_VIATGE
            }
        },
        mounted: function(){

        },
        watch: {},
        computed: {
            ...mapGetters({
                getQuestDeck: 'questDeck',
                getQuestOutDeck: 'questOutDeck',
                getPlayerDeck: 'playerDeck',
                getPlayerOutDeck: 'playerOutDeck',
                getHero: 'hero',
                getMa: 'ma',
                getPreparacio: 'preparacio',
                getMissionDeck: 'missionDeck',
                getAliats: 'aliats',
                getAtack: 'atack',
                getViatge: 'viatge',
                getLupaCard: 'getLupaCard'
            })
        },
        methods:{
            ...mapActions({
                remenar: 'remenar',
                move: 'move'
            }),
            esborrar: function(){
                let self = this;
                let deck = this.getDeckByArea(this.rol);
                let dest;
                if (groups.PLAYING_ALIES_DECK_LIST.indexOf(this.rol) > -1) {
                    dest = types.AREA_PLAYER_OUT_DECK;
                } else if(groups.PLAYING_QUEST_DECK_LIST.indexOf(this.rol) > -1) {
                    dest = types.AREA_QUEST_OUT_DECK;
                } else {
                    dest = types.AREA_MISION_OUT_DECK;
                }
                let pos = _.findIndex(deck, function(c) {return c.ID == self.card.ID});
                let obj = {
                    card: this.card,
                    pos: pos,
                    from: this.rol,
                    to: dest
                };
                this.move(obj);

            },
            moure: function(dest){
                let self = this;
                let deck = this.getDeckByArea(this.rol);
                let pos = _.findIndex(deck, function(c) {return c.ID == self.card.ID});
                let obj = {
                    card: this.card,
                    pos: pos,
                    from: this.rol,
                    to: dest
                };
                this.move(obj);
            },
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
            addViatge: function(){
                this.$emit('viatge', 'add');
            },
            subsViatge: function(){
                this.$emit('viatge', 'subs');
            },
            rotate: function(){
                this.$emit('rotate', true);
            },
            noRotate: function(){
                this.$emit('rotate', false);
            },
            flip: function(){
                this.$emit('flip', true);
            },
            getDeckByArea: function(area){
                switch (area){
                    case types.AREA_PREPARACIO:
                        return this.getPreparacio;
                        break;
                    case types.AREA_ATACK:
                        return this.getAtack;
                        break;
                    case types.AREA_HERO:
                        return this.getHero;
                        break;
                    case types.AREA_ALIATS:
                        return this.getAliats;
                        break;
                    case types.AREA_MA:
                        return this.getMa;
                        break;
                    case types.AREA_QUEST_DECK:
                        return this.getQuestDeck;
                        break;
                    case types.AREA_QUEST_OUT_DECK:
                        return this.getQuestOutDeck;
                        break;
                    case types.AREA_MISION_DECK:
                        return this.getMissionDeck;
                        break;
                    case types.AREA_PLAYER_DECK:
                        return this.getPlayerDeck;
                        break;
                    case types.AREA_PLAYER_OUT_DECK:
                        return this.getPlayerOutDeck;
                        break;

                }
            }
        }
    }
</script>

<style lang="scss">

</style>