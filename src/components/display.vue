<template>
    <div ref="display" v-droppable.carta="send" v-dragenter.carta="enter" v-dragleave.carta="out" class="columns is-gapless" v-bind:class="[{'overOK': isOverOK}, {'overBAD': isOverBAD}]">
        <div class="column" v-bind:class="[{'is-narrow': hasMax}, {'heroi': rol == AREA_HERO}]" v-for="carta in deck">
            <carta :cara="cara" :caraForce="caraForce" :card="carta" :rol="rol" :isVertical="false" @width="newWidth" :hasLupa="true" :class=""></carta>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import * as types from '../store/mutation-types'
    import * as groups from '../store/mutation-groups'

export default {
    name: 'display',
    components: {},
    props: ['deck', 'cara', 'rol', 'caraForce'],
    data: function(){
        return {
            hasMax: true,
            [types.AREA_HERO]: types.AREA_HERO,
            isOverOK: false,
            isOverBAD: false,
        }
    },
    mounted: function(){},
    watch: {
        deck: function(){
            if (this.rol == types.AREA_HERO) {
                let self = this;
                let cont = 0;
                _.each(self.deck, function (carta) {
                    if (carta.type == 'Attachment') {
                        cont++;
                    }
                });
            }
        }
    },
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
        })
    },
    methods:{
        ...mapActions({
            move: 'move',
        }),
        newWidth: function(ample){
            if (typeof(this.$refs.display) !== 'undefined' &&
                typeof(this.$refs.display.clientWidth) !== 'undefined') {

                let displayWidth = this.$refs.display.clientWidth;
                let nCartes = displayWidth / Math.round(ample);
                this.hasMax = !(this.deck.length > nCartes);
            }
        },
        send: function(ev) {
            let eve = JSON.parse(ev);
            let deck = this.getDeckByArea(eve.rol);
            let pos = _.findIndex(deck, function(c) {return c.ID == eve.card.ID});
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
            if (eve.card.type == 'Hero' && this.rol != types.AREA_HERO){
                this.isOverBAD = true;
            } else {
                this.isOverOK = true;
            }
            if (
                (
                    (groups.PLAYING_ALIES_DECK_LIST.indexOf(eve.rol) > -1) &&
                    (
                        (groups.PLAYING_ALIES_DECK_LIST.indexOf(this.rol) > -1) ||
                        (groups.PLAYING_OTHERS_DECK_LIST.indexOf(this.rol) > -1)
                    )
                ) ||
                (
                    (groups.PLAYING_QUEST_DECK_LIST.indexOf(eve.rol) > -1) &&
                    (
                        (groups.PLAYING_QUEST_DECK_LIST.indexOf(this.rol) > -1) ||
                        (groups.PLAYING_OTHERS_DECK_LIST.indexOf(this.rol) > -1 )
                    )
                )
            ) {
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
    .columns {
        height:100%;
        margin-bottom: 0;

        &.is-gapless > {
            .column {
                &.heroi {
                    margin-right:10px;
                }
            }
        }

        &.overOK {
            background-color: #daffd1;
        }
        &.overBAD {
            background-color: #ffbabc;
        }
    }
</style>