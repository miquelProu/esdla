<template>
    <nav class="level" style="position:absolute;margin-bottom: 0;padding: 5px 5px 5px 0;background-color: rgba(0,0,0,0.5);" v-bind:class="[{isTop: isTop}, {isDos: isDos}]">
        <!-- Left side -->
        <div class="level-left">
            <div class="level-item" style="margin-right: 0.5rem;">
                <!--<div class="resource is-clearfix">-->
                <figure class="image is-32x32">
                    <img class="" src="../assets/markers/62a2ba76-9872-481b-b8fc-ec35447ca640.png"/>
                </figure>
            </div>
           <div class="level-item" style="color:white;font-weight: bold;font-size: 1.2em;">
               <div>{{resource}}</div>
           </div>
        </div>
    </nav>
</template>

<script>

    export default {
        name: 'resource',
        components: {},
        props: ['damage', 'resource', 'viatge'],
        data: function(){
            return {
                isTop: false,
                isDos: false,
            }
        },
        mounted: function(){},
        watch: {
            damage: function(){this.evaluate()},
            viatge: function(){this.evaluate()},
            resource: function(){this.evaluate()},
        },
        computed: {

        },
        methods:{
            evaluate: function(){
                console.log("EVALUATE RESOURCE");
                if (this.damage > 0 && this.viatge > 0 ){
                    this.isTop = true;
                    this.isDos = false;
                } else if (this.damage > 0 || this.viatge > 0 ){
                    this.isDos = true;
                    this.isTop = false;
                } else {
                    this.isTop = false;
                    this.isDos = false;
                }
            }
        }
    }
</script>

<style lang="scss">

    .isTop {
        align-self: flex-start;
    }
    .isDos {
        margin-top: 12px;
    }
</style>