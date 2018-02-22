<template>
    <div class="carta" v-draggable.carta="dragableObj" ref="carta" v-bind:class="{'esgotat': card.esgotat}" v-bind:style="{maxWidth: calculateWidth}">
        <figure class="imgCarta">
            <resource :resource="card.resource" :damage="card.damage" :viatge="card.viatge"></resource>
            <img v-on:mouseover="isLupa" v-on:mouseout="setLupaCard(null)" v-bind:src="srcImage()" />
        </figure>
        <down :rol="rol" :card="carta" @flip="flip" @esgotat="newEsgotat"></down>
        <attach v-if="vinculadas.length > 0" :cartes="vinculadas"></attach>
    </div>
</template>

<script>
    import Down from './down'
    import Resource from './resources'
    import Attach from './attach'
    import * as types from '../store/mutation-types'

    import { mapActions } from 'vuex'

export default {
    name: 'carta',
    components: {
        down: Down,
        resource: Resource,
        attach: Attach
    },
    props: ['card', 'cara', 'caraForce', 'rol', 'isVertical', 'hasLupa'],
    data: function(){
        let self = this;
        return {
            cartaWidth: null,
            cartaHeight: null,
            carta: {id:'51223bd0-ffd1-11df-a976-0801200c9001'},
            cardType: null,
            esgotat: false,
            side: null,
            isCaraForce: null,
            [types.AREA_MISION_DECK]: types.AREA_MISION_DECK,
            dragableObj: {
                card: this.card,
                rol: this.rol
            },
            vinculadas: []
        }
    },
    mounted: function(){
        this.cartaWidth = this.$refs.carta.clientWidth;
        this.cartaHeight = this.$refs.carta.clientHeight;
        this.carta = this.card;
        if (this.card.type == 'Encounter') {
            this.cardType = 'Encounter'
        } else if (this.card.type == 'Quest') {
            this.cardType = 'Misio'
        } else {
            this.cardType = 'Bo'
        }
        if (!this.caraForce) {
            this.side = (this.card.cara !== null) ? this.card.cara : this.cara;
        } else {
            this.side = this.cara;
        }
        this.vinculadas = this.card.vinculada;

    },
    watch: {
        card: function (newData, oldData) {
                this.carta = newData;
                this.dragableObj.card = newData;
                this.vinculadas = newData.vinculada;
                console.log(this.vinculadas);
            },
        cara: function(newData, oldData){
                this.side = newData;
        }
    },
    computed: {
        calculatedHeight: function(){
            let calcul = (this.cartaWidth * 141) / 100;
            return Math.round(calcul) + 'px';
        },
        calculateWidth: function(){
            console.log(this.cartaHeight);
            if (!this.isVertical) {
                let calcul = (this.cartaHeight * 70.5) / 100;
                this.$emit('width', calcul);
                return Math.round(calcul) + 'px';

            } else {
                return 'none';
            }
        },

    },
    methods: {
        ...mapActions({
            setLupaCard: 'setLupaCard',
            setLupaPosition: 'setLupaPosition'
        }),
        srcImage: function(){
            if (this.side) {
                return "/dist/cartas/" + this.carta.id + ".png";
            } else {
                if (this.rol == types.AREA_MISION_DECK){
                    return "/dist/cartas/" + this.carta.id + ".B.png";
                } else {
                    if (this.carta.type == 'Encounter' || this.carta.type == 'Setup') {
                        return "/dist/cartas/encounter.jpg";
                    } else {
                        return "/dist/cartas/card.jpg";
                    }
                }

            }
        },
        isLupa: function(event) {
            if (this.hasLupa) {
                if (((window.innerWidth / 3) * 2) > event.clientX) {
                    this.setLupaPosition('right');
                } else {
                    this.setLupaPosition('left');
                }
                if (this.rol == types.AREA_MISION_DECK || this.side) {
                    let temp = _.clone(this.carta);
                     if (!this.side) {
                         temp.id = temp.id + ".B";
                     }
                    this.setLupaCard(temp);
                }
            }
        },
        flip: function(val){
            if (val){
                this.side = !this.side;
            }
        },
        newEsgotat: function(val){
            this.card.esgotat = val;
        }
    }
}
</script>

<style lang="scss">
.carta {
    max-height: 600px;
    display:flex;
    flex-direction: column;
    /*height: 141%;*/
    height: 100%;
    position:relative;

    border:1px solid red;

    &.esgotat {
        .imgCarta {
            background-color: red;

            img {
                opacity: 0.7;
            }
        }
    }

    .dropdown {
        position:absolute;
        top:0;
        right:0;

        &.norotate {
            left: 0;
            right:auto;
        }
    }

    button {
        padding:0 !important;
        height:100% !important;

        span {height:100%;}
    }

    .imgCarta {
        display: flex;
        justify-content: start;
        align-items: center;
    }
}
</style>