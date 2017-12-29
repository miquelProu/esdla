<template>
    <div class="carta" ref="carta" v-bind:class="{rotate: rotate}" v-bind:style="{maxWidth: calculateWidth}">
        <figure class="image">
            <resource v-if="resource > 0" :type="'foo'" :value="resource"></resource>
            <img v-on:mouseover="isLupa" v-on:mouseout="setLupaCard(null)" v-bind:src="srcImage()" />
        </figure>
        <down :rol="rol" :card="carta"  @resource="newResource"></down>
    </div>
</template>

<script>
    import Down from './down'
    import Resource from './resources'

    import { mapActions } from 'vuex'

export default {
    name: 'carta',
    components: {
        down: Down,
        resource: Resource
    },
    props: ['card', 'cara', 'rol'],
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
            viatge: 0
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
            let calcul = (this.cartaHeight * 70.5) / 100;
            return Math.round(calcul) + 'px';
        },

    },
    methods: {
        ...mapActions({
            setLupaCard: 'setLupaCard',
            setLupaPosition: 'setLupaPosition'
        }),
        srcImage: function(){
            if (this.cara) {
                return "/dist/cartas/" + this.carta.id + ".png";
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
                this.setLupaCard(this.card);
            }
        },
        newResource: function(value){
            if (value == 'add') {
                this.resource ++;
            } else {
                this.resource --;
            }
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
    }

    button {
        padding:0 !important;
        height:100% !important;

        span {height:100%;}
    }
}
</style>