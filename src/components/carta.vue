<template>
    <div class="carta" ref="carta" v-bind:class="{rotate: rotate}" v-bind:style="{maxWidth: calculateWidth}">
        <figure class="image">
            <resource v-if="resource > 0" :value="resource"></resource>
            <damage v-if="damage > 0" :value="damage"></damage>
            <viatge v-if="viatge > 0" :value="viatge"></viatge>
            <img v-on:mouseover="isLupa" v-on:mouseout="setLupaCard(null)" v-bind:src="srcImage()" />
        </figure>
        <down v-bind:class="{norotate: rotate}" :rol="rol" :card="carta"  @resource="newResource" @flip="flip" @damage="newDamage" @rotate="newRotate" @viatge="newViatge"></down>
    </div>
</template>

<script>
    import Down from './down'
    import Resource from './resources'
    import Damage from './damage'
    import Viatge from './viatge'

    import { mapActions } from 'vuex'

export default {
    name: 'carta',
    components: {
        down: Down,
        resource: Resource,
        damage: Damage,
        viatge: Viatge
    },
    props: ['card', 'cara', 'rol', 'isVertical'],
    data: function(){
        let self = this;
        return {
            cartaWidth: null,
            cartaHeight: null,
            carta: {id:'51223bd0-ffd1-11df-a976-0801200c9001'},
            cardType: null,
            rotate: false,
            resource: 0,
            damage: 0,
            viatge: 0,
            girar: false
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
    },
    watch: {
        card: function (newData, oldData) {
                this.carta = newData;
            }
    },
    computed: {
        calculatedHeight: function(){
            let calcul = (this.cartaWidth * 141) / 100;
            return Math.round(calcul) + 'px';
        },
        calculateWidth: function(){
            if (!this.isVertical) {
                let calcul = (this.cartaHeight * 70.5) / 100;
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
            if (this.cara) {
                if (this.girar){
                    return "/dist/cartas/" + this.carta.id + ".B.png";
                } else {
                    return "/dist/cartas/" + this.carta.id + ".png";
                }
            } else {
                if (this.carta.type == 'Encounter' || this.carta.type == 'Setup') {
                    return "/dist/cartas/encounter.jpg";
                } else {
                    return "/dist/cartas/card.jpg";
                }

            }
        },
        isLupa: function(event) {
            if (((window.innerWidth / 3) * 2 ) > event.clientX) {
                this.setLupaPosition('right');
            } else {
                this.setLupaPosition('left');
            }
            if(this.cara){
                let temp = _.clone(this.carta);
                if (this.girar) {
                    temp.id = temp.id + ".B";
                }
                this.setLupaCard(temp);
            }
        },
        newResource: function(value){
            if (value == 'add') {
                this.resource ++;
            } else {
                this.resource --;
            }
        },
        newDamage: function(value){
            if (value == 'add') {
                this.damage ++;
            } else {
                this.damage --;
            }
        },
        newViatge: function(value){
            if (value == 'add') {
                this.viatge ++;
            } else {
                this.viatge --;
            }
        },
        flip: function(val){
            if (val){
                this.girar = !this.girar;
            }
        },
        newRotate: function(val){
            this.rotate = val;
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

    &.rotate {
        transform: rotate(90deg);
    }

    .norotate {
        transform: rotate(-90deg);

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

    .image {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>