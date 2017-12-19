<template>
    <div class="carta" ref="carta" v-bind:class="{rotate: rotate}" v-bind:style="{height: calculatedHeight}">
        <img v-bind:src="srcImage()" />
        <b-dropdown v-bind:class="{norotate: rotate}">
            <button class="button is-primary" slot="trigger">
                <b-icon icon="menu-down"></b-icon>
            </button>
            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else</b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
export default {
    name: 'carta',
    components: {},
    props: ['rotate', 'card'],
    data: function(){
        let self = this;
        return {
            cartaWidth: null,
            carta: {id:'51223bd0-ffd1-11df-a976-0801200c9001'}
        }
    },
    mounted: function(){
        this.cartaWidth = this.$refs.carta.clientWidth;
        this.carta = this.card;

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
        }
    },
    methods: {
        srcImage: function(){
            return "/dist/cartas/" + this.carta.id + ".png";
        }
    }
}
</script>

<style lang="scss">
.carta {
    max-height: 600px;
    display:flex;
    flex-direction: column;
    height: 141%;
    position:relative;

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