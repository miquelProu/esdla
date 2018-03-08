<template>
    <a href="#" class="dropdown-item" style="position: relative;" @click="click">
        <span>Vincular</span>
        <span class="icon" style="position: absolute;right:0;">
            <i class="mdi mdi-menu-right mdi-24px"></i>
        </span>
        <div class="dropdown-menu" id="dropdown-menu" role="menu" style="top:-8px;padding-top: 0;" :class="{'is-hidden': isHidden}" :style="dretaEsquerra">
            <div class="dropdown-content">
                <a href="#" class="dropdown-item"  v-for="(personatje, index) in vinculables" @click="vincular(personatje.ID)">{{personatje.name}}</a>
            </div>
        </div>
    </a>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import _ from 'lodash'
    import * as types from '../store/mutation-types'
    import * as groups from '../store/mutation-groups'

export default {
    name: 'downVincular',
    components: {},
    props:  ['card', 'rol', 'side'],
    data: function(){
        return {
            isHidden: true,
        }
    },
    mounted: function(){},
    watch: {},
    computed: {
        ...mapGetters({
            getAmenasa: 'amenasa',
            getTorn: 'torn',
            getHero: 'hero',
            getPreparacio: 'preparacio',
            getAtack: 'atack'
        }),
        dretaEsquerra: function(){
            if (this.side == 'right'){
                return {left: '100%'};
            } else {
                return {right: '100%'};
                // return {left: '100%'};
            }
        },
        vinculables: function(){
            let self = this;
            if (groups.PLAYING_QUEST_DECK_LIST.indexOf(this.rol) > -1) {
                let union = _.concat(this.getPreparacio, this.getAtack);
                _.remove(union, function(n){
                    return n.ID == self.card.ID;
                });
                return union;
            } else {
                return this.getHero;
            }
        },
    },
    methods: {
        ...mapActions({
            setAmenasa: 'setAmenasa',
            setTorn: 'setTorn',
            addToVinculada: 'addToVinculada',
        }),
        click: function(){
            this.isHidden = !this.isHidden;
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
        getDeckByArea: function(area) {
            switch (area) {
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