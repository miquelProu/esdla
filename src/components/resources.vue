<template>
    <nav class="level" style="position:absolute;">
        <!-- Left side -->
        <div class="level-left">
            <div class="level-item has-text-left" xstyle="text-align: left;">
                <!--<div class="resource is-clearfix">-->
                <img class="" style="width: 30%;height: 30%;" src="../assets/markers/62a2ba76-9872-481b-b8fc-ec35447ca640.png"/>
            </div>
           <div class="level-item">
               <div>{{value}}</div>
           </div>
        </div>
    </nav>
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
        top:30%;
        left:0;
        margin-top: -22px;



        div {
            float: left;
            margin-left: 5px;
        }
    }

    img {
        min-width: 10px;
        min-height: 10px;
        width: 30%;
        height: 30%;
        /*display:contents;*/
        /*float: left;*/
    }
</style>