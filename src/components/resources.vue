<template>
    <div class="columns is-multiline" style="position:absolute;margin-left: -0.5rem;margin-top:0.2rem;">
        <div class="column is-12 level">
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
        </div>
        <!--<div class="column is-12 level">-->
            <!--<div class="level-left">-->
                <!--<div class="level-item" style="margin-right: 0.5rem;">-->
                    <!--&lt;!&ndash;<div class="resource is-clearfix">&ndash;&gt;-->
                    <!--<figure class="image is-32x32">-->
                        <!--<img class="" src="../assets/markers/e9a419ff-5154-41cf-b84f-95149cc19a2a.png"/>-->
                    <!--</figure>-->
                <!--</div>-->
                <!--<div class="level-item" style="color:white;font-weight: bold;font-size: 1.2em;">-->
                    <!--<div>{{viatge}}</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="column is-12 level">-->
            <!--<div class="level-left">-->
                <!--<div class="level-item" style="margin-right: 0.5rem;">-->
                    <!--&lt;!&ndash;<div class="resource is-clearfix">&ndash;&gt;-->
                    <!--<figure class="image is-32x32">-->
                        <!--<img class="" src="../assets/markers/e9a419ff-5154-41cf-b84f-95149cc19a2a.png"/>-->
                    <!--</figure>-->
                <!--</div>-->
                <!--<div class="level-item" style="color:white;font-weight: bold;font-size: 1.2em;">-->
                    <!--<div>{{viatge}}</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
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
    .column {
        padding: 0.45rem;
        &.level {
            margin-bottom: 0;
        }
    }
</style>