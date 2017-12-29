<template>
    <div class="resource is-clearfix">
        <img src="../assets/markers/62a2ba76-9872-481b-b8fc-ec35447ca640.png"/>
        <div>{{value}}</div>
    </div>
</template>

<script>

    export default {
        name: 'resource',
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
    .resource {
        position: absolute;
        color:white;
        top:50%;
        left:0;
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