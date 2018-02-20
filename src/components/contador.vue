<template>
    <div>
        <div class="text has-text-primary has-text-centered">{{text}}</div>
        <b-field>
            <b-input type="number" v-bind:placeholder="{valor}" v-model.number="valor"></b-input>
            <p class="control">
                <button class="button is-primary" v-on:click="send"><b-icon icon="arrow-right-bold-circle-outline" xsize="is-small"></b-icon></button>
            </p>
        </b-field>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'contador',
    components: {},
    props:  ['type'],
    data: function(){
        return {
            valor: 0,
            isTorn : false,
        }
    },
    mounted: function(){
        this.isTorn = (this.type == 'torn');
        this.valor = (this.isTorn) ? this.getTorn : this.getAmenasa;
    },
    watch: {
        getAmenasa: function(newData, oldData){
            if (!this.isTorn) {
                this.valor = newData;
            }
        },
        getTorn: function(newData, oldData){
            if (this.isTorn){
                this.valor = newData;
            }
        },
    },
    computed: {
        ...mapGetters({
            getAmenasa: 'amenasa',
            getTorn: 'torn'
        }),
        text: function(){
            return (this.isTorn) ? "TORN" : "AMENAÇA";
        }
    },
    methods: {
        ...mapActions({
            setAmenasa: 'setAmenasa',
            setTorn: 'setTorn'
        }),
        send: function(){
            if (this.isTorn){
                this.setTorn(this.valor);
            } else {
                this.setAmenasa(this.valor);
            }
        }
    }
}
</script>

<style lang="scss">
    .text {
        font-weight: bold;
        font-size: 0.8rem;
    }
</style>