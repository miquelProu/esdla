<template>
    <nav class="level" style="position:absolute;margin-bottom: 0;padding: 5px 5px 5px 0;background-color: rgba(0,0,0,0.5);" v-bind:class="[{isTop: isTop}, {isDos: isDos}]">
        <!-- Left side -->
        <div class="level-left">
            <div class="level-item" style="margin-right: 0.5rem;">
                <!--<div class="resource is-clearfix">-->
                <figure class="image is-32x32">
                    <img class="" src="../assets/markers/e9a419ff-5154-41cf-b84f-95149cc19a2a.png"/>
                </figure>
            </div>
            <div class="level-item" style="color:white;font-weight: bold;font-size: 1.2em;">
                <div>{{viatge}}</div>
            </div>
        </div>
    </nav>
</template>

<script>

    export default {
        name: 'viatge',
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
        computed: {},
        methods:{
            evaluate: function(){
                if (this.damage > 0 && this.resource > 0 ){
                    this.isTop = true;
                    this.isDos = false;
                } else if (this.damage > 0 || this.resource > 0 ){
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