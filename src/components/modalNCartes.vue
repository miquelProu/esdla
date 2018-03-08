<template>
    <!--<form action="">-->
        <div class="modal-card" style="width:100%;">
            <header class="modal-card-head">
                <p class="modal-card-title">Quantes cartes vols veure?</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Nº de cartes">
                    <b-input
                            type="text"
                            v-model="nCartes"
                            required>
                    </b-input>
                </b-field>
            </section>
            <footer class="modal-card-foot" style="justify-content: flex-end;">
                <button class="button" type="button" @click="sendClose()">Tancar</button>
                <button class="button is-primary" @click="sendNumber()">Enviar</button>
            </footer>
        </div>
    <!--</form>-->
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

export default {
    name: 'modalNCartes',
    // components:{},
    // props: [],
    data: function(){
        return{
            nCartes: null,
        }
    },
    mounted: function(){
        let deck = this.getDeckByArea(this.getRol);
        this.nCartes = deck.length;
    },
    // watch: {},
     computed: {
         ...mapGetters({
             getRol: 'rolShowCartes',
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
     },
    methods: {
        ...mapActions({
            toogleNCartes: 'toogleNCartes',
            setModalNum: 'setModalNum'
        }),
        sendNumber: function(){
            this.$emit('hasNumber', true);
            this.setModalNum(this.nCartes * 1);
            this.sendClose();
        },
        sendClose: function(){
            this.toogleNCartes();
            this.$parent.close();
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
    // filters: {}
}
</script>

<style lang="scss">

</style>