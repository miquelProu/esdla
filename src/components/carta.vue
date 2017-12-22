<template>
    <div class="carta" ref="carta" v-bind:class="{rotate: rotate}" v-bind:style="{maxWidth: calculateWidth}">
        <figure class="image">
            <img v-bind:src="srcImage()" />
        </figure>
        <b-dropdown v-bind:class="{norotate: rotate}">
            <button class="button is-primary" slot="trigger">
                <b-icon icon="menu-down"></b-icon>
            </button>
            <template v-if="cardType == 'Dolent'">
                <b-dropdown-item v-on:click="toPreparacio(1)">A preparació</b-dropdown-item>
                <b-dropdown-item v-on:click="remenar('Encounter')">Remenar Preparació</b-dropdown-item>
                <b-dropdown-item>Something else</b-dropdown-item>
            </template>
            <templae v-if="cardType == 'Bo'">
                <b-dropdown-item v-on:click="toPreparacio(1)">A la ma</b-dropdown-item>
                <b-dropdown-item v-on:click="remenar('Aliats')">Remenar Aliats</b-dropdown-item>
            </templae>
        </b-dropdown>
    </div>
</template>

<script>

    import { mapActions } from 'vuex'

export default {
    name: 'carta',
    components: {},
    props: ['rotate', 'card', 'posicio'],
    data: function(){
        let self = this;
        return {
            cartaWidth: null,
            cartaHeight: null,
            carta: {id:'51223bd0-ffd1-11df-a976-0801200c9001'},
            pos: 'cara',
            cardType: null
        }
    },
    mounted: function(){
        this.cartaWidth = this.$refs.carta.clientWidth;
        this.cartaHeight = this.$refs.carta.clientHeight;
        this.carta = this.card;
        this.pos = (this.posicio) ? this.posicio : 'cara';
        if (this.carta.type == 'Encounter') {
            this.cardType = 'Dolent'
        } else if (this.carta.type == 'Quest') {
            this.cardType = 'Misio'
        } else {
            this.cardType = 'Bo'
        }
    },
    watch: {
        'card': {
            handler(newData, oldData) {
                this.carta = newData;
            }
        },
    },
    computed: {
        calculatedHeight: function(){
            let calcul = (this.cartaWidth * 141) / 100;
            return Math.round(calcul) + 'px';
        },
        calculateWidth: function(){
            let calcul = (this.cartaHeight * 70.5) / 100;
            return Math.round(calcul) + 'px';
        }
    },
    methods: {
        ...mapActions({
            toPreparacio: 'toPreparacio',
            remenar: 'remenar',
            toMa: 'toMa'
        }),
        srcImage: function(){
            if (this.pos == 'cara') {
                return "/dist/cartas/" + this.carta.id + ".png";
            } else {
                if (this.carta.type == 'Encounter' || this.carta.type == 'Setup') {
                    return "/dist/cartas/encounter.jpg";
                } else {
                    return "/dist/cartas/card.jpg";
                }

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

    /*figure.image {*/
        /*height:100%;*/
        /*img {*/
            /*height: 100%;*/
            /*width: auto;*/
        /*}*/
    /*}*/
}
</style>