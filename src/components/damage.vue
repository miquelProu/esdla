<template>
    <div class="damage is-clearfix">
        <img src="../assets/markers/38d55f36-04d7-4cf9-a496-06cb84de567d.png"/>
        <div>{{value}}</div>
    </div>
</template>

<script>

    export default {
        name: 'damage',
        components: {},
        props: ['type', 'value'],
        data: function(){
            return {}
        },
        mounted: function(){},
        watch: {},
        computed: {},
        methods:{}
    }
</script>

<style lang="scss">
    .damage {

        color:white;
        top:70%;
        left:0;
        position: absolute;
        margin-top: -22px;

        img {
            min-width: 10px;
            min-height: 10px;
            width: 30%;
            height: 30%;
            display:contents;
            float: left;
        }

        div {
            float: left;
            margin-left: 5px;
        }
    }
</style>