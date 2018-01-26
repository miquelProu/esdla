<template>
    <div class="viatge is-clearfix">
        <img src="../assets/markers/e9a419ff-5154-41cf-b84f-95149cc19a2a.png"/>
        <div>{{value}}</div>
    </div>
</template>

<script>

    export default {
        name: 'viatge',
        components: {},
        props: ['value'],
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
    .viatge {

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