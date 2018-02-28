<template>
    <div class="columns is-gapless" v-droppable.carta="send" ref="pila" v-bind:class="[{'overOK': isOverOK}, {'overBAD': isOverBAD}]" v-dragenter.carta="enter" v-dragleave.carta="out">
        <div class="column" v-for="carta in one">
            <carta :card="carta" :cara="cara" :caraForce="caraForce" :rol="rol" :isVertical="isVertical" :hasLupa="(rol == AREA_MISION_DECK || rol == AREA_PLAYER_OUT_DECK || rol == AREA_QUEST_OUT_DECK || rol == AREA_VIATGE)" @width="newWidth"></carta>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import * as types from '../store/mutation-types'
    import * as groups from '../store/mutation-groups'

export default {
    name: 'pila',
    components: {},
    props: ['deck', 'cara', 'rol', 'isVertical', 'caraForce'],
    data: function(){
        return {
            [types.AREA_MISION_DECK]: types.AREA_MISION_DECK,
            [types.AREA_PLAYER_OUT_DECK] : types.AREA_PLAYER_OUT_DECK,
            [types.AREA_QUEST_OUT_DECK]: types.AREA_QUEST_OUT_DECK,
            [types.AREA_VIATGE] : types.AREA_VIATGE,
            isOverOK: false,
            isOverBAD: false,
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
            getViatge: 'viatge'
        }),
        one: function(){
            return this.deck.slice(0,1);
        }
    },
    methods:{
        ...mapActions({
            move: 'move',
        }),
        send: function(ev) {
            let eve = JSON.parse(ev);
            let deck = this.getDeckByArea(eve.rol);
            let pos = _.findIndex(deck, function(c) {console.log(c.ID, eve.card.ID);return c.ID == eve.card.ID});
            let obj = {
                card: eve.card,
                pos: pos,
                from: eve.rol,
                to: this.rol
            };
            this.move(obj);

            this.isOverOK = false;
            this.isOverBAD = false;
        },
        enter:function(ev){
            let eve = JSON.parse(ev);
            if ( ((groups.PLAYING_ALIES_DECK_LIST.indexOf(eve.rol) > -1) &&
                    (groups.PLAYING_ALIES_DECK_LIST.indexOf(this.rol) > -1))
                ||
                ((groups.PLAYING_QUEST_DECK_LIST.indexOf(eve.rol) > -1) &&
                    (groups.PLAYING_QUEST_DECK_LIST.indexOf(this.rol) > -1)) ) {
                this.isOverOK = true;
            } else {
                this.isOverBAD = true;
            }

        },
        out: function(ev){
            if (this.isOverOK) {
                this.isOverOK = false;
            }
            if (this.isOverBAD) {
                this.isOverBAD = false;
            }
        },
        newWidth: function(ample){
            console.log("PIIIILA");
            console.log(this.$refs.pila);
            if (typeof (this.$refs.pila) !== 'undefined' &&
                typeof(this.$refs.pila.clientWidth) !== 'undefined') {
                let displayWidth = this.$refs.pila.clientWidth;
                let nCartes = displayWidth / Math.round(ample);
                this.hasMax = !(this.deck.length > nCartes);
            }
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
    },
}
</script>

<style lang="scss">

</style>