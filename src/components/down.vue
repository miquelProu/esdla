<template>
    <b-dropdown v-bind:position="posicio">
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
        <template v-if="rol != AREA_ATTACH && (card.type == 'Attachment' || ( (card.type == 'Setup' || card.type == 'Encounter') && (rol == AREA_PREPARACIO || rol == AREA_ATACK || rol == AREA_ALIATS) ) )">
            <down-vincular :rol="rol" :card="card" :side="downVincularSide"></down-vincular>
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
            <b-dropdown-item v-on:click="esgotat(true)">Esgotar</b-dropdown-item>
            <b-dropdown-item v-on:click="esgotat(false)">Recuperar</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_ATACK">
            <b-dropdown-item v-on:click="addDamage">Add Damage</b-dropdown-item>
            <b-dropdown-item v-on:click="subsDamage">Subs Damage</b-dropdown-item>
            <b-dropdown-item v-on:click="sombra">Sombra</b-dropdown-item>
        </template>
        <template v-if="card.type == 'Quest' || rol == AREA_ATACK">
            <b-dropdown-item v-on:click="flip">Flip</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_VIATGE">
            <b-dropdown-item v-on:click="addViatge">Add Viatge</b-dropdown-item>
            <b-dropdown-item v-on:click="subsViatge">Subs Viatge</b-dropdown-item>
        </template>
        <template v-if="(rol == AREA_PLAYER_DECK) || (rol == AREA_QUEST_DECK) || (rol == AREA_PLAYER_OUT_DECK) || (rol == AREA_QUEST_OUT_DECK)">
            <hr class="dropdown-divider">
                <b-dropdown-item v-on:click="showNCartes">Ensenyar X cartes PLAYER</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_SHOW">
            <b-dropdown-item v-on:click="moure(AREA_PREPARACIO)">A preparació</b-dropdown-item>
            <b-dropdown-item v-on:click="moure(AREA_MA)">A la ma</b-dropdown-item>
        </template>
        <template v-if="rol == AREA_ATTACH">
            <b-dropdown-item v-on:click="esgotat(true)">Esgotar</b-dropdown-item>
            <b-dropdown-item v-on:click="esgotat(false)">Recuperar</b-dropdown-item>
        </template>
        <hr class="dropdown-divider">
        <b-dropdown-item v-on:click="esborrar()">Eliminar</b-dropdown-item>
        <template v-if="rol != AREA_ATTACH">
            <b-dropdown-item v-on:click="moureOne(true)">Moure Esq</b-dropdown-item>
            <b-dropdown-item v-on:click="moureOne(false)">Moure Drt</b-dropdown-item>
        </template>
    </b-dropdown>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import * as types from '../store/mutation-types'
    import * as groups from '../store/mutation-groups'
    import BDropdownItem from "buefy/src/components/dropdown/DropdownItem";
    import DownVincular from './downVincular'
    import _ from 'lodash'

    export default {
        name: 'down',
        components: {
            BDropdownItem,
            'down-vincular': DownVincular,
            'b-dropdown-item': BDropdownItem
        },
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
                [types.AREA_VIATGE]: types.AREA_VIATGE,
                [types.AREA_SHOW]: types.AREA_SHOW,
                [types.AREA_ATTACH]: types.AREA_ATTACH
            }
        },
        mounted: function(){},
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
                getLupaCard: 'getLupaCard',
                getShow: 'show'
            }),
            posicio: function(){
                let self = this;
                if (this.rol != types.AREA_ATTACH) {
                    let deck = this.getDeckByArea(this.rol);
                    let pos = _.findIndex(deck, function (c) {
                        return c.ID == self.card.ID
                    });

                    let direccio = (pos / deck.length > 0.5) ? 'left' : 'right';

                    if (this.rol == types.AREA_MA) {
                        return 'is-top-' + direccio;
                    } else if (this.rol == types.AREA_MISION_OUT_DECK || this.rol == types.AREA_MISION_DECK) {
                        return 'is-bottom-left';
                    } else if (this.rol == types.AREA_PREPARACIO || this.rol == types.AREA_ATACK) {
                        return 'is-bottom-' + direccio;
                    } else {
                        return 'is-bottom-right';
                    }
                } else {
                    return 'is-bottom-right';
                }
            },
            downVincularSide: function(){
                if (this.rol != types.AREA_ATTACH) {
                    let self = this;
                    let deck = this.getDeckByArea(this.rol);
                    let pos = _.findIndex(deck, function (c) {
                        return c.ID == self.card.ID
                    });

                    return (pos/deck.length > 0.5) ? 'left' : 'right';
                } else {
                    return 'left';
                }
            }
        },
        methods:{
            ...mapActions({
                remenar: 'remenar',
                move: 'move',
                toogleNCartes: 'toogleNCartes',
                setRolModalNum: 'setRolModalNum',
                moveOne: 'moveOne',
                sombraIn: 'sombra',
                attach: 'attach',
                addToVinculada: 'addToVinculada',
                deleteAttach: 'deleteAttach'
            }),
            esborrar: function(){
                let self = this;
                if (this.card.type != 'Attachment') {
                    let deck = this.getDeckByArea(this.rol);
                    let dest;
                    if (groups.PLAYING_ALIES_DECK_LIST.indexOf(this.rol) > -1) {
                        dest = types.AREA_PLAYER_OUT_DECK;
                    } else if (groups.PLAYING_QUEST_DECK_LIST.indexOf(this.rol) > -1) {
                        dest = types.AREA_QUEST_OUT_DECK;
                    } else {
                        dest = types.AREA_MISION_OUT_DECK;
                    }
                    let pos = _.findIndex(deck, function (c) {
                        return c.ID == self.card.ID
                    });
                    let obj = {
                        card: this.card,
                        pos: pos,
                        from: this.rol,
                        to: dest
                    };
                    this.move(obj);
                } else {
                    this.deleteAttach(this.card);
                }
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
            vincular: function(id){
                let self = this;
                let deck = this.getDeckByArea(this.rol);
                let pos = _.findIndex(deck, function(c) {return c.ID == self.card.ID});
                let obj = {
                    card: this.card,
                    pos: pos,
                    from: types.AREA_MA,
                    to: types.AREA_HERO,
                    cardDest: id
                };
                this.addToVinculada(obj);
            },
            moureOne: function(isLeft){
                let self = this;
                let deck = this.getDeckByArea(this.rol);
                let pos = _.findIndex(deck, function(c) {return c.ID == self.card.ID});
                let obj = {
                    isLeft: isLeft,
                    pos: pos,
                    rol: this.rol,
                    deck: deck
                };
                this.moveOne(obj);
            },
            sombra: function(){
                let self = this;
                let deck = this.getAtack;
                let pos = _.findIndex(deck, function(c) {return c.ID == self.card.ID});
                this.sombraIn(pos);
            },
            addResource: function(){
                let deck = this.getDeckByArea(this.rol);
                let self = this;
                _.each(deck, function(carta){
                    if (carta.ID == self.card.ID) {
                        carta.resource++;
                    }
                });
            },
            subsResource: function(){
                let deck = this.getDeckByArea(this.rol);
                let self = this;
                _.each(deck, function(carta){
                    if (carta.ID == self.card.ID) {
                        carta.resource--;
                    }
                });
            },
            addDamage: function(){
                let deck = this.getDeckByArea(this.rol);
                let self = this;
                _.each(deck, function(carta){
                    if (carta.ID == self.card.ID) {
                        carta.damage++;
                    }
                });
            },
            subsDamage: function(){
                let deck = this.getDeckByArea(this.rol);
                let self = this;
                _.each(deck, function(carta){
                    if (carta.ID == self.card.ID) {
                        carta.damage--;
                    }
                });
            },
            addViatge: function(){
                let deck = this.getDeckByArea(this.rol);
                let self = this;
                _.each(deck, function(carta){
                    if (carta.ID == self.card.ID) {
                        carta.viatge++;
                    }
                });
            },
            subsViatge: function(){
                let deck = this.getDeckByArea(this.rol);
                let self = this;
                _.each(deck, function(carta){
                    if (carta.ID == self.card.ID) {
                        carta.viatge--;
                    }
                });
            },
            esgotat: function(val){
                this.$emit('esgotat', val);
            },
            flip: function(){
                this.$emit('flip', true);
            },
            showNCartes: function(){
                this.toogleNCartes();
                this.setRolModalNum(this.rol);
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
                    case types.AREA_VIATGE:
                        return this.getViatge;
                        break;
                    case types.AREA_SHOW:
                        return this.getShow;
                        break;
                }
            }
        }
    }
</script>

<style lang="scss">

</style>