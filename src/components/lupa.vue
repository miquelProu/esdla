<template>
   <div class="lupa is-4" v-bind:class="{ left: isLeft, right: isRight }">
       <figure class="image">
           <img v-bind:src="srcImage()"/>
       </figure>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'lupa',
        components: {},
        props: [],
        data: function(){
            return {}
        },
        mounted: function(){},
        watch: {},
        computed: {
            ...mapGetters({
                getLupaCard: 'getLupaCard',
                getLupaPosition: 'getLupaPosition'
            }),
            isLeft: function(){
                return (this.getLupaPosition == 'right') ? false : true;
            },
            isRight: function(){
                return (this.getLupaPosition == 'right') ? true : false;
            }
        },
        methods:{
            srcImage: function(){
                let carta = this.getLupaCard;
                return "/dist/cartas/" + carta.id + ".png";
            }
        },
    }
</script>

<style lang="scss">
    .lupa {
        position:absolute;
        top:0;
        z-index:1000;
        &.left {left:0;}
        &.right{right:0;}
    }
</style>